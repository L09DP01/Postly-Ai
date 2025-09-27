&quot;use client&quot;;
import { useEffect, useState } from &quot;react&quot;;
import { useRouter } from &quot;next/navigation&quot;;
import { useSession } from &quot;next-auth/react&quot;;

export default function SuccessPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    // Vérifier le statut du paiement
    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(&apos;/api/payment-success&apos;, {
          method: &apos;GET&apos;,
          credentials: &apos;include&apos;
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log(&apos;Payment status check:&apos;, data);
          
          if (data.isPro) {
            setPaymentConfirmed(true);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error(&apos;Error checking payment:&apos;, error);
      }
      
      setIsLoading(false);
    };

    checkPaymentStatus();
  }, []);

  useEffect(() => {
    if (!isLoading && paymentConfirmed) {
      // Rediriger automatiquement vers la page de chat après confirmation
      const timer = setTimeout(() => {
        router.push(&apos;/dashboard/generate);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, paymentConfirmed, router]);

  if (isLoading) {
    return (
      <div className=&quot;min-h-screen bg-[#03224c] flex items-center justify-center&quot;>
        <div className=&quot;bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-4&quot;>
          <div className=&quot;animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4&quot;></div>
          <p className=&quot;text-gray-600&quot;>Vérification de votre paiement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=&quot;min-h-screen bg-[#03224c] flex items-center justify-center&quot;>
      <div className=&quot;bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-4&quot;>
        <div className=&quot;mb-6&quot;>
          <div className=&quot;w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4&quot;>
            <svg className=&quot;w-8 h-8 text-white&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
              <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M5 13l4 4L19 7&quot; />
            </svg>
          </div>
          <h1 className=&quot;text-2xl font-bold text-gray-900 mb-2&quot;>
            Paiement réussi !
          </h1>
          <p className=&quot;text-gray-600 mb-4&quot;>
            Votre abonnement Pro a été activé avec succès
          </p>
          {paymentConfirmed ? (
            <p className=&quot;text-sm text-green-600 mb-6&quot;>✅ Plan Pro confirmé ! Redirection en cours...</p>
          ) : (
            <p className=&quot;text-sm text-yellow-600 mb-6&quot;>⚠️ Sélectionnez le plan Pro dans votre session Stripe</p>
          )}
        </div>

        <div className=&quot;space-y-2&quot;>
          <h3 className="font-semibold text-gray-900">Nouveaux avantages Pro :</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 200 générations par mois</li>
            <li>• Toutes les plateformes</li>
            <li>• Support prioritaire</li>
            <li>• Hashtags optimisés</li>
          </ul>
        </div>

        <button
          onClick={() => router.push(&apos;/dashboard/generate)}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Accéder au tableau de bord
        </button>
      </div>
    </div>
  );
}
