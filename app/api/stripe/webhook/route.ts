import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { updateUserPlan } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";

let stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-08-27.basil" as any,
    });
  }
  return stripe;
}

const getEndpointSecret = () => {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  }
  return process.env.STRIPE_WEBHOOK_SECRET;
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (!signature) {
      return NextResponse.json({ error: "Missing stripe signature" }, { status: 400 });
    }

    event = getStripe().webhooks.constructEvent(body, signature, getEndpointSecret());
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    console.log(`Processing webhook event: ${event.type}`);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout session completed:", {
          sessionId: session.id,
          mode: session.mode,
          metadata: session.metadata,
          customerEmail: session.customer_details?.email
        });

        const customerEmail = session.customer_details?.email || session.client_reference_id || '';
        await handlePaymentSuccess(customerEmail, session.customer as string, session.subscription as string);
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription created:", { subscriptionId: subscription.id, customerId: subscription.customer });
        await handleSubscriptionCreated(subscription);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription updated:", { subscriptionId: subscription.id, status: subscription.status });
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription deleted:", { subscriptionId: subscription.id });
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Payment succeeded:", { invoiceId: invoice.id, customerId: invoice.customer });
        await handlePaymentSucceeded(invoice);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Payment failed:", { invoiceId: invoice.id, customerId: invoice.customer });
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook handler error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper functions for different webhook events
async function handlePaymentSuccess(email: string, customerId: string, subscriptionId: string) {
  if (!email) return;
  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.warn(`User not found for email: ${email}`);
    return;
  }

  console.log(`Processing successful payment for user: ${email}`);
  
  // Upgrade user to Pro plan
  await updateUserPlan(user.id, "pro");

  // Create or update subscription record
  await prisma.subscription.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      planType: "pro",
      status: "active",
      stripeCurrentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
    update: {
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      planType: "pro",
      status: "active",
      updatedAt: new Date(),
    }
  });
  
  console.log(`Successfully activated Pro plan for user: ${email}`);
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  
  // Find user by stripeCustomerId
  const user = await prisma.user.findFirst({
    where: { 
      subscriptions: {
        some: { stripeCustomerId: customerId }
      }
    }
  });

  if (!user) {
    console.warn(`User not found for subscription customer: ${customerId}`);
    return;
  }

  // Update subscription status
  await prisma.subscription.update({
    where: { userId: user.id },
    data: {
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      stripeCurrentPeriodEnd: (subscription as any).current_period_end ? new Date((subscription as any).current_period_end * 1000) : null,
    }
  });

  // Ensure Pro plan is active
  if (subscription.status === "active") {
    await updateUserPlan(user.id, "pro");
    console.log(`Subscription created and Pro plan activated for user: ${user.email}`);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  
  // Find user by stripeCustomerId in subscriptions
  const subscriberUser = await prisma.subscription.findFirst({
    where: { stripeCustomerId: customerId },
    include: { user: true }
  });

  if (!subscriberUser) {
    console.warn(`Subscription user not found for customer: ${customerId}`);
    return;
  }

  const user = subscriberUser.user;

  // Update subscription record
  await prisma.subscription.update({
    where: { userId: user.id },
    data: {
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      stripeCurrentPeriodEnd: (subscription as any).current_period_end ? new Date((subscription as any).current_period_end * 1000) : null,
      updatedAt: new Date(),
    }
  });

  // Handle subscription status change
  if (subscription.status === "active") {
    await updateUserPlan(user.id, "pro");
    console.log(`Subscription re-activated for user: ${user.email}`);
  } else if (subscription.status === "canceled" || subscription.status === "unpaid") {
    await updateUserPlan(user.id, "free");
    console.log(`Subscription downgraded to free for user: ${user.email}`);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  
  const subscriberUser = await prisma.subscription.findFirst({
    where: { stripeCustomerId: customerId },
    include: { user: true }
  });

  if (!subscriberUser) {
    console.warn(`Subscription user not found for deleted customer: ${customerId}`);
    return;
  }

  const user = subscriberUser.user;

  // Update subscription status
  await prisma.subscription.update({
    where: { userId: user.id },
    data: {
      status: "canceled",
      updatedAt: new Date(),
    }
  });

  // Downgrade user to free plan
  await updateUserPlan(user.id, "free");
  console.log(`Subscription deleted, user downgraded to free: ${user.email}`);
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  
  const subscriberUser = await prisma.subscription.findFirst({
    where: { stripeCustomerId: customerId },
    include: { user: true }
  });

  if (!subscriberUser) return;

  const user = subscriberUser.user;

  // Ensure subscription is active
  await prisma.subscription.update({
    where: { userId: user.id },
    data: {
      status: "active",
      stripeCurrentPeriodEnd: new Date(invoice.period_end * 1000),
      updatedAt: new Date(),
    }
  });

  // Maintain Pro status
  await updateUserPlan(user.id, "pro");
  console.log(`Payment succeeded, Pro plan maintained for user: ${user.email}`);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  
  const subscriberUser = await prisma.subscription.findFirst({
    where: { stripeCustomerId: customerId },
    include: { user: true }
  });

  if (!subscriberUser) return;

  const user = subscriberUser.user;

  // Update subscription status
  await prisma.subscription.update({
    where: { userId: user.id },
    data: {
      status: "past_due",
      updatedAt: new Date(),
    }
  });

  console.log(`Payment failed for user: ${user.email}, subscription marked as past_due`);
}
