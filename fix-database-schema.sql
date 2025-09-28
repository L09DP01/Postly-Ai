-- Script SQL pour créer les types et tables manquants pour WhatsApp
-- À exécuter directement sur la base de données Supabase

-- 1. Créer l'enum OtpPurpose
DO $$ BEGIN
    CREATE TYPE "OtpPurpose" AS ENUM ('LOGIN', 'LINK', 'SIGNUP');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Créer la table OtpChallenge
CREATE TABLE IF NOT EXISTS "OtpChallenge" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "phoneE164" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "purpose" "OtpPurpose" NOT NULL DEFAULT 'LOGIN',
    "consumed" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OtpChallenge_pkey" PRIMARY KEY ("id")
);

-- 3. Créer la table CreditLedger
CREATE TABLE IF NOT EXISTS "CreditLedger" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "delta" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CreditLedger_pkey" PRIMARY KEY ("id")
);

-- 4. Ajouter les colonnes WhatsApp à la table User (si elles n'existent pas)
DO $$ BEGIN
    ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "waPhoneE164" TEXT;
    ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "waUserId" TEXT;
    ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "waLinkedAt" TIMESTAMP(3);
    ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "waPreferredLang" TEXT DEFAULT 'fr';
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- 5. Créer les index
CREATE INDEX IF NOT EXISTS "OtpChallenge_phoneE164_consumed_expiresAt_idx" ON "OtpChallenge"("phoneE164", "consumed", "expiresAt");
CREATE INDEX IF NOT EXISTS "OtpChallenge_userId_consumed_idx" ON "OtpChallenge"("userId", "consumed");
CREATE INDEX IF NOT EXISTS "CreditLedger_userId_createdAt_idx" ON "CreditLedger"("userId", "createdAt");
CREATE INDEX IF NOT EXISTS "CreditLedger_reason_createdAt_idx" ON "CreditLedger"("reason", "createdAt");
CREATE INDEX IF NOT EXISTS "User_waPhoneE164_idx" ON "User"("waPhoneE164");
CREATE INDEX IF NOT EXISTS "User_waUserId_idx" ON "User"("waUserId");

-- 6. Créer les contraintes uniques (ignorer si elles existent déjà)
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'User_waPhoneE164_key'
    ) THEN
        ALTER TABLE "User" ADD CONSTRAINT "User_waPhoneE164_key" UNIQUE ("waPhoneE164");
    END IF;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'User_waUserId_key'
    ) THEN
        ALTER TABLE "User" ADD CONSTRAINT "User_waUserId_key" UNIQUE ("waUserId");
    END IF;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 7. Créer les clés étrangères
DO $$ BEGIN
    ALTER TABLE "OtpChallenge" ADD CONSTRAINT "OtpChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "CreditLedger" ADD CONSTRAINT "CreditLedger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Vérification
SELECT 'Script exécuté avec succès !' as status;
