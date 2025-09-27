import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  const headersList = await headers();
  const url = new URL(request.url);
  
  try {
    // Récupérer la session
    const session = await getServerSession(authOptions);
    
    // Informations sur la requête
    const requestInfo = {
      url: request.url,
      method: request.method,
      headers: {
        host: headersList.get("host"),
        userAgent: headersList.get("user-agent"),
        referer: headersList.get("referer"),
        cookie: headersList.get("cookie"),
        authorization: headersList.get("authorization"),
      },
      searchParams: Object.fromEntries(url.searchParams),
      timestamp: new Date().toISOString(),
    };

    // Informations sur la session
    const sessionInfo = {
      exists: !!session,
      user: session?.user || null,
      expires: session?.expires || null,
    };

    // Informations sur l'environnement
    const envInfo = {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "❌ MANQUANT",
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "✅ DÉFINI" : "❌ MANQUANT",
      AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST || "❌ MANQUANT",
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: process.env.DATABASE_URL ? "✅ DÉFINI" : "❌ MANQUANT",
    };

    // Test de connexion à la base de données
    let dbInfo: { status: string; error: string | null } = { status: "unknown", error: null };
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.user.count();
      dbInfo = { status: "✅ CONNECTÉ", error: null };
    } catch (error) {
      dbInfo = { status: "❌ ERREUR", error: error instanceof Error ? error.message : String(error) };
    }

    // Test des endpoints NextAuth
    const authEndpoints = {
      session: `/api/auth/session`,
      csrf: `/api/auth/csrf`,
      providers: `/api/auth/providers`,
    };

    // Analyse des cookies
    const cookieInfo = {
      hasNextAuthSession: headersList.get("cookie")?.includes("next-auth.session-token") || false,
      hasNextAuthCsrf: headersList.get("cookie")?.includes("next-auth.csrf-token") || false,
      cookies: headersList.get("cookie")?.split(";").map(c => c.trim()) || [],
    };

    // Diagnostic de redirection
    const redirectDiagnosis = {
      shouldRedirectToLogin: !session,
      redirectReason: !session ? "Aucune session trouvée" : "Session valide",
      expectedRedirectUrl: !session ? "/auth/login?callbackUrl=/dashboard" : "/dashboard",
      currentUrl: url.pathname,
    };

    const debugInfo = {
      timestamp: new Date().toISOString(),
      request: requestInfo,
      session: sessionInfo,
      environment: envInfo,
      database: dbInfo,
      authEndpoints,
      cookies: cookieInfo,
      redirect: redirectDiagnosis,
      recommendations: getRecommendations(sessionInfo, envInfo, dbInfo, cookieInfo),
    };

    return NextResponse.json(debugInfo, { 
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      }
    });

  } catch (error) {
    console.error("Debug redirect error:", error);
    
    return NextResponse.json({
      error: "Erreur lors du diagnostic",
      message: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}

function getRecommendations(sessionInfo: any, envInfo: any, dbInfo: any, cookieInfo: any) {
  const recommendations = [];

  if (!sessionInfo.exists) {
    recommendations.push("🔍 Aucune session trouvée - redirection vers login normale");
  }

  if (envInfo.NEXTAUTH_URL === "❌ MANQUANT") {
    recommendations.push("⚠️ NEXTAUTH_URL manquant - ajoutez-le dans les variables d'environnement Vercel");
  }

  if (envInfo.NEXTAUTH_SECRET === "❌ MANQUANT") {
    recommendations.push("⚠️ NEXTAUTH_SECRET manquant - ajoutez-le dans les variables d'environnement Vercel");
  }

  if (envInfo.AUTH_TRUST_HOST === "❌ MANQUANT") {
    recommendations.push("⚠️ AUTH_TRUST_HOST manquant - ajoutez 'true' dans les variables d'environnement Vercel");
  }

  if (dbInfo.status === "❌ ERREUR") {
    recommendations.push("🚨 Problème de base de données - vérifiez DATABASE_URL");
  }

  if (!cookieInfo.hasNextAuthSession) {
    recommendations.push("🍪 Aucun cookie de session NextAuth trouvé");
  }

  if (recommendations.length === 0) {
    recommendations.push("✅ Tout semble correct - le problème peut être ailleurs");
  }

  return recommendations;
}
