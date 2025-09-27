# 🚀 Checklist de déploiement Vercel

## ✅ Variables d'environnement à configurer sur Vercel

Dans le dashboard Vercel → Settings → Environment Variables, ajoutez :

### Base de données
```
DATABASE_URL=postgresql://username:password@host:port/database
DIRECT_URL=postgresql://username:password@host:port/database
```

### NextAuth
```
NEXTAUTH_SECRET=votre_secret_aleatoire_tres_long
NEXTAUTH_URL=https://postly-ai.vercel.app
```

### OpenAI (si utilisé)
```
OPENAI_API_KEY=sk-...
```

### Stripe (si utilisé)
```
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRO_CHECKOUT_URL=https://buy.stripe.com/...
```

## 🔧 Commandes de déploiement

### 1. Générer le client Prisma
```bash
npx prisma generate
```

### 2. Appliquer les migrations
```bash
npx prisma db push
```

### 3. Vérifier la connexion DB
```bash
npx prisma db pull
```

## 🐛 Debugging

### Vérifier les logs Vercel
1. Allez sur Vercel Dashboard
2. Sélectionnez votre projet
3. Onglet "Functions" pour voir les logs d'erreur

### Tester la connexion DB
Ajoutez une route de test :
```typescript
// app/api/test-db/route.ts
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    await prisma.$connect()
    return Response.json({ status: 'DB connected' })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
```

## 📝 Notes importantes

- Assurez-vous que `DATABASE_URL` pointe vers la bonne base de données
- Vérifiez que `NEXTAUTH_URL` correspond exactement à votre domaine Vercel
- Les migrations Prisma doivent être appliquées sur la base de données de production
