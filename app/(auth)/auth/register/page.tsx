&quot;use client&quot;;
import { useState } from &quot;react&quot;;
import { useRouter } from &quot;next/navigation&quot;;
import Link from &quot;next/link&quot;;
import { Button } from &quot;@/components/ui/Button&quot;;
import { Input } from &quot;@/components/ui/Input&quot;;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(&quot;&quot;);
    setSuccess(false);

    const form = new FormData(e.currentTarget);
    const email = form.get(&quot;email&quot;) as string;
    const password = form.get(&quot;password&quot;) as string;
    const confirmPassword = form.get(&quot;confirmPassword&quot;) as string;

    if (password !== confirmPassword) {
      setError(&quot;Les mots de passe ne correspondent pas&quot;);
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(&quot;Le mot de passe doit contenir au moins 6 caractères&quot;);
      setLoading(false);
      return;
    }

    try {

        method: &quot;POST&quot;,
        headers: {
          &quot;Content-Type&quot;: &quot;application/json&quot;,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === &quot;exists&quot;) {
          setError(&quot;Cette adresse email est déjà utilisée&quot;);
        } else {
          setError(data.error || &quot;Une erreur est survenue&quot;);
        }
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push(&quot;/auth/login&quot;);
        }, 2000);
      }
    } catch (error) {
      setError(&quot;Une erreur est survenue&quot;);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className=&quot;bg-white dark:bg-gray-900 py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-200 dark:border-gray-800&quot;>
        <div className=&quot;text-center&quot;>
          <div className=&quot;mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20&quot;>
            <svg
              className=&quot;h-6 w-6 text-green-600 dark:text-green-400&quot;
              fill=&quot;none&quot;
              stroke=&quot;currentColor&quot;
              viewBox=&quot;0 0 24 24&quot;
            >
              <path
                strokeLinecap=&quot;round&quot;
                strokeLinejoin=&quot;round&quot;
                strokeWidth={2}
                d=&quot;M5 13l4 4L19 7&quot;
              />
            </svg>
          </div>
          <h2 className=&quot;mt-6 text-3xl font-bold text-gray-900 dark:text-white&quot;>
            Compte créé !
          </h2>
          <p className=&quot;mt-2 text-sm text-gray-600 dark:text-gray-300&quot;>
            Votre compte a été créé avec succès. Redirection vers la connexion...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=&quot;bg-white dark:bg-gray-900 py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-200 dark:border-gray-800&quot;>
      <div className=&quot;mb-8&quot;>
        <h2 className=&quot;text-3xl font-bold text-gray-900 dark:text-white text-center&quot;>
          Créer un compte
        </h2>
        <p className=&quot;mt-2 text-sm text-gray-600 dark:text-gray-300 text-center&quot;>
          Commencez votre essai gratuit dès maintenant
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
          placeholder=&quot;Minimum 6 caractères&quot;
          required
          helperText=&quot;Le mot de passe doit contenir au moins 6 caractères&quot;
        />

        <Input
          label=&quot;Confirmer le mot de passe&quot;
          name=&quot;confirmPassword&quot;
          type=&quot;password&quot;
          placeholder=&quot;Répétez votre mot de passe&quot;
          required
        />

        <div className=&quot;flex items-center&quot;>
          <input
            id=&quot;terms&quot;
            name=&quot;terms&quot;
            type=&quot;checkbox&quot;
            required
            className=&quot;h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded&quot;
          />
          <label htmlFor=&quot;terms&quot; className=&quot;ml-2 block text-sm text-gray-700 dark:text-gray-300&quot;>
            Jaccepte les{&quot; &quot;}
            <Link href=&quot;/terms&quot; className=&quot;text-primary-600 hover:text-primary-500&quot;>
              conditions dutilisation
            </Link>{&quot; &quot;}
            et la{&quot; &quot;}
            <Link href=&quot;/privacy&quot; className=&quot;text-primary-600 hover:text-primary-500&quot;>
              politique de confidentialité
            </Link>
          </label>
        </div>

        <Button
          type=&quot;submit&quot;
          className=&quot;w-full&quot;
          isLoading={loading}
          disabled={loading}
        >
          {loading ? &quot;Création...&quot; : &quot;Créer mon compte&quot;}
        </Button>
      </form>

      <div className=&quot;mt-6&quot;>
        <div className=&quot;relative&quot;>
          <div className=&quot;absolute inset-0 flex items-center&quot;>
            <div className=&quot;w-full border-t border-gray-300 dark:border-gray-700&quot; />
          </div>
          <div className=&quot;relative flex justify-center text-sm&quot;>
            <span className=&quot;px-2 bg-white dark:bg-gray-900 text-gray-500&quot;>
              Déjà un compte ?
            </span>
          </div>
        </div>

        <div className=&quot;mt-6&quot;>
          <Button
            variant=&quot;outline&quot;
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

