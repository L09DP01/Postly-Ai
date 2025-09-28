#!/usr/bin/env node

// Script pour vérifier l'état de la base de données
const { Client } = require('pg');
const fs = require('fs');

async function checkDatabaseStatus() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || process.env.DIRECT_URL
  });

  try {
    console.log('🔗 Connexion à la base de données...');
    await client.connect();
    
    console.log('📖 Lecture du script de vérification...');
    const sqlScript = fs.readFileSync('./check-database-status.sql', 'utf8');
    
    console.log('🔍 Vérification de l\'état de la base de données...\n');
    const result = await client.query(sqlScript);
    
    // Afficher les résultats
    result.forEach((row, index) => {
      if (row.otp_purpose_status) {
        console.log('📋 État de l\'enum OtpPurpose:', row.otp_purpose_status);
      }
      if (row.otp_challenge_status) {
        console.log('📋 État de la table OtpChallenge:', row.otp_challenge_status);
      }
      if (row.credit_ledger_status) {
        console.log('📋 État de la table CreditLedger:', row.credit_ledger_status);
      }
      if (row.wa_phone_status) {
        console.log('📋 État de la colonne waPhoneE164:', row.wa_phone_status);
      }
      if (row.wa_user_id_status) {
        console.log('📋 État de la colonne waUserId:', row.wa_user_id_status);
      }
      if (row.custom_types) {
        console.log('📋 Types personnalisés:', row.custom_types);
      }
      if (row.table_name) {
        console.log('📋 Table:', row.table_name);
      }
    });
    
    console.log('\n✅ Vérification terminée !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.message);
  } finally {
    await client.end();
    console.log('🔌 Connexion fermée.');
  }
}

checkDatabaseStatus();
