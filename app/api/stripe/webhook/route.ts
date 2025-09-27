import { NextRequest, NextResponse } from &quot;next/server&quot;;
import { headers } from &quot;next/headers&quot;;
import Stripe from &quot;stripe&quot;;
import { updateUserPlan } from &quot;@/lib/rate-limit&quot;;
import { prisma } from &quot;@/lib/prisma&quot;;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: &quot;2025-08-27.basil&quot; as any,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get(&quot;stripe-signature&quot;);

  let event: Stripe.Event;

  try {
    if (!signature) {
      return NextResponse.json({ error: &quot;Missing stripe signature&quot; }, { status: 400 });
    }

    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    console.error(&quot;Webhook signature verification failed:&quot;, err);
    return NextResponse.json({ error: &quot;Invalid signature&quot; }, { status: 400 });
  }

  try {
    console.log(`Processing webhook event: ${event.type}`);

    switch (event.type) {
      case &quot;checkout.session.completed&quot;: {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(&quot;Checkout session completed:&quot;, {
          sessionId: session.id,
          mode: session.mode,
          metadata: session.metadata,
          customerEmail: session.customer_details?.email
        });

        const customerEmail = session.customer_details?.email || session.client_reference_id || '';
        await handlePaymentSuccess(customerEmail, session.customer as string, session.subscription as string);
        break;
      }

      case &quot;customer.subscription.created&quot;: {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(&quot;Subscription created:&quot;, { subscriptionId: subscription.id, customerId: subscription.customer });
        await handleSubscriptionCreated(subscription);
        break;
      }

      case &quot;customer.subscription.updated&quot;: {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(&quot;Subscription updated:&quot;, { subscriptionId: subscription.id, status: subscription.status });
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case &quot;customer.subscription.deleted&quot;: {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(&quot;Subscription deleted:&quot;, { subscriptionId: subscription.id });
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case &quot;invoice.payment_succeeded&quot;: {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(&quot;Payment succeeded:&quot;, { invoiceId: invoice.id, customerId: invoice.customer });
        await handlePaymentSucceeded(invoice);
        break;
      }

      case &quot;invoice.payment_failed&quot;: {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(&quot;Payment failed:&quot;, { invoiceId: invoice.id, customerId: invoice.customer });
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(&quot;Stripe webhook handler error:&quot;, error);
    return NextResponse.json(
      { error: &quot;Internal server error&quot; },
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
  await updateUserPlan(user.id, &quot;pro&quot;);

  // Create or update subscription record
  await prisma.subscription.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      planType: &quot;pro&quot;,
      status: &quot;active&quot;,
      stripeCurrentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
    update: {
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      planType: &quot;pro&quot;,
      status: &quot;active&quot;,
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
  if (subscription.status === &quot;active&quot;) {
    await updateUserPlan(user.id, &quot;pro&quot;);
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
  if (subscription.status === &quot;active&quot;) {
    await updateUserPlan(user.id, &quot;pro&quot;);
    console.log(`Subscription re-activated for user: ${user.email}`);
  } else if (subscription.status === &quot;canceled&quot; || subscription.status === &quot;unpaid&quot;) {
    await updateUserPlan(user.id, &quot;free&quot;);
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
      status: &quot;canceled&quot;,
      updatedAt: new Date(),
    }
  });

  // Downgrade user to free plan
  await updateUserPlan(user.id, &quot;free&quot;);
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
      status: &quot;active&quot;,
      stripeCurrentPeriodEnd: new Date(invoice.period_end * 1000),
      updatedAt: new Date(),
    }
  });

  // Maintain Pro status
  await updateUserPlan(user.id, &quot;pro&quot;);
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
