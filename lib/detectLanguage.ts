import { franc } from "franc";
import { getOpenAI } from "./ai/openai";

// Mapping ISO 639-3 → ISO 639-1/BCP-47
const ISO6393_TO_1: Record<string, string> = {
  // Langues principales
  eng: "en",     // English
  fra: "fr",     // French
  deu: "de",     // German
  spa: "es",     // Spanish
  ita: "it",     // Italian
  por: "pt",     // Portuguese
  rus: "ru",     // Russian
  cmn: "zh",     // Chinese (Mandarin)
  arb: "ar",     // Arabic
  hin: "hi",     // Hindi
  jpn: "ja",     // Japanese
  kor: "ko",     // Korean
  nld: "nl",     // Dutch
  swe: "sv",     // Swedish
  nor: "no",     // Norwegian
  dan: "da",     // Danish
  fin: "fi",     // Finnish
  pol: "pl",     // Polish
  tur: "tr",     // Turkish
  gre: "el",     // Greek
  heb: "he",     // Hebrew
  urd: "ur",     // Urdu
  fas: "fa",     // Persian (Farsi)
  ben: "bn",     // Bengali
  tam: "ta",     // Tamil
  tel: "te",     // Telugu
  mar: "mr",     // Marathi
  guj: "gu",     // Gujarati
  kan: "kn",     // Kannada
  mal: "ml",     // Malayalam
  ori: "or",     // Odia
  pun: "pa",     // Punjabi
  asm: "as",     // Assamese
  nep: "ne",     // Nepali
  sin: "si",     // Sinhala
  tha: "th",     // Thai
  vie: "vi",     // Vietnamese
  ind: "id",     // Indonesian
  msa: "ms",     // Malay
  tgl: "tl",     // Tagalog
  ceb: "ceb",    // Cebuano
  war: "war",    // Waray
  hil: "hil",    // Hiligaynon
  bcl: "bcl",    // Central Bikol
  pag: "pag",    // Pangasinan
  pam: "pam",    // Kapampangan
  bik: "bik",    // Bikol
  ilo: "ilo",    // Ilocano
  ceb: "ceb",    // Cebuano
  // Langues africaines
  swa: "sw",     // Swahili
  hau: "ha",     // Hausa
  yor: "yo",     // Yoruba
  ibo: "ig",     // Igbo
  amh: "am",     // Amharic
  // Langues européennes supplémentaires
  ron: "ro",     // Romanian
  bul: "bg",     // Bulgarian
  hrv: "hr",     // Croatian
  srp: "sr",     // Serbian
  slk: "sk",     // Slovak
  slv: "sl",     // Slovenian
  hun: "hu",     // Hungarian
  ces: "cs",     // Czech
  lit: "lt",     // Lithuanian
  lav: "lv",     // Latvian
  est: "et",     // Estonian
  // Langues américaines
  spa: "es",     // Spanish (re-défini pour être sûr)
  por: "pt",     // Portuguese (re-défini pour être sûr)
};

// Langues RTL (Right-to-Left)
const RTL_LANGUAGES = new Set([
  "ar", "fa", "he", "ur", "ku", "ps", "sd", "dv", "yi"
]);

export type LangGuess = {
  language: string | null;
  confidence: number;
  isRTL: boolean;
  method: 'user' | 'local' | 'llm' | 'fallback';
};

/**
 * Normalise un code ISO en BCP-47
 */
function toBCP47(iso1: string, region?: string): string | null {
  if (!iso1) return null;
  if (region) return `${iso1}-${region.toUpperCase()}`;
  return iso1;
}

/**
 * Détection via LLM (fallback fiable)
 */
async function detectWithLLM(text: string): Promise<{ lang: string | null; conf: number }> {
  try {
    const response = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Tu es un expert en détection de langues. Analyse le texte et retourne UNIQUEMENT un JSON valide avec:
- "language": code BCP-47 (ex: "en", "fr", "pt-BR", "ar") ou null si incertain
- "confidence": nombre entre 0 et 1 (confiance du modèle)

Règles:
- Retourne le code BCP-47 standard (ex: "en", "fr", "de", "es", "it", "pt", "ar", "zh", "ja", "ko")
- Pour les variantes régionales, utilise le format "langue-REGION" (ex: "pt-BR", "en-US", "zh-CN")
- Si très incertain, retourne null pour language et 0 pour confidence
- Réponds UNIQUEMENT avec le JSON, rien d'autre`
        },
        {
          role: "user",
          content: `Détecte la langue de ce texte:\n\n"${text.substring(0, 1000)}"`
        }
      ],
      temperature: 0.1,
      max_tokens: 100
    });

    const content = response.choices[0]?.message?.content?.trim();
    if (!content) return { lang: null, conf: 0 };

    const parsed = JSON.parse(content);
    return {
      lang: parsed.language || null,
      conf: Math.max(0, Math.min(1, parsed.confidence || 0))
    };
  } catch (error) {
    console.error("Erreur détection LLM:", error);
    return { lang: null, conf: 0 };
  }
}

