"use client";
import { useState } from "react";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Comment fonctionne Postly AI ?",
      answer: "Il suffit de décrire votre idée de post en quelques mots. Notre IA analyse votre demande, identifie le secteur d&apos;activité, la plateforme cible et génère automatiquement 3 variantes optimisées avec hashtags et CTA."
    },
    {
      question: "Puis-je personnaliser le ton des posts ?",
      answer: "Absolument ! Vous pouvez choisir parmi plusieurs tons : professionnel, décontracté, vendeur, inspirant, humoristique, etc. L&apos;IA s&apos;adapte à votre style de communication."
    },
    {
      question: "Les posts sont-ils optimisés SEO ?",
      answer: "Oui, chaque post généré inclut des mots-clés pertinents, des hashtags optimisés et des call-to-action efficaces pour maximiser l'engagement et la visibilité."
    },
    {
      question: "Puis-je utiliser les posts sur toutes les plateformes ?",
      answer: "Postly AI génère des contenus adaptés pour Instagram, Facebook, LinkedIn, TikTok et Twitter. Chaque post est optimisé selon les spécificités de chaque plateforme."
    },
    {
      question: "Y a-t-il une limite au nombre de posts ?",
      answer: "Le plan gratuit offre 10 posts par mois. Les plans Pro (200 posts) et Business (illimités) offrent plus de flexibilité selon vos besoins."
    },
    {
      question: "Puis-je modifier les posts générés ?",
      answer: "Bien sûr ! Vous pouvez copier, modifier et personnaliser tous les posts générés selon vos besoins spécifiques avant de les publier."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: '#03224c' }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl mb-4">
            Questions fréquentes
          </h2>
          <p className="text-base sm:text-lg text-white">
            Tout ce que vous devez savoir sur Postly AI
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg">
              <button
                className="w-full px-4 py-4 sm:px-6 sm:py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg 
                    className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-500 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
