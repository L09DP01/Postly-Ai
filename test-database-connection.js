#!/usr/bin/env node

// Test simple de connexion à la base de données
const { PrismaClient } = require('@prisma/client');

async function testDatabaseConnection() {
  const prisma = new PrismaClient();

  try {
    console.log('🔍 Test de connexion à la base de données...');

    // Test 1: Vérifier si on peut créer un OtpChallenge
    console.log('🧪 Test: Création d\'un OtpChallenge...');
    try {
      const testOtp = await prisma.otpChallenge.create({
        data: {
          phoneE164: '+1234567890',
          codeHash: 'test-hash',
          purpose: 'LOGIN',
          expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        }
      });
      console.log('✅ SUCCÈS: OtpChallenge créé !');
      await prisma.otpChallenge.delete({ where: { id: testOtp.id } });
      
    } catch (error) {
      if (error.message.includes('OtpPurpose')) {
        console.log('❌ PROBLÈME CONFIRMÉ: L\'enum OtpPurpose n\'existe pas');
        console.log('🔧 SOLUTION: Exécuter le SQL sur Supabase pour créer l\'enum');
      } else {
        console.log('❌ AUTRE ERREUR:', error.message);
      }
    }

  } catch (error) {
    console.error('💥 Erreur générale:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseConnection();
