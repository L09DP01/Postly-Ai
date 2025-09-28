# Postly AI - Générateur de posts IA

Postly AI est une application SaaS qui génère des posts optimisés pour les réseaux sociaux en utilisant l'intelligence artificielle. Transformez vos idées en contenus engageants en quelques secondes.

## 🚀 Fonctionnalités

- **Génération ultra-rapide** : 3 variantes de posts en moins de 10 secondes
- **SEO intégré** : Hashtags pertinents et mots-clés optimisés
- **Multi-plateformes** : Instagram, Facebook, TikTok, LinkedIn, Twitter
- **Tons personnalisables** : Professionnel, décontracté, vendeur, inspirant
- **Authentification sécurisée** : NextAuth avec credentials email/password
- **Dashboard complet** : Suivi des générations et gestion des crédits
- **Design responsive** : Optimisé pour tous les appareils

## 🛠️ Stack technique

- **Frontend** : Next.js 14 (App Router), TypeScript, TailwindCSS
- **Animations** : Framer Motion
- **Authentification** : NextAuth.js
- **Base de données** : Prisma + SQLite (dev)
- **Validation** : Zod
- **SEO** : next-seo, next-sitemap
- **Styling** : TailwindCSS avec design system personnalisé

## 📦 Installation

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone <repo-url>
cd postly-ai
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
```bash
cp env.example .env.local
```

Éditez le fichier `.env.local` :
```env
NEXTAUTH_URL=https://postly-ai.vercel.app
NEXTAUTH_SECRET=change-me-to-a-secure-secret
DATABASE_URL="file:./dev.db"
```

4. **Initialiser la base de données**
```bash
npx prisma generate
npx prisma db push
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera disponible sur [https://postly-ai.vercel.app](https://postly-ai.vercel.app)

## 🗂️ Structure du projet

```
postly-ai/
├── app/
│   ├── (marketing)/          # Pages marketing publiques
│   │   ├── page.tsx         # Landing page
│   │   ├── pricing/         # Page tarifs
│   │   ├── contact/         # Page contact
│   │   ├── privacy/         # Politique de confidentialité
│   │   └── terms/           # Conditions d'utilisation
│   ├── (auth)/auth/         # Pages d'authentification
│   │   ├── login/           # Connexion
│   │   └── register/        # Inscription
│   ├── (app)/               # Pages protégées
│   │   ├── dashboard/       # Tableau de bord
│   │   └── billing/         # Gestion facturation
│   ├── api/                 # API Routes
│   │   ├── auth/            # NextAuth
│   │   └── register/        # Inscription
│   └── layout.tsx           # Layout principal
├── components/              # Composants réutilisables
│   ├── ui/                  # Composants UI de base
│   ├── HeroDemo.tsx         # Section hero de la landing
│   ├── Features.tsx         # Section fonctionnalités
│   ├── PricingTable.tsx     # Tableau des tarifs
│   ├── FaqAccordion.tsx     # FAQ accordéon
│   ├── Navbar.tsx           # Navigation
│   └── Footer.tsx           # Pied de page
├── lib/                     # Utilitaires et configuration
│   ├── auth.ts              # Configuration NextAuth
│   ├── prisma.ts            # Client Prisma
│   ├── validators.ts        # Schémas Zod
│   └── seo/                 # Configuration SEO
├── prisma/                  # Schéma de base de données
│   └── schema.prisma        # Modèles Prisma
├── public/                  # Assets statiques
├── middleware.ts            # Middleware de protection
└── tailwind.config.ts       # Configuration Tailwind
```

## 🔐 Comptes de test

Pour tester l'application, vous pouvez créer un compte via l'interface d'inscription ou utiliser les données suivantes :

**Plan Gratuit** :
- 10 posts par mois
- 3 plateformes supportées
- Support email

## 📱 Pages disponibles

### Pages publiques
- `/` - Landing page avec animations
- `/pricing` - Tarifs et plans
- `/contact` - Formulaire de contact
- `/privacy` - Politique de confidentialité
- `/terms` - Conditions d'utilisation

### Pages d'authentification
- `/auth/login` - Connexion
- `/auth/register` - Inscription

### Pages protégées (nécessitent une connexion)
- `/dashboard` - Tableau de bord principal
- `/billing` - Gestion de l'abonnement

## 🎨 Design System

### Couleurs
- **Primaire** : #635BFF (violet)
- **Neutres** : Palette de gris avec support dark mode
- **États** : Vert (succès), Rouge (erreur), Jaune (avertissement)

### Composants
- **Cards** : Bordures arrondies (2xl), ombres douces
- **Buttons** : Animations hover/tap avec Framer Motion
- **Inputs** : Focus states avec couleurs primaires
- **Effets** : Glass morphism léger, backdrop blur

## 🚀 Déploiement

### Vercel (Recommandé)

1. **Connecter le repository**
```bash
npx vercel --prod
```

2. **Configurer les variables d'environnement**
- `NEXTAUTH_URL` : URL de production
- `NEXTAUTH_SECRET` : Secret sécurisé
- `DATABASE_URL` : URL de base de données (PostgreSQL pour la prod)

3. **Déployer**
```bash
git push origin main
```

### Variables d'environnement de production

```env
NEXTAUTH_URL=https://votre-domaine.com
NEXTAUTH_SECRET=secret-super-securise
DATABASE_URL="postgresql://user:password@host:port/database"
```

## 📈 SEO et Performance

- **Lighthouse Score** : ≥ 90 (Performance, SEO, Accessibilité)
- **LCP** : < 2.5s
- **CLS** : < 0.1
- **Meta tags** : OpenGraph, Twitter Cards
- **Structured Data** : JSON-LD pour les produits et FAQ
- **Sitemap** : Généré automatiquement
- **Robots.txt** : Configuré pour l'indexation

## 🔧 Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # ESLint
npm run db:generate  # Générer le client Prisma
npm run db:push      # Pousser le schéma vers la DB
npm run db:studio    # Interface Prisma Studio
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- 📧 Email : support@postly-ai.com
- 💬 Contact : [Page de contact](/contact)

---

**Postly AI** - Générez des posts qui performent, en 10 secondes. 🚀