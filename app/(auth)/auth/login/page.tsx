"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/dashboard/generate";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl, // 👈 renvoie là où tu veux
      });
      // pas besoin de gérer la suite si redirect:true
    } catch (error) {
      setError("Une erreur est survenue");
      setLoading(false);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-200 dark:border-gray-800">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Se connecter
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
          Accédez à votre compte Postly AI
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
          placeholder="Votre mot de passe"
          required
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Se souvenir de moi
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Mot de passe oublié ?
            </a>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          isLoading={loading}
          disabled={loading}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
              Pas encore de compte ?
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full"
            asChild
          >
            <Link href="/auth/register">
              Créer un compte
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

