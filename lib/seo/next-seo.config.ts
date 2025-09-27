import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  titleTemplate: "%s | Postly AI",
  defaultTitle: "Postly AI — Générateur de posts IA",
  description: "Générez des posts optimisés en 10 secondes (SEO, hashtags, CTA). Transformez vos idées en contenus engageants pour Instagram, Facebook, TikTok et LinkedIn.",
  canonical: "https://postly-ai.vercel.app",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://postly-ai.vercel.app",
    site_name: "Postly AI",
    title: "Postly AI — Générateur de posts IA",
    description: "Générez des posts optimisés en 10 secondes (SEO, hashtags, CTA). Transformez vos idées en contenus engageants pour Instagram, Facebook, TikTok et LinkedIn.",
    images: [
      {
        url: "https://postly-ai.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Postly AI - Générateur de posts IA",
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
    site: "@postlyai",
    handle: "@postlyai",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content: "posts, réseaux sociaux, IA, marketing, Instagram, Facebook, TikTok, LinkedIn, génération de contenu, SEO, hashtags",
    },
    {
      name: "author",
      content: "Postly AI",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
};

export default config;
