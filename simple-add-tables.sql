-- Script SQL simple pour ajouter les tables WhatsApp
-- À exécuter directement dans Supabase SQL Editor

-- 1. Créer la table OtpChallenge
CREATE TABLE IF NOT EXISTS "OtpChallenge" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "phoneE164" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "purpose" TEXT NOT NULL DEFAULT 'LOGIN',
    "consumed" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OtpChallenge_pkey" PRIMARY KEY ("id")
);

-- 2. Créer la table CreditLedger
CREATE TABLE IF NOT EXISTS "CreditLedger" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "delta" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CreditLedger_pkey" PRIMARY KEY ("id")
);

-- 3. Ajouter les colonnes WhatsApp à la table User (si elles n'existent pas)
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "waPhoneE164" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "waUserId" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "waLinkedAt" TIMESTAMP(3);
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "waPreferredLang" TEXT DEFAULT 'fr';
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "credits" INTEGER DEFAULT 5;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- 4. Modifier les contraintes existantes pour permettre NULL
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;
ALTER TABLE "User" ALTER COLUMN "passwordHash" DROP NOT NULL;

-- 5. Créer les contraintes de clés étrangères
ALTER TABLE "OtpChallenge" ADD CONSTRAINT "OtpChallenge_userId_fkey" 
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "CreditLedger" ADD CONSTRAINT "CreditLedger_userId_fkey" 
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- 6. Créer les index pour optimiser les performances
CREATE INDEX IF NOT EXISTS "OtpChallenge_phoneE164_consumed_expiresAt_idx" 
    ON "OtpChallenge"("phoneE164", "consumed", "expiresAt");
    
CREATE INDEX IF NOT EXISTS "OtpChallenge_userId_consumed_idx" 
    ON "OtpChallenge"("userId", "consumed");
    
CREATE INDEX IF NOT EXISTS "CreditLedger_userId_createdAt_idx" 
    ON "CreditLedger"("userId", "createdAt");
    
CREATE INDEX IF NOT EXISTS "CreditLedger_reason_createdAt_idx" 
    ON "CreditLedger"("reason", "createdAt");

-- 7. Créer les contraintes d'unicité pour WhatsApp
CREATE UNIQUE INDEX IF NOT EXISTS "User_waPhoneE164_key" 
    ON "User"("waPhoneE164") WHERE "waPhoneE164" IS NOT NULL;
    
CREATE UNIQUE INDEX IF NOT EXISTS "User_waUserId_key" 
    ON "User"("waUserId") WHERE "waUserId" IS NOT NULL;

-- 8. Créer les index sur les nouveaux champs User
CREATE INDEX IF NOT EXISTS "User_waPhoneE164_idx" ON "User"("waPhoneE164");
CREATE INDEX IF NOT EXISTS "User_waUserId_idx" ON "User"("waUserId");

-- 9. Message de confirmation
SELECT 'Tables WhatsApp ajoutées avec succès!' as message;
