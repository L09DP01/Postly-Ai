export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Génération ultra-rapide",
      description: "Obtenez 3 variantes de posts en moins de 10 secondes grâce à notre IA optimisée."
    },
    {
      icon: "🎯",
      title: "SEO intégré",
      description: "Chaque post est optimisé pour les moteurs de recherche avec des mots-clés pertinents."
    },
    {
      icon: "📱",
      title: "Multi-plateformes",
      description: "Adapté pour Instagram, Facebook, LinkedIn, TikTok et Twitter automatiquement."
    },
    {
      icon: "🎨",
      title: "Personnalisation",
      description: "Choisissez le ton, le style et la longueur selon votre marque et votre audience."
    },
    {
      icon: "📊",
      title: "Analytics inclus",
      description: "Suivez les performances de vos posts avec des métriques détaillées."
    },
    {
      icon: "🚀",
      title: "Prêt à publier",
      description: "Copiez-collez directement vos posts générés, hashtags et CTA inclus."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl mb-4" style={{ color: '#03224c' }}>
            Pourquoi choisir Postly AI ?
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: '#03224c' }}>
            Une solution complète pour créer des contenus engageants qui convertissent
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="rounded-2xl border-2 border-blue-200 bg-blue-50 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] hover:bg-blue-100 hover:border-blue-300 p-4 sm:p-6 h-full">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
