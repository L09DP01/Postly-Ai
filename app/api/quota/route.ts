import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { quota: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let quota = user.quota;
    
    // Créer un quota par défaut si l'utilisateur n'en a pas
    if (!quota) {
      quota = await prisma.userQuota.create({
        data: {
          userId: user.id,
          planType: "free",
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
    console.error("Error getting quota:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}