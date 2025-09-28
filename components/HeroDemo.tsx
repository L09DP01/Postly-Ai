"use client";
import Link from "next/link";
import { Button } from "./ui/Button";

export default function HeroDemo() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-purple-100/10 px-4 py-2 text-sm text-purple-300 ring-1 ring-purple-200/20 mb-8">
            <span className="mr-2">🚀</span>
            Nouvelle IA pour créer du contenu engageant
          </div>

          {/* Main Heading */}
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Transformez vos idées en{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              contenu viral
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Postly AI génère des posts optimisés pour Instagram, Facebook, TikTok et LinkedIn. 
            SEO intégré, hashtags pertinents, prêt à publier en 10 secondes.
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg" asChild>
              <Link href="/auth/register">
                Commencer gratuitement
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-gray-300 text-white hover:bg-white hover:text-black px-8 py-4 text-lg" asChild>
              <Link href="/auth/login">
                Se connecter
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10s</div>
              <div className="text-sm text-gray-400">Génération</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">3</div>
              <div className="text-sm text-gray-400">Variantes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">5+</div>
              <div className="text-sm text-gray-400">Plateformes</div>
            </div>
          </div>
        </div>

        {/* Demo Preview */}
        <div className="mt-20">
          <div className="mx-auto max-w-4xl">
            <div className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">P</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Postly AI</div>
                    <div className="text-gray-400 text-sm">Génération en cours...</div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-white text-sm">
                    <div className="mb-2">💡 Idée: "Nouveau burger épicé 🔥"</div>
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