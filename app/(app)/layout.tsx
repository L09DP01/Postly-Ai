"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

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
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      // Rediriger automatiquement vers le chat au lieu du dashboard
      if (pathname.startsWith("/dashboard") && pathname.length > 9) {
        return; // Déjà sur la page dashboard/generate
      } else {
        router.push("/dashboard");
      }
    }
  }, [status, router, pathname]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Starting animation elements that don't interfere with content */}
      </div>
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b-2 border-gray-300 relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/" className="flex items-center space-x-3 hover:no-underline">
                  <img 
                    src="/logo.png" 
                    alt="Postly AI" 
                    className="h-8 w-8 sm:h-12 sm:w-12 rounded-lg object-contain shadow-sm"
                    style={{animation: 'logo-bounce 3s ease-in-out infinite'}}
                  />
                  <span 
                    className="text-xl sm:text-2xl font-bold text-black"
                    style={{animation: 'text-glow 2s ease-in-out infinite'}}
                  >
                    Postly AI
                  </span>
                </Link>
              </div>
              {/* Desktop Menu */}
              <div className="hidden md:ml-6 md:flex md:space-x-6">
                <Link
                  href="/dashboard"
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    isActiveRoute("/dashboard")
                      ? "border-blue-600 text-black"
                      : "border-transparent text-gray-700 hover:border-blue-400 hover:text-black"
                  }`}
                >
                  Chat
                </Link>
                <Link
                  href="/dashboard/history"
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    isActiveRoute("/dashboard/history")
                      ? "border-blue-600 text-black"
                      : "border-transparent text-gray-700 hover:border-blue-400 hover:text-black"
                  }`}
                >
                  Historique
                </Link>
                            <Link
                              href="/dashboard/billing"
                              className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                                isActiveRoute("/dashboard/billing")
                                  ? "border-blue-600 text-black"
                                  : "border-transparent text-gray-700 hover:border-blue-400 hover:text-black"
                              }`}
                            >
                              Facturation
                            </Link>
              </div>
            </div>
            
            <div className="flex items-center">
              {/* Desktop User Menu */}
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <div className="relative ml-3">
                  <div className="flex items-center space-x-4">
                    <span 
                      className="text-sm text-gray-800 font-medium"
                      style={{animation: 'text-glow 3s ease-in-out infinite'}}
                    >
                      {session.user?.email}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="border-gray-400 text-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:border-transparent hover:text-white transition-all duration-300 hover:scale-105"
                      style={{animation: 'icon-pulse 4s ease-in-out infinite'}}
                    >
                      Déconnexion
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="outline"
                size="sm"
                className="sm:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{animation: 'icon-pulse 5s ease-in-out infinite'}}
              >
                ☰
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-25 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Menu */}
            <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActiveRoute("/dashboard")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  } hover:bg-blue-100`}
                >
                  Chat
                </Link>
                <Link
                  href="/dashboard/history"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActiveRoute("/dashboard/history")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  Historique
                </Link>
                            <Link
                              href="/dashboard/billing"
                              onClick={() => setMobileMenuOpen(false)}
                              className={`block px-3 py-2 rounded-md text-base font-medium ${
                                isActiveRoute("/dashboard/billing")
                                  ? "text-blue-600 bg-blue-50"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                              }`}
                            >
                              Facturation
                            </Link>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center px-3 py-2">
                    <span className="text-sm text-gray-800 font-medium mr-auto">
                      {session.user?.email}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="border-gray-400 text-gray-800 hover:bg-gray-100"
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
