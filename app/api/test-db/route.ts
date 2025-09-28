import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Test de connexion à la base de données
    await prisma.$connect();
    
    // Test de lecture
    const userCount = await prisma.user.count();
    
    // Test d'écriture (création d'un utilisateur test temporaire)
    const testUser = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        passwordHash: "test-hash"
      }
    });
    
    // Nettoyer le test
    await prisma.user.delete({
      where: { id: testUser.id }
    });
    
    return NextResponse.json({
      status: "success",
      message: "Base de données accessible",
      userCount,
      test: "CRUD operations working"
    });
    
  } catch (error) {
    console.error("Database test error:", error);
    
    return NextResponse.json({
      status: "error",
      message: "Erreur de connexion à la base de données",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
