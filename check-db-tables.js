// Script pour vérifier les tables existantes dans la base de données
const { PrismaClient } = require('@prisma/client');

async function checkTables() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Vérification des tables dans la base de données...\n');
    
    // Vérifier les tables existantes
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;
    
    console.log('📋 Tables existantes:');
    tables.forEach(table => {
      console.log(`  ✅ ${table.table_name}`);
    });
    
    // Tables attendues selon le schéma Prisma
    const expectedTables = [
      'User',
      'Generation', 
      'Subscription',
      'UserQuota',
      'OtpChallenge',
      'CreditLedger',
      '_prisma_migrations'
    ];
    
    console.log('\n🎯 Tables attendues:');
    expectedTables.forEach(table => {
      const exists = tables.some(t => t.table_name === table);
      console.log(`  ${exists ? '✅' : '❌'} ${table}`);
    });
    
    // Tables manquantes
    const missingTables = expectedTables.filter(table => 
      !tables.some(t => t.table_name === table)
    );
    
    if (missingTables.length > 0) {
      console.log('\n❌ Tables manquantes:');
      missingTables.forEach(table => {
        console.log(`  - ${table}`);
      });
    } else {
      console.log('\n✅ Toutes les tables sont présentes !');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkTables();
