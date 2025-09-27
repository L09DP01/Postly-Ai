import { Button } from "./ui/Button";

export default function PricingTable() {
  const plans = [
    {
      name: "Gratuit",
      price: "0$",
      period: "/mois",
      description: "Parfait pour tester Postly AI",
      features: [
        "10 posts générés/mois",
        "Tons de base",
        "Support email",
        "Templates standards"
      ],
      cta: "Commencer gratuitement",
      ctaLink: "/auth/register",
      popular: false
    },
    {
      name: "Pro",
      price: "5,99$",
      period: "/mois",
      description: "Pour les créateurs de contenu",
      features: [
        "200 posts générés/mois",
        "Tous les tons disponibles",
        "Support prioritaire",
        "Templates premium",
        "Analytics détaillées",
      
      ],
      cta: "Essayer Pro",
      ctaLink: "/auth/register?plan=pro",
      popular: true
    },
    {
      name: "Business",
      price: "49,99$",
      period: "/mois",
      description: "Pour les équipes et agences",
      features: [
        "Posts illimités",
        "Ton personnalisé",
        "Support dédié",
        "API access",
        "Collaboration d'équipe",
        "Brand guidelines",
        "White-label"
      ],
      cta: "Contacter les ventes",
      ctaLink: "/contact",
      popular: false
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl mb-4">
            Choisissez votre plan
          </h2>
          <p className="text-base text-gray-600 sm:text-lg max-w-2xl mx-auto">
            Commencez gratuitement, évoluez selon vos besoins
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3 max-w-5xl mx-auto lg:max-w-none">
          {plans.map((plan, index) => (
            <div key={index} className={`relative ${plan.popular ? 'lg:transform lg:scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
                    Le plus populaire
                  </span>
                </div>
              )}
              
              <div className={`rounded-2xl border-2 p-6 sm:p-8 h-full transition-all duration-200 hover:shadow-xl ${
                plan.popular 
                  ? 'border-primary-500 bg-white shadow-lg' 
                  : 'border-gray-200 bg-white shadow-lg hover:shadow-xl'
              }`}>
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-sm sm:text-base text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.popular ? 'primary' : 'outline'} 
                  size="lg" 
                  className="w-full"
                  asChild
                >
                  <a href={plan.ctaLink}>{plan.cta}</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}