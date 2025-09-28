#!/usr/bin/env node

// Test de l'API OTP sur Vercel après configuration des variables
const testOTPAPI = async () => {
  const testData = {
    phoneE164: '+50940035664',
    purpose: 'LINK',
    userId: 'test-user-id'
  };

  try {
    console.log('🧪 Test de l\'API OTP sur Vercel...');
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

    const data = await response.json();
    console.log('📊 Données reçues:', data);

    if (response.ok) {
      console.log('✅ Test réussi ! L\'API fonctionne correctement.');
    } else {
      console.log('❌ Test échoué:', data.error);
      
      // Si c'est encore une erreur 500, vérifions d'autres endpoints
      if (response.status === 500) {
        console.log('\n🔍 Test d\'autres endpoints pour diagnostic...');
        
        // Test de l'endpoint de profil utilisateur
        try {
          const profileResponse = await fetch('https://postly-ai.vercel.app/api/user/profile');
          console.log('📊 Profil API Status:', profileResponse.status);
        } catch (error) {
          console.log('❌ Profil API Error:', error.message);
        }
        
        // Test du webhook WhatsApp
        try {
          const webhookResponse = await fetch('https://postly-ai.vercel.app/api/whatsapp/webhook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ test: 'data' })
          });
          console.log('📊 Webhook API Status:', webhookResponse.status);
        } catch (error) {
          console.log('❌ Webhook API Error:', error.message);
        }
      }
    }

  } catch (error) {
    console.error('💥 Erreur lors du test:', error.message);
  }
};

testOTPAPI();
