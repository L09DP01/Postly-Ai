import { DefaultSeoProps } from &quot;next-seo&quot;;

const config: DefaultSeoProps = {
  titleTemplate: &quot;%s | Postly AI&quot;,
  defaultTitle: &quot;Postly AI — Générateur de posts IA&quot;,
  description: &quot;Générez des posts optimisés en 10 secondes (SEO, hashtags, CTA). Transformez vos idées en contenus engageants pour Instagram, Facebook, TikTok et LinkedIn.&quot;,
  canonical: &quot;https://postly-ai.vercel.app&quot;,
  openGraph: {
    type: &quot;website&quot;,
    locale: &quot;fr_FR&quot;,
    url: &quot;https://postly-ai.vercel.app&quot;,
    site_name: &quot;Postly AI&quot;,
    title: &quot;Postly AI — Générateur de posts IA&quot;,
    description: &quot;Générez des posts optimisés en 10 secondes (SEO, hashtags, CTA). Transformez vos idées en contenus engageants pour Instagram, Facebook, TikTok et LinkedIn.&quot;,
    images: [
      {
        url: &quot;https://postly-ai.vercel.app/og-image.jpg&quot;,
        width: 1200,
        height: 630,
        alt: &quot;Postly AI - Générateur de posts IA&quot;,
      },
    ],
  },
  twitter: {
    cardType: &quot;summary_large_image&quot;,
    site: &quot;@postlyai&quot;,
    handle: &quot;@postlyai&quot;,
  },
  additionalMetaTags: [
    {
      name: &quot;keywords&quot;,
      content: &quot;posts, réseaux sociaux, IA, marketing, Instagram, Facebook, TikTok, LinkedIn, génération de contenu, SEO, hashtags&quot;,
    },
    {
      name: &quot;author&quot;,
      content: &quot;Postly AI&quot;,
    },
    {
      name: &quot;robots&quot;,
      content: &quot;index, follow&quot;,
    },
    {
      name: &quot;viewport&quot;,
      content: &quot;width=device-width, initial-scale=1&quot;,
    },
  ],
  additionalLinkTags: [
    {
      rel: &quot;icon&quot;,
      href: &quot;/favicon.ico&quot;,
    },
    {
      rel: &quot;apple-touch-icon&quot;,
      href: &quot;/apple-touch-icon.png&quot;,
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
};

export default config;
