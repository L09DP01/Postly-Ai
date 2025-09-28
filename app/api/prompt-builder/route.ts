import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PromptBuilderReqSchema, PromptBuilderResponseSchema } from "@/lib/zod-schemas";
import { PROMPT_BUILDER_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { openai } from "@/lib/ai/openai";
import { detectLanguageSmart } from "@/lib/detectLanguage";
import { resolveLanguage } from "@/lib/resolveLanguage";

export async function POST(req: Request) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Valider le body de la requête
    const body = await req.json();
    const { intent, brief, description, userLanguage } = PromptBuilderReqSchema.parse(body);

    // 1) Détecter la langue à partir de la description ou du brief
    const textToAnalyze = description || brief;
    const detector = await detectLanguageSmart(textToAnalyze, userLanguage);
    
    // 2) Résolution finale de la langue
    const languageResolution = resolveLanguage({
      userChoice: userLanguage,
      parsedLanguage: {
        language: intent.language || null,
        confidence: intent.language_confidence || undefined
      },
      detector
    });

    const finalLanguage = languageResolution.finalLanguage;

    // 3) Construire le prompt système avec la langue détectée
    const systemPrompt = PROMPT_BUILDER_SYSTEM_PROMPT(finalLanguage);

    // 4) Construire le contexte pour le Prompt Builder avec la langue résolue
    const contextPrompt = buildContextPrompt(intent, brief, finalLanguage);

    // Appeler GPT avec PROMPT_BUILDER_SYSTEM_PROMPT
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: contextPrompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const finalPrompt = completion.choices[0]?.message?.content?.trim();

    if (!finalPrompt) {
      throw new Error("Unable to generate prompt");
    }

    // Mettre à jour l'intent avec la langue résolue
    const updatedIntent = {
      ...intent,
      language: finalLanguage,
      language_confidence: languageResolution.confidence
    };

    // Valider la réponse avec Zod
    const response = PromptBuilderResponseSchema.parse({
      prompt: finalPrompt,
      meta: {
        template_id: `${intent.platform || "default"}_${intent.objective || "general"}`,
        version: "2.0",
      },
      intent: updatedIntent,
    });

    return NextResponse.json({
      ...response,
      languageResolution: {
        finalLanguage: languageResolution.finalLanguage,
        isRTL: languageResolution.isRTL,
        confidence: languageResolution.confidence,
        method: languageResolution.method
      }
    });

  } catch (error) {
    console.error("Prompt builder error:", error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Construit le contexte complet pour le Prompt Builder adapté à la langue
 */
function buildContextPrompt(intent: any, brief: string, language: string = "fr"): string {
  const context = [];
  const lang = language || 'fr';
  
  // Labels multilingues
  const labels = {
    fr: {
      briefLabel: "BRIEF UTILISATEUR:",
      intentLabel: "INTENTION ANALYSÉE:",
      platform: "Plateforme:",
      sector: "Secteur:",
      objective: "Objectif:",
      tone: "Ton:",
      language: "Langue:",
      audience: "Audience:",
      constraints: "CONTRAINTES:",
      maxHashtags: "Maximum hashtags:",
      emojisAllowed: "Emojis autorisés:",
      charLimit: "Limite caractères:",
      yes: "Oui",
      no: "Non",
      instruction: "CONSTRUIRE UN PROMPT OPTIMISÉ pour le générateur final qui devra créer 3 variantes complètes et engageantes."
    },
    en: {
      briefLabel: "USER BRIEF:",
      intentLabel: "ANALYZED INTENTION:",
      platform: "Platform:",
      sector: "Industry:",
      objective: "Objective:",
      tone: "Tone:",
      language: "Language:",
      audience: "Audience:",
      constraints: "CONSTRAINTS:",
      maxHashtags: "Maximum hashtags:",
      emojisAllowed: "Emojis allowed:",
      charLimit: "Character limit:",
      yes: "Yes",
      no: "No",
      instruction: "BUILD AN OPTIMIZED PROMPT for the final generator that will create 3 complete and engaging variants."
    },
    es: {
      briefLabel: "BRIEF DEL USUARIO:",
      intentLabel: "INTENCIÓN ANALIZADA:",
      platform: "Plataforma:",
      sector: "Sector:",
      objective: "Objetivo:",
      tone: "Tono:",
      language: "Idioma:",
      audience: "Audiencia:",
      constraints: "RESTRICCIONES:",
      maxHashtags: "Máximo hashtags:",
      emojisAllowed: "Emojis permitidos:",
      charLimit: "Límite de caracteres:",
      yes: "Sí",
      no: "No",
      instruction: "CONSTRUIR UN PROMPT OPTIMIZADO para el generador final que creará 3 variantes completas y atractivas."
    }
  };
  
  const l = labels[lang as keyof typeof labels] || labels.fr;
  
  context.push(`${l.briefLabel} "${brief}"`);
  context.push(`\n${l.intentLabel}`);
  
  if (intent.platform) context.push(`- ${l.platform} ${intent.platform}`);
  if (intent.industry) context.push(`- ${l.sector} ${intent.industry}`);
  if (intent.objective) context.push(`- ${l.objective} ${intent.objective}`);
  if (intent.tone) context.push(`- ${l.tone} ${intent.tone}`);
  if (intent.language) context.push(`- ${l.language} ${intent.language}`);
  if (intent.audience) context.push(`- ${l.audience} ${intent.audience}`);
  
  if (intent.constraints) {
    context.push(`\n${l.constraints}`);
    if (intent.constraints.max_hashtags) {
      context.push(`- ${l.maxHashtags} ${intent.constraints.max_hashtags}`);
    }
    if (intent.constraints.emoji_ok !== undefined) {
      context.push(`- ${l.emojisAllowed} ${intent.constraints.emoji_ok ? l.yes : l.no}`);
    }
    if (intent.constraints.max_chars) {
      context.push(`- ${l.charLimit} ${intent.constraints.max_chars}`);
    }
  }
  
  context.push(`\n${l.instruction}`);
  
  return context.join('\n');
}

