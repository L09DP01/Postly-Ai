import Navbar from "@/components/Navbar";
import HeroDemo from "@/components/HeroDemo";
import Features from "@/components/Features";
import PricingTable from "@/components/PricingTable";
import FaqAccordion from "@/components/FaqAccordion";
import Footer from "@/components/Footer";

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Postly AI",
  "description": "Générateur de posts optimisés pour les réseaux sociaux avec IA",
  "url": "https://postly-ai.vercel.app",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "127"
  }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Comment fonctionne Postly AI ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il suffit de décrire votre idée de post en quelques mots. Notre IA analyse votre demande, identifie le secteur d'activité, la plateforme cible et génère automatiquement 3 variantes optimisées avec hashtags et CTA."
      }
    },
    {
      "@type": "Question",
      "name": "Puis-je personnaliser le ton des posts ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolument ! Vous pouvez choisir parmi plusieurs tons : professionnel, décontracté, vendeur, inspirant, humoristique, etc. L'IA s'adapte à votre style de communication."
      }
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <Navbar />
      <HeroDemo />
      <Features />
      <PricingTable />
      <FaqAccordion />
      <Footer />
    </>
  );
}
