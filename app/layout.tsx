import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Postly AI — Générateur de posts IA",
  description: "Générez des posts optimisés en 10 secondes (SEO, hashtags, CTA).",
  keywords: ["posts", "réseaux sociaux", "IA", "marketing", "Instagram", "Facebook", "TikTok"],
  authors: [{ name: "Postly AI" }],
  creator: "Postly AI",
  publisher: "Postly AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://postly-ai.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    title: "Postly AI — Générateur de posts IA",
    description: "Générez des posts optimisés en 10 secondes (SEO, hashtags, CTA).",
    siteName: "Postly AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Postly AI — Générateur de posts IA",
    description: "Générez des posts optimisés en 10 secondes (SEO, hashtags, CTA).",
    creator: "@postlyai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
