# 🚀 Guide de Déploiement WhatsApp sur Vercel

## ✅ Configuration Vercel

### 1. Variables d'Environnement à Ajouter

Dans votre projet Vercel, allez dans **Settings → Environment Variables** et ajoutez :

```env
# WhatsApp Configuration
WHATSAPP_PROVIDER=twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token-here
TWILIO_WHATSAPP_FROM=+14155238886

# OTP Security
OTP_SALT=your-production-secret-salt-here

# Base de données (déjà configurée)
DATABASE_URL=postgresql://...
```

### 2. Configuration Twilio Webhook

1. Allez sur [Twilio Console](https://console.twilio.com/)
2. **WhatsApp → Sandbox Settings**
3. Configurez le webhook :
   - **URL** : `https://postly-ai.vercel.app/api/whatsapp/webhook`
   - **Method** : `POST`
4. **Activez** les messages entrants

### 3. Test du Système

#### Test Manuel
Envoyez un message WhatsApp au numéro : `+14155238886`

**Commandes disponibles :**
- `HELP` - Aide et commandes
- `BALANCE` - Voir les crédits
- `LOGIN` - Connexion OTP
- `LANG fr` - Changer en français
- `GEN Créer un post Instagram pour ma boutique de mode` - Générer un post

#### Test Automatique
```bash
curl -X POST https://postly-ai.vercel.app/api/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "Body": "HELP",
    "From": "whatsapp:+50940035664",
    "To": "whatsapp:+14155238886"
  }'
```

## 🔧 Fonctionnalités Implémentées

### ✅ Système Complet
- [x] Webhook WhatsApp avec vérification signature
- [x] Gestion OTP pour connexion/liaison
- [x] Pipeline IA unifié (parse → prompt-builder → generate)
- [x] Gestion des crédits partagés web/WhatsApp
- [x] Détection automatique de langue
- [x] Support multilingue (fr, en, es)
- [x] Ledger de crédits pour traçabilité

### ✅ Sécurité
- [x] Vérification signature Twilio
- [x] OTP avec hash + salt
- [x] Rate limiting
- [x] Transactions Prisma atomiques
- [x] Validation des entrées avec Zod

### ✅ Base de Données
- [x] Tables `OtpChallenge` et `CreditLedger` créées
- [x] Colonnes WhatsApp ajoutées à `User`
- [x] Index optimisés pour les performances
- [x] Contraintes de clés étrangères

## 📱 Parcours Utilisateur

### WA-First (Nouvel utilisateur WhatsApp)
1. Utilisateur envoie `HELP` → Système répond avec les commandes
2. Utilisateur envoie `LOGIN` → Système génère OTP
3. Utilisateur reçoit OTP sur WhatsApp
4. Utilisateur envoie le code → Connexion automatique
5. Utilisateur peut utiliser `GEN` pour créer des posts

### Web-First (Utilisateur existant)
1. Utilisateur se connecte sur le site web
2. Ajoute son numéro WhatsApp dans le profil
3. Système envoie OTP sur WhatsApp
4. Utilisateur confirme → Liaison des comptes
5. Crédits partagés entre web et WhatsApp

## 🎯 Prochaines Étapes

1. **Tester le webhook** en envoyant `HELP` au numéro Twilio
2. **Configurer les variables** sur Vercel
3. **Déployer** la dernière version
4. **Tester** avec un vrai numéro WhatsApp
5. **Monitorer** les logs Vercel pour les erreurs

## 🚨 Dépannage

### Erreur 500 sur webhook
- Vérifier les variables d'environnement Vercel
- Vérifier les logs Functions dans Vercel
- Tester la connexion base de données

### Message non reçu
- Vérifier la configuration webhook Twilio
- Vérifier que le numéro est dans le sandbox
- Vérifier les logs Twilio Console

### OTP ne fonctionne pas
- Vérifier `OTP_SALT` dans les variables
- Vérifier la table `OtpChallenge` en base
- Vérifier les logs de génération OTP

---

**🎉 Système WhatsApp prêt pour la production !**
