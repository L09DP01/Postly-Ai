-- Script SQL pour ajouter les tables manquantes pour WhatsApp
-- Tables: OtpChallenge et CreditLedger

-- 1. Créer la table OtpChallenge
CREATE TABLE "OtpChallenge" (
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
CREATE TABLE "CreditLedger" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "delta" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditLedger_pkey" PRIMARY KEY ("id")
);

-- 3. Ajouter les contraintes de clés étrangères
ALTER TABLE "OtpChallenge" ADD CONSTRAINT "OtpChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "CreditLedger" ADD CONSTRAINT "CreditLedger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- 4. Créer les index pour optimiser les performances
CREATE INDEX "OtpChallenge_phoneE164_consumed_expiresAt_idx" ON "OtpChallenge"("phoneE164", "consumed", "expiresAt");
CREATE INDEX "OtpChallenge_userId_consumed_idx" ON "OtpChallenge"("userId", "consumed");
CREATE INDEX "CreditLedger_userId_createdAt_idx" ON "CreditLedger"("userId", "createdAt");
CREATE INDEX "CreditLedger_reason_createdAt_idx" ON "CreditLedger"("reason", "createdAt");

-- 5. Mettre à jour la table User pour ajouter les champs WhatsApp (si pas déjà fait)
-- Vérifier d'abord si les colonnes existent avant de les ajouter

-- Ajouter waPhoneE164 si elle n'existe pas
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'User' AND column_name = 'waPhoneE164') THEN
        ALTER TABLE "User" ADD COLUMN "waPhoneE164" TEXT;
    END IF;
END $$;

-- Ajouter waUserId si elle n'existe pas
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'User' AND column_name = 'waUserId') THEN
        ALTER TABLE "User" ADD COLUMN "waUserId" TEXT;
    END IF;
END $$;

-- Ajouter waLinkedAt si elle n'existe pas
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'User' AND column_name = 'waLinkedAt') THEN
        ALTER TABLE "User" ADD COLUMN "waLinkedAt" TIMESTAMP(3);
    END IF;
END $$;

-- Ajouter waPreferredLang si elle n'existe pas
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'User' AND column_name = 'waPreferredLang') THEN
        ALTER TABLE "User" ADD COLUMN "waPreferredLang" TEXT DEFAULT 'fr';
    END IF;
END $$;

-- Ajouter credits si elle n'existe pas
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'User' AND column_name = 'credits') THEN
        ALTER TABLE "User" ADD COLUMN "credits" INTEGER DEFAULT 5;
    END IF;
END $$;

-- Ajouter updatedAt si elle n'existe pas
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'User' AND column_name = 'updatedAt') THEN
        ALTER TABLE "User" ADD COLUMN "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
    END IF;
END $$;

-- 6. Créer les contraintes d'unicité
CREATE UNIQUE INDEX IF NOT EXISTS "User_waPhoneE164_key" ON "User"("waPhoneE164") WHERE "waPhoneE164" IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "User_waUserId_key" ON "User"("waUserId") WHERE "waUserId" IS NOT NULL;

-- 7. Créer les index sur les nouveaux champs User
CREATE INDEX IF NOT EXISTS "User_waPhoneE164_idx" ON "User"("waPhoneE164");
CREATE INDEX IF NOT EXISTS "User_waUserId_idx" ON "User"("waUserId");

-- 8. Créer la table _prisma_migrations si elle n'existe pas
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id" VARCHAR(36) NOT NULL,
    "checksum" VARCHAR(64) NOT NULL,
    "finished_at" TIMESTAMP(3),
    "migration_name" VARCHAR(255) NOT NULL,
    "logs" TEXT,
    "rolled_back_at" TIMESTAMP(3),
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "applied_steps_count" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id")
);

-- 9. Message de confirmation
SELECT 'Tables WhatsApp ajoutées avec succès!' as message;
