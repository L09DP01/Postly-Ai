import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyTwilioSignature, verifyMetaSignature, sendWhatsAppMessage, normalizePhone } from '@/lib/wa';
import { requireCredits, decrementWithLedgerTX } from '@/lib/credits';
import { detectLanguageSmart } from '@/lib/detectLanguage';
import { openai } from '@/lib/ai/openai';
import { PARSE_INTENT_SYSTEM_PROMPT, PROMPT_BUILDER_SYSTEM_PROMPT, GENERATE_SYSTEM_PROMPT } from '@/lib/ai/prompts';

export async function POST(req: NextRequest) {
  try {
    const provider = process.env.WHATSAPP_PROVIDER || 'twilio';
    
    // Vérification signature (optionnel en développement)
    if (process.env.NODE_ENV === 'production') {
      if (provider === 'twilio') {
        const isValid = await verifyTwilioSignature(req);
        if (!isValid) {
          return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }
      } else {
        const isValid = await verifyMetaSignature(req);
        if (!isValid) {
          return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }
      }
    }

    // Parser le body selon le content-type
    let body;
    const contentType = req.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      body = await req.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData();
      body = Object.fromEntries(formData.entries());
    } else {
      return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
    }
    
    const { message, from, to } = provider === 'twilio' 
      ? parseTwilioWebhook(body)
      : parseMetaWebhook(body);

    if (!message || !from) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Normaliser numéro E.164
    const phoneE164 = normalizePhone(from);
    
    // Rechercher utilisateur
    let user = await prisma.user.findFirst({
      where: { waPhoneE164: phoneE164 } as any
    });

    // Si pas d'utilisateur, créer un compte temporaire avec 10 crédits gratuits
    let isNewUser = false;
    if (!user) {
      isNewUser = true;
      user = await prisma.user.create({
        data: {
          waPhoneE164: phoneE164,
          waUserId: phoneE164, // ID temporaire
          credits: 10, // 10 crédits gratuits comme sur le site web
          waPreferredLang: 'fr'
        } as any
      });
      
      // Enregistrer l'attribution des crédits gratuits dans le ledger
      await (prisma as any).creditLedger.create({
        data: {
          userId: user.id,
          delta: 10,
          reason: 'whatsapp_signup_bonus'
        }
      });
      
      // Envoyer message de bienvenue
      const welcomeMessage = `🎉 *Bienvenue sur Postly-AI !*

✅ Votre compte WhatsApp a été créé avec succès !
🎁 Vous recevez *10 générations gratuites* pour commencer

*Pour commencer, tapez:*
• *HELP* - Voir toutes les commandes
• *GEN [votre demande]* - Générer un post
• *BALANCE* - Voir vos crédits

*Exemple:*
GEN Crée un post Instagram pour promouvoir ma nouvelle boutique

💡 Postly-AI génère des posts optimisés pour tous vos réseaux sociaux !`;
      
      await sendWhatsAppMessage(phoneE164, welcomeMessage);
      return NextResponse.json({ success: true });
    }

    // Router les commandes
    const command = message.toLowerCase().trim();
    
    switch (command) {
      case 'help':
        return handleHelp(phoneE164);
      
      case 'balance':
        return handleBalance(user, phoneE164);
      
      case 'lang':
        return handleLanguage(phoneE164);
      
      case command.match(/^gen\s+(.+)$/)?.input:
        const brief = command.replace(/^gen\s+/, '');
        return handleGeneration(user, brief, phoneE164);
      
      case 'login':
        return handleLoginRequest(phoneE164);
      
      default:
        // Traitement comme génération de post
        return handleGeneration(user, message, phoneE164);
    }

  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleHelp(phoneE164: string) {
  const helpMessage = `🤖 *Postly-AI - Aide*

🎉 *Bienvenue ! Vous avez 10 générations gratuites*

*Commandes disponibles:*
• *HELP* - Afficher cette aide
• *BALANCE* - Voir vos crédits restants
• *LOGIN* - Lier votre compte web
• *GEN [votre texte]* - Générer des posts
• *LANG* - Changer la langue

*Exemple:*
GEN Crée un post promo pour Instagram sur ma nouvelle collection de vêtements

💡 Tapez simplement votre demande de post pour une génération automatique !
🆓 10 générations gratuites incluses avec votre compte WhatsApp`;

  await sendWhatsAppMessage(phoneE164, helpMessage);
  return NextResponse.json({ success: true });
}

async function handleBalance(user: any, phoneE164: string) {
  const balanceMessage = `💳 *Vos crédits Postly-AI*

📊 Crédits disponibles: *${user.credits}*
📱 Compte WhatsApp lié: ${user.email ? '✅ Oui' : '❌ Non'}

${user.credits === 0 ? '⚠️ Aucun crédit disponible. Visitez le site web pour recharger.' : '✨ Prêt à générer des posts !'}`;

  await sendWhatsAppMessage(phoneE164, balanceMessage);
  return NextResponse.json({ success: true });
}

async function handleLanguage(phoneE164: string) {
  const langMessage = `🌍 *Langue de génération*

Langues supportées:
• 🇫🇷 Français (par défaut)
• 🇺🇸 English
• 🇪🇸 Español

La langue est détectée automatiquement selon votre message.

💡 Tapez votre message dans la langue souhaitée pour générer des posts dans cette langue.`;

  await sendWhatsAppMessage(phoneE164, langMessage);
  return NextResponse.json({ success: true });
}

async function handleLoginRequest(phoneE164: string) {
  const loginMessage = `🔐 *Liaison de compte*

Pour lier votre compte WhatsApp à votre compte web:

1️⃣ Visitez: https://postly-ai.vercel.app/auth/login
2️⃣ Cliquez sur "Lier WhatsApp"
3️⃣ Entrez votre numéro: ${phoneE164}
4️⃣ Vous recevrez un code de vérification

✨ Une fois lié, vos crédits seront synchronisés entre web et WhatsApp !`;

  await sendWhatsAppMessage(phoneE164, loginMessage);
  return NextResponse.json({ success: true });
}

async function handleGeneration(user: any, brief: string, phoneE164: string) {
  try {
    // Vérifier crédits
    if (!await requireCredits(user.id, 1)) {
      await sendWhatsAppMessage(phoneE164, 
        "❌ Crédits insuffisants. Visitez le site web pour recharger vos crédits."
      );
      return NextResponse.json({ success: true });
    }

    // Pipeline IA
    const detector = await detectLanguageSmart(brief);
    
    // 1. Parse intent
    const parseResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: PARSE_INTENT_SYSTEM_PROMPT },
        { role: "user", content: brief }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const intent = JSON.parse(parseResponse.choices[0]?.message?.content || '{}');
    
    // 2. Prompt builder
    const promptResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: PROMPT_BUILDER_SYSTEM_PROMPT(detector.language || 'en') },
        { role: "user", content: `BRIEF: "${brief}"\nINTENT: ${JSON.stringify(intent)}` }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const prompt = promptResponse.choices[0]?.message?.content || '';

    // 3. Generate
    const generateResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: GENERATE_SYSTEM_PROMPT(detector.language || 'en') },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const content = generateResponse.choices[0]?.message?.content || '';
    const variants = splitTo3Variants(content);

    // Décrémenter crédit en transaction
    await decrementWithLedgerTX(user.id, 1, 'whatsapp_generation');

    // Envoyer réponse
    const response = `✨ *3 Posts générés pour vous:*\n\n${variants.map((v, i) => 
      `*${i + 1}.* ${v}\n`
    ).join('\n')}💳 Crédits restants: ${user.credits - 1}`;

    await sendWhatsAppMessage(phoneE164, response);

    // Sauvegarder génération
    await prisma.generation.create({
      data: {
        userId: user.id,
        brief,
        platform: intent.platform,
        industry: intent.industry,
        objective: intent.objective,
        tone: intent.tone,
        language: detector.language || 'en',
        promptFinal: prompt,
        variants,
        usageTokens: generateResponse.usage?.total_tokens || 0
      }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Generation error:', error);
    await sendWhatsAppMessage(phoneE164, 
      "❌ Erreur lors de la génération. Réessayez plus tard."
    );
    return NextResponse.json({ success: true });
  }
}

function splitTo3Variants(content: string): string[] {
  // Logique pour diviser le contenu en 3 variantes
  const lines = content.split('\n').filter(line => line.trim());
  const variants: string[] = [];
  let current = '';
  
  for (const line of lines) {
    if (line.match(/^\d+\./) || line.match(/^var/i) || line.match(/^variant/i)) {
      if (current) variants.push(current.trim());
      current = line.replace(/^\d+\.\s*/, '').replace(/^var\w*\s*:?\s*/i, '');
    } else {
      current += (current ? ' ' : '') + line;
    }
  }
  
  if (current) variants.push(current.trim());
  
  // S'assurer d'avoir exactement 3 variantes
  while (variants.length < 3) {
    variants.push(variants[0] || 'Post généré');
  }
  
  return variants.slice(0, 3);
}

function parseTwilioWebhook(body: any) {
  return {
    message: body.Body,
    from: body.From,
    to: body.To
  };
}

function parseMetaWebhook(body: any) {
  const entry = body.entry?.[0];
  const changes = entry?.changes?.[0];
  const value = changes?.value;
  const messages = value?.messages?.[0];
  
  return {
    message: messages?.text?.body,
    from: messages?.from,
    to: value?.metadata?.phone_number_id
  };
}
