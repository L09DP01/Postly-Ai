import { z } from &quot;zod&quot;;

// Schéma pour les contraintes de génération
export const ConstraintsSchema = z.object({
  max_hashtags: z.number().min(0).max(5).default(3),
  emoji_ok: z.boolean().default(true),
  max_chars: z.number().optional(),
});

// Schéma pour l'intent parsé
export const IntentSchema = z.object({
  platform: z.enum([&quot;instagram&quot;, &quot;facebook&quot;, &quot;tiktok&quot;, &quot;linkedin&quot;, &quot;x&quot;]).optional(),
  industry: z.enum([
    &quot;restaurant&quot;, &quot;beauté&quot;, &quot;éducation&quot;, &quot;e-commerce&quot;, &quot;santé&quot;, 
    &quot;technologie&quot;, &quot;mode&quot;, &quot;sport&quot;, &quot;voyage&quot;, &quot;immobilier&quot;, 
    &quot;finance&quot;, &quot;autre&quot;
  ]).optional(),
  objective: z.enum([
    &quot;promo&quot;, &quot;fidélisation&quot;, &quot;trafic&quot;, &quot;recrutement&quot;, 
    &quot;storytelling&quot;, &quot;engagement&quot;, &quot;vente&quot;, &quot;branding&quot;
  ]).optional(),
  tone: z.enum([
    &quot;professionnel&quot;, &quot;décontracté&quot;, &quot;vendeur&quot;, &quot;inspirant&quot;, 
    &quot;humoristique&quot;, &quot;chaleureux&quot;, &quot;urgent&quot;, &quot;confiant&quot;
  ]).optional(),
  language: z.enum([&quot;fr&quot;, &quot;en&quot;, &quot;es&quot;, &quot;it&quot;]).default(&quot;fr&quot;),
  audience: z.string().optional(),
  constraints: ConstraintsSchema.optional(),
});

// Schéma pour la requête de parsing d'intent
export const ParseIntentReqSchema = z.object({
  brief: z.string().min(3, &quot;Le brief doit contenir au moins 3 caractères&quot;),
});

// Schéma pour la requête du prompt builder
export const PromptBuilderReqSchema = z.object({
  intent: IntentSchema,
  brief: z.string().min(3, &quot;Le brief doit contenir au moins 3 caractères&quot;),
});

// Schéma pour la requête de génération
export const GenerationReqSchema = z.object({
  prompt: z.string().min(10, &quot;Le prompt doit contenir au moins 10 caractères&quot;),
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
  language: z.string().default(&quot;fr&quot;),
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
    version: z.string().default(&quot;1.0&quot;),
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
