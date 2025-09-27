"use client";
import Link from "next/link";
import { Button } from "./ui/Button";

export default function HeroDemo() {
  const demoPosts = [
    {
      idea: "Nouveau burger épicé 🔥",
      content: "🍔 Découvrez notre nouveau burger épicé ! Une explosion de saveurs qui va vous faire fondre... Parfait pour les amateurs de sensations fortes ! #BurgerEpice #Nouveaute #Restaurant"
    },
    {
      idea: "-20% ce week-end 🍕",
      content: "🎉 WEEK-END PROMO ! 🎉 Profitez de -20% sur toute notre carte ce week-end ! Pizzas, pâtes, desserts... Tout y est ! Réservez vite, places limitées ! #Promo #Weekend #Pizza"
    },
    {
      idea: "Atelier gratuit samedi 🎉",
      content: "🎨 ATELIER GRATUIT SAMEDI ! Apprenez les bases du design avec nos experts. Matériel fourni, ambiance conviviale. Inscription obligatoire en ligne ! #Atelier #Gratuit #Design"
    }
  ];

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20" style={{ backgroundColor: '#03224c' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left side - Text content */}
          <div className="space-y-6 lg:space-y-8">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Générez des posts qui{" "}
              <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                performent
              </span>
              , en 10 secondes.
            </h1>
            
            <p className="text-base text-white sm:text-lg">
              Postly AI transforme une idée en 3 posts prêts à copier. SEO optimisé, hashtags pertinents et CTA efficaces inclus.
            </p>
            
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/auth/register">Essayer gratuitement</Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/auth/login" className="text-white border-white hover:bg-white hover:text-black">Connexion</Link>
              </Button>
            </div>
          </div>

          {/* Right side - Demo cards */}
          <div className="space-y-4 sm:space-y-6">
            {demoPosts.map((post, index) => (
              <div key={index} className="rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] p-4 sm:p-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-primary-500"></div>
                    <span className="text-xs sm:text-sm font-medium text-gray-600">Idée</span>
                  </div>
                  
                  <p className="font-semibold text-gray-900 text-base sm:text-lg">
                    {post.idea}
                  </p>
                  
                  <div className="border-l-4 border-primary-500 pl-3 sm:pl-4">
                    <div className="text-xs sm:text-sm text-gray-600 mb-2 font-medium">
                      → 3 posts générés
                    </div>
                    <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {post.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}