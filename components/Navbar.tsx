&quot;use client&quot;;
import Link from &quot;next/link&quot;;
import { useState } from &quot;react&quot;;
import { useSession, signOut } from &quot;next-auth/react&quot;;
import logo from &quot;@/public/logo.png&quot;

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <header className=&quot;sticky top-0 z-40 w-full border-b border-blue-200 bg-blue-100 backdrop-blur&quot;>
      <nav className=&quot;mx-auto flex max-w-6xl items-center justify-between px-4 py-3&quot;>
        {/* Logo */}
        <Link href=&quot;/&quot; className=&quot;flex items-center space-x-2&quot;>
          <img 
            src={logo.src} 
            alt=&quot;Postly AI&quot; 
            className=&quot;h-10 w-10 sm:h-10 sm:w-10 rounded-lg object-contain&quot;
          />
          <span className=&quot;font-bold text-lg sm:text-xl text-gray-800&quot;>Postly AI</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className=&quot;hidden md:flex items-center gap-4 text-sm&quot;>
          <Link href=&quot;/pricing&quot; className=&quot;text-blue-800 hover:underline hover:text-blue-600&quot;>Tarifs</Link>
          <Link href=&quot;/contact&quot; className=&quot;text-blue-800 hover:underline hover:text-blue-600&quot;>Contact</Link>
          
          {session ? (
            // Utilisateur connecté - Affichage icône profil + options
            <div className=&quot;flex items-center gap-3&quot;>
              <Link href=&quot;/dashboard&quot; className=&quot;flex items-center space-x-2 text-blue-800 hover:text-blue-600 transition-colors&quot;>
                <div className=&quot;w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center&quot;>
                  <svg className=&quot;w-4 h-4 text-white&quot; fill=&quot;currentColor&quot; viewBox=&quot;0 0 20 20&quot;>
                    <path fillRule=&quot;evenodd&quot; d=&quot;M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z&quot; clipRule=&quot;evenodd&quot;></path>
                  </svg>
                </div>
                <span className=&quot;hidden lg:inline font-medium&quot;>{session.user?.email?.split(&apos;@&apos;)[0] || &apos;Profil}</span>
              </Link>
              <button 
                onClick={() => signOut({ callbackUrl: &apos;/ })}
                className=&quot;hidden lg:block text-gray-500 hover:text-red-500 text-xs font-medium transition-colors&quot;
                title=&quot;Se déconnecter&quot;
              >
                Déconnexion
              </button>
            </div>
          ) : (
            // Utilisateur non connecté - Boutons connexion/inscription
            <>
              <Link href=&quot;/auth/login&quot; className=&quot;rounded-xl border border-blue-800 text-blue-800 px-3 py-1.5 hover:bg-blue-800 hover:text-white&quot;>Connexion</Link>
              <Link href=&quot;/auth/register&quot; className=&quot;rounded-xl bg-black px-3 py-1.5 text-white hover:opacity-90&quot;>Commencer</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className=&quot;md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1&quot;
        >
          <span className={`block h-1 w-6 bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block h-1 w-6 bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-1 w-6 bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className=&quot;md:hidden px-4 pb-4 bg-blue-100&quot;>
          <div className=&quot;flex flex-col space-y-4 text-sm&quot;>
            <Link 
              href=&quot;/pricing&quot; 
              className=&quot;text-blue-800 hover:text-blue-600 py-2 transition-colors&quot;
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tarifs
            </Link>
            <Link 
              href=&quot;/contact&quot; 
              className=&quot;text-blue-800 hover:text-blue-600 py-2 transition-colors&quot;
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {session ? (
              // Utilisateur connecté - Options du menu mobile
              <>
                <Link 
                  href=&quot;/dashboard&quot; 
                  className=&quot;flex items-center space-x-2 text-blue-800 hover:text-blue-600 py-2 transition-colors&quot;
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className=&quot;w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center&quot;>
                    <svg className=&quot;w-3 h-3 text-white&quot; fill=&quot;currentColor&quot; viewBox=&quot;0 0 20 20&quot;>
                      <path fillRule=&quot;evenodd&quot; d=&quot;M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z&quot; clipRule=&quot;evenodd&quot;></path>
                    </svg>
                  </div>
                  <span>Tableau de bord</span>
                </Link>
                <Link 
                  href=&quot;/dashboard/billing&quot; 
                  className=&quot;text-blue-800 hover:text-blue-600 py-2 transition-colors&quot;
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Facturation
                </Link>
                <button 
                  className=&quot;rounded-xl border border-red-500 text-red-500 px-4 py-2 text-center hover:bg-red-500 hover:text-white transition-all&quot;
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut({ callbackUrl: &apos;/ });
                  }}
                >
                  Déconnexion
                </button>
              </>
            ) : (
              // Utilisateur non connecté - Boutons connexion/inscription
              <>
                <Link 
                  href=&quot;/auth/login&quot; 
                  className=&quot;rounded-xl border border-blue-800 text-blue-800 px-4 py-3 text-center hover:bg-blue-800 hover:text-white transition-all&quot;
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  href=&quot;/auth/register&quot; 
                  className="rounded-xl bg-black px-4 py-3 text-white text-center hover:opacity-90 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Commencer
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}