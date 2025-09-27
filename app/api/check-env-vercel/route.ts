import { NextResponse } from "next/server";

export async function GET() {
  const envCheck = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "❌ MANQUANT",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "✅ DÉFINI" : "❌ MANQUANT",
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST || "❌ MANQUANT",
    DATABASE_URL: process.env.DATABASE_URL ? "✅ DÉFINI" : "❌ MANQUANT",
    NODE_ENV: process.env.NODE_ENV,
  };

  return NextResponse.json({
    environment: "Vercel Production",
    variables: envCheck,
    timestamp: new Date().toISOString(),
  });
}
