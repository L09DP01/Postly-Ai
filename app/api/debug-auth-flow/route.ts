import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  const headersList = await headers();
  const url = new URL(request.url);
  
  try {
    const session = await getServerSession(authOptions);
    
    // Analyser le flux d'authentification
    const authFlow = {
      timestamp: new Date().toISOString(),
      currentStep: determineCurrentStep(url, session),
      session: {
        exists: !!session,
        user: session?.user || null,
        expires: session?.expires || null,
      },
      url: {
        pathname: url.pathname,
        searchParams: Object.fromEntries(url.searchParams),
        callbackUrl: url.searchParams.get("callbackUrl"),
      },
      nextSteps: getNextSteps(url, session),
    };

    // Test des redirections
    const redirectTests = {
      fromLoginToDashboard: {
        condition: "Si utilisateur connecté et callbackUrl=/dashboard",
        result: session && url.searchParams.get("callbackUrl") === "/dashboard" ? "✅ Redirection vers /dashboard" : "❌ Pas de redirection",
      },
      fromDashboardToLogin: {
        condition: "Si utilisateur non connecté et route=/dashboard",
        result: !session && url.pathname === "/dashboard" ? "✅ Redirection vers /auth/login" : "❌ Pas de redirection",
      },
      callbackUrlHandling: {
        condition: "Gestion du callbackUrl",
        hasCallbackUrl: !!url.searchParams.get("callbackUrl"),
        callbackUrl: url.searchParams.get("callbackUrl"),
        isValidCallbackUrl: isValidCallbackUrl(url.searchParams.get("callbackUrl")),
      },
    };

    // Diagnostic des problèmes potentiels
    const issues = [];
    
    if (!session && url.pathname.startsWith("/dashboard")) {
      issues.push({
        type: "UNAUTHORIZED_ACCESS",
        message: "Tentative d'accès au dashboard sans session",
        expectedAction: "Redirection vers /auth/login",
      });
    }

    if (session && url.pathname === "/auth/login") {
      issues.push({
        type: "UNNECESSARY_LOGIN",
        message: "Utilisateur déjà connecté sur la page de login",
        expectedAction: "Redirection vers /dashboard ou callbackUrl",
      });
    }

    if (url.searchParams.get("callbackUrl") && !isValidCallbackUrl(url.searchParams.get("callbackUrl"))) {
      issues.push({
        type: "INVALID_CALLBACK_URL",
        message: "URL de callback invalide",
        callbackUrl: url.searchParams.get("callbackUrl"),
        expectedAction: "Utiliser callbackUrl par défaut /dashboard",
      });
    }

    const debugInfo = {
      ...authFlow,
      redirectTests,
      issues,
      environment: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NODE_ENV: process.env.NODE_ENV,
      },
      recommendations: getAuthFlowRecommendations(session, url, issues),
    };

    return NextResponse.json(debugInfo, { 
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      }
    });

  } catch (error) {
    console.error("Debug auth flow error:", error);
    
    return NextResponse.json({
      error: "Erreur lors du diagnostic auth flow",
      message: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

function determineCurrentStep(url: URL, session: any) {
  const pathname = url.pathname;
  const callbackUrl = url.searchParams.get("callbackUrl");

  if (pathname === "/auth/login") {
    if (session) {
      return "LOGIN_PAGE_WITH_SESSION";
    }
    return "LOGIN_PAGE_NO_SESSION";
  }

  if (pathname.startsWith("/dashboard")) {
    if (session) {
      return "DASHBOARD_WITH_SESSION";
    }
    return "DASHBOARD_NO_SESSION";
  }

  return "UNKNOWN_STEP";
}

function getNextSteps(url: URL, session: any) {
  const steps = [];

  if (!session && url.pathname.startsWith("/dashboard")) {
    steps.push("1. Redirection vers /auth/login");
    steps.push(`2. Ajout du callbackUrl=${encodeURIComponent(url.pathname)}`);
    steps.push("3. Affichage du formulaire de connexion");
  }

  if (session && url.pathname === "/auth/login") {
    const callbackUrl = url.searchParams.get("callbackUrl") || "/dashboard";
    steps.push(`1. Redirection vers ${callbackUrl}`);
    steps.push("2. Accès au dashboard autorisé");
  }

  if (session && url.pathname.startsWith("/dashboard")) {
    steps.push("1. Accès autorisé au dashboard");
    steps.push("2. Affichage de l'interface utilisateur");
  }

  return steps;
}

function isValidCallbackUrl(callbackUrl: string | null) {
  if (!callbackUrl) return false;
  
  // Vérifier que l'URL est relative et sécurisée
  try {
    const url = new URL(callbackUrl, "http://localhost");
    return url.pathname.startsWith("/") && !url.pathname.startsWith("//");
  } catch {
    return false;
  }
}

function getAuthFlowRecommendations(session: any, url: URL, issues: any[]) {
  const recommendations = [];

  if (issues.length === 0) {
    recommendations.push("✅ Flux d'authentification normal");
  } else {
    recommendations.push("⚠️ Problèmes détectés dans le flux d'authentification:");
    issues.forEach(issue => {
      recommendations.push(`- ${issue.type}: ${issue.message}`);
    });
  }

  if (!session && url.pathname.startsWith("/dashboard")) {
    recommendations.push("🔧 Solution: Vérifier que le middleware redirige correctement");
  }

  if (session && url.pathname === "/auth/login") {
    recommendations.push("🔧 Solution: Rediriger l'utilisateur connecté vers le dashboard");
  }

  return recommendations;
}
