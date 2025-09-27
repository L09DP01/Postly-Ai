"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import logo from "@/public/logo.png"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-blue-200 bg-blue-100 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img 
            src={logo.src} 
            alt="Postly AI" 
            className="h-10 w-10 sm:h-10 sm:w-10 rounded-lg object-contain"
          />
          <span className="font-bold text-lg sm:text-xl text-gray-800">Postly AI</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          <Link href="/pricing" className="text-blue-800 hover:underline hover:text-blue-600">Tarifs</Link>
          <Link href="/contact" className="text-blue-800 hover:underline hover:text-blue-600">Contact</Link>
          
          {session ? (
            // Utilisateur connecté - Affichage icône profil + options
            <div className="flex items-center gap-3">
              <Link href="/dashboard/generate" className="flex items-center space-x-2 text-blue-800 hover:text-blue-600 transition-colors">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <span className="hidden lg:inline font-medium">{session.user?.email?.split('@')[0] || 'Profil'}</span>
              </Link>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="hidden lg:block text-gray-500 hover:text-red-500 text-xs font-medium transition-colors"
                title="Se déconnecter"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            // Utilisateur non connecté - Boutons connexion/inscription
            <>
              <Link href="/auth/login" className="rounded-xl border border-blue-800 text-blue-800 px-3 py-1.5 hover:bg-blue-800 hover:text-white">Connexion</Link>
              <Link href="/auth/register" className="rounded-xl bg-black px-3 py-1.5 text-white hover:opacity-90">Commencer</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
        >
          <span className={`block h-1 w-6 bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block h-1 w-6 bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-1 w-6 bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 bg-blue-100">
          <div className="flex flex-col space-y-4 text-sm">
            <Link 
              href="/pricing" 
              className="text-blue-800 hover:text-blue-600 py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tarifs
            </Link>
            <Link 
              href="/contact" 
              className="text-blue-800 hover:text-blue-600 py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {session ? (
              // Utilisateur connecté - Options du menu mobile
              <>
                <Link 
                  href="/dashboard/generate" 
                  className="flex items-center space-x-2 text-blue-800 hover:text-blue-600 py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Tableau de bord</span>
                </Link>
                <Link 
                  href="/dashboard/billing" 
                  className="text-blue-800 hover:text-blue-600 py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Facturation
                </Link>
                <button 
                  className="rounded-xl border border-red-500 text-red-500 px-4 py-2 text-center hover:bg-red-500 hover:text-white transition-all"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                >
                  Déconnexion
                </button>
              </>
            ) : (
              // Utilisateur non connecté - Boutons connexion/inscription
              <>
                <Link 
                  href="/auth/login" 
                  className="rounded-xl border border-blue-800 text-blue-800 px-4 py-3 text-center hover:bg-blue-800 hover:text-white transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  href="/auth/register" 
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