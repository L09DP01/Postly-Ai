"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SuccessPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    // Vérifier le statut du paiement
    const checkPaymentStatus = async () => {
      try {
        const response = await fetch('/api/payment-success', {
          method: 'GET',
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Payment status check:', data);
          
          if (data.isPro) {
            setPaymentConfirmed(true);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error checking payment:', error);
      }
      
      setIsLoading(false);
    };

    checkPaymentStatus();
  }, []);

  useEffect(() => {
    if (!isLoading && paymentConfirmed) {
      // Rediriger automatiquement vers la page de chat après confirmation
      const timer = setTimeout(() => {
        router.push('/dashboard/generate');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, paymentConfirmed, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#03224c] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de votre paiement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#03224c] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-4">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Paiement réussi !
          </h1>
          <p className="text-gray-600 mb-4">
            Votre abonnement Pro a été activé avec succès
          </p>
          {paymentConfirmed ? (
            <p className="text-sm text-green-600 mb-6">✅ Plan Pro confirmé ! Redirection en cours...</p>
          ) : (
            <p className="text-sm text-yellow-600 mb-6">⚠️ Sélectionnez le plan Pro dans votre session Stripe</p>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Nouveaux avantages Pro :</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 200 générations par mois</li>
            <li>• Toutes les plateformes</li>
            <li>• Support prioritaire</li>
            <li>• Hashtags optimisés</li>
          </ul>
        </div>

        <button
          onClick={() => router.push('/dashboard/generate')}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Accéder au tableau de bord
        </button>
      </div>
    </div>
  );
}
