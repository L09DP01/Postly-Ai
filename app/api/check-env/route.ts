import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ? "✅ Défini" : "❌ Manquant",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "✅ Défini" : "❌ Manquant", 
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST ? "✅ Défini" : "❌ Manquant",
    DATABASE_URL: process.env.DATABASE_URL ? "✅ Défini" : "❌ Manquant",
    NODE_ENV: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}
