import { getServerSession } from &quot;next-auth&quot;;
import { authOptions } from &quot;./auth&quot;;
import { prisma } from &quot;./prisma&quot;;

export interface UserWithQuota {
  id: string;
  email: string;
  plan: &quot;free&quot; | &quot;pro&quot;;
  remaining: number;
  total: number;
  used: number;
}

/**
 * Vérifie que l&apos;utilisateur est connecté et a des crédits disponibles
 * @throws Response avec status 401 si non connecté, 429 si quota dépassé
 */
export async function requireUserWithQuota(): Promise<UserWithQuota> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    throw new Response(&quot;Unauthorized&quot;, { status: 401 });
  }

  // Récupérer lutilisateur
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Response(&quot;User not found&quot;, { status: 401 });
  }

  // Récupérer ou créer les quotas
  const quota = await prisma.userQuota.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      planType: &quot;free&quot;,
      monthlyGenerations: 10,
      usedGenerations: 0,
      resetDate: new Date(),
    },
    update: {},
  });

  // Vérifier si le quota est dépassé
  if (quota.usedGenerations >= quota.monthlyGenerations) {
    throw new Response(
      JSON.stringify({ 
        error: &quot;quota_exceeded&quot;, 
        message: &quot;Vous avez atteint votre quota de générations mensuelles&quot;,
        plan: quota.planType,
        used: quota.usedGenerations,
        total: quota.monthlyGenerations
      }),
      { 
        status: 429,
        headers: { &quot;Content-Type&quot;: &quot;application/json&quot; }
      }
    );
  }

  return {
    id: user.id,
    email: user.email,
    plan: quota.planType as &quot;free&quot; | &quot;pro&quot;,
    remaining: quota.monthlyGenerations - quota.usedGenerations,
    total: quota.monthlyGenerations,
    used: quota.usedGenerations,
  };
}

/**
 * Incrémente le compteur de générations utilisées
 */
export async function incrementUserGeneration(userId: string): Promise<void> {
  await prisma.userQuota.update({
    where: { userId },
    data: {
      usedGenerations: {
        increment: 1,
      },
    },
  });
}

/**
 * Récupère les informations de quota dun utilisateur (sans vérification)
 */
export async function getUserQuotaInfo(userId: string): Promise<UserWithQuota | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return null;

    // Récupérer ou créer le quota
    const quota = await prisma.userQuota.upsert({
      where: { userId },
      create: {
        userId: user.id,
        planType: &quot;free&quot;,
        monthlyGenerations: 10,
        usedGenerations: 0,
        resetDate: new Date(),
      },
      update: {},
    });

    return {
      id: user.id,
      email: user.email,
      plan: quota.planType as &quot;free&quot; | &quot;pro&quot;,
      remaining: quota.monthlyGenerations - quota.usedGenerations,
      total: quota.monthlyGenerations,
      used: quota.usedGenerations,
    };
  } catch (error) {
    console.error(&quot;Error in getUserQuotaInfo:&quot;, error);
    return null;
  }
}

/**
 * Met à jour le plan dun utilisateur (pour Stripe webhooks)
 */
export async function updateUserPlan(
  userId: string, 
  planType: &quot;free&quot; | &quot;pro&quot;
): Promise<void> {
  const monthlyGenerations = planType === "pro" ? 200 : 10;

  await prisma.userQuota.upsert({
    where: { userId },
    create: {
      userId,
      planType,
      monthlyGenerations,
      usedGenerations: 0,
      resetDate: new Date(),
    },
    update: {
      planType,
      monthlyGenerations,
      // Reset les générations utilisées lors du changement de plan
      usedGenerations: 0,
      resetDate: new Date(),
    },
  });
}

/**
 * Reset mensuel des quotas (à appeler via cron)
 */
export async function resetMonthlyQuotas(): Promise<void> {
  await prisma.userQuota.updateMany({
    data: {
      usedGenerations: 0,
      resetDate: new Date(),
    },
  });
}
