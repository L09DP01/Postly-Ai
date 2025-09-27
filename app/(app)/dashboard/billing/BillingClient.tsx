&quot;use client&quot;;

import { useState, useEffect } from &quot;react&quot;;
import { Card } from &quot;@/components/ui/Card&quot;;
import { Button } from &quot;@/components/ui/Button&quot;;
import { useSession } from &quot;next-auth/react&quot;;

interface QuotaInfo {
  plan: string;
  total: number;
  used: number;
  remaining: number;
}

export default function BillingClient() {
  const { data: session } = useSession();
  const [quotaInfo, setQuotaInfo] = useState<QuotaInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotaInfo = async () => {
      try {
        const response = await fetch(&apos;/api/quota&apos;);
        if (response.ok) {
          const data = await response.json();
          setQuotaInfo({
            plan: data.plan || &apos;free&apos;,
            total: data.total || 0,
            used: data.used || 0,
            remaining: data.remaining || 0
          });
        }
      } catch (error) {
        console.error(&apos;Erreur lors du chargement des données:&apos;, error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotaInfo();
  }, []);

  const handleUpgrade = () => {
    // Configuration Stripe checkout avec l&apos;email de l&apos;utilisateur connecté
    const baseURL = typeof window !== &apos;undefined&apos; ? window.location.origin : &apos;&apos;;
    const successURL = `${baseURL}/success`; // Route de succès personnalisée
    
    // URL Stripe mise à jour pour prix USD ($5.99/mois Pro plan)
    const stripeURL = &apos;https://buy.stripe.com/test_9B63coaGo1Rjh2Wbow4Ja00&apos;;
    
    try {
      if (session?.user?.email) {
        // Passer l&apos;email utilisateur et URL de redirection en paramètres
        const email = session.user.email;
        const encodedEmail = encodeURIComponent(email);
        const encodedSuccessURL = encodeURIComponent(successURL);
        const finalURL = `${stripeURL}?client_reference_id=${encodedEmail}&plan=pro&email=${encodedEmail}&success_url=${encodedSuccessURL}`;
        window.open(finalURL, &quot;_self&quot;);
      } else {
        // Fallback si session non disponible, utilise juste l&apos;URL par défaut
        const encodedSuccessURL = encodeURIComponent(successURL);
        const finalURL = `${stripeURL}?success_url=${encodedSuccessURL}`;
        window.open(finalURL, &quot;_self&quot;);
      }
    } catch (err) {
      console.error(&quot;Redirection to Stripe failed:&quot;, err);
      // Fallback en cas derreur
      window.location.href = stripeURL;
    }
  };

  if (loading) {
    return (
      <div className=&quot;space-y-8 p-6&quot;>
        <div className=&quot;animate-pulse&quot;>
          <div className=&quot;h-8 bg-gray-200 rounded w-1/3 mb-4&quot;></div>
          <div className=&quot;h-4 bg-gray-200 rounded w-1/2&quot;></div>
        </div>
      </div>
    );
  }

  const isPro = quotaInfo?.plan === &apos;pro;
  const usagePercentage = quotaInfo?.total ? (quotaInfo.used / quotaInfo.total * 100) : 0;

  return (
    <div className=&quot;space-y-8 p-6&quot;>
      {/* Header */}
      <div>
        <h1 className=&quot;text-3xl font-bold text-white&quot;>
          Facturation
        </h1>
        <p className=&quot;mt-2 text-white&quot;>
          Gérez votre abonnement et vos paiements
        </p>
      </div>

      {/* Current Plan */}
      <Card className=&quot;p-6&quot;>
        <div className=&quot;mb-4&quot;>
          <h2 className=&quot;text-xl font-semibold text-black&quot;>
            Plan actuel
          </h2>
        </div>
        <div className=&quot;flex items-center justify-between&quot;>
          <div>
            <h3 className=&quot;text-lg font-medium text-black&quot;>
              Plan {isPro ? &apos;Pro&apos; : &apos;Gratuit}
            </h3>
            <p className=&quot;text-gray-700&quot;>
              {isPro ? &apos;200 posts par mois • Support prioritaire&apos; : &apos;10 posts par mois • Support email}
            </p>
          </div>
          <div className=&quot;text-right&quot;>
            <p className=&quot;text-2xl font-bold text-black&quot;>
              {isPro ? &apos;$5.99&apos; : &apos;Free}
            </p>
            <p className=&quot;text-sm text-gray-600&quot;>
              {isPro ? &apos;/ month&apos; : &apos;}
            </p>
          </div>
        </div>
        
        {isPro && (
          <div className=&quot;mt-4 p-3 bg-green-50 border border-green-200 rounded-lg&quot;>
            <div className=&quot;flex items-center&quot;>
              <svg className=&quot;w-5 h-5 text-green-500 mr-2&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
                <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M5 13l4 4L19 7&quot; />
              </svg>
              <span className=&quot;text-green-700 text-sm font-medium&quot;>Plan Pro actif</span>
            </div>
          </div>
        )}
      </Card>

      {/* Usage */}
      <Card className=&quot;p-6&quot;>
        <div className=&quot;mb-4&quot;>
          <h2 className=&quot;text-xl font-semibold text-black&quot;>
            Utilisation du mois
          </h2>
        </div>
        <div className=&quot;space-y-4&quot;>
          <div className=&quot;flex items-center justify-between&quot;>
            <span className=&quot;text-sm text-gray-600&quot;>Posts générés</span>
            <span className=&quot;font-medium text-black&quot;>{quotaInfo?.used || 0} / {quotaInfo?.total || 0}</span>
          </div>
          <div className=&quot;w-full bg-gray-200 rounded-full h-2&quot;>
            <div 
              className=&quot;bg-blue-500 h-2 rounded-full transition-all duration-300&quot; 
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            ></div>
          </div>
          <p className=&quot;text-sm text-gray-600&quot;>
            Vous avez encore {quotaInfo?.remaining || 0} posts disponibles ce mois-ci.
          </p>
        </div>
      </Card>

      {/* Upgrade Options - affiché seulement pour plan gratuit */}
      {!isPro && (
        <div className=&quot;grid grid-cols-1 gap-6 lg:grid-cols-2&quot;>
          <Card className=&quot;border-2 border-blue-500 p-6&quot;>
            <div className=&quot;mb-4&quot;>
              <div className=&quot;flex items-center justify-between&quot;>
                <h3 className=&quot;text-lg font-semibold text-black&quot;>
                  Plan Pro
                </h3>
                <span className=&quot;bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full&quot;>
                  Recommandé
                </span>
              </div>
              <p className=&quot;text-gray-700&quot;>
                Parfait pour les professionnels
              </p>
            </div>
            <div className=&quot;space-y-4&quot;>
              <div className=&quot;text-3xl font-bold text-black&quot;>
                $5.99
                <span className=&quot;text-lg font-normal text-gray-600&quot;>
                  /month
                </span>
              </div>
              <ul className=&quot;space-y-2 text-sm text-gray-700&quot;>
                <li className=&quot;flex items-center&quot;>
                  <svg className=&quot;w-4 h-4 text-green-500 mr-2&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
                    <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M5 13l4 4L19 7&quot; />
                  </svg>
                  200 posts par mois
                </li>
                <li className=&quot;flex items-center&quot;>
                  <svg className=&quot;w-4 h-4 text-green-500 mr-2&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
                    <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M5 13l4 4L19 7&quot; />
                  </svg>
                  Toutes les plateformes
                </li>
                <li className=&quot;flex items-center&quot;>
                  <svg className=&quot;w-4 h-4 text-green-500 mr-2&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
                    <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M5 13l4 4L19 7&quot; />
                  </svg>
                  Hashtags optimisés
                </li>
                <li className=&quot;flex items-center&quot;>
                  <svg className=&quot;w-4 h-4 text-green-500 mr-2&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
                    <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M5 13l4 4L19 7&quot; />
                  </svg>
                  Support prioritaire
                </li>
                <li className=&quot;flex items-center&quot;>
                  <svg className=&quot;w-4 h-4 text-green-500 mr-2&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
                    <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M5 13l4 4L19 7&quot; />
                  </svg>
                  Analytics détaillés
                </li>
              </ul>
              <Button 
                className=&quot;w-full bg-blue-600 hover:bg-blue-700&quot;
                onClick={handleUpgrade}
              >
                Passer au plan Pro
              </Button>
            </div>
          </Card>

          <Card className=&quot;p-6&quot;>
            <div className=&quot;mb-4&quot;>
              <h3 className=&quot;text-lg font-semibold text-black&quot;>
                Plan Business
              </h3>
              <p className=&quot;text-gray-700&quot;>
                Pour les équipes
              </p>
            </div>
            <div className=&quot;space-y-4&quot;>
              <div className=&quot;text-3xl font-bold text-black&quot;>
                $49
                <span className=&quot;text-lg font-normal text-gray-600&quot;>
                  /month
                </span>
              </div>
              <ul className=&quot;space-y-2 text-sm text-gray-700&quot;>
                <li className=&quot;flex items-center&quot;>
                  <svg className=&quot;w-4 h-4 text-green-500 mr-2&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
                    <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M5 13l4 4L19 7&quot; />
                  </svg>
                  Posts illimités
                </li>
                <li className=&quot;flex items-center&quot;>
                  <svg className=&quot;w-4 h-4 text-green-500 mr-2&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
                    <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M5 13l4 4L19 7&quot; />
                  </svg>
                  IA personnalisée
                </li>
                <li className=&quot;flex items-center&quot;>
                  <svg className=&quot;w-4 h-4 text-green-500 mr-2&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
                    <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M5 13l4 4L19 7&quot; />
                  </svg>
                  SEO premium
                </li>
                <li className=&quot;flex items-center&quot;>
                  <svg className=&quot;w-4 h-4 text-green-500 mr-2&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
                    <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M5 13l4 4L19 7&quot; />
                  </svg>
                  Support dédié
                </li>
                <li className=&quot;flex items-center&quot;>
                  <svg className=&quot;w-4 h-4 text-green-500 mr-2&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
                    <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M5 13l4 4L19 7&quot; />
                  </svg>
                  API access
                </li>
              </ul>
              <Button variant=&quot;outline&quot; className=&quot;w-full&quot; asChild>
                <a href=&quot;/contact&quot;>Contacter l&apos;équipe</a>
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Success Message for Pro */}
      {isPro && (
        <Card className=&quot;p-6 border-green-200 bg-green-50&quot;>
          <div className=&quot;flex items-center&quot;>
            <svg className=&quot;w-6 h-6 text-green-500 mr-3&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
              <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z&quot; />
            </svg>
            <div>
              <h3 className=&quot;text-lg font-medium text-green-800&quot;>Plan Pro actif</h3>
              <p className=&quot;text-green-700 text-sm mt-1&quot;>
                Profitez de vos 200 générations par mois et de tous les avantages du plan Pro.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Billing History */}
      <Card className=&quot;p-6&quot;>
        <div className=&quot;mb-4&quot;>
          <h2 className=&quot;text-xl font-semibold text-black&quot;>
            Historique de facturation
          </h2>
        </div>
        <div className=&quot;text-center py-8&quot;>
          <svg className=&quot;mx-auto h-12 w-12 text-gray-400&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
            <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-black">
            {isPro ? &apos;Factures&apos; : &apos;Aucune facture}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            {isPro ? &apos;Votre historique de facturation sera disponible ici.&apos; : &apos;Vous n\&apos;avez pas encore de factures avec votre plan gratuit.}
          </p>
        </div>
      </Card>
    </div>
  );
}
