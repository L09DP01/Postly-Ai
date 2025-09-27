export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Génération ultra-rapide",
      description: "Obtenez 3 variantes de posts en moins de 10 secondes grâce à notre IA optimisée.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: "🎯",
      title: "SEO intégré",
      description: "Chaque post est optimisé pour les moteurs de recherche avec des mots-clés pertinents.",
      gradient: "from-green-400 to-blue-500"
    },
    {
      icon: "📱",
      title: "Multi-plateformes",
      description: "Adapté pour Instagram, Facebook, LinkedIn, TikTok et Twitter automatiquement.",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: "🎨",
      title: "Personnalisation",
      description: "Choisissez le ton, le style et la longueur selon votre marque et votre audience.",
      gradient: "from-pink-400 to-rose-500"
    },
    {
      icon: "📊",
      title: "Analytics inclus",
      description: "Suivez les performances de vos posts avec des métriques détaillées.",
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      icon: "🚀",
      title: "Prêt à publier",
      description: "Copiez-collez directement vos posts générés, hashtags et CTA inclus.",
      gradient: "from-indigo-400 to-purple-500"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Une IA qui{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              comprend
            </span>{" "}
            votre vision
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
            Transformez vos idées en contenu engageant avec une précision et une rapidité inégalées
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl p-8">
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="relative">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} text-white text-xl`}>
                    {feature.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center rounded-full bg-purple-50 px-6 py-3 text-purple-700 ring-1 ring-purple-700/10 mb-8">
            <span className="mr-2">✨</span>
            Prêt à transformer votre contenu ?
          </div>
          <p className="text-gray-600 mb-8">
            Rejoignez des milliers de créateurs qui utilisent déjà Postly AI
          </p>
        </div>
      </div>
    </section>
  );
}
