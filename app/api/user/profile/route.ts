import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { quota: true }
    }) as any;

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    // Calculer les crédits séparément
    const webCredits = user.quota ? (user.quota.monthlyGenerations - user.quota.usedGenerations) : 0;
    const whatsappCredits = user.credits || 0;
    
    // Si les comptes sont liés, synchroniser les crédits (utiliser le maximum)
    const isLinked = user.waPhoneE164 && user.email;
    const synchronizedCredits = isLinked ? Math.max(webCredits, whatsappCredits) : null;
    
    // Log pour debug
    console.log('🔍 Profile API Debug:', {
      userId: user.id,
      email: user.email,
      webCredits,
      whatsappCredits,
      isLinked,
      synchronizedCredits,
      quota: user.quota ? {
        plan: user.quota.planType,
        monthly: user.quota.monthlyGenerations,
        used: user.quota.usedGenerations
      } : null
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      webCredits: webCredits,
      whatsappCredits: whatsappCredits,
      isLinked: isLinked,
      synchronizedCredits: synchronizedCredits, // Crédits synchronisés si liés
      waPhoneE164: user.waPhoneE164,
      waUserId: user.waUserId,
      waLinkedAt: user.waLinkedAt,
      waPreferredLang: user.waPreferredLang,
      createdAt: user.createdAt,
      plan: user.quota?.planType || 'free'
    });

  } catch (error) {
    console.error("Erreur profil utilisateur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
