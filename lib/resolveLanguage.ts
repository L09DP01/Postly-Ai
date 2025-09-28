import type { LangGuess } from "./detectLanguage";

export interface LanguageResolution {
  finalLanguage: string;
  isRTL: boolean;
  confidence: number;
  method: string;
  sources: {
    userChoice?: string;
    parsedLanguage?: string | null;
    detectedLanguage?: string | null;
  };
}

/**
 * Résout la langue finale en appliquant les priorités :
 * 1. Choix utilisateur (si différent de "auto")
 * 2. Langue parsée par l'IA
 * 3. Langue détectée automatiquement
 * 4. Fallback "en"
 */
export function resolveLanguage({
  userChoice,
  parsedLanguage,
  detector,
}: {
  userChoice?: string;
  parsedLanguage?: { language: string | null; confidence?: number | null } | null;
  detector: LangGuess;
}): LanguageResolution {
  const sources = {
    userChoice,
    parsedLanguage: parsedLanguage?.language,
    detectedLanguage: detector.language
  };

  // 1) Priorité absolue : choix utilisateur explicite
  if (userChoice && userChoice !== "auto") {
    return {
      finalLanguage: userChoice,
      isRTL: detector.isRTL,
      confidence: 1.0,
      method: 'user_choice',
      sources
    };
  }

  // 2) Langue parsée par l'IA (haute confiance)
  if (parsedLanguage?.language && (parsedLanguage.confidence || 0) > 0.7) {
    return {
      finalLanguage: parsedLanguage.language,
      isRTL: detector.isRTL,
      confidence: parsedLanguage.confidence || 0.8,
      method: 'ai_parsed',
      sources
    };
  }

  // 3) Langue détectée automatiquement
  if (detector.language && detector.confidence > 0.5) {
    return {
      finalLanguage: detector.language,
      isRTL: detector.isRTL,
      confidence: detector.confidence,
      method: detector.method,
      sources
    };
  }

  // 4) Langue parsée avec confiance moyenne (fallback)
  if (parsedLanguage?.language) {
    return {
      finalLanguage: parsedLanguage.language,
      isRTL: detector.isRTL,
      confidence: parsedLanguage.confidence || 0.6,
      method: 'ai_parsed_low_confidence',
      sources
    };
  }

  // 5) Fallback final
  return {
    finalLanguage: "en",
    isRTL: false,
    confidence: 0.1,
    method: 'fallback',
    sources
  };
}

/**
 * Valide qu'une langue est supportée par le système
 */
export function isSupportedLanguage(language: string): boolean {
  // Liste des langues supportées (peut être étendue)
  const supportedLanguages = new Set([
    // Langues principales
    "en", "fr", "es", "it", "de", "pt", "ru", "zh", "ar", "hi", "ja", "ko",
    // Variantes régionales
    "en-US", "en-GB", "pt-BR", "zh-CN", "zh-TW", "es-ES", "es-MX",
    "fr-FR", "fr-CA", "de-DE", "de-AT", "it-IT", "nl-NL", "nl-BE",
    // Langues supplémentaires
    "nl", "sv", "no", "da", "fi", "pl", "tr", "el", "he", "ur", "fa",
    "th", "vi", "id", "ms", "tl", "sw", "ha", "yo", "ig", "am",
    "ro", "bg", "hr", "sr", "sk", "sl", "hu", "cs", "lt", "lv", "et"
  ]);

  return supportedLanguages.has(language.toLowerCase());
}

/**
 * Obtient la langue de base (sans région) d'un code BCP-47
 */
export function getBaseLanguage(language: string): string {
  return language.split("-")[0].toLowerCase();
}

/**
 * Combine plusieurs sources de langue avec pondération
 */
export function combineLanguageSources(
  sources: Array<{ language: string; confidence: number; weight: number }>
): { language: string; confidence: number } {
  if (sources.length === 0) {
    return { language: "en", confidence: 0 };
  }

  if (sources.length === 1) {
    return { language: sources[0].language, confidence: sources[0].confidence };
  }

  // Groupement par langue
  const languageGroups = new Map<string, { totalWeight: number; totalConfidence: number; count: number }>();

  for (const source of sources) {
    const lang = source.language;
    const existing = languageGroups.get(lang) || { totalWeight: 0, totalConfidence: 0, count: 0 };
    
    languageGroups.set(lang, {
      totalWeight: existing.totalWeight + source.weight,
      totalConfidence: existing.totalConfidence + (source.confidence * source.weight),
      count: existing.count + 1
    });
  }

  // Trouve la langue avec le meilleur score pondéré
  let bestLanguage = "en";
  let bestScore = 0;

  for (const [language, stats] of languageGroups) {
    const score = stats.totalConfidence / stats.totalWeight;
    if (score > bestScore) {
      bestScore = score;
      bestLanguage = language;
    }
  }

  return {
    language: bestLanguage,
    confidence: bestScore
  };
}

/**
 * Logs détaillés pour debug
 */
export function logLanguageResolution(resolution: LanguageResolution): void {
  console.log("🌍 Résolution de langue:", {
    final: resolution.finalLanguage,
    confidence: resolution.confidence,
    method: resolution.method,
    isRTL: resolution.isRTL,
    sources: resolution.sources
  });
}
