import React from &quot;react&quot;;
import InstagramIcon from &quot;./icons/InstagramIcon&quot;;
import FacebookIcon from &quot;./icons/FacebookIcon&quot;;
import LinkedInIcon from &quot;./icons/LinkedInIcon&quot;;
import TikTokIcon from &quot;./icons/TikTokIcon&quot;;
import XIcon from &quot;./icons/XIcon&quot;;

export default function Platforms() {
  const platforms = [
    {
      name: &quot;Instagram&quot;,
      icon: InstagramIcon,
      features: [&quot;Posts&quot;, &quot;Stories&quot;, &quot;Reels&quot;],
      color: &quot;from-pink-500 to-purple-600&quot;,
      bgColor: &quot;bg-gradient-to-br from-purple-500 to-pink-500&quot;
    },
    {
      name: &quot;Facebook&quot;,
      icon: FacebookIcon,
      features: [&quot;Posts&quot;, &quot;Carousel&quot;, &quot;Reels&quot;],
      color: &quot;from-blue-500 to-blue-600&quot;,
      bgColor: &quot;bg-blue-600&quot;
    },
    {
      name: &quot;LinkedIn&quot;,
      icon: LinkedInIcon,
      features: [&quot;Posts&quot;, &quot;Articles&quot;, &quot;Polls&quot;],
      color: &quot;from-blue-600 to-blue-700&quot;,
      bgColor: &quot;bg-blue-700&quot;
    },
    {
      name: &quot;TikTok&quot;,
      icon: TikTokIcon,
      features: [&quot;Videos&quot;, &quot;Duets&quot;, &quot;Stitch&quot;],
      color: &quot;from-black to-gray-800&quot;,
      bgColor: &quot;bg-black&quot;
    },
    {
      name: &quot;X (Twitter)&quot;,
      icon: XIcon,
      features: [&quot;Tweets&quot;, &quot;Threads&quot;, &quot;Spaces&quot;],
      color: &quot;from-gray-800 to-black&quot;,
      bgColor: &quot;bg-black&quot;
    }
  ];

  return (
    <section className=&quot;py-24&quot; style={{backgroundColor: '#03224c'}}>
      <div className=&quot;mx-auto max-w-7xl px-4 sm:px-6 lg:px-8&quot;>
        <div className=&quot;text-center mb-20&quot;>
          <h2 className=&quot;text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl&quot;>
            Optimisé pour toutes les{&quot; &quot;}
            <span className=&quot;bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent&quot;>
              plateformes
            </span>
          </h2>
          <p className=&quot;mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto&quot;>
            Une seule idée, adaptée automatiquement pour chaque réseau social avec les meilleures pratiques
          </p>
        </div>

        <div className=&quot;grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5&quot;>
          {platforms.map((platform, index) => (
            <div key={index} className=&quot;group relative&quot;>
              <div className=&quot;relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl p-8 text-center h-full&quot;>
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className=&quot;relative&quot;>
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${platform.bgColor} text-white mb-6`}>
                    {React.createElement(platform.icon, { className: &quot;w-8 h-8&quot; })}
                  </div>
                  
                  {/* Platform name */}
                  <h3 className=&quot;text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors&quot;>
                    {platform.name}
                  </h3>
                  
                  {/* Features */}
                  <div className=&quot;space-y-2&quot;>
                    {platform.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className=&quot;text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 group-hover:bg-gray-100 transition-colors&quot;>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className=&quot;mt-20 text-center&quot;>
          <div className="inline-flex items-center rounded-full bg-purple-50 px-6 py-3 text-purple-700 ring-1 ring-purple-700/10 mb-8">
            <span className="mr-2">🚀</span>
            Compatible avec toutes vos plateformes
          </div>
          <p className="text-gray-300">
            Plus besoin de reformater manuellement - Postly AI s&apos;adapte automatiquement
          </p>
        </div>
      </div>
    </section>
  );
}
