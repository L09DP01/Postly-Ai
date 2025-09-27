"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LanguageProvider } from "@/lib/contexts/LanguageContext";
import NavbarContent from "@/components/NavbarContent";

// Composant interne qui utilise les hooks
function AppLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

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
      <NavbarContent />

      {/* Main content */}
      <main className="relative z-10 mx-auto max-w-7xl py-3 sm:py-6 px-2 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

// Composant principal avec provider
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <AppLayoutContent>
        {children}
      </AppLayoutContent>
    </LanguageProvider>
  );
}
