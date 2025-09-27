import Navbar from &quot;@/components/Navbar&quot;;
import HeroDemo from &quot;@/components/HeroDemo&quot;;
import Features from &quot;@/components/Features&quot;;
import Platforms from &quot;@/components/Platforms&quot;;
import Testimonials from &quot;@/components/Testimonials&quot;;
import PricingTable from &quot;@/components/PricingTable&quot;;
import FaqAccordion from &quot;@/components/FaqAccordion&quot;;
import Footer from &quot;@/components/Footer&quot;;

// JSON-LD structured data
const jsonLd = {
  &quot;@context&quot;: &quot;https://schema.org&quot;,
  &quot;@type&quot;: &quot;SoftwareApplication&quot;,
  &quot;name&quot;: &quot;Postly AI&quot;,
  &quot;description&quot;: &quot;Générateur de posts optimisés pour les réseaux sociaux avec IA&quot;,
  &quot;url&quot;: &quot;https://postly-ai.vercel.app&quot;,
  &quot;applicationCategory&quot;: &quot;BusinessApplication&quot;,
  &quot;operatingSystem&quot;: &quot;Web&quot;,
  &quot;offers&quot;: {
    &quot;@type&quot;: &quot;Offer&quot;,
    &quot;price&quot;: &quot;0&quot;,
    &quot;priceCurrency&quot;: &quot;EUR&quot;,
    &quot;availability&quot;: &quot;https://schema.org/InStock&quot;
  },
  &quot;aggregateRating&quot;: {
    &quot;@type&quot;: &quot;AggregateRating&quot;,
    &quot;ratingValue&quot;: &quot;4.8&quot;,
    &quot;ratingCount&quot;: &quot;127&quot;
  }
};

const faqJsonLd = {
  &quot;@context&quot;: &quot;https://schema.org&quot;,
  &quot;@type&quot;: &quot;FAQPage&quot;,
  &quot;mainEntity&quot;: [
    {
      &quot;@type&quot;: &quot;Question&quot;,
      &quot;name&quot;: &quot;Comment fonctionne Postly AI ?&quot;,
      &quot;acceptedAnswer&quot;: {
        &quot;@type&quot;: &quot;Answer&quot;,
        &quot;text&quot;: &quot;Il suffit de décrire votre idée de post en quelques mots. Notre IA analyse votre demande, identifie le secteur d'activité, la plateforme cible et génère automatiquement 3 variantes optimisées avec hashtags et CTA.&quot;
      }
    },
    {
      &quot;@type&quot;: &quot;Question&quot;,
      &quot;name&quot;: &quot;Puis-je personnaliser le ton des posts ?&quot;,
      &quot;acceptedAnswer&quot;: {
        &quot;@type&quot;: &quot;Answer&quot;,
        &quot;text&quot;: "Absolument ! Vous pouvez choisir parmi plusieurs tons : professionnel, décontracté, vendeur, inspirant, humoristique, etc. L'IA s&apos;adapte à votre style de communication."
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
      <Platforms />
      <Testimonials />
      <PricingTable />
      <FaqAccordion />
      <Footer />
    </>
  );
}
