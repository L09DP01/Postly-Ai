import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique des Cookies - Postly AI",
  description: "Politique des cookies de Postly AI - Comment nous utilisons les cookies et technologies similaires.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ color: '#03224c' }}>
            Politique des Cookies
          </h1>
          
          <p className="text-gray-600 mb-6">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                1. Qu'est-ce qu'un cookie ?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web. 
                Les cookies nous permettent de reconnaître votre appareil et de mémoriser vos préférences 
                pour améliorer votre expérience utilisateur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                2. Types de cookies utilisés
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Cookies essentiels</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Ces cookies sont nécessaires au fonctionnement de notre site. Ils incluent :
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-1 mt-2">
                    <li>Cookies de session pour maintenir votre connexion</li>
                    <li>Cookies de sécurité pour protéger contre les attaques</li>
                    <li>Cookies de préférences linguistiques</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Cookies de performance</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Ces cookies nous aident à comprendre comment vous utilisez notre site :
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-1 mt-2">
                    <li>Statistiques de visite anonymisées</li>
                    <li>Temps passé sur les pages</li>
                    <li>Pages les plus consultées</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Cookies de fonctionnalité</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Ces cookies améliorent votre expérience utilisateur :
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-1 mt-2">
                    <li>Préférences d'affichage</li>
                    <li>Paramètres de personnalisation</li>
                    <li>Historique de vos générations</li>
                  </ul>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Cookies de marketing</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Ces cookies sont utilisés pour la publicité ciblée :
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-1 mt-2">
                    <li>Suivi des conversions publicitaires</li>
                    <li>Personnalisation des annonces</li>
                    <li>Mesure de l'efficacité des campagnes</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                3. Cookies tiers
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Nous utilisons également des services tiers qui peuvent placer des cookies :
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                <li><strong>Google Analytics :</strong> Analyse du trafic et comportement des utilisateurs</li>
                <li><strong>Stripe :</strong> Traitement sécurisé des paiements</li>
                <li><strong>NextAuth :</strong> Authentification et gestion des sessions</li>
                <li><strong>OpenAI :</strong> Génération de contenu IA</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                4. Durée de conservation
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Type de cookie</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Durée</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Cookies de session</td>
                      <td className="border border-gray-300 px-4 py-2">Supprimés à la fermeture du navigateur</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Cookies persistants</td>
                      <td className="border border-gray-300 px-4 py-2">Jusqu'à 2 ans</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Cookies d'authentification</td>
                      <td className="border border-gray-300 px-4 py-2">30 jours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                5. Gestion de vos préférences
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Vous pouvez contrôler et gérer les cookies de plusieurs façons :
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Paramètres du navigateur</h3>
                  <p className="text-blue-800 text-sm">
                    La plupart des navigateurs vous permettent de refuser ou accepter les cookies. 
                    Consultez les paramètres de votre navigateur pour plus d'informations.
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Banner de consentement</h3>
                  <p className="text-green-800 text-sm">
                    Lors de votre première visite, vous pouvez choisir quels types de cookies accepter 
                    via notre banner de consentement.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Paramètres du compte</h3>
                  <p className="text-purple-800 text-sm">
                    Vous pouvez modifier vos préférences de cookies à tout moment dans les paramètres 
                    de votre compte Postly AI.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                6. Conséquences du refus des cookies
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Si vous refusez certains cookies, certaines fonctionnalités de notre site peuvent être limitées :
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                <li>Impossibilité de rester connecté</li>
                <li>Perte de vos préférences personnalisées</li>
                <li>Expérience utilisateur dégradée</li>
                <li>Certaines fonctionnalités avancées indisponibles</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                7. Mise à jour de cette politique
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Nous pouvons mettre à jour cette politique des cookies pour refléter les changements 
                dans nos pratiques ou pour d'autres raisons opérationnelles, légales ou réglementaires.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ color: '#03224c' }}>
                8. Contact
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Pour toute question concernant notre utilisation des cookies, contactez-nous à :
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>E-mail :</strong> cookies@postly-ai.com<br />
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
