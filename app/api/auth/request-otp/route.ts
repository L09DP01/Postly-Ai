import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateOtp, hashOtp } from '@/lib/otp';
import { sendWhatsAppMessage, normalizePhone } from '@/lib/wa';

export async function POST(req: NextRequest) {
  try {
    const { userId, phone } = await req.json();
    
    // Rate limiting basique (à améliorer avec Redis en production)
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
    console.log(`OTP request from IP: ${ip}`);
    
    // Normaliser numéro
    const phoneE164 = normalizePhone(phone);
    
    // Vérifier si un OTP existe déjà non consommé
    const existingOtp = await prisma.otpChallenge.findFirst({
      where: {
        phoneE164,
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
    await prisma.otpChallenge.create({
      data: {
        userId,
        phoneE164,
        codeHash,
        purpose: userId ? 'LINK' : 'LOGIN',
        expiresAt
      }
    });

    // Envoyer OTP via WhatsApp
    const message = `🔐 Votre code de vérification Postly-AI: *${otp}*\n\n⏰ Valide 10 minutes\n🛡️ Ne partagez jamais ce code`;
    
    await sendWhatsAppMessage(phoneE164, message);

    console.log(`OTP sent to ${phoneE164}: ${otp}`); // Log en développement seulement

    return NextResponse.json({ 
      success: true,
      message: 'Code envoyé par WhatsApp' 
    });

  } catch (error) {
    console.error('OTP request error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
