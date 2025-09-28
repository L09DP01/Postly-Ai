import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashOtp } from '@/lib/otp';
import { normalizePhone } from '@/lib/wa';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { phone, code } = await req.json();
    
    const phoneE164 = normalizePhone(phone);
    const codeHash = hashOtp(code);

    // Rechercher OTP valide
    const otpChallenge = await prisma.otpChallenge.findFirst({
      where: {
        phoneE164,
        codeHash,
        consumed: false,
        expiresAt: { gt: new Date() }
      },
      include: { user: true }
    });

    if (!otpChallenge) {
      return NextResponse.json({ error: 'Code invalide ou expiré' }, { status: 400 });
    }

    // Marquer OTP comme consommé
    await prisma.otpChallenge.update({
      where: { id: otpChallenge.id },
      data: { consumed: true }
    });

    if (otpChallenge.purpose === 'LOGIN') {
      // Parcours WA-first: créer/lier compte
      let user = otpChallenge.user;
      
      if (!user) {
        // Créer nouvel utilisateur
        user = await prisma.user.create({
          data: {
            waPhoneE164: phoneE164,
            waUserId: phoneE164,
            credits: 5, // Crédits gratuits pour nouveaux utilisateurs
            waLinkedAt: new Date(),
            waPreferredLang: 'fr'
          }
        });
      } else {
        // Lier numéro existant
        await prisma.user.update({
          where: { id: user.id },
          data: {
            waPhoneE164: phoneE164,
            waLinkedAt: new Date()
          }
        });
      }

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          credits: user.credits,
          waPhoneE164: user.waPhoneE164
        },
        redirect: '/dashboard'
      });

    } else if (otpChallenge.purpose === 'LINK') {
      // Parcours Web-first: lier numéro
      if (!otpChallenge.userId) {
        return NextResponse.json({ error: 'Session invalide' }, { status: 400 });
      }

      await prisma.user.update({
        where: { id: otpChallenge.userId },
        data: {
          waPhoneE164: phoneE164,
          waLinkedAt: new Date()
        }
      });

      return NextResponse.json({
        success: true,
        message: 'Numéro WhatsApp lié avec succès'
      });
    }

  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
