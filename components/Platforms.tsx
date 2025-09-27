import InstagramIcon from "./icons/InstagramIcon";
import FacebookIcon from "./icons/FacebookIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import TikTokIcon from "./icons/TikTokIcon";
import XIcon from "./icons/XIcon";

export default function Platforms() {
  const platforms = [
    {
      name: "Instagram",
      icon: <InstagramIcon className="w-8 h-8" />,
      features: ["Posts", "Stories", "Reels"],
      color: "from-pink-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      name: "Facebook",
      icon: <FacebookIcon className="w-8 h-8" />,
      features: ["Posts", "Carousel", "Reels"],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-600"
    },
    {
      name: "LinkedIn",
      icon: <LinkedInIcon className="w-8 h-8" />,
      features: ["Posts", "Articles", "Polls"],
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-700"
    },
    {
      name: "TikTok",
      icon: <TikTokIcon className="w-8 h-8" />,
      features: ["Videos", "Duets", "Stitch"],
      color: "from-black to-gray-800",
      bgColor: "bg-black"
    },
    {
      name: "X (Twitter)",
      icon: <XIcon className="w-8 h-8" />,
      features: ["Tweets", "Threads", "Spaces"],
      color: "from-gray-800 to-black",
      bgColor: "bg-black"
    }
  ];

  return (
    <section className="py-24" style={{backgroundColor: '#03224c'}}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Optimisé pour toutes les{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              plateformes
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
            Une seule idée, adaptée automatiquement pour chaque réseau social avec les meilleures pratiques
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {platforms.map((platform, index) => (
            <div key={index} className="group relative">
              <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl p-8 text-center h-full">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${platform.bgColor} text-white mb-6`}>
                    {platform.icon}
                  </div>
                  
                  {/* Platform name */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                    {platform.name}
                  </h3>
                  
                  {/* Features */}
                  <div className="space-y-2">
                    {platform.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 group-hover:bg-gray-100 transition-colors">
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
        <div className="mt-20 text-center">
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
