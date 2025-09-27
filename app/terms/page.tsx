import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'Utilisation - Postly AI",
  description: "Conditions générales d'utilisation de Postly AI - Termes et conditions de service.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ color: '#03224c' }}>
            Conditions d'Utilisation
          </h1>
          
          <p className="text-gray-600 mb-6">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                1. Acceptation des conditions
              </h2>
              <p className="text-gray-600 leading-relaxed">
                En utilisant Postly AI, vous acceptez d'être lié par ces conditions d'utilisation. 
                Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                2. Description du service
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Postly AI est une plateforme d'intelligence artificielle qui génère du contenu optimisé 
                pour les réseaux sociaux. Nos services incluent :
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                <li>Génération de posts pour réseaux sociaux</li>
                <li>Optimisation SEO et hashtags</li>
                <li>Personnalisation du ton et du style</li>
                <li>Analytics et métriques de performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                3. Compte utilisateur
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Pour utiliser nos services, vous devez créer un compte. Vous vous engagez à :
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                <li>Fournir des informations exactes et à jour</li>
                <li>Maintenir la sécurité de votre mot de passe</li>
                <li>Être responsable de toutes les activités sur votre compte</li>
                <li>Nous notifier immédiatement toute utilisation non autorisée</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                4. Utilisation acceptable
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Vous vous engagez à utiliser Postly AI de manière légale et éthique. Il est interdit de :
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                <li>Générer du contenu illégal, offensant ou diffamatoire</li>
                <li>Violer les droits de propriété intellectuelle</li>
                <li>Tenter de contourner les limitations techniques</li>
                <li>Utiliser le service pour du spam ou du harcèlement</li>
                <li>Partager votre compte avec des tiers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                5. Propriété intellectuelle
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Vous conservez tous les droits sur le contenu que vous générez avec Postly AI. 
                Nous nous réservons le droit de propriété intellectuelle sur notre plateforme et nos algorithmes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                6. Limitation de responsabilité
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Postly AI est fourni "en l'état". Nous ne garantissons pas que le service sera 
                ininterrompu ou exempt d'erreurs. Notre responsabilité est limitée dans la mesure 
                permise par la loi.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                7. Paiements et remboursements
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Les paiements sont traités par Stripe. Les remboursements sont accordés selon notre 
                politique de remboursement de 30 jours. Les prix peuvent être modifiés avec un préavis de 30 jours.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                8. Résiliation
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Nous nous réservons le droit de suspendre ou résilier votre compte en cas de 
                violation de ces conditions. Vous pouvez résilier votre compte à tout moment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                9. Modifications des conditions
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Nous nous réservons le droit de modifier ces conditions à tout moment. 
                Les modifications importantes seront communiquées par e-mail ou via notre plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                10. Droit applicable
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Ces conditions sont régies par le droit français. Tout litige sera soumis 
                à la compétence exclusive des tribunaux de Paris.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                11. Contact
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Pour toute question concernant ces conditions d'utilisation, contactez-nous à :
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>E-mail :</strong> legal@postly-ai.com<br />
                  <strong>Adresse :</strong> Postly AI, 123 Rue de l'Innovation, 75001 Paris, France
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
