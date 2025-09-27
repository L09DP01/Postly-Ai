"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SupportedLanguage = 'fr' | 'en' | 'es' | 'it';

export interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traductions complètes pour l'app
const translations = {
  fr: {
    // Navigation
    'nav.chat': 'Chat',
    'nav.history': 'Historique',
    'nav.billing': 'Facturation',
    'nav.logout': 'Déconnexion',
    'nav.profile': 'Profil',
    
    // Chat/Generate
    'chat.title': 'Générateur de Posts',
    'chat.placeholder': 'Décrivez votre idée de post...',
    'chat.send': 'Envoyer',
    'chat.promptBuilder': 'Prompt Builder',
    'chat.generating': 'Génération en cours...',
    'chat.quotaExceeded': 'Quota dépassé. Passez au plan Pro pour plus de générations.',
    'chat.upgradeNow': 'Upgrade maintenant',
    'chat.languageLabel': 'Langue de génération:',
    
    // Prompt Builder
    'promptBuilder.title': 'Générateur de Prompt',
    'promptBuilder.productName': 'Nom du produit/marque',
    'promptBuilder.description': 'Description',
    'promptBuilder.platform': 'Plateforme',
    'promptBuilder.objective': 'Objectif',
    'promptBuilder.tone': 'Ton',
    'promptBuilder.generate': 'Générer le prompt',
    'promptBuilder.cancel': 'Annuler',
    'promptBuilder.languageLabel': 'Langue du prompt:',
    
    // Platform options
    'platform.instagram': 'Instagram',
    'platform.facebook': 'Facebook', 
    'platform.linkedin': 'LinkedIn',
    'platform.tiktok': 'TikTok',
    'platform.x': 'X (Twitter)',
    
    // Objective options
    'objective.promo': 'Promotion',
    'objective.engagement': 'Engagement',
    'objective.branding': 'Branding',
    'objective.storytelling': 'Storytelling',
    'objective.vente': 'Vente',
    
    // Tone options
    'tone.professionnel': 'Professionnel',
    'tone.decontracte': 'Décontracté',
    'tone.vendeur': 'Vendeur',
    'tone.inspirant': 'Inspirant',
    'tone.humoristique': 'Humoristique',
    
    // Billing
    'billing.title': 'Facturation',
    'billing.description': 'Gérez votre abonnement et vos paiements',
    'billing.currentPlan': 'Plan actuel',
    'billing.usage': 'Utilisation',
    'billing.upgrade': 'Passer au plan Pro',
    'billing.free': 'Gratuit',
    'billing.pro': 'Pro',
    
    // History
    'history.title': 'Historique des générations',
    'history.empty': 'Aucune génération pour le moment',
    'history.date': 'Date',
    'history.brief': 'Brief',
    'history.variants': 'Variantes',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.save': 'Sauvegarder',
    'common.cancel': 'Annuler',
    'common.close': 'Fermer',
  },
  
  en: {
    // Navigation
    'nav.chat': 'Chat',
    'nav.history': 'History',
    'nav.billing': 'Billing',
    'nav.logout': 'Logout',
    'nav.profile': 'Profile',
    
    // Chat/Generate
    'chat.title': 'Post Generator',
    'chat.placeholder': 'Describe your post idea...',
    'chat.send': 'Send',
    'chat.promptBuilder': 'Prompt Builder',
    'chat.generating': 'Generating...',
    'chat.quotaExceeded': 'Quota exceeded. Upgrade to Pro plan for more generations.',
    'chat.upgradeNow': 'Upgrade now',
    'chat.languageLabel': 'Generation language:',
    
    // Prompt Builder
    'promptBuilder.title': 'Prompt Generator',
    'promptBuilder.productName': 'Product/brand name',
    'promptBuilder.description': 'Description',
    'promptBuilder.platform': 'Platform',
    'promptBuilder.objective': 'Objective',
    'promptBuilder.tone': 'Tone',
    'promptBuilder.generate': 'Generate prompt',
    'promptBuilder.cancel': 'Cancel',
    'promptBuilder.languageLabel': 'Prompt language:',
    
    // Platform options
    'platform.instagram': 'Instagram',
    'platform.facebook': 'Facebook',
    'platform.linkedin': 'LinkedIn', 
    'platform.tiktok': 'TikTok',
    'platform.x': 'X (Twitter)',
    
    // Objective options
    'objective.promo': 'Promotion',
    'objective.engagement': 'Engagement',
    'objective.branding': 'Branding',
    'objective.storytelling': 'Storytelling',
    'objective.vente': 'Sales',
    
    // Tone options
    'tone.professionnel': 'Professional',
    'tone.decontracte': 'Casual',
    'tone.vendeur': 'Sales-oriented',
    'tone.inspirant': 'Inspiring',
    'tone.humoristique': 'Humorous',
    
    // Billing
    'billing.title': 'Billing',
    'billing.description': 'Manage your subscription and payments',
    'billing.currentPlan': 'Current plan',
    'billing.usage': 'Usage',
    'billing.upgrade': 'Upgrade to Pro',
    'billing.free': 'Free',
    'billing.pro': 'Pro',
    
    // History
    'history.title': 'Generation History',
    'history.empty': 'No generations yet',
    'history.date': 'Date',
    'history.brief': 'Brief',
    'history.variants': 'Variants',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
  },
  
  es: {
    // Navigation
    'nav.chat': 'Chat',
    'nav.history': 'Historial',
    'nav.billing': 'Facturación',
    'nav.logout': 'Cerrar sesión',
    'nav.profile': 'Perfil',
    
    // Chat/Generate
    'chat.title': 'Generador de Posts',
    'chat.placeholder': 'Describe tu idea de post...',
    'chat.send': 'Enviar',
    'chat.promptBuilder': 'Constructor de Prompts',
    'chat.generating': 'Generando...',
    'chat.quotaExceeded': 'Cuota excedida. Actualiza al plan Pro para más generaciones.',
    'chat.upgradeNow': 'Actualizar ahora',
    'chat.languageLabel': 'Idioma de generación:',
    
    // Prompt Builder
    'promptBuilder.title': 'Generador de Prompts',
    'promptBuilder.productName': 'Nombre del producto/marca',
    'promptBuilder.description': 'Descripción',
    'promptBuilder.platform': 'Plataforma',
    'promptBuilder.objective': 'Objetivo',
    'promptBuilder.tone': 'Tono',
    'promptBuilder.generate': 'Generar prompt',
    'promptBuilder.cancel': 'Cancelar',
    'promptBuilder.languageLabel': 'Idioma del prompt:',
    
    // Platform options
    'platform.instagram': 'Instagram',
    'platform.facebook': 'Facebook',
    'platform.linkedin': 'LinkedIn',
    'platform.tiktok': 'TikTok',
    'platform.x': 'X (Twitter)',
    
    // Objective options
    'objective.promo': 'Promoción',
    'objective.engagement': 'Engagement',
    'objective.branding': 'Branding',
    'objective.storytelling': 'Storytelling',
    'objective.vente': 'Ventas',
    
    // Tone options
    'tone.professionnel': 'Profesional',
    'tone.decontracte': 'Casual',
    'tone.vendeur': 'Comercial',
    'tone.inspirant': 'Inspirador',
    'tone.humoristique': 'Humorístico',
    
    // Billing
    'billing.title': 'Facturación',
    'billing.description': 'Gestiona tu suscripción y pagos',
    'billing.currentPlan': 'Plan actual',
    'billing.usage': 'Uso',
    'billing.upgrade': 'Actualizar a Pro',
    'billing.free': 'Gratis',
    'billing.pro': 'Pro',
    
    // History
    'history.title': 'Historial de Generaciones',
    'history.empty': 'Sin generaciones aún',
    'history.date': 'Fecha',
    'history.brief': 'Brief',
    'history.variants': 'Variantes',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.close': 'Cerrar',
  }
};

// Fonction pour détecter la langue du navigateur
function detectBrowserLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'fr';
  
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('en')) return 'en';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('it')) return 'it';
  
  return 'fr'; // Français par défaut
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<SupportedLanguage>('fr');

  // Initialiser la langue au montage
  useEffect(() => {
    // Vérifier localStorage d'abord
    const savedLanguage = localStorage.getItem('postly-language') as SupportedLanguage;
    if (savedLanguage && ['fr', 'en', 'es', 'it'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      // Sinon, détecter la langue du navigateur
      const detectedLanguage = detectBrowserLanguage();
      setLanguageState(detectedLanguage);
      localStorage.setItem('postly-language', detectedLanguage);
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('postly-language', lang);
  };

  const t = (key: string): string => {
    const translation = translations[language]?.[key as keyof typeof translations[typeof language]];
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Hook pour forcer une langue spécifique (pour le prompt builder)
export function usePromptLanguage() {
  const [promptLanguage, setPromptLanguage] = useState<SupportedLanguage>('fr');
  
  return { promptLanguage, setPromptLanguage };
}

