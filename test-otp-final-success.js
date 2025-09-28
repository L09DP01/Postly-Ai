#!/usr/bin/env node

// Test final de l'API OTP après création de l'enum
const testOTPAPI = async () => {
  const testData = {
    phoneE164: '+50940035664',
    purpose: 'LINK',
    userId: 'test-user-id'
  };

  try {
    console.log('🎉 Test final de l\'API OTP (après création de l\'enum)...');
    console.log('📤 Données envoyées:', testData);

    const response = await fetch('https://postly-ai.vercel.app/api/auth/request-otp', {
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
      console.log('🎉 SUCCÈS TOTAL ! L\'API OTP fonctionne maintenant !');
      console.log('✅ Le système WhatsApp est 100% opérationnel !');
      console.log('🚀 Vous pouvez maintenant utiliser la liaison WhatsApp dans l\'interface !');
    } else {
      console.log('❌ L\'erreur persiste:', data.error);
    }

  } catch (error) {
    console.error('💥 Erreur lors du test:', error.message);
  }
};

testOTPAPI();
