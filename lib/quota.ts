import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export interface UserQuotaInfo {
  user: {
    id: string;
    email: string;
  } | null;
  quota: {
    planType: string;
    monthlyGenerations: number;
    usedGenerations: number;
    remaining: number;
  } | null;
}

export async function getUserQuotaInfo(): Promise<UserQuotaInfo> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { user: null, quota: null };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { quota: true },
    });

    if (!user) {
      return { user: null, quota: null };
    }

    let quota = user.quota;
    if (!quota) {
      // Créer le quota s'il n'existe pas
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

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      quota: {
        planType: quota.planType,
        monthlyGenerations: quota.monthlyGenerations,
        usedGenerations: quota.usedGenerations,
        remaining: quota.monthlyGenerations - quota.usedGenerations,
      },
    };
  } catch (error) {
    console.error("Error in getUserQuotaInfo:", error);
    return { user: null, quota: null };
  }
}

