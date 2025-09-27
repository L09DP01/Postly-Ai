"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

export default function NavbarContent() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  // Verificar qual rota está ativa
  const isActiveRoute = (path: string) => {
    return pathname === path;
  };

  return (
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
                {t('nav.chat')}
              </Link>
              <Link
                href="/dashboard/history"
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                  isActiveRoute("/dashboard/history")
                    ? "border-blue-600 text-black"
                    : "border-transparent text-gray-700 hover:border-blue-400 hover:text-black"
                }`}
              >
                {t('nav.history')}
              </Link>
              <Link
                href="/dashboard/billing"
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                  isActiveRoute("/dashboard/billing")
                    ? "border-blue-600 text-black"
                    : "border-transparent text-gray-700 hover:border-blue-400 hover:text-black"
                }`}
              >
                {t('nav.billing')}
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Sélecteur de langue */}
            <LanguageSelector variant="buttons" className="hidden sm:flex" />
            
            {/* Desktop User Menu */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="relative ml-3">
                <div className="flex items-center space-x-4">
                  <span 
                    className="text-sm text-gray-800 font-medium"
                    style={{animation: 'text-glow 3s ease-in-out infinite'}}
                  >
                    {session?.user?.email}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="border-gray-400 text-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:border-transparent hover:text-white transition-all duration-300 hover:scale-105"
                    style={{animation: 'icon-pulse 4s ease-in-out infinite'}}
                  >
                    {t('nav.logout')}
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
                {t('nav.chat')}
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
                {t('nav.history')}
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
                {t('nav.billing')}
              </Link>
              
              {/* Mobile Language Selector */}
              <div className="px-3 py-2 border-t border-gray-200">
                <div className="text-sm font-medium text-gray-700 mb-2">Langue / Language</div>
                <LanguageSelector className="w-full" />
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center px-3 py-2">
                  <span className="text-sm text-gray-800 font-medium mr-auto">
                    {session?.user?.email}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="border-gray-400 text-gray-800 hover:bg-gray-100"
                  >
                    {t('nav.logout')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

