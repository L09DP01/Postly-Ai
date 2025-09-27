import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateUserPlan } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updatePlanSchema = z.object({
  planType: z.enum(["free", "pro"], { required_error: "planType is required" }),
});

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parser et valider les données requises
    const body = await request.json();
    const { planType } = updatePlanSchema.parse(body);

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({ 
      where: { email: session.user.email } 
    });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Mise à jour du plan
    await updateUserPlan(user.id, planType);

    return NextResponse.json({ 
      success: true, 
      planType,
      message: `Plan mis à jour vers ${planType}` 
    });

  } catch (error) {
    console.error("Update plan error:", error);
    
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
