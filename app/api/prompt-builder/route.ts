import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PromptBuilderReqSchema, PromptBuilderResponseSchema } from "@/lib/zod-schemas";
import { PROMPT_BUILDER_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { openai } from "@/lib/ai/openai";

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
    const { intent, brief } = PromptBuilderReqSchema.parse(body);

    // Construire le contexte pour le Prompt Builder
    const contextPrompt = buildContextPrompt(intent, brief);

    // Appeler GPT avec PROMPT_BUILDER_SYSTEM_PROMPT
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: PROMPT_BUILDER_SYSTEM_PROMPT },
        { role: "user", content: contextPrompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const finalPrompt = completion.choices[0]?.message?.content?.trim();

    if (!finalPrompt) {
      throw new Error("Unable to generate prompt");
    }

    // Valider la réponse avec Zod
    const response = PromptBuilderResponseSchema.parse({
      prompt: finalPrompt,
      meta: {
        template_id: `${intent.platform || "default"}_${intent.objective || "general"}`,
        version: "2.0",
      },
      intent,
    });

    return NextResponse.json(response);

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
 * Construit le contexte complet pour le Prompt Builder
 */
function buildContextPrompt(intent: any, brief: string): string {
  const context = [];
  
  context.push(`BRIEF UTILISATEUR: "${brief}"`);
  context.push(`\nINTENTION ANALYSÉE:`);
  
  if (intent.platform) context.push(`- Plateforme: ${intent.platform}`);
  if (intent.industry) context.push(`- Secteur: ${intent.industry}`);
  if (intent.objective) context.push(`- Objectif: ${intent.objective}`);
  if (intent.tone) context.push(`- Ton: ${intent.tone}`);
  if (intent.language) context.push(`- Langue: ${intent.language}`);
  if (intent.audience) context.push(`- Audience: ${intent.audience}`);
  
  if (intent.constraints) {
    context.push(`\nCONTRAINTES:`);
    if (intent.constraints.max_hashtags) {
      context.push(`- Maximum hashtags: ${intent.constraints.max_hashtags}`);
    }
    if (intent.constraints.emoji_ok !== undefined) {
      context.push(`- Emojis autorisés: ${intent.constraints.emoji_ok ? "Oui" : "Non"}`);
    }
    if (intent.constraints.max_chars) {
      context.push(`- Limite caractères: ${intent.constraints.max_chars}`);
    }
  }
  
  context.push(`\nCONSTRUIRE UN PROMPT OPTIMISÉ pour le générateur final qui devra créer 3 variantes complètes et engageantes.`);
  
  return context.join('\n');
}