/**
 * Détection intelligente avec priorité utilisateur > locale > LLM
 */
export async function detectLanguageSmart(
  brief: string,
  userChoice?: string
): Promise<LangGuess> {
  // 1) Override utilisateur (priorité absolue)
  if (userChoice && userChoice !== "auto") {
    const lang = userChoice;
    return {
      language: lang,
      confidence: 1.0,
      isRTL: RTL_LANGUAGES.has(lang.split("-")[0]),
      method: 'user'
    };
  }

  // 2) Détection locale (franc)
  if (brief && brief.length >= 10) {
    try {
      const code3 = franc(brief, { minLength: 10 });
      
      if (code3 && code3 !== "und") {
        const iso1 = ISO6393_TO_1[code3];
        if (iso1) {
          const lang = toBCP47(iso1);
          if (lang) {
            return {
              language: lang,
              confidence: 0.7, // Franc est généralement fiable mais pas parfait
              isRTL: RTL_LANGUAGES.has(iso1),
              method: 'local'
            };
          }
        }
      }
    } catch (error) {
      console.error("Erreur détection locale:", error);
    }
  }

  // 3) Fallback LLM (très fiable)
  if (brief && brief.length >= 5) {
    const { lang, conf } = await detectWithLLM(brief);
    if (lang && conf > 0.5) {
      return {
        language: lang,
        confidence: conf,
        isRTL: RTL_LANGUAGES.has(lang.split("-")[0]),
        method: 'llm'
      };
    }
  }

  // 4) Fallback final
  return {
    language: "en", // Langue neutre par défaut
    confidence: 0.1,
    isRTL: false,
    method: 'fallback'
  };
}

/**
 * Vérifie si une langue est RTL
 */
export function isRTLLanguage(language: string): boolean {
  return RTL_LANGUAGES.has(language.split("-")[0]);
}

/**
 * Normalise un code de langue en BCP-47
 */
export function normalizeLanguageCode(code: string): string {
  if (!code) return "en";
  
  // Convertit en minuscule et supprime les espaces
  const normalized = code.toLowerCase().trim();
  
  // Si c'est déjà un code valide court, retourne tel quel
  if (normalized.length === 2 && /^[a-z]{2}$/.test(normalized)) {
    return normalized;
  }
  
  // Si c'est un code avec région, normalise
  if (normalized.includes("-")) {
    const [lang, region] = normalized.split("-");
    if (lang.length === 2 && region.length === 2) {
      return `${lang}-${region.toUpperCase()}`;
    }
  }
  
  return normalized;
}

/**
 * Obtient le nom de langue en français
 */
export function getLanguageName(code: string): string {
  const names: Record<string, string> = {
    "en": "Anglais",
    "fr": "Français",
    "es": "Espagnol",
    "it": "Italien",
    "de": "Allemand",
    "pt": "Portugais",
    "ru": "Russe",
    "ar": "Arabe",
    "zh": "Chinois",
    "ja": "Japonais",
    "ko": "Coréen",
    "hi": "Hindi",
    "nl": "Néerlandais",
    "sv": "Suédois",
    "no": "Norvégien",
    "da": "Danois",
    "fi": "Finnois",
    "pl": "Polonais",
    "tr": "Turc",
    "el": "Grec",
    "he": "Hébreu",
    "ur": "Ourdou",
    "fa": "Persan",
    "th": "Thaï",
    "vi": "Vietnamien",
    "id": "Indonésien",
    "ms": "Malais",
    "tl": "Tagalog",
    "sw": "Swahili",
    "ha": "Haoussa",
    "yo": "Yoruba",
    "ig": "Igbo",
    "am": "Amharique",
    "ro": "Roumain",
    "bg": "Bulgare",
    "hr": "Croate",
    "sr": "Serbe",
    "sk": "Slovaque",
    "sl": "Slovène",
    "hu": "Hongrois",
    "cs": "Tchèque",
    "lt": "Lituanien",
    "lv": "Letton",
    "et": "Estonien",
    "pt-BR": "Portugais (Brésil)",
    "en-US": "Anglais (États-Unis)",
    "en-GB": "Anglais (Royaume-Uni)",
    "zh-CN": "Chinois (Chine)",
    "zh-TW": "Chinois (Taiwan)",
    "es-ES": "Espagnol (Espagne)",
    "es-MX": "Espagnol (Mexique)",
    "fr-FR": "Français (France)",
    "fr-CA": "Français (Canada)",
    "de-DE": "Allemand (Allemagne)",
    "de-AT": "Allemand (Autriche)",
    "it-IT": "Italien (Italie)",
    "nl-NL": "Néerlandais (Pays-Bas)",
    "nl-BE": "Néerlandais (Belgique)"
  };
  
  return names[code] || code.toUpperCase();
}
