// Script pour vérifier les colonnes de la table User
const { PrismaClient } = require('@prisma/client');

async function checkUserColumns() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Vérification des colonnes de la table User...\n');
    
    // Vérifier les colonnes existantes
    const columns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'User' 
      AND table_schema = 'public'
      ORDER BY ordinal_position;
    `;
    
    console.log('📋 Colonnes de la table User:');
    columns.forEach(col => {
      console.log(`  ✅ ${col.column_name} (${col.data_type}) - Nullable: ${col.is_nullable} - Default: ${col.column_default || 'NULL'}`);
    });
    
    // Colonnes WhatsApp attendues
    const expectedColumns = [
      'waPhoneE164',
      'waUserId', 
      'waLinkedAt',
      'waPreferredLang',
      'credits',
      'updatedAt'
    ];
    
    console.log('\n🎯 Colonnes WhatsApp attendues:');
    expectedColumns.forEach(col => {
      const exists = columns.some(c => c.column_name === col);
      console.log(`  ${exists ? '✅' : '❌'} ${col}`);
    });
    
    // Colonnes manquantes
    const missingColumns = expectedColumns.filter(col => 
      !columns.some(c => c.column_name === col)
    );
    
    if (missingColumns.length > 0) {
      console.log('\n❌ Colonnes manquantes:');
      missingColumns.forEach(col => {
        console.log(`  - ${col}`);
      });
    } else {
      console.log('\n✅ Toutes les colonnes WhatsApp sont présentes !');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkUserColumns();
