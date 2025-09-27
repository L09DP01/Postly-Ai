&quot;use client&quot;;
import { useSession, signOut } from &quot;next-auth/react&quot;;
import { useRouter, usePathname } from &quot;next/navigation&quot;;
import { useEffect, useState } from &quot;react&quot;;
import Link from &quot;next/link&quot;;
import { Button } from &quot;@/components/ui/Button&quot;;

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Verificar qual rota está ativa
  const isActiveRoute = (path: string) => {
    return pathname === path;
  };

  useEffect(() => {
    if (status === &quot;unauthenticated&quot;) {
      router.push(&quot;/auth/login&quot;);
    } else if (status === &quot;authenticated&quot;) {
      // Rediriger automatiquement vers le chat au lieu du dashboard
      if (pathname.startsWith(&quot;/dashboard&quot;) && pathname.length > 9) {
        return; // Déjà sur la page dashboard/generate
      } else {
        router.push(&quot;/dashboard&quot;);
      }
    }
  }, [status, router, pathname]);

  if (status === &quot;loading&quot;) {
    return (
      <div className=&quot;min-h-screen flex items-center justify-center&quot;>
        <div className=&quot;animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500&quot;></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className=&quot;min-h-screen flex items-center justify-center&quot;>
        <div className=&quot;animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500&quot;></div>
      </div>
    );
  }

  return (
    <div className=&quot;min-h-screen relative&quot; style={{
      backgroundColor: '#03224c'
    }}>
      <style jsx global>{`
        @keyframes logo-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
          50% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2); }
        }
        @keyframes icon-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes subtle-shine {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
      
      {/* Subtle animated elements - only logos, text and icons */}
      <div className=&quot;absolute inset-0 overflow-hidden pointer-events-none&quot;>
        {/* Starting animation elements that dont interfere with content */}
      </div>
      {/* Navigation */}
      <nav className=&quot;bg-white shadow-lg border-b-2 border-gray-300 relative z-20&quot;>
        <div className=&quot;mx-auto max-w-7xl px-4 sm:px-6 lg:px-8&quot;>
          <div className=&quot;flex h-16 justify-between&quot;>
            <div className=&quot;flex&quot;>
              <div className=&quot;flex flex-shrink-0 items-center&quot;>
                <Link href=&quot;/&quot; className=&quot;flex items-center space-x-3 hover:no-underline&quot;>
                  <img 
                    src=&quot;/logo.png&quot; 
                    alt=&quot;Postly AI&quot; 
                    className=&quot;h-8 w-8 sm:h-12 sm:w-12 rounded-lg object-contain shadow-sm&quot;
                    style={{animation: 'logo-bounce 3s ease-in-out infinite'}}
                  />
                  <span 
                    className=&quot;text-xl sm:text-2xl font-bold text-black&quot;
                    style={{animation: 'text-glow 2s ease-in-out infinite'}}
                  >
                    Postly AI
                  </span>
                </Link>
              </div>
              {/* Desktop Menu */}
              <div className=&quot;hidden md:ml-6 md:flex md:space-x-6&quot;>
                <Link
                  href=&quot;/dashboard&quot;
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    isActiveRoute(&quot;/dashboard&quot;)
                      ? &quot;border-blue-600 text-black&quot;
                      : &quot;border-transparent text-gray-700 hover:border-blue-400 hover:text-black&quot;
                  }`}
                >
                  Chat
                </Link>
                <Link
                  href=&quot;/dashboard/history&quot;
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    isActiveRoute(&quot;/dashboard/history&quot;)
                      ? &quot;border-blue-600 text-black&quot;
                      : &quot;border-transparent text-gray-700 hover:border-blue-400 hover:text-black&quot;
                  }`}
                >
                  Historique
                </Link>
                            <Link
                              href=&quot;/dashboard/billing&quot;
                              className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                                isActiveRoute(&quot;/dashboard/billing&quot;)
                                  ? &quot;border-blue-600 text-black&quot;
                                  : &quot;border-transparent text-gray-700 hover:border-blue-400 hover:text-black&quot;
                              }`}
                            >
                              Facturation
                            </Link>
              </div>
            </div>
            
            <div className=&quot;flex items-center&quot;>
              {/* Desktop User Menu */}
              <div className=&quot;hidden sm:ml-6 sm:flex sm:items-center&quot;>
                <div className=&quot;relative ml-3&quot;>
                  <div className=&quot;flex items-center space-x-4&quot;>
                    <span 
                      className=&quot;text-sm text-gray-800 font-medium&quot;
                      style={{animation: 'text-glow 3s ease-in-out infinite'}}
                    >
                      {session.user?.email}
                    </span>
                    <Button
                      variant=&quot;outline&quot;
                      size=&quot;sm&quot;
                      onClick={() => signOut({ callbackUrl: &quot;/&quot; })}
                      className=&quot;border-gray-400 text-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:border-transparent hover:text-white transition-all duration-300 hover:scale-105&quot;
                      style={{animation: &apos;icon-pulse 4s ease-in-out infinite}}
                    >
                      Déconnexion
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant=&quot;outline&quot;
                size=&quot;sm&quot;
                className=&quot;sm:hidden&quot;
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{animation: &apos;icon-pulse 5s ease-in-out infinite}}
              >
                ☰
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
            {/* Backdrop */}
            <div 
              className=&quot;fixed inset-0 bg-black bg-opacity-25 z-40&quot;
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Menu */}
            <div className=&quot;absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50&quot;>
              <div className=&quot;px-2 pt-2 pb-3 space-y-1&quot;>
                <Link
                  href=&quot;/dashboard&quot;
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActiveRoute(&quot;/dashboard&quot;)
                      ? &quot;text-blue-600 bg-blue-50&quot;
                      : &quot;text-gray-700 hover:bg-gray-50 hover:text-gray-900&quot;
                  } hover:bg-blue-100`}
                >
                  Chat
                </Link>
                <Link
                  href=&quot;/dashboard/history&quot;
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActiveRoute(&quot;/dashboard/history&quot;)
                      ? &quot;text-blue-600 bg-blue-50&quot;
                      : &quot;text-gray-700 hover:bg-gray-50 hover:text-gray-900&quot;
                  }`}
                >
                  Historique
                </Link>
                            <Link
                              href=&quot;/dashboard/billing&quot;
                              onClick={() => setMobileMenuOpen(false)}
                              className={`block px-3 py-2 rounded-md text-base font-medium ${
                                isActiveRoute(&quot;/dashboard/billing&quot;)
                                  ? &quot;text-blue-600 bg-blue-50&quot;
                                  : &quot;text-gray-700 hover:bg-gray-50 hover:text-gray-900&quot;
                              }`}
                            >
                              Facturation
                            </Link>
                <div className=&quot;border-t border-gray-200 pt-3&quot;>
                  <div className=&quot;flex items-center px-3 py-2&quot;>
                    <span className=&quot;text-sm text-gray-800 font-medium mr-auto&quot;>
                      {session.user?.email}
                    </span>
                    <Button
                      variant=&quot;outline&quot;
                      size=&quot;sm&quot;
                      onClick={() => signOut({ callbackUrl: &quot;/&quot; })}
                      className=&quot;border-gray-400 text-gray-800 hover:bg-gray-100&quot;
                    >
                      Déconnexion
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 mx-auto max-w-7xl py-3 sm:py-6 px-2 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
