"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

interface Generation {
  id: string;
  brief: string;
  platform: string;
  createdAt: string;
  variants: string[];
  usageTokens?: number;
}

interface QuotaInfo {
  plan: string;
  total: number;
  used: number;
  remaining: number;
}

export default function HistoryClient() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [quotaInfo, setQuotaInfo] = useState<QuotaInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch generations
        const generationsResponse = await fetch('/api/history');
        if (generationsResponse.ok) {
          const generationsData = await generationsResponse.json();
          setGenerations(generationsData.generations || []);
        }

        // Fetch quota info
        const quotaResponse = await fetch('/api/quota');
        if (quotaResponse.ok) {
          const quotaData = await quotaResponse.json();
          setQuotaInfo({
            plan: quotaData.plan || 'free',
            total: quotaData.total || 0,
            used: quotaData.used || 0,
            remaining: quotaData.remaining || 0
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Historique</h1>
          <p className="mt-2 text-gray-600">
            Retrouvez toutes vos générations de posts précédentes
          </p>
        </div>
        <Link
          href="/dashboard/generate"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Nouveau post</span>
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-blue-600">{generations.length}</div>
          <div className="text-sm text-gray-600">Posts générés</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-green-600">{quotaInfo?.remaining || 0}</div>
          <div className="text-sm text-gray-600">Crédits restants</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-purple-600">{quotaInfo?.plan === 'pro' ? 'Pro' : 'Gratuit'}</div>
          <div className="text-sm text-gray-600">Plan actuel</div>
        </Card>
      </div>

      {/* Generations List */}
      {generations.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Générations récentes</h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {generations.map((generation, index) => (
              <div key={generation.id} className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${index === generations.length - 1 ? 'border-b-0' : ''}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      {generation.platform && <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">#{generation.platform}</span>}
                      <span className="text-xs text-gray-500">
                        {new Date(generation.createdAt).toLocaleDateString('fr-FR', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      {generation.usageTokens && <span className="text-xs text-gray-400">({generation.usageTokens} tokens)</span>}
                    </div>
                    <p className="text-sm text-gray-700 truncate">
                      {generation.brief || "Aucun brief saisi"}
                      {generation.brief && generation.brief.length > 100 && "..."}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {Array.isArray(generation.variants) && generation.variants.length > 0 ? `${generation.variants.length} variantes générées` : "Aucune variante"}
                      </span>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
                          👁️ Voir détails
                        </span>
                        <Link
                          href="/dashboard/generate"
                          className="text-blue-600 hover:text-blue-800 text-xs hover:underline"
                        >
                          ✨ Réutiliser
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Card className="p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun historique disponible</h3>
          <p className="text-gray-600 mb-4">
            Commencez par générer votre premier post pour voir votre historique.
          </p>
          <Link
            href="/dashboard/generate"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Générer mon premier post</span>
          </Link>
        </Card>
      )}
    </div>
  );
}