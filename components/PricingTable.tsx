import { Button } from &quot;./ui/Button&quot;;
import Link from &quot;next/link&quot;;

export default function PricingTable() {
  const plans = [
    {
      name: &quot;Gratuit&quot;,
      price: &quot;Free&quot;,
      period: &quot;&quot;,
      description: &quot;Parfait pour tester Postly AI&quot;,
      features: [
        &quot;10 posts générés/mois&quot;,
        &quot;3 variantes par prompt&quot;,
        &quot;Toutes les plateformes&quot;,
        &quot;Hashtags basiques&quot;,
        &quot;Support email&quot;
      ],
      cta: &quot;Commencer gratuitement&quot;,
      ctaLink: &quot;/auth/register&quot;,
      popular: false,
      gradient: &quot;from-gray-400 to-gray-600&quot;
    },
    {
      name: &quot;Pro&quot;,
      price: &quot;$5.99&quot;,
      period: &quot;/mois&quot;,
      description: &quot;Pour les créateurs de contenu&quot;,
      features: [
        &quot;200 posts générés/mois&quot;,
        &quot;3 variantes par prompt&quot;,
        &quot;Toutes les plateformes&quot;,
        &quot;Hashtags optimisés SEO&quot;,
        &quot;Support prioritaire&quot;,
        &quot;Analytics détaillées&quot;
      ],
      cta: &quot;Essayer Pro&quot;,
      ctaLink: &quot;/auth/register?plan=pro&quot;,
      popular: true,
      gradient: &quot;from-purple-600 to-pink-600&quot;
    },
    {
      name: &quot;Business&quot;,
      price: &quot;$49.99&quot;,
      period: &quot;/mois&quot;,
      description: &quot;Pour les équipes et agences&quot;,
      features: [
        &quot;Posts illimités&quot;,
        &quot;Tons personnalisés&quot;,
        &quot;Support dédié&quot;,
        &quot;API access&quot;,
        &quot;Collaboration d'équipe&quot;,
        &quot;Brand guidelines&quot;,
        &quot;White-label&quot;
      ],
      cta: &quot;Contacter les ventes&quot;,
      ctaLink: &quot;/contact&quot;,
      popular: false,
      gradient: &quot;from-blue-600 to-indigo-600&quot;
    }
  ];

  return (
    <section className=&quot;py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900&quot;>
      <div className=&quot;mx-auto max-w-7xl px-4 sm:px-6 lg:px-8&quot;>
        <div className=&quot;text-center mb-20&quot;>
          <h2 className=&quot;text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl&quot;>
            Des prix{&quot; &quot;}
            <span className=&quot;bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent&quot;>
              transparents
            </span>
          </h2>
          <p className=&quot;mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto&quot;>
            Commencez gratuitement, évoluez selon vos besoins
          </p>
        </div>
        
        <div className=&quot;grid grid-cols-1 gap-8 lg:grid-cols-3 max-w-6xl mx-auto&quot;>
          {plans.map((plan, index) => (
            <div key={index} className={`relative group ${
              plan.popular ? 'lg:-mt-8' : ''
            }`}>
              <div className={`relative overflow-hidden rounded-3xl border transition-all duration-300 hover:shadow-2xl p-8 h-full ${
                plan.popular 
                  ? 'border-purple-500/50 bg-white/10 backdrop-blur-sm shadow-2xl shadow-purple-500/20' 
                  : 'border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10'
              }`}>
                
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {plan.popular && (
                  <div className=&quot;absolute -top-4 left-1/2 transform -translate-x-1/2&quot;>
                    <span className=&quot;bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg whitespace-nowrap&quot;>
                      Populaire
                    </span>
                  </div>
                )}
                
                <div className=&quot;relative&quot;>
                  {/* Header */}
                  <div className=&quot;text-center mb-8&quot;>
                    <h3 className=&quot;text-2xl font-bold text-white mb-2&quot;>{plan.name}</h3>
                    <div className=&quot;mb-4&quot;>
                      <span className=&quot;text-4xl font-bold text-white&quot;>{plan.price}</span>
                      <span className=&quot;text-gray-300 text-lg&quot;>{plan.period}</span>
                    </div>
                    <p className=&quot;text-gray-300&quot;>{plan.description}</p>
                  </div>
                  
                  {/* Features */}
                  <ul className=&quot;space-y-4 mb-8&quot;>
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className=&quot;flex items-start&quot;>
                        <div className=&quot;flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center mr-3 mt-0.5&quot;>
                          <svg className=&quot;w-3 h-3 text-white&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
                            <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={3} d=&quot;M5 13l4 4L19 7&quot; />
                          </svg>
                        </div>
                        <span className=&quot;text-gray-300&quot;>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Button */}
                  <Button 
                    size=&quot;lg&quot; 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg' 
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30'
                    }`}
                    asChild
                  >
                    <Link href={plan.ctaLink}>{plan.cta}</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom text */}
        <div className=&quot;text-center mt-16&quot;>
          <div className=&quot;inline-flex items-center rounded-full bg-white/10 px-6 py-3 text-white/80 ring-1 ring-white/20 mb-6&quot;>
            <span className="mr-2">🔒</span>
            Sécurisé et fiable
          </div>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Tous les plans incluent un essai gratuit. Aucune carte de crédit requise. 
            Annulez à tout moment sans engagement.
          </p>
        </div>
      </div>
    </section>
  );
}