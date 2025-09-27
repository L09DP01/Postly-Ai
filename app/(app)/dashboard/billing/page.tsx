"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useSession } from "next-auth/react";

interface QuotaInfo {
  plan: string;
  total: number;
  used: number;
  remaining: number;
}

export default function BillingPage() {
  const { data: session } = useSession();
  const [quotaInfo, setQuotaInfo] = useState<QuotaInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotaInfo = async () => {
      try {
        const response = await fetch('/api/quota');
        if (response.ok) {
          const data = await response.json();
          setQuotaInfo({
            plan: data.plan || 'free',
            total: data.total || 0,
            used: data.used || 0,
            remaining: data.remaining || 0
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotaInfo();
  }, []);

  const handleUpgrade = () => {
    // Configuration Stripe checkout avec l'email de l'utilisateur connecté
    const baseURL = typeof window !== 'undefined' ? window.location.origin : '';
    const successURL = `${baseURL}/success`; // Route de succès personnalisée
    
    // URL Stripe mise à jour pour prix USD ($5.99/mois Pro plan)
    const stripeURL = 'https://buy.stripe.com/test_9B63coaGo1Rjh2Wbow4Ja00';
    
    try {
      if (session?.user?.email) {
        // Passer l'email utilisateur et URL de redirection en paramètres
        const email = session.user.email;
        const encodedEmail = encodeURIComponent(email);
        const encodedSuccessURL = encodeURIComponent(successURL);
        const finalURL = `${stripeURL}?client_reference_id=${encodedEmail}&plan=pro&email=${encodedEmail}&success_url=${encodedSuccessURL}`;
        window.open(finalURL, "_self");
      } else {
        // Fallback si session non disponible, utilise juste l'URL par défaut
        const encodedSuccessURL = encodeURIComponent(successURL);
        const finalURL = `${stripeURL}?success_url=${encodedSuccessURL}`;
        window.open(finalURL, "_self");
      }
    } catch (err) {
      console.error("Redirection to Stripe failed:", err);
      // Fallback en cas d'erreur
      window.location.href = stripeURL;
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const isPro = quotaInfo?.plan === 'pro';
  const usagePercentage = quotaInfo?.total ? (quotaInfo.used / quotaInfo.total * 100) : 0;

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Facturation
        </h1>
        <p className="mt-2 text-white">
          Gérez votre abonnement et vos paiements
        </p>
      </div>

      {/* Current Plan */}
      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-black">
            Plan actuel
          </h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-black">
              Plan {isPro ? 'Pro' : 'Gratuit'}
            </h3>
            <p className="text-gray-700">
              {isPro ? '200 posts par mois • Support prioritaire' : '10 posts par mois • Support email'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-black">
              {isPro ? '$5.99' : 'Free'}
            </p>
            <p className="text-sm text-gray-600">
              {isPro ? '/ month' : ''}
            </p>
          </div>
        </div>
        
        {isPro && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-700 text-sm font-medium">Plan Pro actif</span>
            </div>
          </div>
        )}
      </Card>

      {/* Usage */}
      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-black">
            Utilisation du mois
          </h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Posts générés</span>
            <span className="font-medium text-black">{quotaInfo?.used || 0} / {quotaInfo?.total || 0}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            Vous avez encore {quotaInfo?.remaining || 0} posts disponibles ce mois-ci.
          </p>
        </div>
      </Card>

      {/* Upgrade Options - affiché seulement pour plan gratuit */}
      {!isPro && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border-2 border-blue-500 p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black">
                  Plan Pro
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Recommandé
                </span>
              </div>
              <p className="text-gray-700">
                Parfait pour les professionnels
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-black">
                $5.99
                <span className="text-lg font-normal text-gray-600">
                  /month
                </span>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  200 posts par mois
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Toutes les plateformes
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Hashtags optimisés
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Support prioritaire
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Analytics détaillés
                </li>
              </ul>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleUpgrade}
              >
                Passer au plan Pro
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-black">
                Plan Business
              </h3>
              <p className="text-gray-700">
                Pour les équipes
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-black">
                $49
                <span className="text-lg font-normal text-gray-600">
                  /month
                </span>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Posts illimités
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  IA personnalisée
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  SEO premium
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Support dédié
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  API access
                </li>
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <a href="/contact">Contacter l'équipe</a>
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Success Message for Pro */}
      {isPro && (
        <Card className="p-6 border-green-200 bg-green-50">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-lg font-medium text-green-800">Plan Pro actif</h3>
              <p className="text-green-700 text-sm mt-1">
                Profitez de vos 200 générations par mois et de tous les avantages du plan Pro.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Billing History */}
      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-black">
            Historique de facturation
          </h2>
        </div>
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-black">
            {isPro ? 'Factures' : 'Aucune facture'}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            {isPro ? 'Votre historique de facturation sera disponible ici.' : 'Vous n\'avez pas encore de factures avec votre plan gratuit.'}
          </p>
        </div>
      </Card>
    </div>
  );
}