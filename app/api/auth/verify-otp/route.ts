import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashOtp } from '@/lib/otp';
import { normalizePhone } from '@/lib/wa';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { phoneE164, code, purpose } = await req.json();
    
    // Normaliser numéro (si pas déjà en format E.164)
    const normalizedPhone = normalizePhone(phoneE164);
    const codeHash = hashOtp(code);

    // Debug: Log des paramètres reçus
    console.log('🔍 Debug OTP Verify - Paramètres:', {
      phoneE164: normalizedPhone,
      purpose,
      codeLength: code?.length
    });

    // Rechercher OTP valide
    const otpChallenge = await (prisma as any).otpChallenge.findFirst({
      where: {
        phoneE164: normalizedPhone,
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
    await (prisma as any).otpChallenge.update({
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
            waPhoneE164: normalizedPhone,
            waUserId: normalizedPhone,
            credits: 5, // Crédits gratuits pour nouveaux utilisateurs
            waLinkedAt: new Date(),
            waPreferredLang: 'fr'
          } as any
        });
      } else {
        // Lier numéro existant
        await prisma.user.update({
          where: { id: user.id },
          data: {
            waPhoneE164: normalizedPhone,
            waLinkedAt: new Date()
          } as any
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

      // Vérifier si le numéro est déjà utilisé par un autre utilisateur
      const existingUser = await prisma.user.findFirst({
        where: { 
          waPhoneE164: normalizedPhone,
          id: { not: otpChallenge.userId } // Exclure l'utilisateur actuel
        }
      });

      if (existingUser) {
        return NextResponse.json({ 
          error: 'Ce numéro WhatsApp est déjà associé à un autre compte' 
        }, { status: 400 });
      }

      // Vérifier si l'utilisateur actuel a déjà un numéro WhatsApp
      const currentUser = await prisma.user.findUnique({
        where: { id: otpChallenge.userId },
        select: { waPhoneE164: true }
      });

      if (currentUser?.waPhoneE164) {
        return NextResponse.json({ 
          error: 'Votre compte est déjà lié à un numéro WhatsApp' 
        }, { status: 400 });
      }

      await prisma.user.update({
        where: { id: otpChallenge.userId },
        data: {
          waPhoneE164: normalizedPhone,
          waLinkedAt: new Date()
        } as any
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
