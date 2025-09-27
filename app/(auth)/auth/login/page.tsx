&quot;use client&quot;;

import { useState } from &quot;react&quot;;
import { signIn } from &quot;next-auth/react&quot;;
import Link from &quot;next/link&quot;;
import { Button } from &quot;@/components/ui/Button&quot;;
import { Input } from &quot;@/components/ui/Input&quot;;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const [callbackUrl, setCallbackUrl] = useState(&quot;/dashboard&quot;);

  // Récupérer callbackUrl côté client sans useSearchParams
  useState(() => {
    if (typeof window !== &apos;undefined&apos;) {
      const urlParams = new URLSearchParams(window.location.search);
      const cbUrl = urlParams.get(&apos;callbackUrl);
      if (cbUrl) setCallbackUrl(cbUrl);
    }
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(&quot;&quot;);

    const form = new FormData(e.currentTarget);
    const email = form.get(&quot;email&quot;) as string;
    const password = form.get(&quot;password&quot;) as string;

    try {

        email,
        password,
        redirect: true,
        callbackUrl,
      });
    } catch (error) {
      setError(&quot;Une erreur est survenue&quot;);
      setLoading(false);
    }
  }

  return (
    <div className=&quot;bg-white dark:bg-gray-900 py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-200 dark:border-gray-800&quot;>
      <div className=&quot;mb-8&quot;>
        <h2 className=&quot;text-3xl font-bold text-gray-900 dark:text-white text-center&quot;>
          Se connecter
        </h2>
        <p className=&quot;mt-2 text-sm text-gray-600 dark:text-gray-300 text-center&quot;>
          Accédez à votre compte Postly AI
        </p>
      </div>

      <form className=&quot;space-y-6&quot; onSubmit={onSubmit}>
        {error && (
          <div className=&quot;bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4&quot;>
            <p className=&quot;text-sm text-red-600 dark:text-red-400&quot;>{error}</p>
          </div>
        )}

        <Input
          label=&quot;Adresse email&quot;
          name=&quot;email&quot;
          type=&quot;email&quot;
          placeholder=&quot;votre@email.com&quot;
          required
        />

        <Input
          label=&quot;Mot de passe&quot;
          name=&quot;password&quot;
          type=&quot;password&quot;
          placeholder=&quot;Votre mot de passe&quot;
          required
        />

        <div className=&quot;flex items-center justify-between&quot;>
          <div className=&quot;flex items-center&quot;>
            <input
              id=&quot;remember-me&quot;
              name=&quot;remember-me&quot;
              type=&quot;checkbox&quot;
              className=&quot;h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded&quot;
            />
            <label htmlFor=&quot;remember-me&quot; className=&quot;ml-2 block text-sm text-gray-700 dark:text-gray-300&quot;>
              Se souvenir de moi
            </label>
          </div>

          <div className=&quot;text-sm&quot;>
            <a href=&quot;#&quot; className=&quot;font-medium text-primary-600 hover:text-primary-500&quot;>
              Mot de passe oublié ?
            </a>
          </div>
        </div>

        <Button
          type=&quot;submit&quot;
          className=&quot;w-full&quot;
          isLoading={loading}
          disabled={loading}
        >
          {loading ? &quot;Connexion...&quot; : &quot;Se connecter&quot;}
        </Button>
      </form>

      <div className=&quot;mt-6&quot;>
        <div className=&quot;relative&quot;>
          <div className=&quot;absolute inset-0 flex items-center&quot;>
            <div className=&quot;w-full border-t border-gray-300 dark:border-gray-700&quot; />
          </div>
          <div className=&quot;relative flex justify-center text-sm&quot;>
            <span className=&quot;px-2 bg-white dark:bg-gray-900 text-gray-500&quot;>
              Pas encore de compte ?
            </span>
          </div>
        </div>

        <div className=&quot;mt-6&quot;>
          <Button
            variant=&quot;outline&quot;
            className=&quot;w-full&quot;
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
