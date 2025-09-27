import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Postly AI",
  description: "Découvrez les dernières tendances du marketing digital, conseils SEO, et actualités Postly AI sur notre blog.",
};

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Comment optimiser vos posts Instagram avec l&apos;IA",
      excerpt: "Découvrez les meilleures pratiques pour créer du contenu Instagram engageant grâce à l&apos;intelligence artificielle.",
      date: "2024-01-15",
      category: "Instagram",
      readTime: "5 min",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Les tendances du marketing digital en 2024",
      excerpt: "Un aperçu des tendances qui vont marquer le marketing digital cette année, de l&apos;IA à la réalité augmentée.",
      date: "2024-01-10",
      category: "Marketing",
      readTime: "8 min",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "SEO et réseaux sociaux : comment les combiner",
      excerpt: "Apprenez à optimiser votre contenu social pour améliorer votre référencement naturel.",
      date: "2024-01-05",
      category: "SEO",
      readTime: "6 min",
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "LinkedIn : stratégies pour B2B",
      excerpt: "Maximisez votre présence LinkedIn avec des stratégies adaptées au marketing B2B.",
      date: "2024-01-01",
      category: "LinkedIn",
      readTime: "7 min",
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "TikTok pour les entreprises : guide complet",
      excerpt: "Comment utiliser TikTok efficacement pour promouvoir votre marque et atteindre de nouveaux clients.",
      date: "2023-12-28",
      category: "TikTok",
      readTime: "9 min",
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      title: "L&apos;avenir de l&apos;IA dans le marketing",
      excerpt: "Exploration des possibilités offertes par l&apos;intelligence artificielle dans le domaine du marketing.",
      date: "2023-12-20",
      category: "IA",
      readTime: "10 min",
      image: "/api/placeholder/400/250"
    }
  ];

  const categories = ["Tous", "Instagram", "Marketing", "SEO", "LinkedIn", "TikTok", "IA"];

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ color: '#03224c' }}>
            Blog Postly AI
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les dernières tendances du marketing digital, conseils SEO, 
            et actualités Postly AI pour booster votre présence en ligne.
          </p>
        </div>

        {/* Catégories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === "Tous"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Image</span>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <time className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Lire la suite →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
            Restez informé
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Recevez nos derniers articles et conseils marketing directement dans votre boîte e-mail. 
            Pas de spam, juste du contenu de qualité.
          </p>
          
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              S&apos;abonner
            </button>
          </div>
        </div>

        {/* Featured Article */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8" style={{ color: '#03224c' }}>
            Article à la une
          </h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-4 inline-block">
                  Article vedette
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Comment Postly AI révolutionne la création de contenu
                </h3>
                <p className="text-gray-600 mb-6">
                  Découvrez comment notre plateforme d&apos;IA transforme la façon dont les entreprises 
                  créent leur contenu pour les réseaux sociaux. Témoignages clients, cas d&apos;usage 
                  et résultats concrets.
                </p>
                <div className="flex items-center gap-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Lire l&apos;article
                  </button>
                  <span className="text-sm text-gray-500">12 min de lecture</span>
                </div>
              </div>
              
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Image de l&apos;article</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Précédent
            </button>
            <button className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-md">
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
