export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Influenceuse Lifestyle",
      avatar: "👩‍💼",
      content: "Postly AI a révolutionné ma façon de créer du contenu. En 10 secondes, j'ai 3 posts prêts à publier !",
      rating: 5,
      platform: "Instagram"
    },
    {
      name: "Marc D.",
      role: "Entrepreneur",
      avatar: "👨‍💻",
      content: "Plus besoin de passer des heures à réfléchir aux posts. L'IA comprend parfaitement mon brand.",
      rating: 5,
      platform: "LinkedIn"
    },
    {
      name: "Emma L.",
      role: "Coach Fitness",
      avatar: "👩‍🏫",
      content: "Les hashtags SEO sont parfaits, mes posts ont 3x plus d'engagement maintenant !",
      rating: 5,
      platform: "TikTok"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Ils ont{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              transformé
            </span>{" "}
            leur contenu
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
            Découvrez comment Postly AI aide les créateurs et entrepreneurs à générer du contenu engageant
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl p-8 h-full">
                {/* Quote icon */}
                <div className="absolute top-6 right-6 text-purple-200 text-4xl">
                  "
                </div>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl">
                      {testimonial.avatar}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-base font-medium text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                      {testimonial.platform}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">10k+</div>
            <div className="text-sm text-gray-600">Posts générés</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">98%</div>
            <div className="text-sm text-gray-600">Satisfaction client</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">5★</div>
            <div className="text-sm text-gray-600">Note moyenne</div>
          </div>
        </div>
      </div>
    </section>
  );
}

