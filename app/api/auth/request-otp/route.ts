import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateOtp, hashOtp } from '@/lib/otp';
import { sendWhatsAppMessage, normalizePhone } from '@/lib/wa';

export async function POST(req: NextRequest) {
  try {
    const { phoneE164, purpose, userId } = await req.json();
    
    // Debug: Log des variables d'environnement
    console.log('🔍 Debug OTP API - Variables d\'environnement:');
    console.log('  WHATSAPP_PROVIDER:', process.env.WHATSAPP_PROVIDER || 'NON DÉFINI');
    console.log('  TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID ? 'DÉFINI' : 'NON DÉFINI');
    console.log('  TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN ? 'DÉFINI' : 'NON DÉFINI');
    console.log('  TWILIO_WHATSAPP_FROM:', process.env.TWILIO_WHATSAPP_FROM || 'NON DÉFINI');
    console.log('  OTP_SALT:', process.env.OTP_SALT ? 'DÉFINI' : 'NON DÉFINI');
    
    // Rate limiting basique (à améliorer avec Redis en production)
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    console.log(`OTP request from IP: ${ip}, phone: ${phoneE164}, purpose: ${purpose} - Vercel deployment test`);
    
    // Normaliser numéro (si pas déjà en format E.164)
    const normalizedPhone = normalizePhone(phoneE164);
    
    // Vérifier si un OTP existe déjà non consommé
    const existingOtp = await (prisma as any).otpChallenge.findFirst({
      where: {
        phoneE164: normalizedPhone,
        consumed: false,
        expiresAt: { gt: new Date() }
      }
    });

    if (existingOtp) {
      return NextResponse.json({ 
        error: 'Un code a déjà été envoyé. Attendez 10 minutes.' 
      }, { status: 400 });
    }

    // Générer OTP
    const otp = generateOtp();
    const codeHash = hashOtp(otp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // Sauvegarder OTP
    await (prisma as any).otpChallenge.create({
      data: {
        userId: userId || null,
        phoneE164: normalizedPhone,
        codeHash,
        purpose: purpose || 'LOGIN',
        expiresAt
      }
    });

    // Envoyer OTP via WhatsApp
    const message = `🔐 Votre code de vérification Postly-AI: *${otp}*\n\n⏰ Valide 10 minutes\n🛡️ Ne partagez jamais ce code`;
    
    await sendWhatsAppMessage(normalizedPhone, message);

    console.log(`OTP sent to ${normalizedPhone}: ${otp}`); // Log en développement seulement

    return NextResponse.json({ 
      success: true,
      message: 'Code envoyé par WhatsApp' 
    });

  } catch (error) {
    console.error('OTP request error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
