# Configuration WhatsApp pour Postly-AI

## Variables d'environnement à ajouter

Ajoutez ces variables à votre fichier `.env.local` (développement) et aux variables d'environnement Vercel (production) :

### Configuration de base
```env
# WhatsApp Provider (twilio ou meta)
WHATSAPP_PROVIDER=twilio

# OTP Security
OTP_SALT=votre-salt-secret-256-bits
```

### Configuration Twilio (Recommandé pour débuter)

1. Créez un compte sur [Twilio Console](https://console.twilio.com/)
2. Activez WhatsApp Sandbox
3. Configurez le webhook vers : `https://votre-domaine.com/api/whatsapp/webhook`

```env
# Twilio Configuration (CONFIGURÉ)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token-here
TWILIO_WHATSAPP_FROM=+14155238886
```

### Configuration Meta Cloud API (Avancé)

1. Créez une app Business sur [Meta for Developers](https://developers.facebook.com/)
2. Ajoutez le produit WhatsApp Business API
3. Configurez le webhook

```env
# Meta Configuration
META_ACCESS_TOKEN=EAAxxxxxxxxxxxxx
META_PHONE_NUMBER_ID=123456789012345
META_VERIFY_TOKEN=votre-verify-token-secret
```

## Instructions de setup

### 1. Twilio Sandbox (Recommandé)

1. Aller sur [Twilio Console](https://console.twilio.com/)
2. WhatsApp → Sandbox Settings
3. Noter le numéro `from` (ex: +14155238886)
4. Configurer webhook : `https://postly-ai.vercel.app/api/whatsapp/webhook`
5. Ajouter les variables d'environnement

### 2. Test en développement

1. Ajoutez les variables à `.env.local`
2. Redémarrez le serveur : `npm run dev`
3. Testez avec le numéro sandbox Twilio

### 3. Déploiement production

1. Ajoutez les variables dans Vercel → Settings → Environment Variables
2. Redéployez l'application
3. Configurez le webhook avec l'URL de production

## Commandes WhatsApp supportées

- `HELP` - Afficher l'aide
- `BALANCE` - Voir les crédits
- `LOGIN` - Lier le compte web
- `GEN [texte]` - Générer des posts
- `LANG` - Changer la langue

## Exemple d'utilisation

1. Envoyez "HELP" pour voir les commandes
2. Envoyez "Crée un post promo pour Instagram" pour générer des posts
3. Utilisez "BALANCE" pour vérifier vos crédits
