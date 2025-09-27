&quot;use client&quot;;

import { useState, useEffect, useRef } from &quot;react&quot;;
import { Button } from &quot;@/components/ui/Button&quot;;
import { Card } from &quot;@/components/ui/Card&quot;;
import { getUserQuotaInfo } from &quot;@/lib/quota&quot;;

interface Message {
  id: string;
  type: &quot;user&quot; | &quot;ai&quot;;
  content: string;
  variants?: string[];
  timestamp: Date;
}

interface GenerationResult {
  variants: string[];
  seo?: {
    keywords: string[];
    suggested_hashtags: string[];
  };
}

export default function GenerateClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState(&quot;&quot;);
  const [loading, setLoading] = useState(false);
  const [quotaInfo, setQuotaInfo] = useState<{ remaining: number; total: number; plan: string } | null>(null);
  const [showPromptBuilder, setShowPromptBuilder] = useState(false);
  const [promptBuilderData, setPromptBuilderData] = useState({
    brandName: &quot;&quot;,
    description: &quot;&quot;,
    platform: &quot;instagram&quot;
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automatique vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: &quot;smooth&quot; });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Charger les infos de quota au montage
  useEffect(() => {
    const fetchQuotaInfo = async () => {
      try {
        const response = await fetch(&apos;/api/quota&apos;);
        if (response.ok) {
          const data = await response.json();
          setQuotaInfo({
            remaining: data.remaining || 0,
            total: data.total || 0,
            plan: data.plan || &apos;free&apos;
          });
        }
      } catch (error) {
        console.error(&apos;Erreur lors du chargement des crédits:&apos;, error);
        setQuotaInfo({
          remaining: 10,
          total: 10,
          plan: &apos;free
        });
      }
    };
    fetchQuotaInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: &quot;user&quot;,
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue(&quot;&quot;);
    setLoading(true);

    try {
      // Parse intent (simplified)
      const intent = inputValue.length < 20 
        ? null 
        : {
            platform: &quot;instagram&quot;,
            objective: &quot;engagement&quot;,
            tone: &quot;décontracté&quot;,
            language: &quot;fr&quot;,
            constraints: { max_hashtags: 3, emoji_ok: true },
          };

      // Prompt builder
      const promptResponse = await fetch(&quot;/api/prompt-builder&quot;, {
        method: &quot;POST&quot;,
        headers: { &quot;Content-Type&quot;: &quot;application/json&quot; },
        body: JSON.stringify({ 
          intent: intent || { brief: inputValue.trim() },
          brief: inputValue.trim() 
        }),
      });

      if (!promptResponse.ok) throw new Error(&quot;Erreur lors de la construction du prompt&quot;);

      // Generate response
      const generateResponse = await fetch(&quot;/api/generate&quot;, {
        method: &quot;POST&quot;,
        headers: { &quot;Content-Type&quot;: &quot;application/json&quot; },
        body: JSON.stringify({
          prompt: (await promptResponse.json()).prompt,
          options: { 
            seoBoost: true, 
            maxHashtags: 3 
          },
        }),
      });

      if (!generateResponse.ok) {
        if (generateResponse.status === 429) {
          // Mettre à jour le quota pour refléter l'état dépassé
          try {
            const quotaResponse = await fetch('/api/quota');
            if (quotaResponse.ok) {
              const quotaData = await quotaResponse.json();
              setQuotaInfo({
                remaining: quotaData.remaining || 0,
                total: quotaData.total || 0,
                plan: quotaData.plan || 'free'
              });
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour du quota:', error);
          }
          throw new Error(&quot;Quota dépassé. Passez au plan Pro pour plus de générations.&quot;);
        }
        const errorData = await generateResponse.json();
        throw new Error(errorData.error || &quot;Erreur lors de la génération&quot;);
      }

      const result: GenerationResult = await generateResponse.json();

      // Add AI response to messages
      const aiMessage: Message = {
        id: Date.now().toString(),
        type: &quot;ai&quot;,
        content: &quot;Voici vos 3 variantes de posts générées :&quot;,
        variants: result.variants,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Mettre à jour les crédits
      try {
        const quotaResponse = await fetch(&apos;/api/quota&apos;);
        if (quotaResponse.ok) {
          const quotaData = await quotaResponse.json();
          setQuotaInfo({
            remaining: quotaData.remaining || 0,
            total: quotaData.total || 0,
            plan: quotaData.plan || &apos;free&apos;
          });
        }
      } catch (error) {
        console.error(&apos;Erreur lors de la mise à jour des crédits:&apos;, error);
      }

    } catch (err) {
      console.error(&quot;Generation error:&quot;, err);
      let errorMessage = &quot;Une erreur est survenue lors de la génération.&quot;;
      
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      const errorResponseMessage: Message = {
        id: Date.now().toString(),
        type: &quot;ai&quot;,
        content: errorMessage.includes(&quot;Quota dépassé&quot;) 
          ? errorMessage + &quot;\n\n💡 Voulez-vous passer au plan Pro pour plus de générations ?&quot; 
          : errorMessage,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponseMessage]);
      
      // Si c&apos;est un quota dépasse, mettre à jour le quota affiché
      if (errorMessage.includes(&quot;Quota dépassé&quot;)) {
        try {
          const quotaResponse = await fetch(&apos;/api/quota&apos;);
          if (quotaResponse.ok) {
            const quotaData = await quotaResponse.json();
            setQuotaInfo({
              remaining: quotaData.remaining || 0,
              total: quotaData.total || 0,
              plan: quotaData.plan || &apos;free&apos;
            });
          }
        } catch (error) {
          console.error(&apos;Erreur lors de la mise à jour du quota:&apos;, error);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Simple toast effect
      const toast = document.createElement(&quot;div&quot;);
      toast.className = &quot;fixed bottom-20 right-4 bg-black text-white px-3 py-2 rounded-lg text-sm z-50&quot;;
      toast.textContent = &quot;✅ Copié !&quot;;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    } catch {
      console.error(&quot;Erreur lors de la copie&quot;);
    }
  };

  const handlePromptBuilderSubmit = async () => {
    try {
      // Générer un prompt optimisé pour la marque/produit
      const systemPrompt = `Tu es un expert en marketing digital pour générer des prompts optimisés pour la génération de posts sur les réseaux sociaux.
      
Crée un prompt clair, concis et orienté résultats qui donnera 3 variantes de posts performants pour :
- Marque/Produit : ${promptBuilderData.brandName}
- Description : ${promptBuilderData.description}
- Plateforme : ${promptBuilderData.platform}

Le prompt final doit être prêt à être utilisé et optimisé pour maximiser lengagement.`;

      const response = await fetch(&quot;/api/prompt-builder&quot;, {
        method: &quot;POST&quot;,
        headers: { &quot;Content-Type&quot;: &quot;application/json&quot; },
        body: JSON.stringify({ 
          intent: {
            platform: promptBuilderData.platform,
            objective: &quot;engagement&quot;,
            tone: &quot;professionnel&quot;,
            language: &quot;fr&quot;
          },
          brief: `${promptBuilderData.brandName} - ${promptBuilderData.description}`
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setInputValue(data.prompt);
        setShowPromptBuilder(false);
        // Reset form
        setPromptBuilderData({ brandName: &quot;&quot;, description: &quot;&quot;, platform: &quot;instagram&quot; });
      }
    } catch (error) {
      console.error(&quot;Erreur génération prompt:&quot;, error);
    }
  };

  return (
    <div className=&quot;flex flex-col h-screen bg-gray-50&quot;>
      {/* Header Sticky */}
      <div className=&quot;sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm&quot;>
        <div className=&quot;flex items-center justify-between p-3 sm:p-4&quot;>
          <h1 className=&quot;text-lg sm:text-xl font-semibold text-gray-900 truncate&quot;>
            💬 Chat Générateur IA
          </h1>
          <div className=&quot;flex items-center space-x-2 ml-2&quot;>
            <span className=&quot;bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap&quot;>
              ⚡ {quotaInfo?.plan === &apos;pro&apos; ? &apos;Pro&apos; : &apos;Gratuit} - {quotaInfo?.remaining || 0} crédits
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className=&quot;flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 pb-20 sm:pb-24&quot;>
        {messages.length === 0 && (
          <div className=&quot;text-center py-8 sm:py-12 px-4&quot;>
            <div className=&quot;mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4&quot;>
              <svg className=&quot;w-6 h-6 sm:w-8 sm:h-8 text-blue-600&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
                <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.456L3 21l2.456-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z&quot; />
              </svg>
            </div>
            <h3 className=&quot;text-base sm:text-lg font-medium text-gray-900 mb-2&quot;>
              Commencez à taper votre idée
            </h3>
            <p className=&quot;text-gray-600 text-sm max-w-sm mx-auto&quot;>
              Décrivez votre post et lIA générera 3 variantes optimisées pour vous
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === &quot;user&quot; ? &quot;justify-end&quot; : &quot;justify-start&quot;} px-2`}>
            <div className={`max-w-[85%] sm:max-w-md lg:max-w-lg xl:max-w-lg`}>
              {message.type === &quot;user&quot; ? (
                // Message utilisateur - aligné à droite, bulle bleue
                <div className=&quot;bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-br-md ml-auto&quot;>
                  <p className=&quot;text-sm leading-relaxed&quot;>{message.content}</p>
                  <p className=&quot;text-xs text-blue-200 mt-1&quot;>
                    {message.timestamp.toLocaleTimeString().slice(0, 5)}
                  </p>
                </div>
              ) : (
                // Message IA - aligné à gauche, bulle grise
                <div className=&quot;bg-white border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm&quot;>
                  <p className=&quot;text-sm leading-relaxed mb-2&quot;>{message.content}</p>
                  
                  {message.variants && (
                    <div className=&quot;space-y-3 mt-3&quot;>
                      {message.variants.map((variant, index) => (
                        <div key={index} className=&quot;bg-gray-50 border-l-4 border-blue-200 pl-3 py-2 rounded-r-lg&quot;>
                          <div className=&quot;flex justify-between items-start&quot;>
                            <div className=&quot;flex-1&quot;>
                              <p className=&quot;text-xs font-medium text-gray-600 mb-1&quot;>
                                Variante {index + 1}
                              </p>
                              <p className=&quot;text-sm leading-relaxed&quot;>
                                {variant}
                              </p>
                            </div>
                            <button
                              onClick={() => copyToClipboard(variant)}
                              className=&quot;ml-2 flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full transition-colors&quot;
                            >
                              <svg className=&quot;w-3 h-3&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
                                <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z&quot; />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className=&quot;text-xs text-gray-400 mt-2&quot;>
                    {message.timestamp.toLocaleTimeString().slice(0, 5)}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className=&quot;flex justify-start&quot;>
            <div className=&quot;bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm animate-pulse&quot;>
              <div className=&quot;flex items-center space-x-2&quot;>
                <div className=&quot;flex space-x-1&quot;>
                  <div className=&quot;w-2 h-2 bg-gray-400 rounded-full animate-bounce&quot;></div>
                  <div className=&quot;w-2 h-2 bg-gray-400 rounded-full animate-bounce&quot; style={{animationDelay: &quot;0.1s&quot;}}></div>
                  <div className=&quot;w-2 h-2 bg-gray-400 rounded-full animate-bounce&quot; style={{animationDelay: &quot;0.2s&quot;}}></div>
                </div>
                <span className=&quot;text-gray-600 text-sm&quot;>PostlyAI génère...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar - Fixed Bottom */}
      <div className=&quot;sticky bottom-0 bg-white border-t border-gray-200 p-2 sm:p-4 shadow-lg&quot;>
        {/* Prompt Builder Button */}
        <div className=&quot;mb-3 flex justify-center&quot;>
          <button
            onClick={() => setShowPromptBuilder(true)}
            className=&quot;bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2&quot;
          >
            <svg className=&quot;w-4 h-4&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
              <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z&quot; />
            </svg>
            <span>Prompt Builder</span>
          </button>
        </div>

        {quotaInfo && quotaInfo.remaining <= 0 && (
          <div className=&quot;mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-center&quot;>
            <p className=&quot;text-red-700 text-sm font-medium mb-2&quot;>
              ⭐ Vous avez atteint votre limite de générations gratuites !
            </p>
            <p className=&quot;text-red-600 text-xs mb-3&quot;>
              Passez au plan Pro pour générer 200 posts par mois
            </p>
            <button
              onClick={() => window.location.href = &apos;/dashboard/billing}
              className=&quot;bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-green-700 transition-colors&quot;
            >
              🌟 Upgrade maintenant
            </button>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className=&quot;flex items-end space-x-2 sm:space-x-3&quot;>
          <div className=&quot;flex-1 min-w-0&quot;>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder=&quot;Décrivez votre idée de post...&quot;
              className=&quot;w-full resize-none border border-gray-300 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm leading-relaxed&quot;
              rows={2}
              maxLength={700}
              disabled={loading}
            />
            <p className=&quot;text-xs text-gray-400 mt-1 text-right&quot;>
              {inputValue.length}/700
            </p>
          </div>
          <button
            type=&quot;submit&quot;
            disabled={!inputValue.trim() || loading || (quotaInfo !== null && quotaInfo.remaining <= 0)}
            className=&quot;bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 sm:p-3 rounded-full transition-colors flex-shrink-0 flex items-center&quot;
          >
            {loading ? (
              <svg className=&quot;w-4 h-4 sm:w-5 sm:h-5 animate-spin&quot; fill=&quot;none&quot; viewBox=&quot;0 0 24 24&quot;>
                <circle className=&quot;opacity-25&quot; cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;10&quot; stroke=&quot;currentColor&quot; strokeWidth=&quot;4&quot;></circle>
                <path className=&quot;opacity-75&quot; fill=&quot;currentColor&quot; d=&quot;M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z&quot;></path>
              </svg>
            ) : (
              <svg className=&quot;w-4 h-4 sm:w-5 sm:h-5&quot; fill=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
                <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M12 19l9 2-9-18-9 18 9-2zm0 0v-8&quot; />
              </svg>
            )}
          </button>
        </form>
      </div>

      {/* Prompt Builder Popup */}
      {showPromptBuilder && (
        <div className=&quot;fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4&quot;>
          <div className=&quot;bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto&quot;>
            <div className=&quot;p-6&quot;>
              <div className=&quot;flex justify-between items-center mb-4&quot;>
                <h3 className=&quot;text-lg font-semibold text-gray-900&quot;>✨ Prompt Builder</h3>
                <button
                  onClick={() => setShowPromptBuilder(false)}
                  className=&quot;text-gray-400 hover:text-gray-600 transition-colors&quot;
                >
                  <svg className=&quot;w-5 h-5&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;>
                    <path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M6 18L18 6M6 6l12 12&quot; />
                  </svg>
                </button>
              </div>

              <div className=&quot;space-y-4&quot;>
                <div>
                  <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>
                    Nom de la marque/produit
                  </label>
                  <input
                    type=&quot;text&quot;
                    value={promptBuilderData.brandName}
                    onChange={(e) => setPromptBuilderData(prev => ({ ...prev, brandName: e.target.value }))}
                    placeholder=&quot;Ex: Nike, MacBook Pro, Café Artisanal...&quot;
                    className=&quot;w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black&quot;
                  />
                </div>

                <div>
                  <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>
                    Description
                  </label>
                  <textarea
                    value={promptBuilderData.description}
                    onChange={(e) => setPromptBuilderData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder=&quot;Décrivez votre produit/service...&quot;
                    className=&quot;w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-black&quot;
                    rows={3}
                  />
                </div>

                <div>
                  <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>
                    Plateforme
                  </label>
                  <select
                    value={promptBuilderData.platform}
                    onChange={(e) => setPromptBuilderData(prev => ({ ...prev, platform: e.target.value }))}
                    className=&quot;w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black&quot;
                  >
                    <option value=&quot;instagram&quot;>Instagram</option>
                    <option value=&quot;facebook&quot;>Facebook</option>
                    <option value=&quot;tiktok&quot;>TikTok</option>
                    <option value=&quot;linkedin&quot;>LinkedIn</option>
                    <option value=&quot;twitter&quot;>Twitter</option>
                  </select>
                </div>
              </div>

              <div className=&quot;flex space-x-3 mt-6&quot;>
                <button
                  onClick={() => setShowPromptBuilder(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handlePromptBuilderSubmit}
                  disabled={!promptBuilderData.brandName.trim() || !promptBuilderData.description.trim()}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Générer le prompt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}