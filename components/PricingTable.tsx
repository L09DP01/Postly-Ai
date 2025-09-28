import { Button } from "./ui/Button";
import Link from "next/link";

export default function PricingTable() {
  const plans = [
    {
      name: "Gratuit",
      price: "Free",
      period: "",
      description: "Parfait pour tester Postly AI",
      features: [
        "10 posts générés/mois",
        "3 variantes par prompt",
        "Toutes les plateformes",
        "Hashtags basiques",
        "Support email"
      ],
      cta: "Commencer gratuitement",
      ctaLink: "/auth/register",
      popular: false,
      gradient: "from-gray-400 to-gray-600"
    },
    {
      name: "Pro",
      price: "$5.99",
      period: "/mois",
      description: "Pour les créateurs de contenu",
      features: [
        "200 posts générés/mois",
        "3 variantes par prompt",
        "Toutes les plateformes",
        "Hashtags optimisés SEO",
        "Support prioritaire",
        "Analytics détaillées"
      ],
      cta: "Essayer Pro",
      ctaLink: "/auth/register?plan=pro",
      popular: true,
      gradient: "from-purple-600 to-pink-600"
    },
    {
      name: "Business",
      price: "$49.99",
      period: "/mois",
      description: "Pour les équipes et agences",
      features: [
        "Posts illimités",
        "Tons personnalisés",
        "Support dédié",
        "API access",
        "Collaboration d'équipe",
        "Brand guidelines",
        "White-label"
      ],
      cta: "Contacter les ventes",
      ctaLink: "/contact",
      popular: false,
      gradient: "from-blue-600 to-indigo-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Des prix{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              transparents
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
            Commencez gratuitement, évoluez selon vos besoins
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
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
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg whitespace-nowrap">
                      Populaire
                    </span>
                  </div>
                )}
                
                <div className="relative">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-300 text-lg">{plan.period}</span>
                    </div>
                    <p className="text-gray-300">{plan.description}</p>
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Button */}
                  <Button 
                    size="lg" 
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
        <div className="text-center mt-16">
          <div className="inline-flex items-center rounded-full bg-white/10 px-6 py-3 text-white/80 ring-1 ring-white/20 mb-6">
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