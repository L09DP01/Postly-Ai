import type { Metadata } from "next";
import PricingTable from "@/components/PricingTable";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarifs - Postly AI",
  description: "Découvrez nos tarifs simples et transparents. Commencez gratuitement ou passez au plan Pro pour plus de fonctionnalités.",
  openGraph: {
    title: "Tarifs - Postly AI",
    description: "Découvrez nos tarifs simples et transparents. Commencez gratuitement ou passez au plan Pro pour plus de fonctionnalités.",
  },
};

export default function PricingPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl mb-6">
            Tarifs simples et transparents
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Choisissez le plan qui correspond à vos besoins. Changez ou annulez à tout moment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/register">Commencer gratuitement</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contacter l'équipe</Link>
            </Button>
          </div>
        </div>

        <PricingTable />

        <div className="mt-20 text-center">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Questions sur nos tarifs ?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Notre équipe est là pour vous aider à choisir le plan parfait.
            </p>
            <Button asChild>
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

