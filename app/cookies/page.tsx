import { Metadata } from &quot;next&quot;;

export const metadata: Metadata = {
  title: &quot;Politique des Cookies - Postly AI&quot;,
  description: &quot;Politique des cookies de Postly AI - Comment nous utilisons les cookies et technologies similaires.&quot;,
};

export default function CookiesPage() {
  return (
    <div className=&quot;min-h-screen bg-white&quot;>
      <div className=&quot;mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8&quot;>
        <div className=&quot;prose prose-lg max-w-none&quot;>
          <h1 className=&quot;text-3xl font-bold text-gray-900 mb-8&quot; style={{ color: '#03224c' }}>
            Politique des Cookies
          </h1>
          
          <p className=&quot;text-gray-600 mb-6&quot;>
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString(&apos;fr-FR)}
          </p>

          <div className=&quot;space-y-8&quot;>
            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                1. Qu&apos;est-ce quun cookie ?
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web. 
                Les cookies nous permettent de reconnaître votre appareil et de mémoriser vos préférences 
                pour améliorer votre expérience utilisateur.
              </p>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                2. Types de cookies utilisés
              </h2>
              
              <div className=&quot;space-y-6&quot;>
                <div className=&quot;border-l-4 border-blue-500 pl-4&quot;>
                  <h3 className=&quot;text-xl font-semibold text-gray-900 mb-2&quot;>Cookies essentiels</h3>
                  <p className=&quot;text-gray-600 leading-relaxed&quot;>
                    Ces cookies sont nécessaires au fonctionnement de notre site. Ils incluent :
                  </p>
                  <ul className=&quot;list-disc pl-6 text-gray-600 space-y-1 mt-2&quot;>
                    <li>Cookies de session pour maintenir votre connexion</li>
                    <li>Cookies de sécurité pour protéger contre les attaques</li>
                    <li>Cookies de préférences linguistiques</li>
                  </ul>
                </div>

                <div className=&quot;border-l-4 border-green-500 pl-4&quot;>
                  <h3 className=&quot;text-xl font-semibold text-gray-900 mb-2&quot;>Cookies de performance</h3>
                  <p className=&quot;text-gray-600 leading-relaxed&quot;>
                    Ces cookies nous aident à comprendre comment vous utilisez notre site :
                  </p>
                  <ul className=&quot;list-disc pl-6 text-gray-600 space-y-1 mt-2&quot;>
                    <li>Statistiques de visite anonymisées</li>
                    <li>Temps passé sur les pages</li>
                    <li>Pages les plus consultées</li>
                  </ul>
                </div>

                <div className=&quot;border-l-4 border-purple-500 pl-4&quot;>
                  <h3 className=&quot;text-xl font-semibold text-gray-900 mb-2&quot;>Cookies de fonctionnalité</h3>
                  <p className=&quot;text-gray-600 leading-relaxed&quot;>
                    Ces cookies améliorent votre expérience utilisateur :
                  </p>
                  <ul className=&quot;list-disc pl-6 text-gray-600 space-y-1 mt-2&quot;>
                    <li>Préférences d&apos;affichage</li>
                    <li>Paramètres de personnalisation</li>
                    <li>Historique de vos générations</li>
                  </ul>
                </div>

                <div className=&quot;border-l-4 border-orange-500 pl-4&quot;>
                  <h3 className=&quot;text-xl font-semibold text-gray-900 mb-2&quot;>Cookies de marketing</h3>
                  <p className=&quot;text-gray-600 leading-relaxed&quot;>
                    Ces cookies sont utilisés pour la publicité ciblée :
                  </p>
                  <ul className=&quot;list-disc pl-6 text-gray-600 space-y-1 mt-2&quot;>
                    <li>Suivi des conversions publicitaires</li>
                    <li>Personnalisation des annonces</li>
                    <li>Mesure de l&apos;efficacité des campagnes</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                3. Cookies tiers
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Nous utilisons également des services tiers qui peuvent placer des cookies :
              </p>
              <ul className=&quot;list-disc pl-6 text-gray-600 space-y-2 mt-4&quot;>
                <li><strong>Google Analytics :</strong> Analyse du trafic et comportement des utilisateurs</li>
                <li><strong>Stripe :</strong> Traitement sécurisé des paiements</li>
                <li><strong>NextAuth :</strong> Authentification et gestion des sessions</li>
                <li><strong>OpenAI :</strong> Génération de contenu IA</li>
              </ul>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                4. Durée de conservation
              </h2>
              <div className=&quot;overflow-x-auto&quot;>
                <table className=&quot;min-w-full border border-gray-300&quot;>
                  <thead className=&quot;bg-gray-50&quot;>
                    <tr>
                      <th className=&quot;border border-gray-300 px-4 py-2 text-left&quot;>Type de cookie</th>
                      <th className=&quot;border border-gray-300 px-4 py-2 text-left&quot;>Durée</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className=&quot;border border-gray-300 px-4 py-2&quot;>Cookies de session</td>
                      <td className=&quot;border border-gray-300 px-4 py-2&quot;>Supprimés à la fermeture du navigateur</td>
                    </tr>
                    <tr>
                      <td className=&quot;border border-gray-300 px-4 py-2&quot;>Cookies persistants</td>
                      <td className=&quot;border border-gray-300 px-4 py-2&quot;>Jusqu&apos;à 2 ans</td>
                    </tr>
                    <tr>
                      <td className=&quot;border border-gray-300 px-4 py-2&quot;>Cookies d&apos;authentification</td>
                      <td className=&quot;border border-gray-300 px-4 py-2&quot;>30 jours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                5. Gestion de vos préférences
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Vous pouvez contrôler et gérer les cookies de plusieurs façons :
              </p>
              
              <div className=&quot;mt-6 space-y-4&quot;>
                <div className=&quot;p-4 bg-blue-50 rounded-lg&quot;>
                  <h3 className=&quot;font-semibold text-blue-900 mb-2&quot;>Paramètres du navigateur</h3>
                  <p className=&quot;text-blue-800 text-sm&quot;>
                    La plupart des navigateurs vous permettent de refuser ou accepter les cookies. 
                    Consultez les paramètres de votre navigateur pour plus dinformations.
                  </p>
                </div>

                <div className=&quot;p-4 bg-green-50 rounded-lg&quot;>
                  <h3 className=&quot;font-semibold text-green-900 mb-2&quot;>Banner de consentement</h3>
                  <p className=&quot;text-green-800 text-sm&quot;>
                    Lors de votre première visite, vous pouvez choisir quels types de cookies accepter 
                    via notre banner de consentement.
                  </p>
                </div>

                <div className=&quot;p-4 bg-purple-50 rounded-lg&quot;>
                  <h3 className=&quot;font-semibold text-purple-900 mb-2&quot;>Paramètres du compte</h3>
                  <p className=&quot;text-purple-800 text-sm&quot;>
                    Vous pouvez modifier vos préférences de cookies à tout moment dans les paramètres 
                    de votre compte Postly AI.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                6. Conséquences du refus des cookies
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Si vous refusez certains cookies, certaines fonctionnalités de notre site peuvent être limitées :
              </p>
              <ul className=&quot;list-disc pl-6 text-gray-600 space-y-2 mt-4&quot;>
                <li>Impossibilité de rester connecté</li>
                <li>Perte de vos préférences personnalisées</li>
                <li>Expérience utilisateur dégradée</li>
                <li>Certaines fonctionnalités avancées indisponibles</li>
              </ul>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                7. Mise à jour de cette politique
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Nous pouvons mettre à jour cette politique des cookies pour refléter les changements 
                dans nos pratiques ou pour dautres raisons opérationnelles, légales ou réglementaires.
              </p>
            </section>

            <section>
              <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                8. Contact
              </h2>
              <p className=&quot;text-gray-600 leading-relaxed&quot;>
                Pour toute question concernant notre utilisation des cookies, contactez-nous à :
              </p>
              <div className=&quot;mt-4 p-4 bg-gray-50 rounded-lg&quot;>
                <p className="text-gray-700">
                  <strong>E-mail :</strong> cookies@postly-ai.com<br />
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
