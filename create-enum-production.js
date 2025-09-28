#!/usr/bin/env node

// Script pour créer l'enum OtpPurpose sur la base de production
const { PrismaClient } = require('@prisma/client');

async function createEnumProduction() {
  // Utiliser l'URL de production depuis les variables d'environnement
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL || process.env.DIRECT_URL
      }
    }
  });

  try {
    console.log('🚀 Création de l\'enum OtpPurpose sur la base de production...');

    // Exécuter le SQL directement
    const result = await prisma.$executeRaw`
      DO $$ BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'OtpPurpose') THEN
              CREATE TYPE "OtpPurpose" AS ENUM ('LOGIN', 'LINK', 'SIGNUP');
              RAISE NOTICE 'Enum OtpPurpose créé avec succès';
          ELSE
              RAISE NOTICE 'Enum OtpPurpose existe déjà';
          END IF;
      END $$;
    `;

    console.log('✅ SQL exécuté avec succès !');

    // Vérification
    const checkResult = await prisma.$queryRaw`
      SELECT 
          CASE 
              WHEN EXISTS (SELECT 1 FROM pg_type WHERE typname = 'OtpPurpose') 
              THEN 'Enum OtpPurpose créé avec succès' 
              ELSE 'Échec de la création de l''enum OtpPurpose' 
          END as result;
    `;

    console.log('📊 Résultat:', checkResult[0].result);

    // Test final
    console.log('\n🧪 Test final: Création d\'un OtpChallenge...');
    try {
      const testOtp = await prisma.otpChallenge.create({
        data: {
          phoneE164: '+1234567890',
          codeHash: 'test-hash',
          purpose: 'LOGIN',
          expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        }
      });
      console.log('🎉 SUCCÈS TOTAL ! L\'enum fonctionne !');
      
      // Nettoyer
      await prisma.otpChallenge.delete({ where: { id: testOtp.id } });
      console.log('🧹 Test nettoyé');
      
    } catch (error) {
      console.log('❌ Test échoué:', error.message);
    }

  } catch (error) {
    console.error('❌ Erreur lors de la création:', error.message);
  } finally {
    await prisma.$disconnect();
    console.log('🔌 Connexion fermée.');
  }
}

createEnumProduction();
