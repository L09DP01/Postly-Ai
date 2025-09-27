"use client";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo and description */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Postly AI
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Transformez vos idées en contenu viral avec notre IA. 
              Générez des posts optimisés pour tous les réseaux sociaux en 10 secondes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.06 5.877.012 6.944 0 7.284 0 10s.012 3.056.06 4.123c.167 3.632 2.182 5.65 5.817 5.817 1.067.048 1.407.06 4.123.06s3.056-.012 4.123-.06c3.629-.167 5.652-2.182 5.816-5.817.049-1.067.061-1.407.061-4.123s-.012-3.056-.06-4.123C19.714 2.249 17.699.228 14.064.06 12.997.012 12.657 0 10 0zm0 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zm0 3.108a5.09 5.09 0 100 10.18 5.09 5.09 0 000-10.18zm0 8.468a3.38 3.38 0 110-6.76 3.38 3.38 0 010 6.76zm5.213-9.302a1.19 1.19 0 11-2.381 0 1.19 1.19 0 012.38 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Produit</h3>
            <ul className="space-y-3">
              <li><Link href="/pricing" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">Tarifs</Link></li>
              <li><Link href="/features" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">Fonctionnalités</Link></li>
              <li><Link href="/platforms" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">Plateformes</Link></li>
              <li><Link href="/api" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">API</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/help" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">Centre d'aide</Link></li>
              <li><Link href="/docs" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">Documentation</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">Contact</Link></li>
              <li><Link href="/status" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">Statut</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Légal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">Confidentialité</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">Conditions</Link></li>
              <li><Link href="/cookies" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">Cookies</Link></li>
              <li><Link href="/gdpr" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">RGPD</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Postly AI. Tous droits réservés.
            </p>
            <div className="mt-4 sm:mt-0">
              <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-white/80 ring-1 ring-white/20">
                <span className="mr-2">🚀</span>
                Fait avec ❤️ pour les créateurs
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
