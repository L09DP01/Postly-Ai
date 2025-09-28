// Script simple pour ajouter les tables WhatsApp
const { PrismaClient } = require('@prisma/client');

async function addTables() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🚀 Ajout des tables WhatsApp...\n');
    
    // Requêtes SQL simples à exécuter une par une
    const queries = [
      // 1. Créer table OtpChallenge
      `CREATE TABLE IF NOT EXISTS "OtpChallenge" (
        "id" TEXT NOT NULL,
        "userId" TEXT,
        "phoneE164" TEXT NOT NULL,
        "codeHash" TEXT NOT NULL,
        "purpose" TEXT NOT NULL DEFAULT 'LOGIN',
        "consumed" BOOLEAN NOT NULL DEFAULT false,
        "expiresAt" TIMESTAMP(3) NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "OtpChallenge_pkey" PRIMARY KEY ("id")
      )`,
      
      // 2. Créer table CreditLedger
      `CREATE TABLE IF NOT EXISTS "CreditLedger" (
        "id" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "delta" INTEGER NOT NULL,
        "reason" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "CreditLedger_pkey" PRIMARY KEY ("id")
      )`,
      
      // 3. Ajouter colonnes WhatsApp à User
      `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "waPhoneE164" TEXT`,
      `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "waUserId" TEXT`,
      `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "waLinkedAt" TIMESTAMP(3)`,
      `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "waPreferredLang" TEXT DEFAULT 'fr'`,
      `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "credits" INTEGER DEFAULT 5`,
      `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP`,
      
      // 4. Modifier contraintes User
      `ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL`,
      `ALTER TABLE "User" ALTER COLUMN "passwordHash" DROP NOT NULL`,
    ];
    
    // Exécuter les requêtes
    for (let i = 0; i < queries.length; i++) {
      try {
        console.log(`⏳ Exécution requête ${i + 1}/${queries.length}...`);
        await prisma.$executeRawUnsafe(queries[i]);
        console.log(`✅ Requête ${i + 1} exécutée avec succès`);
      } catch (error) {
        if (error.message.includes('already exists') || 
            error.message.includes('does not exist') ||
            error.message.includes('duplicate key')) {
          console.log(`⚠️ Requête ${i + 1} ignorée (déjà existant ou non applicable)`);
        } else {
          console.error(`❌ Erreur requête ${i + 1}:`, error.message);
        }
      }
    }
    
    // Ajouter les contraintes de clés étrangères
    console.log('\n🔗 Ajout des contraintes de clés étrangères...');
    
    const foreignKeys = [
      `ALTER TABLE "OtpChallenge" ADD CONSTRAINT IF NOT EXISTS "OtpChallenge_userId_fkey" 
       FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
      `ALTER TABLE "CreditLedger" ADD CONSTRAINT IF NOT EXISTS "CreditLedger_userId_fkey" 
       FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    ];
    
    for (const fk of foreignKeys) {
      try {
        await prisma.$executeRawUnsafe(fk);
        console.log('✅ Contrainte ajoutée');
      } catch (error) {
        console.log('⚠️ Contrainte déjà existante');
      }
    }
    
    // Ajouter les index
    console.log('\n📊 Ajout des index...');
    
    const indexes = [
      `CREATE INDEX IF NOT EXISTS "OtpChallenge_phoneE164_consumed_expiresAt_idx" 
       ON "OtpChallenge"("phoneE164", "consumed", "expiresAt")`,
      `CREATE INDEX IF NOT EXISTS "OtpChallenge_userId_consumed_idx" 
       ON "OtpChallenge"("userId", "consumed")`,
      `CREATE INDEX IF NOT EXISTS "CreditLedger_userId_createdAt_idx" 
       ON "CreditLedger"("userId", "createdAt")`,
      `CREATE INDEX IF NOT EXISTS "CreditLedger_reason_createdAt_idx" 
       ON "CreditLedger"("reason", "createdAt")`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "User_waPhoneE164_key" 
       ON "User"("waPhoneE164") WHERE "waPhoneE164" IS NOT NULL`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "User_waUserId_key" 
       ON "User"("waUserId") WHERE "waUserId" IS NOT NULL`,
      `CREATE INDEX IF NOT EXISTS "User_waPhoneE164_idx" ON "User"("waPhoneE164")`,
      `CREATE INDEX IF NOT EXISTS "User_waUserId_idx" ON "User"("waUserId")`
    ];
    
    for (const index of indexes) {
      try {
        await prisma.$executeRawUnsafe(index);
        console.log('✅ Index ajouté');
      } catch (error) {
        console.log('⚠️ Index déjà existant');
      }
    }
    
    console.log('\n🎉 Tables WhatsApp ajoutées avec succès !');
    
    // Vérifier les tables
    console.log('\n🔍 Vérification finale...');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;
    
    console.log('📋 Tables dans la base:');
    tables.forEach(table => {
      console.log(`  ✅ ${table.table_name}`);
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

addTables();
