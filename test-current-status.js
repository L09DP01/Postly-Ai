#!/usr/bin/env node

// Test pour vérifier l'état actuel de l'API OTP
const testCurrentStatus = async () => {
  const testData = {
    phoneE164: '+50940035664',
    purpose: 'LINK',
    userId: 'test-user-id'
  };

  try {
    console.log('🔍 Test de l\'état actuel de l\'API OTP...');
    console.log('📤 Données envoyées:', testData);

    const response = await fetch('https://postly-ai.vercel.app/api/auth/request-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('📡 Statut de réponse:', response.status);
    console.log('📡 Headers:', Object.fromEntries(response.headers.entries()));

    // Essayer de parser la réponse
    let data;
    try {
      data = await response.json();
      console.log('📊 Données reçues:', data);
    } catch (parseError) {
      const textResponse = await response.text();
      console.log('📊 Réponse textuelle:', textResponse.substring(0, 200));
      console.log('❌ Erreur de parsing JSON:', parseError.message);
    }

    if (response.ok) {
      console.log('🎉 SUCCÈS ! L\'API fonctionne !');
    } else {
      console.log('❌ L\'erreur persiste. Vérifiez les logs Vercel :');
      console.log('   https://vercel.com/dashboard');
      console.log('   → Votre projet → Functions → /api/auth/request-otp');
      console.log('   → Cliquez sur la dernière exécution pour voir les logs détaillés');
    }

  } catch (error) {
    console.error('💥 Erreur lors du test:', error.message);
  }
};

testCurrentStatus();
