// Script pour exécuter le SQL d'ajout des tables WhatsApp
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

async function executeSQL() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🚀 Exécution du script SQL pour ajouter les tables WhatsApp...\n');
    
    // Lire le fichier SQL
    const sqlContent = fs.readFileSync('./add-missing-tables.sql', 'utf8');
    
    // Diviser le contenu en requêtes individuelles
    const queries = sqlContent
      .split(';')
      .map(q => q.trim())
      .filter(q => q.length > 0 && !q.startsWith('--'));
    
    console.log(`📝 ${queries.length} requêtes SQL à exécuter...\n`);
    
    // Exécuter chaque requête
    for (let i = 0; i < queries.length; i++) {
      const query = queries[i];
      if (query.trim()) {
        try {
          console.log(`⏳ Exécution requête ${i + 1}/${queries.length}...`);
          await prisma.$executeRawUnsafe(query);
          console.log(`✅ Requête ${i + 1} exécutée avec succès`);
        } catch (error) {
          if (error.message.includes('already exists') || 
              error.message.includes('already exists') ||
              error.message.includes('duplicate key')) {
            console.log(`⚠️ Requête ${i + 1} ignorée (déjà existant)`);
          } else {
            console.error(`❌ Erreur requête ${i + 1}:`, error.message);
          }
        }
      }
    }
    
    console.log('\n🎉 Script SQL exécuté avec succès !');
    
    // Vérifier les tables créées
    console.log('\n🔍 Vérification des tables...');
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

executeSQL();
