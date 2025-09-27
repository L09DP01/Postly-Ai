import type { Metadata } from &quot;next&quot;;
import PricingTable from &quot;@/components/PricingTable&quot;;
import { Button } from &quot;@/components/ui/Button&quot;;
import Link from &quot;next/link&quot;;

export const metadata: Metadata = {
  title: &quot;Tarifs - Postly AI&quot;,
  description: &quot;Découvrez nos tarifs simples et transparents. Commencez gratuitement ou passez au plan Pro pour plus de fonctionnalités.&quot;,
  openGraph: {
    title: &quot;Tarifs - Postly AI&quot;,
    description: &quot;Découvrez nos tarifs simples et transparents. Commencez gratuitement ou passez au plan Pro pour plus de fonctionnalités.&quot;,
  },
};

export default function PricingPage() {
  return (
    <div className=&quot;py-20&quot;>
      <div className=&quot;mx-auto max-w-7xl px-6&quot;>
        <div className=&quot;text-center mb-16&quot;>
          <h1 className=&quot;text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl mb-6&quot;>
            Tarifs simples et transparents
          </h1>
          <p className=&quot;text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8&quot;>
            Choisissez le plan qui correspond à vos besoins. Changez ou annulez à tout moment.
          </p>
          <div className=&quot;flex flex-col sm:flex-row gap-4 justify-center&quot;>
            <Button size=&quot;lg&quot; asChild>
              <Link href=&quot;/auth/register&quot;>Commencer gratuitement</Link>
            </Button>
            <Button variant=&quot;outline&quot; size=&quot;lg&quot; asChild>
              <Link href=&quot;/contact&quot;>Contacter l&apos;équipe</Link>
            </Button>
          </div>
        </div>

        <PricingTable />

        <div className=&quot;mt-20 text-center&quot;>
          <div className=&quot;bg-gray-50 dark:bg-gray-900 rounded-2xl p-8&quot;>
            <h2 className=&quot;text-2xl font-bold text-gray-900 dark:text-white mb-4&quot;>
              Questions sur nos tarifs ?
            </h2>
            <p className=&quot;text-gray-600 dark:text-gray-300 mb-6&quot;>
              Notre équipe est là pour vous aider à choisir le plan parfait.
            </p>
            <Button asChild>
              <Link href=&quot;/contact&quot;>Nous contacter</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

