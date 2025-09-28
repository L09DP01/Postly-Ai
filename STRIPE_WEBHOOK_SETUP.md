# Configuration du Webhook Stripe

## Événements surveillés ✅

Le webhook surveille maintenant les événements suivants :

1. **checkout.session.completed** - Paiement checkout réussi
2. **customer.subscription.created** - Nouvelle souscription créée  
3. **customer.subscription.updated** - Souscription modifiée
4. **customer.subscription.deleted** - Souscription supprimée
5. **invoice.payment_succeeded** - Facture payée avec succès
6. **invoice.payment_failed** - Échec de paiement

## Configuration Dashboard Stripe

Pour configurer le webhook dans votre Dashboard Stripe :

1. **Accédez au Dashboard Stripe** : https://dashboard.stripe.com/webhooks

2. **Créer un nouvel endpoint webhook** :
   - URL : `https://votredomaine.com/api/stripe/webhook`
   - Description : "Postly AI Webhook"

3. **Sélectionnez les événements à écouter** :
   ```
   checkout.session.completed
   customer.subscription.created
   customer.subscription.updated  
   customer.subscription.deleted
   invoice.payment_succeeded
   invoice.payment_failed
   ```

4. **Récupérez le Secret du webhook** et ajoutez-le à votre `.env.local` :
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxx
   ```

## Prix en dollars USD ✅

Les prix sont maintenant affichés en dollars US :
- **Plan Pro** : $5.99/month
- **Plan Business** : $49/month

## Gestion des événements

### `checkout.session.completed`
- Upgrade automatique utilisateur vers Pro plan
- Création d'une souscription active
- Assignation de 200 générations mensuelles

### `customer.subscription.updated`
- Surveillance du statut de souscription
- Mise à jour côté utilisateur selon le statut

### `customer.subscription.deleted`
- Downgrade automatique vers le plan gratuit
- Réassignation de 10 générations mensuelles

### `invoice.payment_succeeded`
- Confirmation de paiement réussie
- Maintien du statut Pro actif

### `invoice.payment_failed`
- Gestion des échecs de paiement
- Marque la souscription comme "past_due"

## URLs de redirection

- **Paiement réussi** : `/success` → `/dashboard/generate`
- **Échec de paiement** : `/billing` (avec message d'erreur)

Le système est maintenant prêt à gérer tous les événements Stripe de manière robuste ! 🚀
