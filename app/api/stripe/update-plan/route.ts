import { NextRequest, NextResponse } from &quot;next/server&quot;;
import { getServerSession } from &quot;next-auth&quot;;
import { authOptions } from &quot;@/lib/auth&quot;;
import { updateUserPlan } from &quot;@/lib/rate-limit&quot;;
import { prisma } from &quot;@/lib/prisma&quot;;
import { z } from &quot;zod&quot;;

const updatePlanSchema = z.object({
  planType: z.enum([&quot;free&quot;, &quot;pro&quot;], { required_error: &quot;planType is required&quot; }),
});

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: &quot;Unauthorized&quot; }, { status: 401 });
    }

    // Parser et valider les données requises
    const body = await request.json();
    const { planType } = updatePlanSchema.parse(body);

    // Récupérer l&apos;utilisateur
    const user = await prisma.user.findUnique({ 
      where: { email: session.user.email } 
    });
    
    if (!user) {
      return NextResponse.json({ error: &quot;User not found&quot; }, { status: 404 });
    }

    // Mise à jour du plan
    await updateUserPlan(user.id, planType);

    return NextResponse.json({ 
      success: true, 
      planType,
      message: `Plan mis à jour vers ${planType}` 
    });

  } catch (error) {
    console.error(&quot;Update plan error:&quot;, error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
