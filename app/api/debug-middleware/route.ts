import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  const headersList = await headers();
  const url = new URL(request.url);
  
  try {
    // Simuler le comportement du middleware
    const session = await getServerSession(authOptions);
    const pathname = url.pathname;
    
    // Logs détaillés
    const middlewareLogs = {
      timestamp: new Date().toISOString(),
      pathname,
      session: {
        exists: !!session,
        user: session?.user?.email || null,
      },
      headers: {
        host: headersList.get("host"),
        userAgent: headersList.get("user-agent"),
        referer: headersList.get("referer"),
        cookie: headersList.get("cookie"),
      },
      middlewareDecision: {
        isProtectedRoute: pathname.startsWith("/dashboard"),
        shouldRedirect: !session && pathname.startsWith("/dashboard"),
        redirectUrl: !session && pathname.startsWith("/dashboard") 
          ? `/auth/login?callbackUrl=${encodeURIComponent(pathname)}`
          : null,
      },
      authConfig: {
        pages: authOptions.pages,
        sessionStrategy: authOptions.session?.strategy,
      },
    };

    // Test des routes protégées
    const protectedRoutes = [
      "/dashboard",
      "/dashboard/generate", 
      "/dashboard/history",
      "/dashboard/billing"
    ];

    const routeTests = protectedRoutes.map(route => ({
      route,
      shouldBeProtected: true,
      wouldRedirect: !session,
      redirectUrl: !session ? `/auth/login?callbackUrl=${encodeURIComponent(route)}` : null,
    }));

    const debugInfo = {
      ...middlewareLogs,
      routeTests,
      recommendations: getMiddlewareRecommendations(session, pathname),
    };

    return NextResponse.json(debugInfo, { 
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      }
    });

  } catch (error) {
    console.error("Debug middleware error:", error);
    
    return NextResponse.json({
      error: "Erreur lors du diagnostic middleware",
      message: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

function getMiddlewareRecommendations(session: any, pathname: string) {
  const recommendations = [];

  if (!session) {
    recommendations.push("🔐 Aucune session - redirection vers login attendue");
    recommendations.push(`📍 URL actuelle: ${pathname}`);
    recommendations.push(`🎯 Redirection attendue: /auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
  } else {
    recommendations.push("✅ Session valide - accès autorisé au dashboard");
    recommendations.push(`👤 Utilisateur: ${session.user?.email}`);
  }

  if (pathname.startsWith("/dashboard")) {
    recommendations.push("🛡️ Route protégée détectée");
  }

  return recommendations;
}
