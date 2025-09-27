import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PromptBuilderReqSchema, PromptBuilderResponseSchema } from "@/lib/zod-schemas";
import { PROMPT_TEMPLATES } from "@/lib/ai/prompts";

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

    // Sélectionner le template approprié basé sur platform + objectif
    const selectedTemplate = getPromptTemplate(intent);

    // Remplir les variables dans le template
    const finalPrompt = replaceTemplateVariables(selectedTemplate, intent, brief);

    if (!finalPrompt) {
      throw new Error("Unable to generate prompt template");
    }

    // Valider la réponse avec Zod
    const response = PromptBuilderResponseSchema.parse({
      prompt: finalPrompt.trim(),
      meta: {
        template_id: `${intent.platform || "default"}_${intent.objective || "general"}`,
        version: "1.0",
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
 * Sélectionne le bon template basé sur la plateforme et l'objectif
 */
function getPromptTemplate(intent: any): string {
  const platform = intent.platform?.toLowerCase() || "instagram";
  const objective = intent.objective?.toLowerCase() || "engagement";
  
  // Mapping objective vers les clés de template
  const objectiveMapping: { [key: string]: string } = {
    "promo": "promo",
    "promotion": "promo",
    "fidélisation": "engagement",
    "trafic": "engagement",
    "recrutement": "professional",
    "storytelling": "storytelling",
    "engagement": "engagement",
    "vente": "promo",
    "branding": "storytelling",
    "thought_leadership": "thought_leadership",
    "networking": "networking",
    "viral": "viral",
    "trend": "trend"
  };

  const templateKey = objectiveMapping[objective] || "engagement";

  // Sélectionner le template
  const platformTemplates = PROMPT_TEMPLATES[platform as keyof typeof PROMPT_TEMPLATES];
  if (!platformTemplates) {
    // Fallback sur instagram si plateforme inconnue
    const instagramTemplates = PROMPT_TEMPLATES.instagram as any;
    return instagramTemplates[templateKey] || instagramTemplates.engagement;
  }

  const template = (platformTemplates as any)[templateKey];
  return template || (platformTemplates as any).engagement;
}

/**
 * Remplace les variables placeholder dans le template
 */
function replaceTemplateVariables(template: string, intent: any, brief: string): string {
  const variables = {
    brief: brief,
    language: intent.language || "fr",
    objective: intent.objective || "engagement",
    tone: intent.tone || "décontracté",
    audience: intent.audience || "audience générale",
    platform: intent.platform || "instagram",
    max_hashtags: intent.constraints?.max_hashtags || 3,
    max_chars: intent.constraints?.max_chars || "",
  };

  let processedTemplate = template;

  // Remplacer les variables avec la syntaxe {var}
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = `{${key}}`;
    const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    processedTemplate = processedTemplate.replace(regex, String(value));
  });

  // Nettoyer les placeholders restants
  processedTemplate = processedTemplate.replace(/\{[^}]+\}/g, '');

  return processedTemplate;
}

