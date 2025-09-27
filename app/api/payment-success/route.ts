import { NextRequest, NextResponse } from &quot;next/server&quot;;
import { getServerSession } from &quot;next-auth&quot;;
import { authOptions } from &quot;@/lib/auth&quot;;
import { prisma } from &quot;@/lib/prisma&quot;;
import { updateUserPlan } from &quot;@/lib/rate-limit&quot;;

/**
 * Route appelée après vérification d'un paiement réussi pour synchroniser le frontend
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: &quot;Non autorisé&quot; }, { status: 401 });
    }

    // Vérifier si l&apos;utilisateur a déjà un plan Pro actif
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { quota: true, subscriptions: true }
    });

    if (!user) {
      return NextResponse.json({ error: &quot;Utilisateur non trouvé&quot; }, { status: 404 });
    }

    // Retourner les informations de plan actualisées
    const quotaInfo = user.quota ? {
      plan: user.quota.planType,
      total: user.quota.monthlyGenerations,
      used: user.quota.usedGenerations,
      remaining: user.quota.monthlyGenerations - user.quota.usedGenerations
    } : {
      plan: 'free',
      total: 10,
      used: 0,
      remaining: 10
    };

    const activeSubscription = user.subscriptions.find(sub => sub.status === 'active');
    
    return NextResponse.json({
      success: true,
      plan: quotaInfo.plan,
      quota: quotaInfo,
      isPro: quotaInfo.plan === 'pro',
      hasActiveSubscription: !!activeSubscription
    });

  } catch (error) {
    console.error(&quot;Error checking payment status:&quot;, error);
    return NextResponse.json(
      { error: &quot;Erreur interne du serveur&quot; },
      { status: 500 }
    );
  }
}

/**
 * Endpoint POST pour forcer la mise à jour du plan via webhook ou action utilisateur
 */
export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: &quot;Non autorisé&quot; }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: &quot;Utilisateur non trouvé&quot; }, { status: 404 });
    }

    // Forcer une vérification et mise à jour du plan Pro 
    await updateUserPlan(user.id, &quot;pro&quot;);

    return NextResponse.json({
      success: true,
      message: "Plan mis à jour avec succès"
    });

  } catch (error) {
    console.error("Error updating plan:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du plan" },
      { status: 500 }
    );
  }
}
