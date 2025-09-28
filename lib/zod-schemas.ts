import { z } from "zod";

// Schéma pour les contraintes de génération
export const ConstraintsSchema = z.object({
  max_hashtags: z.number().min(0).max(5).default(3),
  emoji_ok: z.boolean().default(true),
  max_chars: z.number().nullable().optional(),
});

// Schéma pour l'intent parsé
export const IntentSchema = z.object({
  platform: z.enum(["instagram", "facebook", "tiktok", "linkedin", "x"]).nullable().optional(),
  industry: z.enum([
    "restaurant", "beauté", "éducation", "e-commerce", "santé", 
    "technologie", "mode", "sport", "voyage", "immobilier", 
    "finance", "autre"
  ]).nullable().optional(),
  objective: z.enum([
    "promo", "fidélisation", "trafic", "recrutement", 
    "storytelling", "engagement", "vente", "branding"
  ]).nullable().optional(),
  tone: z.enum([
    "professionnel", "décontracté", "vendeur", "inspirant", 
    "humoristique", "chaleureux", "urgent", "confiant"
  ]).nullable().optional(),
  language: z.string().nullable().optional(), // Code BCP-47 (ex: "fr", "en", "pt-BR", "ar")
  language_confidence: z.number().min(0).max(1).nullable().optional(), // Confiance 0-1
  audience: z.string().nullable().optional(),
  constraints: ConstraintsSchema.optional().nullable(),
});

// Schéma pour la requête de parsing d'intent
export const ParseIntentReqSchema = z.object({
  brief: z.string().min(3, "Le brief doit contenir au moins 3 caractères"),
  userLanguage: z.string().optional(), // Langue choisie par l'utilisateur ("auto" ou code BCP-47)
});

// Schéma pour la requête du prompt builder
export const PromptBuilderReqSchema = z.object({
  intent: IntentSchema,
  brief: z.string().min(3, "Le brief doit contenir au moins 3 caractères"),
  description: z.string().optional(), // Description du prompt builder
  userLanguage: z.string().optional(), // Langue choisie par l'utilisateur
});

// Schéma pour la requête de génération
export const GenerationReqSchema = z.object({
  prompt: z.string().min(10, "Le prompt doit contenir au moins 10 caractères"),
  options: z.object({
    seoBoost: z.boolean().optional().default(false),
    maxHashtags: z.number().min(0).max(5).default(3),
  }).optional(),
});

// Schéma pour les options SEO
export const SeoDataSchema = z.object({
  keywords: z.array(z.string()),
  alt_text: z.string(),
  suggested_hashtags: z.array(z.string()),
});

// Schéma pour les données de génération
export const GenerationDataSchema = z.object({
  brief: z.string(),
  platform: z.string().optional(),
  industry: z.string().optional(),
  objective: z.string().optional(),
  tone: z.string().optional(),
  language: z.string().default("en"), // Code BCP-47 avec fallback "en"
  audience: z.string().optional(),
  prompt_final: z.string(),
  variants: z.array(z.string()).length(3),
  seo_data: SeoDataSchema.optional(),
  usage_tokens: z.number().optional(),
  cost_usd: z.number().optional(),
});

// Schémas pour les réponses API
export const ParseIntentResponseSchema = z.object({
  intent: IntentSchema,
});

export const PromptBuilderResponseSchema = z.object({
  prompt: z.string(),
  meta: z.object({
    template_id: z.string().optional(),
    version: z.string().default("1.0"),
  }),
  intent: IntentSchema,
});

export const GenerateResponseSchema = z.object({
  variants: z.array(z.string()).length(3),
  seo: SeoDataSchema.optional(),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number(),
  }).optional(),
});

// Types TypeScript dérivés
export type Intent = z.infer<typeof IntentSchema>;
export type Constraints = z.infer<typeof ConstraintsSchema>;
export type ParseIntentRequest = z.infer<typeof ParseIntentReqSchema>;
export type PromptBuilderRequest = z.infer<typeof PromptBuilderReqSchema>;
export type GenerationRequest = z.infer<typeof GenerationReqSchema>;
export type SeoData = z.infer<typeof SeoDataSchema>;
export type GenerationData = z.infer<typeof GenerationDataSchema>;
export type ParseIntentResponse = z.infer<typeof ParseIntentResponseSchema>;
export type PromptBuilderResponse = z.infer<typeof PromptBuilderResponseSchema>;
export type GenerateResponse = z.infer<typeof GenerateResponseSchema>;
