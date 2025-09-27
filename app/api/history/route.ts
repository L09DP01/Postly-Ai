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
    });

    if (!user) {
      return NextResponse.json({ error: &quot;User not found&quot; }, { status: 404 });
    }

    // Récupérer l'historique des générations
    const generations = await prisma.generation.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: &quot;desc&quot; },
      take: 50, // Limiter à 50 générations pour les performances
    });

    return NextResponse.json({ generations });
  } catch (error) {
    console.error(&quot;History API error:&quot;, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
