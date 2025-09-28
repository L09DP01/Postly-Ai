"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SettingsClient() {
  const { data: session, update } = useSession();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      console.log("🔍 Chargement du profil utilisateur...");
      const response = await fetch("/api/user/profile");
      console.log("📡 Réponse API:", response.status, response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log("📊 Données profil:", data);
        setUserProfile(data);
        if (data.waPhoneE164) {
          setPhoneNumber(data.waPhoneE164);
        }
      } else {
        const error = await response.text();
        console.error("❌ Erreur API:", error);
      }
    } catch (error) {
      console.error("❌ Erreur lors du chargement du profil:", error);
    }
  };

  const handleLinkWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneE164: phoneNumber,
          purpose: "LINK",
          userId: userProfile?.id
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Code de vérification envoyé sur WhatsApp ! Entrez le code ci-dessous.");
      } else {
        setMessage(`❌ Erreur: ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = (e.target as any).otp.value;
    
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneE164: phoneNumber,
          code: otpCode,
          purpose: "LINK"
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("🎉 WhatsApp lié avec succès ! Vos crédits sont maintenant synchronisés.");
        await fetchUserProfile(); // Recharger le profil
      } else {
        setMessage(`❌ Erreur: ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Paramètres du compte</h1>

      {/* Profil utilisateur */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Profil utilisateur</h2>
        <div className="space-y-2">
          <p className="text-gray-900"><strong className="text-gray-900">Email:</strong> <span className="text-gray-700">{session?.user?.email}</span></p>
          <div className="space-y-2">
            <p className="text-gray-900"><strong className="text-gray-900">Crédits Web:</strong> <span className="text-blue-600 font-semibold">{userProfile?.webCredits || 0}</span></p>
            <p className="text-gray-900"><strong className="text-gray-900">Crédits WhatsApp:</strong> <span className="text-green-600 font-semibold">{userProfile?.whatsappCredits || 0}</span></p>
            
            {userProfile?.isLinked && userProfile?.synchronizedCredits && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  🔗 <strong>Comptes liés</strong> - Crédits synchronisés: <span className="font-semibold">{userProfile.synchronizedCredits}</span>
                </p>
                <p className="text-blue-600 text-xs mt-1">
                  Vos crédits sont partagés entre le site web et WhatsApp
                </p>
              </div>
            )}
            
            {!userProfile?.isLinked && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  ⚠️ <strong>Comptes non liés</strong>
                </p>
                <p className="text-yellow-600 text-xs mt-1">
                  Liez votre WhatsApp pour synchroniser vos crédits
                </p>
              </div>
            )}
          </div>
          <p className="text-gray-900"><strong className="text-gray-900">WhatsApp lié:</strong> 
            {userProfile?.waPhoneE164 ? (
              <span className="text-green-600 ml-2">✅ {userProfile.waPhoneE164}</span>
            ) : (
              <span className="text-red-600 ml-2">❌ Non lié</span>
            )}
          </p>
        </div>
      </Card>

      {/* Liaison WhatsApp */}
      <Card>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Lier votre compte WhatsApp</h2>
        
        {!userProfile?.waPhoneE164 ? (
          <form onSubmit={handleLinkWhatsApp} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-900">
                Numéro WhatsApp (format international)
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="+50940035664"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <p className="text-sm text-gray-700 mt-1">
                Format: +[code pays][numéro] (ex: +50940035664 pour Haïti)
              </p>
            </div>
            
            <Button type="submit" disabled={loading}>
              {loading ? "Envoi en cours..." : "Envoyer le code de vérification"}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">
                ✅ Votre WhatsApp {userProfile.waPhoneE164} est lié à votre compte.
              </p>
              <p className="text-sm text-green-600 mt-2">
                Vos crédits sont synchronisés entre le site web et WhatsApp.
              </p>
            </div>
            
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium mb-2 text-gray-900">
                  Entrez le code de vérification reçu sur WhatsApp
                </label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  required
                />
              </div>
              
              <Button type="submit" disabled={loading}>
                {loading ? "Vérification..." : "Vérifier le code"}
              </Button>
            </form>
          </div>
        )}

        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            message.includes("✅") || message.includes("🎉") 
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}>
            {message}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Avantages de lier WhatsApp :</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Crédits synchronisés entre web et WhatsApp</li>
            <li>• Génération de posts directement via WhatsApp</li>
            <li>• Commandes vocales et textuelles</li>
            <li>• Notifications de nouveaux crédits</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
