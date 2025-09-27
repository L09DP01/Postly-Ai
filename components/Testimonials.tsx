export default function Testimonials() {
  const testimonials = [
    {
      name: &quot;Sarah M.&quot;,
      role: &quot;Influenceuse Lifestyle&quot;,
      avatar: &quot;👩‍💼&quot;,
      content: &quot;Postly AI a révolutionné ma façon de créer du contenu. En 10 secondes, j&apos;ai 3 posts prêts à publier !&quot;,
      rating: 5,
      platform: &quot;Instagram&quot;
    },
    {
      name: &quot;Marc D.&quot;,
      role: &quot;Entrepreneur&quot;,
      avatar: &quot;👨‍💻&quot;,
      content: &quot;Plus besoin de passer des heures à réfléchir aux posts. L'IA comprend parfaitement mon brand.&quot;,
      rating: 5,
      platform: &quot;LinkedIn&quot;
    },
    {
      name: &quot;Emma L.&quot;,
      role: &quot;Coach Fitness&quot;,
      avatar: &quot;👩‍🏫&quot;,
      content: &quot;Les hashtags SEO sont parfaits, mes posts ont 3x plus d'engagement maintenant !&quot;,
      rating: 5,
      platform: &quot;TikTok&quot;
    }
  ];

  return (
    <section className=&quot;py-24 bg-white&quot;>
      <div className=&quot;mx-auto max-w-7xl px-4 sm:px-6 lg:px-8&quot;>
        <div className=&quot;text-center mb-20&quot;>
          <h2 className=&quot;text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl&quot;>
            Ils ont{&quot; &quot;}
            <span className=&quot;bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent&quot;>
              transformé
            </span>{&quot; &quot;}
            leur contenu
          </h2>
          <p className=&quot;mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto&quot;>
            Découvrez comment Postly AI aide les créateurs et entrepreneurs à générer du contenu engageant
          </p>
        </div>

        <div className=&quot;grid grid-cols-1 gap-8 lg:grid-cols-3&quot;>
          {testimonials.map((testimonial, index) => (
            <div key={index} className=&quot;relative&quot;>
              <div className=&quot;relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl p-8 h-full&quot;>
                {/* Quote icon */}
                <div className=&quot;absolute top-6 right-6 text-purple-200 text-4xl&quot;>
                  &quot;
                </div>
                
                {/* Rating */}
                <div className=&quot;flex items-center mb-4&quot;>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className=&quot;w-5 h-5 text-yellow-400&quot; fill=&quot;currentColor&quot; viewBox=&quot;0 0 20 20&quot;>
                      <path d=&quot;M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z&quot; />
                    </svg>
                  ))}
                </div>

                {/* Content */}
                <blockquote className=&quot;text-gray-700 text-lg leading-relaxed mb-6&quot;>
                  &quot;{testimonial.content}&quot;
                </blockquote>

                {/* Author */}
                <div className=&quot;flex items-center&quot;>
                  <div className=&quot;flex-shrink-0&quot;>
                    <div className=&quot;w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl&quot;>
                      {testimonial.avatar}
                    </div>
                  </div>
                  <div className=&quot;ml-4&quot;>
                    <div className=&quot;text-base font-medium text-gray-900&quot;>
                      {testimonial.name}
                    </div>
                    <div className=&quot;text-sm text-gray-500&quot;>
                      {testimonial.role}
                    </div>
                  </div>
                  <div className=&quot;ml-auto&quot;>
                    <div className=&quot;text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full&quot;>
                      {testimonial.platform}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className=&quot;mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3&quot;>
          <div className=&quot;text-center&quot;>
            <div className=&quot;text-4xl font-bold text-purple-600&quot;>10k+</div>
            <div className=&quot;text-sm text-gray-600&quot;>Posts générés</div>
          </div>
          <div className=&quot;text-center&quot;>
            <div className=&quot;text-4xl font-bold text-purple-600&quot;>98%</div>
            <div className=&quot;text-sm text-gray-600&quot;>Satisfaction client</div>
          </div>
          <div className=&quot;text-center&quot;>
            <div className=&quot;text-4xl font-bold text-purple-600&quot;>5★</div>
            <div className=&quot;text-sm text-gray-600">Note moyenne</div>
          </div>
        </div>
      </div>
    </section>
  );
}
