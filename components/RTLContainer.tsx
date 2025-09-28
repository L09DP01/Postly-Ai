"use client";

import React from 'react';
// Fonction locale pour détecter les langues RTL
const RTL_LANGUAGES = new Set([
  "ar", "fa", "he", "ur", "ku", "ps", "sd", "dv", "yi"
]);

function isRTLLanguage(language: string): boolean {
  return RTL_LANGUAGES.has(language.split("-")[0]);
}

interface RTLContainerProps {
  language: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Composant qui applique automatiquement le support RTL selon la langue
 */
export default function RTLContainer({ language, children, className = "" }: RTLContainerProps) {
  const isRTL = isRTLLanguage(language);
  
  return (
    <div 
      dir={isRTL ? "rtl" : "ltr"}
      className={`${className} ${isRTL ? 'rtl' : 'ltr'}`}
      style={{
        fontFamily: isRTL ? '"Tajawal", "Noto Sans Arabic", sans-serif' : 'inherit'
      }}
    >
      {children}
    </div>
  );
}

/**
 * Hook pour détecter si une langue est RTL
 */
export function useRTL(language: string) {
  return isRTLLanguage(language);
}

/**
 * Classes Tailwind pour le support RTL
 */
export const rtlClasses = {
  // Text alignment
  textAlign: {
    ltr: 'text-left',
    rtl: 'text-right'
  },
  // Margin
  margin: {
    ltr: 'ml-auto mr-0',
    rtl: 'mr-auto ml-0'
  },
  // Padding
  padding: {
    ltr: 'pl-4 pr-0',
    rtl: 'pr-4 pl-0'
  },
  // Flex direction
  flexDirection: {
    ltr: 'flex-row',
    rtl: 'flex-row-reverse'
  }
};

/**
 * Fonction utilitaire pour appliquer les classes RTL conditionnelles
 */
export function getRTLClasses(language: string, ltrClass: string, rtlClass: string): string {
  return isRTLLanguage(language) ? rtlClass : ltrClass;
}
