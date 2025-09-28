# 🔧 Configuration Webhook Twilio WhatsApp

## 🚨 Message reçu : "Configure your WhatsApp Sandbox's Inbound URL"

Ce message indique que le webhook Twilio n'est pas encore configuré. Voici comment le corriger :

## 📋 Étapes de Configuration

### 1. Accéder à Twilio Console
1. Allez sur [https://console.twilio.com/](https://console.twilio.com/)
2. Connectez-vous avec vos identifiants
3. Naviguez vers **Develop → Messaging → Try it out → Send a WhatsApp message**

### 2. Configurer WhatsApp Sandbox
1. Dans la section **WhatsApp**, cliquez sur **Sandbox Settings**
2. Vous verrez une section **Configuration**
3. Dans le champ **When a message comes in**, entrez :
   ```
   https://postly-ai.vercel.app/api/whatsapp/webhook
   ```

### 3. Activer les Messages Entrants
1. Assurez-vous que **"When a message comes in"** est activé
2. La méthode doit être définie sur **POST**
3. Sauvegardez la configuration

### 4. Vérifier le Numéro de Sandbox
- Votre numéro Twilio : `+14155238886`
- Code de sandbox : `join [code]` (visible dans la console)

## 🧪 Test de Configuration

### Test 1 : Envoyer un message au sandbox
1. Envoyez un message WhatsApp au numéro `+14155238886`
2. Commencez par envoyer : `join [votre-code-sandbox]`
3. Puis envoyez : `HELP`

### Test 2 : Vérifier les logs
1. Allez dans **Monitor → Logs → Messages**
2. Vérifiez que les messages entrants apparaissent
3. Vérifiez les logs Vercel pour voir si le webhook reçoit les requêtes

## 🔍 Dépannage

### Problème : Webhook ne répond pas
**Solution :**
1. Vérifiez que l'URL est exactement : `https://postly-ai.vercel.app/api/whatsapp/webhook`
2. Vérifiez que votre app Vercel est déployée
3. Vérifiez les variables d'environnement sur Vercel

### Problème : Erreur 500 sur le webhook
**Solution :**
1. Vérifiez les logs Vercel Functions
2. Vérifiez que `WHATSAPP_PROVIDER=twilio` est défini
3. Vérifiez que les identifiants Twilio sont corrects

### Problème : Messages non reçus
**Solution :**
1. Vérifiez que le numéro est dans le sandbox Twilio
2. Vérifiez que vous avez envoyé `join [code]` d'abord
3. Vérifiez la configuration du webhook

## 📱 Variables d'Environnement Vercel

Assurez-vous que ces variables sont définies sur Vercel :

```env
WHATSAPP_PROVIDER=twilio
TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
TWILIO_WHATSAPP_FROM=+14155238886
OTP_SALT=your-otp-salt-secret-here
```

## 🎯 Test Final

Une fois configuré, testez ces commandes :

1. `HELP` → Devrait afficher les commandes disponibles
2. `BALANCE` → Devrait afficher le solde (si connecté)
3. `LOGIN` → Devrait initier le processus de connexion

## 📞 Support

Si le problème persiste :
1. Vérifiez les logs Twilio Console
2. Vérifiez les logs Vercel Functions
3. Testez l'endpoint directement avec curl

---

**🎉 Une fois configuré, le message "Configure your WhatsApp Sandbox's Inbound URL" disparaîtra !**
