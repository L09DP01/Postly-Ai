import { Metadata } from &quot;next&quot;;

export const metadata: Metadata = {
  title: &quot;Blog - Postly AI&quot;,
  description: &quot;Découvrez les dernières tendances du marketing digital, conseils SEO, et actualités Postly AI sur notre blog.&quot;,
};

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: &quot;Comment optimiser vos posts Instagram avec l&apos;IA&quot;,
      excerpt: &quot;Découvrez les meilleures pratiques pour créer du contenu Instagram engageant grâce à l&apos;intelligence artificielle.&quot;,
      date: &quot;2024-01-15&quot;,
      category: &quot;Instagram&quot;,
      readTime: &quot;5 min&quot;,
      image: &quot;/api/placeholder/400/250&quot;
    },
    {
      id: 2,
      title: &quot;Les tendances du marketing digital en 2024&quot;,
      excerpt: &quot;Un aperçu des tendances qui vont marquer le marketing digital cette année, de l&apos;IA à la réalité augmentée.&quot;,
      date: &quot;2024-01-10&quot;,
      category: &quot;Marketing&quot;,
      readTime: &quot;8 min&quot;,
      image: &quot;/api/placeholder/400/250&quot;
    },
    {
      id: 3,
      title: &quot;SEO et réseaux sociaux : comment les combiner&quot;,
      excerpt: &quot;Apprenez à optimiser votre contenu social pour améliorer votre référencement naturel.&quot;,
      date: &quot;2024-01-05&quot;,
      category: &quot;SEO&quot;,
      readTime: &quot;6 min&quot;,
      image: &quot;/api/placeholder/400/250&quot;
    },
    {
      id: 4,
      title: &quot;LinkedIn : stratégies pour B2B&quot;,
      excerpt: &quot;Maximisez votre présence LinkedIn avec des stratégies adaptées au marketing B2B.&quot;,
      date: &quot;2024-01-01&quot;,
      category: &quot;LinkedIn&quot;,
      readTime: &quot;7 min&quot;,
      image: &quot;/api/placeholder/400/250&quot;
    },
    {
      id: 5,
      title: &quot;TikTok pour les entreprises : guide complet&quot;,
      excerpt: &quot;Comment utiliser TikTok efficacement pour promouvoir votre marque et atteindre de nouveaux clients.&quot;,
      date: &quot;2023-12-28&quot;,
      category: &quot;TikTok&quot;,
      readTime: &quot;9 min&quot;,
      image: &quot;/api/placeholder/400/250&quot;
    },
    {
      id: 6,
      title: &quot;L&apos;avenir de l&apos;IA dans le marketing&quot;,
      excerpt: &quot;Exploration des possibilités offertes par l&apos;intelligence artificielle dans le domaine du marketing.&quot;,
      date: &quot;2023-12-20&quot;,
      category: &quot;IA&quot;,
      readTime: &quot;10 min&quot;,
      image: &quot;/api/placeholder/400/250&quot;
    }
  ];

  const categories = [&quot;Tous&quot;, &quot;Instagram&quot;, &quot;Marketing&quot;, &quot;SEO&quot;, &quot;LinkedIn&quot;, &quot;TikTok&quot;, &quot;IA&quot;];

  return (
    <div className=&quot;min-h-screen bg-white&quot;>
      <div className=&quot;mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8&quot;>
        {/* Header */}
        <div className=&quot;text-center mb-12&quot;>
          <h1 className=&quot;text-3xl font-bold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
            Blog Postly AI
          </h1>
          <p className=&quot;text-lg text-gray-600 max-w-2xl mx-auto&quot;>
            Découvrez les dernières tendances du marketing digital, conseils SEO, 
            et actualités Postly AI pour booster votre présence en ligne.
          </p>
        </div>

        {/* Catégories */}
        <div className=&quot;flex flex-wrap justify-center gap-2 mb-8&quot;>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === &quot;Tous&quot;
                  ? &quot;bg-blue-600 text-white&quot;
                  : &quot;bg-gray-100 text-gray-700 hover:bg-gray-200&quot;
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles */}
        <div className=&quot;grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8&quot;>
          {blogPosts.map((post) => (
            <article key={post.id} className=&quot;bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow&quot;>
              <div className=&quot;h-48 bg-gray-200 flex items-center justify-center&quot;>
                <span className=&quot;text-gray-500&quot;>Image</span>
              </div>
              
              <div className=&quot;p-6&quot;>
                <div className=&quot;flex items-center justify-between mb-3&quot;>
                  <span className=&quot;px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full&quot;>
                    {post.category}
                  </span>
                  <span className=&quot;text-sm text-gray-500&quot;>{post.readTime}</span>
                </div>
                
                <h2 className=&quot;text-xl font-semibold text-gray-900 mb-3 line-clamp-2&quot;>
                  {post.title}
                </h2>
                
                <p className=&quot;text-gray-600 text-sm mb-4 line-clamp-3&quot;>
                  {post.excerpt}
                </p>
                
                <div className=&quot;flex items-center justify-between&quot;>
                  <time className=&quot;text-sm text-gray-500&quot;>
                    {new Date(post.date).toLocaleDateString(&apos;fr-FR&apos;, {
                      year: &apos;numeric&apos;,
                      month: &apos;long&apos;,
                      day: &apos;numeric
                    })}
                  </time>
                  
                  <button className=&quot;text-blue-600 hover:text-blue-700 text-sm font-medium&quot;>
                    Lire la suite →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter */}
        <div className=&quot;mt-16 bg-gray-50 rounded-lg p-8 text-center&quot;>
          <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
            Restez informé
          </h2>
          <p className=&quot;text-gray-600 mb-6 max-w-2xl mx-auto&quot;>
            Recevez nos derniers articles et conseils marketing directement dans votre boîte e-mail. 
            Pas de spam, juste du contenu de qualité.
          </p>
          
          <div className=&quot;max-w-md mx-auto flex gap-2&quot;>
            <input
              type=&quot;email&quot;
              placeholder=&quot;Votre adresse e-mail&quot;
              className=&quot;flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent&quot;
            />
            <button className=&quot;px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors&quot;>
              S&apos;abonner
            </button>
          </div>
        </div>

        {/* Featured Article */}
        <div className=&quot;mt-16&quot;>
          <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-8&quot; style={{ color: '#03224c' }}>
            Article à la une
          </h2>
          
          <div className=&quot;bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8&quot;>
            <div className=&quot;grid grid-cols-1 lg:grid-cols-2 gap-8 items-center&quot;>
              <div>
                <span className=&quot;px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-4 inline-block&quot;>
                  Article vedette
                </span>
                <h3 className=&quot;text-2xl font-bold text-gray-900 mb-4&quot;>
                  Comment Postly AI révolutionne la création de contenu
                </h3>
                <p className=&quot;text-gray-600 mb-6&quot;>
                  Découvrez comment notre plateforme d&apos;IA transforme la façon dont les entreprises 
                  créent leur contenu pour les réseaux sociaux. Témoignages clients, cas d&apos;usage 
                  et résultats concrets.
                </p>
                <div className=&quot;flex items-center gap-4&quot;>
                  <button className=&quot;bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors&quot;>
                    Lire l&apos;article
                  </button>
                  <span className=&quot;text-sm text-gray-500&quot;>12 min de lecture</span>
                </div>
              </div>
              
              <div className=&quot;h-64 bg-gray-200 rounded-lg flex items-center justify-center&quot;>
                <span className=&quot;text-gray-500&quot;>Image de l&apos;article</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className=&quot;mt-12 flex justify-center&quot;>
          <nav className=&quot;flex items-center space-x-2&quot;>
            <button className=&quot;px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700&quot;>
              Précédent
            </button>
            <button className=&quot;px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-md&quot;>
              1
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              2
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              3
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Suivant
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
