import { Metadata } from &quot;next&quot;;

export const metadata: Metadata = {
  title: &quot;Conditions d'Utilisation - Postly AI&quot;,
  description: &quot;Conditions générales d&apos;utilisation de Postly AI - Termes et conditions de service.&quot;,
};

export default function TermsPage() {
  return (
    <div className=&quot;min-h-screen bg-white&quot;>
      <div className=&quot;mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8&quot;>
        <div className=&quot;prose prose-lg max-w-none&quot;>
          <h1 className=&quot;text-3xl font-bold text-gray-900 mb-8&quot; style={{ color: '#03224c' }}>
            Conditions dUtilisation
          </h1>
          
          <p className=&quot;text-gray-600 mb-6&quot;>
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString(&apos;fr-FR)}
          </p>

          <div className=&quot;space-y-8&quot;>
            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                1. Acceptation des conditions
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                En utilisant Postly AI, vous acceptez d&apos;être lié par ces conditions d&apos;utilisation. 
                Si vous nacceptez pas ces conditions, veuillez ne pas utiliser notre service.
              </p>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                2. Description du service
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Postly AI est une plateforme dintelligence artificielle qui génère du contenu optimisé 
                pour les réseaux sociaux. Nos services incluent :
              </p>
              <ul className=&quot;list-disc pl-6 text-gray-600 space-y-2 mt-4&quot;>
                <li>Génération de posts pour réseaux sociaux</li>
                <li>Optimisation SEO et hashtags</li>
                <li>Personnalisation du ton et du style</li>
                <li>Analytics et métriques de performance</li>
              </ul>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                3. Compte utilisateur
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Pour utiliser nos services, vous devez créer un compte. Vous vous engagez à :
              </p>
              <ul className=&quot;list-disc pl-6 text-gray-600 space-y-2 mt-4&quot;>
                <li>Fournir des informations exactes et à jour</li>
                <li>Maintenir la sécurité de votre mot de passe</li>
                <li>Être responsable de toutes les activités sur votre compte</li>
                <li>Nous notifier immédiatement toute utilisation non autorisée</li>
              </ul>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                4. Utilisation acceptable
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Vous vous engagez à utiliser Postly AI de manière légale et éthique. Il est interdit de :
              </p>
              <ul className=&quot;list-disc pl-6 text-gray-600 space-y-2 mt-4&quot;>
                <li>Générer du contenu illégal, offensant ou diffamatoire</li>
                <li>Violer les droits de propriété intellectuelle</li>
                <li>Tenter de contourner les limitations techniques</li>
                <li>Utiliser le service pour du spam ou du harcèlement</li>
                <li>Partager votre compte avec des tiers</li>
              </ul>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                5. Propriété intellectuelle
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Vous conservez tous les droits sur le contenu que vous générez avec Postly AI. 
                Nous nous réservons le droit de propriété intellectuelle sur notre plateforme et nos algorithmes.
              </p>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                6. Limitation de responsabilité
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Postly AI est fourni &quot;en l&apos;état&quot;. Nous ne garantissons pas que le service sera 
                ininterrompu ou exempt derreurs. Notre responsabilité est limitée dans la mesure 
                permise par la loi.
              </p>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                7. Paiements et remboursements
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Les paiements sont traités par Stripe. Les remboursements sont accordés selon notre 
                politique de remboursement de 30 jours. Les prix peuvent être modifiés avec un préavis de 30 jours.
              </p>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                8. Résiliation
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Nous nous réservons le droit de suspendre ou résilier votre compte en cas de 
                violation de ces conditions. Vous pouvez résilier votre compte à tout moment.
              </p>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                9. Modifications des conditions
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Nous nous réservons le droit de modifier ces conditions à tout moment. 
                Les modifications importantes seront communiquées par e-mail ou via notre plateforme.
              </p>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                10. Droit applicable
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Ces conditions sont régies par le droit français. Tout litige sera soumis 
                à la compétence exclusive des tribunaux de Paris.
              </p>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                11. Contact
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Pour toute question concernant ces conditions dutilisation, contactez-nous à :
              </p>
              <div className=&quot;mt-4 p-4 bg-gray-50 rounded-lg&quot;>
                <p className="text-gray-700">
                  <strong>E-mail :</strong> legal@postly-ai.com<br />
                  <strong>Adresse :</strong> Postly AI, 123 Rue de lInnovation, 75001 Paris, France
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
