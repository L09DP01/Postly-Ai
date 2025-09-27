&quot;use client&quot;;
import { useState } from &quot;react&quot;;

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: &quot;Comment fonctionne Postly AI ?&quot;,
      answer: &quot;Il suffit de décrire votre idée de post en quelques mots. Notre IA analyse votre demande, identifie le secteur d&apos;activité, la plateforme cible et génère automatiquement 3 variantes optimisées avec hashtags et CTA.&quot;
    },
    {
      question: &quot;Puis-je personnaliser le ton des posts ?&quot;,
      answer: &quot;Absolument ! Vous pouvez choisir parmi plusieurs tons : professionnel, décontracté, vendeur, inspirant, humoristique, etc. L&apos;IA s&apos;adapte à votre style de communication.&quot;
    },
    {
      question: &quot;Les posts sont-ils optimisés SEO ?&quot;,
      answer: &quot;Oui, chaque post généré inclut des mots-clés pertinents, des hashtags optimisés et des call-to-action efficaces pour maximiser lengagement et la visibilité.&quot;
    },
    {
      question: &quot;Puis-je utiliser les posts sur toutes les plateformes ?&quot;,
      answer: &quot;Postly AI génère des contenus adaptés pour Instagram, Facebook, LinkedIn, TikTok et Twitter. Chaque post est optimisé selon les spécificités de chaque plateforme.&quot;
    },
    {
      question: &quot;Y a-t-il une limite au nombre de posts ?&quot;,
      answer: &quot;Le plan gratuit offre 10 posts par mois. Les plans Pro (200 posts) et Business (illimités) offrent plus de flexibilité selon vos besoins.&quot;
    },
    {
      question: &quot;Puis-je modifier les posts générés ?&quot;,
      answer: &quot;Bien sûr ! Vous pouvez copier, modifier et personnaliser tous les posts générés selon vos besoins spécifiques avant de les publier.&quot;
    }
  ];

  return (
    <section className=&quot;py-12 sm:py-16 lg:py-20&quot; style={{ backgroundColor: '#03224c' }}>
      <div className=&quot;mx-auto max-w-4xl px-4 sm:px-6 lg:px-8&quot;>
        <div className=&quot;text-center mb-12 sm:mb-16&quot;>
          <h2 className=&quot;text-2xl font-bold text-white sm:text-3xl md:text-4xl mb-4&quot;>
            Questions fréquentes
          </h2>
          <p className=&quot;text-base sm:text-lg text-white&quot;>
            Tout ce que vous devez savoir sur Postly AI
          </p>
        </div>
        
        <div className=&quot;space-y-4&quot;>
          {faqs.map((faq, index) => (
            <div key={index} className=&quot;bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg&quot;>
              <button
                className=&quot;w-full px-4 py-4 sm:px-6 sm:py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors&quot;
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className=&quot;text-base sm:text-lg font-semibold text-gray-900 pr-4&quot;>
                  {faq.question}
                </h3>
                <div className=&quot;flex-shrink-0&quot;>
                  <svg 
                    className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-500 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`} 
                    fill=&quot;none&quot; 
                    stroke=&quot;currentColor&quot; 
                    viewBox=&quot;0 0 24 24&quot;
                  >
                    <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth=&quot;2&quot; d=&quot;M19 9l-7 7-7-7&quot;></path>
                  </svg>
                </div>
              </button>
              
              {openIndex === index && (
                <div className=&quot;px-4 pb-4 sm:px-6 sm:pb-6&quot;>
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
