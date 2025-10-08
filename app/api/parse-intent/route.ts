import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpenAI } from "@/lib/ai/openai";
import { PARSE_INTENT_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { ParseIntentReqSchema, IntentSchema } from "@/lib/zod-schemas";
import { detectLanguageSmart } from "@/lib/detectLanguage";
import { resolveLanguage } from "@/lib/resolveLanguage";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { brief, userLanguage } = ParseIntentReqSchema.parse(body);

    // 1) Détection automatique de la langue
    const detector = await detectLanguageSmart(brief, userLanguage);
    
    // 2) Parsing de l'intent par l'IA
    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: PARSE_INTENT_SYSTEM_PROMPT },
        { role: "user", content: brief },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const rawIntent = completion.choices[0]?.message?.content ?? "{}";
    const parsedIntent = IntentSchema.parse(JSON.parse(rawIntent));

    // 3) Résolution finale de la langue
    const languageResolution = resolveLanguage({
      userChoice: userLanguage,
      parsedLanguage: {
        language: parsedIntent.language,
        confidence: parsedIntent.language_confidence || undefined
      },
      detector
    });

    // 4) Mise à jour de l'intent avec la langue résolue
    const finalIntent = {
      ...parsedIntent,
      language: languageResolution.finalLanguage,
      language_confidence: languageResolution.confidence
    };

    return NextResponse.json({ 
      intent: finalIntent,
      languageResolution: {
        finalLanguage: languageResolution.finalLanguage,
        isRTL: languageResolution.isRTL,
        confidence: languageResolution.confidence,
        method: languageResolution.method
      }
    });
  } catch (error) {
    console.error("Error in /api/parse-intent:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request data", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to parse intent" }, { status: 500 });
  }
}