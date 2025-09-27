export const dynamic = "force-dynamic";
export const revalidate = 0;

"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getUserQuotaInfo } from "@/lib/quota";

interface Message {
  id: string;
  type: "user" | "ai";
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

export default function GeneratePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [quotaInfo, setQuotaInfo] = useState<{ remaining: number; total: number; plan: string } | null>(null);
  const [showPromptBuilder, setShowPromptBuilder] = useState(false);
  const [promptBuilderData, setPromptBuilderData] = useState({
    brandName: "",
    description: "",
    platform: "instagram"
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automatique vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Charger les infos de quota au montage
  useEffect(() => {
    const fetchQuotaInfo = async () => {
      try {
        const response = await fetch('/api/quota');
        if (response.ok) {
          const data = await response.json();
          setQuotaInfo({
            remaining: data.remaining || 0,
            total: data.total || 0,
            plan: data.plan || 'free'
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des crédits:', error);
        setQuotaInfo({
          remaining: 10,
          total: 10,
          plan: 'free'
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
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      // Parse intent (simplified)
      const intent = inputValue.length < 20 
        ? null 
        : {
            platform: "instagram",
            objective: "engagement",
            tone: "décontracté",
            language: "fr",
            constraints: { max_hashtags: 3, emoji_ok: true },
          };

      // Prompt builder
      const promptResponse = await fetch("/api/prompt-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          intent: intent || { brief: inputValue.trim() },
          brief: inputValue.trim() 
        }),
      });

      if (!promptResponse.ok) throw new Error("Erreur lors de la construction du prompt");

      // Generate response
      const generateResponse = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          throw new Error("Quota dépassé. Passez au plan Pro pour plus de générations.");
        }
        const errorData = await generateResponse.json();
        throw new Error(errorData.error || "Erreur lors de la génération");
      }

      const result: GenerationResult = await generateResponse.json();

      // Add AI response to messages
      const aiMessage: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: "Voici vos 3 variantes de posts générées :",
        variants: result.variants,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Mettre à jour les crédits
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
        console.error('Erreur lors de la mise à jour des crédits:', error);
      }

    } catch (err) {
      console.error("Generation error:", err);
      let errorMessage = "Une erreur est survenue lors de la génération.";
      
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      const errorResponseMessage: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: errorMessage.includes("Quota dépassé") 
          ? errorMessage + "\n\n💡 Voulez-vous passer au plan Pro pour plus de générations ?" 
          : errorMessage,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponseMessage]);
      
      // Si c'est un quota dépasse, mettre à jour le quota affiché
      if (errorMessage.includes("Quota dépassé")) {
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
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Simple toast effect
      const toast = document.createElement("div");
      toast.className = "fixed bottom-20 right-4 bg-black text-white px-3 py-2 rounded-lg text-sm z-50";
      toast.textContent = "✅ Copié !";
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    } catch {
      console.error("Erreur lors de la copie");
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

Le prompt final doit être prêt à être utilisé et optimisé pour maximiser l'engagement.`;

      const response = await fetch("/api/prompt-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          intent: {
            platform: promptBuilderData.platform,
            objective: "engagement",
            tone: "professionnel",
            language: "fr"
          },
          brief: `${promptBuilderData.brandName} - ${promptBuilderData.description}`
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setInputValue(data.prompt);
        setShowPromptBuilder(false);
        // Reset form
        setPromptBuilderData({ brandName: "", description: "", platform: "instagram" });
      }
    } catch (error) {
      console.error("Erreur génération prompt:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
            💬 Chat Générateur IA
          </h1>
          <div className="flex items-center space-x-2 ml-2">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
              ⚡ {quotaInfo?.plan === 'pro' ? 'Pro' : 'Gratuit'} - {quotaInfo?.remaining || 0} crédits
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 pb-20 sm:pb-24">
        {messages.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.456L3 21l2.456-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
              Commencez à taper votre idée
            </h3>
            <p className="text-gray-600 text-sm max-w-sm mx-auto">
              Décrivez votre post et l'IA générera 3 variantes optimisées pour vous
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} px-2`}>
            <div className={`max-w-[85%] sm:max-w-md lg:max-w-lg xl:max-w-lg`}>
              {message.type === "user" ? (
                // Message utilisateur - aligné à droite, bulle bleue
                <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-br-md ml-auto">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs text-blue-200 mt-1">
                    {message.timestamp.toLocaleTimeString().slice(0, 5)}
                  </p>
                </div>
              ) : (
                // Message IA - aligné à gauche, bulle grise
                <div className="bg-white border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <p className="text-sm leading-relaxed mb-2">{message.content}</p>
                  
                  {message.variants && (
                    <div className="space-y-3 mt-3">
                      {message.variants.map((variant, index) => (
                        <div key={index} className="bg-gray-50 border-l-4 border-blue-200 pl-3 py-2 rounded-r-lg">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-xs font-medium text-gray-600 mb-1">
                                Variante {index + 1}
                              </p>
                              <p className="text-sm leading-relaxed">
                                {variant}
                              </p>
                            </div>
                            <button
                              onClick={() => copyToClipboard(variant)}
                              className="ml-2 flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-400 mt-2">
                    {message.timestamp.toLocaleTimeString().slice(0, 5)}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm animate-pulse">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                </div>
                <span className="text-gray-600 text-sm">PostlyAI génère...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar - Fixed Bottom */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-2 sm:p-4 shadow-lg">
        {/* Prompt Builder Button */}
        <div className="mb-3 flex justify-center">
          <button
            onClick={() => setShowPromptBuilder(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>Prompt Builder</span>
          </button>
        </div>

        {quotaInfo && quotaInfo.remaining <= 0 && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-red-700 text-sm font-medium mb-2">
              ⭐ Vous avez atteint votre limite de générations gratuites !
            </p>
            <p className="text-red-600 text-xs mb-3">
              Passez au plan Pro pour générer 200 posts par mois
            </p>
            <button
              onClick={() => window.location.href = '/dashboard/billing'}
              className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-green-700 transition-colors"
            >
              🌟 Upgrade maintenant
            </button>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex items-end space-x-2 sm:space-x-3">
          <div className="flex-1 min-w-0">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Décrivez votre idée de post..."
              className="w-full resize-none border border-gray-300 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm leading-relaxed"
              rows={2}
              maxLength={700}
              disabled={loading}
            />
            <p className="text-xs text-gray-400 mt-1 text-right">
              {inputValue.length}/700
            </p>
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim() || loading || (quotaInfo !== null && quotaInfo.remaining <= 0)}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 sm:p-3 rounded-full transition-colors flex-shrink-0 flex items-center"
          >
            {loading ? (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </form>
      </div>

      {/* Prompt Builder Popup */}
      {showPromptBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">✨ Prompt Builder</h3>
                <button
                  onClick={() => setShowPromptBuilder(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de la marque/produit
                  </label>
                  <input
                    type="text"
                    value={promptBuilderData.brandName}
                    onChange={(e) => setPromptBuilderData(prev => ({ ...prev, brandName: e.target.value }))}
                    placeholder="Ex: Nike, MacBook Pro, Café Artisanal..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={promptBuilderData.description}
                    onChange={(e) => setPromptBuilderData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Décrivez votre produit/service..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-black"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plateforme
                  </label>
                  <select
                    value={promptBuilderData.platform}
                    onChange={(e) => setPromptBuilderData(prev => ({ ...prev, platform: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="tiktok">TikTok</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
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