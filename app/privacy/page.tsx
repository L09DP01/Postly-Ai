import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confidentialité - Postly AI",
  description: "Politique de confidentialité de Postly AI - Comment nous protégeons vos données personnelles.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ color: '#03224c' }}>
            Politique de Confidentialité
          </h1>
          
          <p className="text-gray-600 mb-6">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                1. Collecte des informations
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Nous collectons les informations que vous nous fournissez directement, notamment :
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                <li>Adresse e-mail lors de l'inscription</li>
                <li>Mot de passe (haché de manière sécurisée)</li>
                <li>Contenu des posts générés</li>
                <li>Préférences d'utilisation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                2. Utilisation des données
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Nous utilisons vos données pour :
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                <li>Fournir et améliorer nos services</li>
                <li>Gérer votre compte et vos abonnements</li>
                <li>Personnaliser votre expérience</li>
                <li>Communiquer avec vous concernant nos services</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                3. Partage des données
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations uniquement dans les cas suivants :
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                <li>Avec votre consentement explicite</li>
                <li>Pour respecter une obligation légale</li>
                <li>Avec nos prestataires de services (sous contrat de confidentialité)</li>
                <li>En cas de fusion ou d'acquisition de notre entreprise</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                4. Sécurité des données
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Nous mettons en place des mesures de sécurité appropriées pour protéger vos données contre :
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                <li>L'accès non autorisé</li>
                <li>La modification, divulgation ou destruction</li>
                <li>La perte accidentelle</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                5. Vos droits
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Conformément au RGPD, vous avez le droit de :
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                <li>Accéder à vos données personnelles</li>
                <li>Rectifier des données inexactes</li>
                <li>Demander la suppression de vos données</li>
                <li>Limiter le traitement de vos données</li>
                <li>Vous opposer au traitement</li>
                <li>Demander la portabilité de vos données</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                6. Cookies et technologies similaires
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Nous utilisons des cookies pour améliorer votre expérience utilisateur. 
                Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                7. Contact
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Pour toute question concernant cette politique de confidentialité, contactez-nous à :
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>E-mail :</strong> privacy@postly-ai.com<br />
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

