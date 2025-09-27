"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const confirmPassword = form.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "exists") {
          setError("Cette adresse email est déjà utilisée");
        } else {
          setError(data.error || "Une erreur est survenue");
        }
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      }
    } catch (error) {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-white dark:bg-gray-900 py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-200 dark:border-gray-800">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20">
            <svg
              className="h-6 w-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Compte créé !
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Votre compte a été créé avec succès. Redirection vers la connexion...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-200 dark:border-gray-800">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Créer un compte
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
          Commencez votre essai gratuit dès maintenant
        </p>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <Input
          label="Adresse email"
          name="email"
          type="email"
          placeholder="votre@email.com"
          required
        />

        <Input
          label="Mot de passe"
          name="password"
          type="password"
          placeholder="Minimum 6 caractères"
          required
          helperText="Le mot de passe doit contenir au moins 6 caractères"
        />

        <Input
          label="Confirmer le mot de passe"
          name="confirmPassword"
          type="password"
          placeholder="Répétez votre mot de passe"
          required
        />

        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            J'accepte les{" "}
            <Link href="/terms" className="text-primary-600 hover:text-primary-500">
              conditions d'utilisation
            </Link>{" "}
            et la{" "}
            <Link href="/privacy" className="text-primary-600 hover:text-primary-500">
              politique de confidentialité
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          className="w-full"
          isLoading={loading}
          disabled={loading}
        >
          {loading ? "Création..." : "Créer mon compte"}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
              Déjà un compte ?
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full"
            asChild
          >
            <Link href="/auth/login">
              Se connecter
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

