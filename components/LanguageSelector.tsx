"use client";

import { useLanguage, SupportedLanguage } from "@/lib/contexts/LanguageContext";

type LanguageOption = SupportedLanguage | 'auto';

const languageNames: Record<LanguageOption, string> = {
  auto: "🤖 Auto-détection",
  fr: "🇫🇷 Français",
  en: "🇺🇸 English", 
  es: "🇪🇸 Español",
  it: "🇮🇹 Italiano"
};

interface LanguageSelectorProps {
  className?: string;
  variant?: 'dropdown' | 'buttons';
  value?: LanguageOption;
  onChange?: (lang: LanguageOption) => void;
  includeAuto?: boolean; // Option pour inclure/exclure l'auto-détection
}

export default function LanguageSelector({ 
  className = "", 
  variant = 'dropdown',
  value,
  onChange,
  includeAuto = true
}: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  
  const currentLanguage = value || language;
  const handleChange = onChange || ((lang: LanguageOption) => {
    if (lang !== 'auto') {
      setLanguage(lang as SupportedLanguage);
    }
  });

  // Filtre les options selon includeAuto
  const availableOptions = includeAuto 
    ? Object.entries(languageNames)
    : Object.entries(languageNames).filter(([code]) => code !== 'auto');

  if (variant === 'buttons') {
    return (
      <div className={`flex space-x-2 ${className}`}>
        {availableOptions.map(([code, name]) => (
          <button
            key={code}
            onClick={() => handleChange(code as LanguageOption)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              currentLanguage === code
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {code === 'auto' ? '🤖' : name.split(' ')[0]} {/* Juste le drapeau */}
          </button>
        ))}
      </div>
    );
  }

  return (
    <select
      value={currentLanguage}
      onChange={(e) => handleChange(e.target.value as LanguageOption)}
      className={`text-sm border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {availableOptions.map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
