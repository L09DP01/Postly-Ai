&quot;use client&quot;;

import { useState, useEffect } from &quot;react&quot;;
import { Card } from &quot;@/components/ui/Card&quot;;
import Link from &quot;next/link&quot;;

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
        const generationsResponse = await fetch(&apos;/api/history&apos;);
        if (generationsResponse.ok) {
          const generationsData = await generationsResponse.json();
          setGenerations(generationsData.generations || []);
        }

        // Fetch quota info
        const quotaResponse = await fetch(&apos;/api/quota&apos;);
        if (quotaResponse.ok) {
          const quotaData = await quotaResponse.json();
          setQuotaInfo({
            plan: quotaData.plan || &apos;free&apos;,
            total: quotaData.total || 0,
            used: quotaData.used || 0,
            remaining: quotaData.remaining || 0
          });
        }
      } catch (error) {
        console.error(&apos;Erreur lors du chargement des données:, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className=&quot;space-y-8&quot;>
      {/* Header */}
      <div className=&quot;flex items-center justify-between&quot;>
        <div>
          <h1 className=&quot;text-3xl font-bold text-gray-900&quot;>Historique</h1>
          <p className=&quot;mt-2 text-gray-600&quot;>
            Retrouvez toutes vos générations de posts précédentes
          </p>
        </div>
        <Link
          href=&quot;/dashboard/generate&quot;
          className=&quot;bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center space-x-2&quot;
        >
          <svg className=&quot;w-4 h-4&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
            <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M12 6v6m0 0v6m0-6h6m-6 0H6&quot; />
          </svg>
          <span>Nouveau post</span>
        </Link>
      </div>

      {/* Stats Summary */}
      <div className=&quot;grid grid-cols-1 md:grid-cols-3 gap-6&quot;>
        <Card className=&quot;p-6 text-center&quot;>
          <div className=&quot;text-3xl font-bold text-blue-600&quot;>{generations.length}</div>
          <div className=&quot;text-sm text-gray-600&quot;>Posts générés</div>
        </Card>
        <Card className=&quot;p-6 text-center&quot;>
          <div className=&quot;text-3xl font-bold text-green-600&quot;>{quotaInfo?.remaining || 0}</div>
          <div className=&quot;text-sm text-gray-600&quot;>Crédits restants</div>
        </Card>
        <Card className=&quot;p-6 text-center&quot;>
          <div className=&quot;text-3xl font-bold text-purple-600&quot;>{quotaInfo?.plan === &apos;pro&apos; ? &apos;Pro&apos; : &apos;Gratuit}</div>
          <div className=&quot;text-sm text-gray-600&quot;>Plan actuel</div>
        </Card>
      </div>

      {/* Generations List */}
      {generations.length > 0 ? (
        <div className=&quot;space-y-4&quot;>
          <h2 className=&quot;text-xl font-semibold text-gray-900&quot;>Générations récentes</h2>
          <div className=&quot;bg-white rounded-lg border border-gray-200 overflow-hidden&quot;>
            {generations.map((generation, index) => (
              <div key={generation.id} className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${index === generations.length - 1 ? 'border-b-0' : ''}`}>
                <div className=&quot;flex justify-between items-start&quot;>
                  <div className=&quot;flex-1 min-w-0&quot;>
                    <div className=&quot;flex items-center space-x-2 mb-1&quot;>
                      {generation.platform && <span className=&quot;inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full&quot;>#{generation.platform}</span>}
                      <span className=&quot;text-xs text-gray-500&quot;>
                        {new Date(generation.createdAt).toLocaleDateString(&apos;fr-FR&apos;, { 
                          year: &apos;numeric&apos;, 
                          month: &apos;short&apos;, 
                          day: &apos;numeric&apos;,
                          hour: &apos;2-digit&apos;,
                          minute: &apos;2-digit
                        })}
                      </span>
                      {generation.usageTokens && <span className=&quot;text-xs text-gray-400&quot;>({generation.usageTokens} tokens)</span>}
                    </div>
                    <p className=&quot;text-sm text-gray-700 truncate&quot;>
                      {generation.brief || &quot;Aucun brief saisi&quot;}
                      {generation.brief && generation.brief.length > 100 && &quot;...&quot;}
                    </p>
                    <div className=&quot;flex items-center justify-between mt-2&quot;>
                      <span className=&quot;text-xs text-gray-500&quot;>
                        {Array.isArray(generation.variants) && generation.variants.length > 0 ? `${generation.variants.length} variantes générées` : &quot;Aucune variante&quot;}
                      </span>
                      <div className=&quot;flex items-center space-x-3&quot;>
                        <span className=&quot;text-xs text-gray-400 cursor-pointer hover:text-gray-600&quot;>
                          👁️ Voir détails
                        </span>
                        <Link
                          href=&quot;/dashboard/generate&quot;
                          className=&quot;text-blue-600 hover:text-blue-800 text-xs hover:underline&quot;
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
        <Card className=&quot;p-12 text-center&quot;>
          <div className=&quot;mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4&quot;>
            <svg className=&quot;w-8 h-8 text-gray-400&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
              <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z&quot; />
            </svg>
          </div>
          <h3 className=&quot;text-lg font-medium text-gray-900 mb-2&quot;>Aucun historique disponible</h3>
          <p className=&quot;text-gray-600 mb-4&quot;>
            Commencez par générer votre premier post pour voir votre historique.
          </p>
          <Link
            href=&quot;/dashboard/generate&quot;
            className=&quot;bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex items-center space-x-2&quot;
          >
            <svg className=&quot;w-4 h-4&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
              <path strokeLinecap=&quot;round&quot; strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Générer mon premier post</span>
          </Link>
        </Card>
      )}
    </div>
  );
}