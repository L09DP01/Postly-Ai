#!/usr/bin/env node

// Test de l'endpoint de vérification OTP
const testVerifyOTP = async () => {
  const testData = {
    phoneE164: '+50940035664',
    code: '123456', // Code de test
    purpose: 'LINK'
  };

  try {
    console.log('🧪 Test de l\'API verify-otp...');
    console.log('📤 Données envoyées:', testData);

    const response = await fetch('https://postly-ai.vercel.app/api/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('📡 Statut de réponse:', response.status);
    const data = await response.json();
    console.log('📊 Données reçues:', data);

    if (response.ok) {
      console.log('✅ Test réussi !');
    } else {
      console.log('❌ Test échoué:', data.error);
      
      if (response.status === 500) {
        console.log('\n🔍 Pour voir les logs détaillés, allez sur Vercel Dashboard');
        console.log('   → Functions → /api/auth/verify-otp → Dernière exécution');
      }
    }

  } catch (error) {
    console.error('💥 Erreur lors du test:', error.message);
  }
};

testVerifyOTP();
