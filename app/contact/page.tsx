import { Metadata } from &quot;next&quot;;

export const metadata: Metadata = {
  title: &quot;Contact - Postly AI&quot;,
  description: &quot;Contactez l'équipe Postly AI pour toute question, support technique ou demande commerciale. Nous sommes là pour vous aider.&quot;,
};

export default function ContactPage() {
  return (
    <div className=&quot;min-h-screen bg-white&quot;>
      <div className=&quot;mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8&quot;>
        <div className=&quot;prose prose-lg max-w-none&quot;>
          <h1 className=&quot;text-3xl font-bold text-gray-900 mb-8&quot; style={{ color: '#03224c' }}>
            Contactez-nous
          </h1>
          
          <p className=&quot;text-gray-600 mb-8&quot;>
            Vous avez des questions sur Postly AI ? Besoin d&apos;aide technique ? Ou souhaitez-vous 
            discuter d&apos;un partenariat ? Notre équipe est là pour vous accompagner.
          </p>

          <div className=&quot;grid grid-cols-1 lg:grid-cols-2 gap-8&quot;>
            {/* Formulaire de contact */}
            <div className=&quot;bg-gray-50 p-6 rounded-lg&quot;>
              <h2 className=&quot;text-xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                Envoyez-nous un message
              </h2>
              
              <form className=&quot;space-y-4&quot;>
                <div>
                  <label htmlFor=&quot;name&quot; className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>
                    Nom complet *
                  </label>
                  <input
                    type=&quot;text&quot;
                    id=&quot;name&quot;
                    name=&quot;name&quot;
                    required
                    className=&quot;w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent&quot;
                    placeholder=&quot;Votre nom complet&quot;
                  />
                </div>

                <div>
                  <label htmlFor=&quot;email&quot; className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>
                    Adresse e-mail *
                  </label>
                  <input
                    type=&quot;email&quot;
                    id=&quot;email&quot;
                    name=&quot;email&quot;
                    required
                    className=&quot;w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent&quot;
                    placeholder=&quot;votre@email.com&quot;
                  />
                </div>

                <div>
                  <label htmlFor=&quot;company&quot; className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>
                    Entreprise
                  </label>
                  <input
                    type=&quot;text&quot;
                    id=&quot;company&quot;
                    name=&quot;company&quot;
                    className=&quot;w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent&quot;
                    placeholder=&quot;Nom de votre entreprise&quot;
                  />
                </div>

                <div>
                  <label htmlFor=&quot;subject&quot; className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>
                    Sujet *
                  </label>
                  <select
                    id=&quot;subject&quot;
                    name=&quot;subject&quot;
                    required
                    className=&quot;w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent&quot;
                  >
                    <option value=&quot;&quot;>Sélectionnez un sujet</option>
                    <option value=&quot;support&quot;>Support technique</option>
                    <option value=&quot;sales&quot;>Question commerciale</option>
                    <option value=&quot;partnership&quot;>Partenariat</option>
                    <option value=&quot;billing&quot;>Facturation</option>
                    <option value=&quot;feature&quot;>Demande de fonctionnalité</option>
                    <option value=&quot;other&quot;>Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor=&quot;message&quot; className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>
                    Message *
                  </label>
                  <textarea
                    id=&quot;message&quot;
                    name=&quot;message&quot;
                    required
                    rows={5}
                    className=&quot;w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent&quot;
                    placeholder=&quot;Décrivez votre demande en détail...&quot;
                  ></textarea>
                </div>

                <button
                  type=&quot;submit&quot;
                  className=&quot;w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors&quot;
                >
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* Informations de contact */}
            <div className=&quot;space-y-6&quot;>
              <div>
                <h2 className=&quot;text-xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                  Informations de contact
                </h2>
                
                <div className=&quot;space-y-4&quot;>
                  <div className=&quot;flex items-start space-x-3&quot;>
                    <div className=&quot;w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0&quot;>
                      <span className=&quot;text-blue-600&quot;>📧</span>
                    </div>
                    <div>
                      <h3 className=&quot;font-medium text-gray-900&quot;>E-mail</h3>
                      <p className=&quot;text-gray-600&quot;>contact@postly-ai.com</p>
                      <p className=&quot;text-sm text-gray-500&quot;>Réponse sous 24h</p>
                    </div>
                  </div>

                  <div className=&quot;flex items-start space-x-3&quot;>
                    <div className=&quot;w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0&quot;>
                      <span className=&quot;text-green-600&quot;>📞</span>
                    </div>
                    <div>
                      <h3 className=&quot;font-medium text-gray-900&quot;>Téléphone</h3>
                      <p className=&quot;text-gray-600&quot;>+33 1 23 45 67 89</p>
                      <p className=&quot;text-sm text-gray-500&quot;>Lun-Ven 9h-18h</p>
                    </div>
                  </div>

                  <div className=&quot;flex items-start space-x-3&quot;>
                    <div className=&quot;w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0&quot;>
                      <span className=&quot;text-purple-600&quot;>📍</span>
                    </div>
                    <div>
                      <h3 className=&quot;font-medium text-gray-900&quot;>Adresse</h3>
                      <p className=&quot;text-gray-600&quot;>
                        Postly AI<br />
                        123 Rue de l&apos;Innovation<br />
                        75001 Paris, France
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className=&quot;text-xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                  Support technique
                </h2>
                
                <div className=&quot;space-y-3&quot;>
                  <div className=&quot;p-3 bg-blue-50 rounded-lg&quot;>
                    <h3 className=&quot;font-medium text-blue-900&quot;>Documentation</h3>
                    <p className=&quot;text-blue-800 text-sm&quot;>Consultez notre guide d&apos;utilisation complet</p>
                  </div>
                  
                  <div className=&quot;p-3 bg-green-50 rounded-lg&quot;>
                    <h3 className=&quot;font-medium text-green-900&quot;>FAQ</h3>
                    <p className=&quot;text-green-800 text-sm&quot;>Trouvez des réponses aux questions fréquentes</p>
                  </div>
                  
                  <div className=&quot;p-3 bg-purple-50 rounded-lg&quot;>
                    <h3 className=&quot;font-medium text-purple-900&quot;>Chat en direct</h3>
                    <p className=&quot;text-purple-800 text-sm&quot;>Discutez avec notre équipe en temps réel</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className=&quot;text-xl font-semibold text-gray-900 mb-4&quot; style={{ color: '#03224c' }}>
                  Réseaux sociaux
                </h2>
                
                <div className=&quot;flex space-x-4&quot;>
                  <a href=&quot;#&quot; className=&quot;w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors&quot;>
                    <span className=&quot;text-sm font-bold&quot;>f</span>
                  </a>
                  <a href=&quot;#&quot; className=&quot;w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors&quot;>
                    <span className=&quot;text-sm font-bold&quot;>t</span>
                  </a>
                  <a href=&quot;#&quot; className=&quot;w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors&quot;>
                    <span className=&quot;text-sm font-bold&quot;>in</span>
                  </a>
                  <a href=&quot;#&quot; className=&quot;w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors&quot;>
                    <span className=&quot;text-sm font-bold&quot;>ig</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section FAQ rapide */}
          <div className=&quot;mt-12&quot;>
            <h2 className=&quot;text-2xl font-semibold text-gray-900 mb-6&quot; style={{ color: '#03224c' }}>
              Questions fréquentes
            </h2>
            
            <div className=&quot;grid grid-cols-1 md:grid-cols-2 gap-6&quot;>
              <div className=&quot;p-4 border border-gray-200 rounded-lg&quot;>
                <h3 className=&quot;font-medium text-gray-900 mb-2&quot;>Comment fonctionne Postly AI ?</h3>
                <p className=&quot;text-gray-600 text-sm&quot;>
                  Il suffit de décrire votre idée de post, notre IA génère automatiquement 3 variantes optimisées.
                </p>
              </div>
              
              <div className=&quot;p-4 border border-gray-200 rounded-lg&quot;>
                <h3 className=&quot;font-medium text-gray-900 mb-2&quot;>Quels sont les tarifs ?</h3>
                <p className=&quot;text-gray-600 text-sm&quot;>
                  Plan gratuit avec 10 posts/mois, plan Pro à 5,99€/mois avec 200 posts, et plan Business sur mesure.
                </p>
              </div>
              
              <div className=&quot;p-4 border border-gray-200 rounded-lg&quot;>
                <h3 className=&quot;font-medium text-gray-900 mb-2&quot;>Puis-je essayer gratuitement ?</h3>
                <p className=&quot;text-gray-600 text-sm&quot;>
                  Oui ! Créez un compte gratuit et testez Postly AI avec 10 générations gratuites.
                </p>
              </div>
              
              <div className=&quot;p-4 border border-gray-200 rounded-lg&quot;>
                <h3 className=&quot;font-medium text-gray-900 mb-2&quot;>Quelle est la qualité du contenu ?</h3>
                <p className="text-gray-600 text-sm">
                  Nos posts sont optimisés SEO, incluent des hashtags pertinents et des CTA efficaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
