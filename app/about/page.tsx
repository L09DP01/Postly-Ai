import { Metadata } from &quot;next&quot;;

export const metadata: Metadata = {
  title: &quot;À propos - Postly AI&quot;,
  description: &quot;Découvrez l'histoire et la mission de Postly AI - La plateforme d'IA qui révolutionne la création de contenu pour les réseaux sociaux.&quot;,
};

export default function AboutPage() {
  return (
    <div className=&quot;min-h-screen bg-white&quot;>
      <div className=&quot;mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8&quot;>
        <div className=&quot;prose prose-lg max-w-none&quot;>
          <h1 className=&quot;text-3xl font-bold text-gray-900 mb-8&quot; style={{ color: '#03224c' }}>
            À propos de Postly AI
          </h1>
          
          <div className=&quot;space-y-8&quot;>
            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                Notre Mission
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Chez Postly AI, nous croyons que chaque entreprise mérite d&apos;avoir un contenu de qualité 
                pour ses réseaux sociaux, sans passer des heures à créer des posts. Notre mission est de 
                démocratiser la création de contenu en utilisant l&apos;intelligence artificielle pour 
                générer des posts optimisés, engageants et prêts à publier en quelques secondes.
              </p>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                Notre Histoire
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Fondée en 2024 par une équipe de passionnés du marketing digital et de l&apos;IA, 
                Postly AI est née d&apos;un constat simple : créer du contenu de qualité pour les 
                réseaux sociaux prend énormément de temps et de ressources. Nous avons développé 
                une solution qui combine l&apos;intelligence artificielle la plus avancée avec une 
                compréhension approfondie des spécificités de chaque plateforme sociale.
              </p>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                Notre Technologie
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Postly AI utilise les dernières avancées en intelligence artificielle, notamment 
                GPT-4o-mini d&apos;OpenAI, pour analyser vos briefs et générer du contenu adapté. 
                Notre algorithme comprend les nuances de chaque plateforme (Instagram, Facebook, 
                LinkedIn, TikTok, Twitter) et s&apos;adapte automatiquement au ton et au style 
                souhaités.
              </p>
              
              <div className=&quot;mt-6 grid grid-cols-1 md:grid-cols-2 gap-6&quot;>
                <div className=&quot;p-4 bg-blue-50 rounded-lg&quot;>
                  <h3 className=&quot;font-semibold text-blue-900 mb-2&quot;>IA Avancée</h3>
                  <p className=&quot;text-blue-800 text-sm&quot;>
                    Utilisation de GPT-4o-mini pour une génération de contenu de haute qualité
                  </p>
                </div>
                <div className=&quot;p-4 bg-green-50 rounded-lg&quot;>
                  <h3 className=&quot;font-semibold text-green-900 mb-2&quot;>Optimisation SEO</h3>
                  <p className=&quot;text-green-800 text-sm&quot;>
                    Intégration automatique de mots-clés et hashtags optimisés
                  </p>
                </div>
                <div className=&quot;p-4 bg-purple-50 rounded-lg&quot;>
                  <h3 className=&quot;font-semibold text-purple-900 mb-2&quot;>Multi-plateformes</h3>
                  <p className=&quot;text-purple-800 text-sm&quot;>
                    Adaptation automatique au format et style de chaque réseau social
                  </p>
                </div>
                <div className=&quot;p-4 bg-orange-50 rounded-lg&quot;>
                  <h3 className=&quot;font-semibold text-orange-900 mb-2&quot;>Personnalisation</h3>
                  <p className=&quot;text-orange-800 text-sm&quot;>
                    Choix du ton, style et objectifs selon vos besoins spécifiques
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                Nos Valeurs
              </h2>
              <div className=&quot;grid grid-cols-1 md:grid-cols-3 gap-6&quot;>
                <div className=&quot;text-center&quot;>
                  <div className=&quot;w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4&quot;>
                    <span className=&quot;text-2xl&quot;>🚀</span>
                  </div>
                  <h3 className=&quot;font-semibold text-gray-900 mb-2&quot;>Innovation</h3>
                  <p className=&quot;text-gray-600 text-sm&quot;>
                    Nous repoussons constamment les limites de l&apos;IA pour créer des outils toujours plus performants.
                  </p>
                </div>
                <div className=&quot;text-center&quot;>
                  <div className=&quot;w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4&quot;>
                    <span className=&quot;text-2xl&quot;>🤝</span>
                  </div>
                  <h3 className=&quot;font-semibold text-gray-900 mb-2&quot;>Accessibilité</h3>
                  <p className=&quot;text-gray-600 text-sm&quot;>
                    Nous rendons la création de contenu professionnel accessible à tous, quelle que soit la taille de l&apos;entreprise.
                  </p>
                </div>
                <div className=&quot;text-center&quot;>
                  <div className=&quot;w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4&quot;>
                    <span className=&quot;text-2xl&quot;>🎯</span>
                  </div>
                  <h3 className=&quot;font-semibold text-gray-900 mb-2&quot;>Qualité</h3>
                  <p className=&quot;text-gray-600 text-sm&quot;>
                    Chaque post généré respecte les meilleures pratiques du marketing digital et du SEO.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                Notre Équipe
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Notre équipe est composée d&apos;experts en marketing digital, d&apos;ingénieurs IA, 
                et de spécialistes UX/UI qui partagent une passion commune : révolutionner la façon 
                dont les entreprises créent leur contenu. Nous sommes basés en France mais servons 
                des clients dans le monde entier.
              </p>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                Nos Clients
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Plus de 1000 entreprises nous font confiance pour leur création de contenu, 
                des startups aux grandes entreprises, en passant par les agences marketing 
                et les influenceurs. Nos clients économisent en moyenne 10 heures par semaine 
                sur la création de contenu.
              </p>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                Contactez-nous
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Vous avez des questions sur Postly AI ? Notre équipe est là pour vous aider. 
                N&apos;hésitez pas à nous contacter pour discuter de vos besoins spécifiques.
              </p>
              <div className=&quot;mt-4 p-4 bg-gray-50 rounded-lg&quot;>
                <p className=&quot;text-gray-700&quot;>
                  <strong>E-mail :</strong> contact@postly-ai.com<br />
                  <strong>Téléphone :</strong> +33 1 23 45 67 89<br />
                  <strong>Adresse :</strong> Postly AI, 123 Rue de l&apos;Innovation, 75001 Paris, France
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
