import type { Metadata } from &quot;next&quot;;
import { Inter } from &quot;next/font/google&quot;;
import { Providers } from &quot;@/components/providers&quot;;
import &quot;./globals.css&quot;;

const inter = Inter({ subsets: [&quot;latin&quot;] });

export const metadata: Metadata = {
  title: &quot;Postly AI — Générateur de posts IA&quot;,
  description: &quot;Générez des posts optimisés en 10 secondes (SEO, hashtags, CTA).&quot;,
  keywords: [&quot;posts&quot;, &quot;réseaux sociaux&quot;, &quot;IA&quot;, &quot;marketing&quot;, &quot;Instagram&quot;, &quot;Facebook&quot;, &quot;TikTok&quot;],
  authors: [{ name: &quot;Postly AI&quot; }],
  creator: &quot;Postly AI&quot;,
  publisher: &quot;Postly AI&quot;,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(&quot;https://postly-ai.vercel.app&quot;),
  alternates: {
    canonical: &quot;/&quot;,
  },
  openGraph: {
    type: &quot;website&quot;,
    locale: &quot;fr_FR&quot;,
    url: &quot;/&quot;,
    title: &quot;Postly AI — Générateur de posts IA&quot;,
    description: &quot;Générez des posts optimisés en 10 secondes (SEO, hashtags, CTA).&quot;,
    siteName: &quot;Postly AI&quot;,
  },
  twitter: {
    card: &quot;summary_large_image&quot;,
    title: &quot;Postly AI — Générateur de posts IA&quot;,
    description: &quot;Générez des posts optimisés en 10 secondes (SEO, hashtags, CTA).&quot;,
    creator: &quot;@postlyai&quot;,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      &quot;max-video-preview&quot;: -1,
      &quot;max-image-preview&quot;: &quot;large&quot;,
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
