&quot;use client&quot;;
import Link from &quot;next/link&quot;;
import { Button } from &quot;./ui/Button&quot;;

export default function HeroDemo() {
  return (
    <section className=&quot;relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900&quot;>
      {/* Background Effects */}
      <div className=&quot;absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]&quot;></div>
      
      <div className=&quot;relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32&quot;>
        <div className=&quot;text-center&quot;>
          {/* Badge */}
          <div className=&quot;inline-flex items-center rounded-full bg-purple-100/10 px-4 py-2 text-sm text-purple-300 ring-1 ring-purple-200/20 mb-8&quot;>
            <span className=&quot;mr-2&quot;>🚀</span>
            Nouvelle IA pour créer du contenu engageant
          </div>

          {/* Main Heading */}
          <h1 className=&quot;mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl&quot;>
            Transformez vos idées en{&quot; &quot;}
            <span className=&quot;bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent&quot;>
              contenu viral
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className=&quot;mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300&quot;>
            Postly AI génère des posts optimisés pour Instagram, Facebook, TikTok et LinkedIn. 
            SEO intégré, hashtags pertinents, prêt à publier en 10 secondes.
          </p>
          
          {/* CTA Buttons */}
          <div className=&quot;mt-10 flex items-center justify-center gap-x-6&quot;>
            <Button size=&quot;lg&quot; className=&quot;bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg&quot; asChild>
              <Link href=&quot;/auth/register&quot;>
                Commencer gratuitement
              </Link>
            </Button>
            <Button variant=&quot;outline&quot; size=&quot;lg&quot; className=&quot;border-gray-300 text-white hover:bg-white hover:text-black px-8 py-4 text-lg&quot; asChild>
              <Link href=&quot;/auth/login&quot;>
                Se connecter
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className=&quot;mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3&quot;>
            <div className=&quot;text-center&quot;>
              <div className=&quot;text-3xl font-bold text-white&quot;>10s</div>
              <div className=&quot;text-sm text-gray-400&quot;>Génération</div>
            </div>
            <div className=&quot;text-center&quot;>
              <div className=&quot;text-3xl font-bold text-white&quot;>3</div>
              <div className=&quot;text-sm text-gray-400&quot;>Variantes</div>
            </div>
            <div className=&quot;text-center&quot;>
              <div className=&quot;text-3xl font-bold text-white&quot;>5+</div>
              <div className=&quot;text-sm text-gray-400&quot;>Plateformes</div>
            </div>
          </div>
        </div>

        {/* Demo Preview */}
        <div className=&quot;mt-20&quot;>
          <div className=&quot;mx-auto max-w-4xl&quot;>
            <div className=&quot;relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8&quot;>
              <div className=&quot;absolute -top-4 left-1/2 transform -translate-x-1/2&quot;>
                <div className=&quot;flex space-x-2&quot;>
                  <div className=&quot;w-3 h-3 rounded-full bg-red-500&quot;></div>
                  <div className=&quot;w-3 h-3 rounded-full bg-yellow-500&quot;></div>
                  <div className=&quot;w-3 h-3 rounded-full bg-green-500&quot;></div>
                </div>
              </div>
              
              <div className=&quot;space-y-4&quot;>
                <div className=&quot;flex items-center space-x-3&quot;>
                  <div className=&quot;w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center&quot;>
                    <span className=&quot;text-white text-sm font-bold&quot;>P</span>
                  </div>
                  <div>
                    <div className=&quot;text-white font-medium&quot;>Postly AI</div>
                    <div className=&quot;text-gray-400 text-sm&quot;>Génération en cours...</div>
                  </div>
                </div>
                
                <div className=&quot;bg-gray-800 rounded-lg p-4&quot;>
                  <div className=&quot;text-white text-sm&quot;>
                    <div className=&quot;mb-2&quot;>💡 Idée: "Nouveau burger épicé 🔥"</div>
                    <div className="text-gray-300">
                      🍔 Découvrez notre nouveau burger épicé ! Une explosion de saveurs...
                      <br />
                      #BurgerEpice #Nouveaute #Restaurant
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}