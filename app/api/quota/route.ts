import { NextResponse } from &quot;next/server&quot;;
import { getServerSession } from &quot;next-auth&quot;;
import { authOptions } from &quot;@/lib/auth&quot;;
import { prisma } from &quot;@/lib/prisma&quot;;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: &quot;Unauthorized&quot; }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { quota: true }
    });

    if (!user) {
      return NextResponse.json({ error: &quot;User not found&quot; }, { status: 404 });
    }

    let quota = user.quota;
    
    // Créer un quota par défaut si l&apos;utilisateur n'en a pas
    if (!quota) {
      quota = await prisma.userQuota.create({
        data: {
          userId: user.id,
          planType: &quot;free&quot;,
          monthlyGenerations: 10,
          usedGenerations: 0,
          resetDate: new Date(),
        },
      });
    }

    return NextResponse.json({
      plan: quota.planType,
      total: quota.monthlyGenerations,
      used: quota.usedGenerations,
      remaining: quota.monthlyGenerations - quota.usedGenerations,
    });

  } catch (error) {
    console.error(&quot;Error getting quota:&quot;, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}