#!/usr/bin/env node

// Script pour nettoyer les données de test qui causent des conflits
const { PrismaClient } = require('@prisma/client');

async function cleanupTestData() {
  const prisma = new PrismaClient();

  try {
    console.log('🧹 Nettoyage des données de test...');

    // Supprimer tous les OtpChallenge de test
    const deletedOtp = await prisma.otpChallenge.deleteMany({
      where: {
        OR: [
          { phoneE164: '+1234567890' },
          { phoneE164: '+50940035664' }
        ]
      }
    });
    console.log(`✅ ${deletedOtp.count} OtpChallenge de test supprimés`);

    // Trouver les utilisateurs avec le numéro de test
    const testUsers = await prisma.user.findMany({
      where: {
        waPhoneE164: '+50940035664'
      }
    });

    console.log(`🔍 Trouvé ${testUsers.length} utilisateurs avec le numéro +50940035664`);

    // Supprimer les utilisateurs de test (sauf si c'est un vrai utilisateur)
    for (const user of testUsers) {
      if (user.email?.includes('test') || !user.email) {
        console.log(`🗑️ Suppression de l'utilisateur de test: ${user.id}`);
        await prisma.user.delete({
          where: { id: user.id }
        });
      } else {
        console.log(`⚠️ Garde l'utilisateur réel: ${user.email} (${user.id})`);
      }
    }

    console.log('✅ Nettoyage terminé !');

  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupTestData();
