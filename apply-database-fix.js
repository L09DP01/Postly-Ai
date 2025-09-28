#!/usr/bin/env node

// Script pour appliquer les corrections de base de données
const { Client } = require('pg');
const fs = require('fs');

async function applyDatabaseFix() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || process.env.DIRECT_URL
  });

  try {
    console.log('🔗 Connexion à la base de données...');
    await client.connect();
    
    console.log('📖 Lecture du script SQL...');
    const sqlScript = fs.readFileSync('./fix-database-schema.sql', 'utf8');
    
    console.log('🚀 Exécution du script SQL...');
    const result = await client.query(sqlScript);
    
    console.log('✅ Script exécuté avec succès !');
    console.log('📊 Résultat:', result);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution:', error.message);
  } finally {
    await client.end();
    console.log('🔌 Connexion fermée.');
  }
}

applyDatabaseFix();
