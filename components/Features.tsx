export default function Features() {
  const features = [
    {
      icon: &quot;⚡&quot;,
      title: &quot;Génération ultra-rapide&quot;,
      description: &quot;Obtenez 3 variantes de posts en moins de 10 secondes grâce à notre IA optimisée.&quot;,
      gradient: &quot;from-yellow-400 to-orange-500&quot;
    },
    {
      icon: &quot;🎯&quot;,
      title: &quot;SEO intégré&quot;,
      description: &quot;Chaque post est optimisé pour les moteurs de recherche avec des mots-clés pertinents.&quot;,
      gradient: &quot;from-green-400 to-blue-500&quot;
    },
    {
      icon: &quot;📱&quot;,
      title: &quot;Multi-plateformes&quot;,
      description: &quot;Adapté pour Instagram, Facebook, LinkedIn, TikTok et Twitter automatiquement.&quot;,
      gradient: &quot;from-purple-400 to-pink-500&quot;
    },
    {
      icon: &quot;🎨&quot;,
      title: &quot;Personnalisation&quot;,
      description: &quot;Choisissez le ton, le style et la longueur selon votre marque et votre audience.&quot;,
      gradient: &quot;from-pink-400 to-rose-500&quot;
    },
    {
      icon: &quot;📊&quot;,
      title: &quot;Analytics inclus&quot;,
      description: &quot;Suivez les performances de vos posts avec des métriques détaillées.&quot;,
      gradient: &quot;from-blue-400 to-indigo-500&quot;
    },
    {
      icon: &quot;🚀&quot;,
      title: &quot;Prêt à publier&quot;,
      description: &quot;Copiez-collez directement vos posts générés, hashtags et CTA inclus.&quot;,
      gradient: &quot;from-indigo-400 to-purple-500&quot;
    }
  ];

  return (
    <section className=&quot;py-24 bg-white&quot;>
      <div className=&quot;mx-auto max-w-7xl px-4 sm:px-6 lg:px-8&quot;>
        <div className=&quot;text-center mb-20&quot;>
          <h2 className=&quot;text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl&quot;>
            Une IA qui{&quot; &quot;}
            <span className=&quot;bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent&quot;>
              comprend
            </span>{&quot; &quot;}
            votre vision
          </h2>
          <p className=&quot;mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto&quot;>
            Transformez vos idées en contenu engageant avec une précision et une rapidité inégalées
          </p>
        </div>
        
        <div className=&quot;grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3&quot;>
          {features.map((feature, index) => (
            <div key={index} className=&quot;group relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl p-8&quot;>
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className=&quot;relative&quot;>
                {/* Icon */}
                <div className=&quot;mb-6&quot;>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} text-white text-xl`}>
                    {feature.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className=&quot;text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors&quot;>
                  {feature.title}
                </h3>
                <p className=&quot;text-gray-600 leading-relaxed&quot;>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className=&quot;mt-20 text-center&quot;>
          <div className=&quot;inline-flex items-center rounded-full bg-purple-50 px-6 py-3 text-purple-700 ring-1 ring-purple-700/10 mb-8&quot;>
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
