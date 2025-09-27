import { NextResponse } from "next/server";
import { GenerationReqSchema, GenerateResponseSchema } from "@/lib/zod-schemas";
import { requireUserWithQuota, incrementUserGeneration } from "@/lib/rate-limit";
import { openai } from "@/lib/ai/openai";
import { GENERATE_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { prisma } from "@/lib/prisma";

/**
 * Divise le texte en 3 variantes
 */
function splitTo3Variants(text: string): string[] {
  // Nettoyer le texte
  const cleanedText = text.trim();
  
  // Essayer de diviser par des patterns de variantes
  const patterns = [
    /Variante\s*\d*\s*[:\.\-]\s*/gi,
    /^\d+[\.\)]\s*/gm,
    /\n\s*\n\s*/g,
  ];
  
  let parts: string[] = [];
  
  for (const pattern of patterns) {
    const split = cleanedText.split(pattern).map(s => s.trim()).filter(Boolean);
    if (split.length >= 3) {
      parts = split.slice(0, 3);
      break;
    }
  }
  
  // Si pas assez de parties, diviser en 3 parts égales
  if (parts.length < 3) {
    const words = cleanedText.split(/\s+/);
    const wordsPerPart = Math.ceil(words.length / 3);
    
    parts = [
      words.slice(0, wordsPerPart).join(" "),
      words.slice(wordsPerPart, wordsPerPart * 2).join(" "),
      words.slice(wordsPerPart * 2).join(" "),
    ];
  }
  
  // Nettoyer et filtrer les variantes vides
  return parts
    .map(variant => variant.trim())
    .filter(variant => variant.length > 0)
    .slice(0, 3);
}

/**
 * Génère des hints SEO basiques
 */
function generateSeoHints(variants: string[]): any {
  const allText = variants.join(" ");
  const words = allText.toLowerCase().match(/\b\w+\b/g) || [];
  
  // Compter la fréquence des mots
  const wordCount: { [key: string]: number } = {};
  words.forEach(word => {
    if (word.length > 3) { // Ignorer les mots trop courts
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  });
  
  // Extraire les mots-clés les plus fréquents
  const keywords = Object.entries(wordCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([word]) => word);
  
  // Extraire les hashtags
  const hashtags = allText.match(/#\w+/g) || [];
  
  return {
    keywords,
    alt_text: variants[0]?.substring(0, 100) || "",
    suggested_hashtags: hashtags.slice(0, 5),
  };
}

export async function POST(req: Request) {
  try {
    // Vérifier l'utilisateur et ses quotas
    const user = await requireUserWithQuota();
    
    // Valider le body de la requête
    const body = await req.json();
    const { prompt, options } = GenerationReqSchema.parse(body);

    // Construire le prompt système avec les contraintes
    const systemPrompt = GENERATE_SYSTEM_PROMPT.replace(
      "{max_hashtags}", 
      String(options?.maxHashtags || 3)
    );

    // Appel à OpenAI pour générer les variantes
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8, // Plus créatif pour la génération
      max_tokens: 500,
    });

    const rawResponse = completion.choices[0]?.message?.content;
    if (!rawResponse) {
      throw new Error("No response from OpenAI");
    }

    // Diviser en 3 variantes
    const variants = splitTo3Variants(rawResponse);

    // Générer les hints SEO si demandé
    const seo = options?.seoBoost ? generateSeoHints(variants) : undefined;

    // Sauvegarder la génération en base
    await prisma.generation.create({
      data: {
        userId: user.id,
        brief: prompt.substring(0, 500), // Limiter la taille
        promptFinal: prompt,
        variants: variants,
        seoData: seo,
        usageTokens: completion.usage?.total_tokens || 0,
        costUsd: completion.usage?.total_tokens ? (completion.usage.total_tokens * 0.000002) : 0, // Estimation
      },
    });

    // Incrémenter le compteur de générations
    await incrementUserGeneration(user.id);

    // Construire la réponse
    const response = GenerateResponseSchema.parse({
      variants,
      seo,
      usage: completion.usage ? {
        prompt_tokens: completion.usage.prompt_tokens || 0,
        completion_tokens: completion.usage.completion_tokens || 0,
        total_tokens: completion.usage.total_tokens || 0,
      } : undefined,
    });

    return NextResponse.json(response);

  } catch (error) {
    console.error("Generate error:", error);
    
    // Si c'est une erreur de quota, la renvoyer telle quelle
    if (error instanceof Response) {
      return error;
    }
    
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