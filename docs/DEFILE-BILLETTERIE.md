# Billetterie Défilé 4 Juillet — Mise en service

Système de billetterie en ligne pour le défilé de marques BRUUX (Nzeng Ayong,
4 juillet 2026). Inscription → paiement par virement Mobile Money → validation
manuelle par l'admin → QR sur WhatsApp → scan à l'entrée.

## Pages

| URL | Rôle |
|---|---|
| `/defile` | Page publique : tickets, inscription, instructions de paiement |
| `/defile/admin` | Interface équipe : validation des paiements + scan à l'entrée (mot de passe) |

Pages = fichiers statiques dans `public/defile/` (maquettes validées). Backend =
route handlers Next.js sous `src/app/api/defile/`. URLs propres via les
`rewrites` de `next.config.mjs`.

## Flux

```
Visiteur → /defile (formulaire : nom, WhatsApp, type de billet)
  → POST /api/defile/inscription
     → génère un code unique BRX-XXXX (= identifiant + motif + contenu QR)
     → génère un montant « fingerprint » = prix + suffixe (ex : 5 047)
     → Supabase : ligne invites (statut = en_attente)
     → renvoie montant exact + numéros Airtel/Moov + code
  → la page affiche les instructions de paiement
  → visiteur envoie le virement (motif = code), puis clique « J'ai payé »

Admin → /defile/admin (login)
  → section « En attente de validation » : nom, billet, montant attendu, code, heure
  → vérifie le virement dans son historique Airtel/Moov (montant exact OU code)
  → clic « Approuver » → POST /api/defile/admin/approuver
     → envoie le QR sur WhatsApp via WaSender
     → Supabase : statut = paye, qr_sent = true
  → à l'entrée : scan du QR (ou recherche par nom)
```

**Identification du paiement :** chaque demande a un montant exact unique (le
suffixe) ET un code BRX dans le motif. L'admin retrouve le virement par l'un ou
l'autre. Le statut ne passe `paye` que si l'envoi WhatsApp réussit ; sinon la
demande reste en attente pour réessayer.

**Sécurité :** la table `invites` a RLS activé sans policy publique → inaccessible
avec la clé anon. Tout passe par le serveur (clé service_role, jamais exposée).
L'interface admin est protégée par mot de passe (cookie httpOnly signé) ;
validation et scan se font via des endpoints authentifiés.

## Endpoints

| Endpoint | Rôle |
|---|---|
| `POST /api/defile/inscription` | Crée la demande (en_attente) + renvoie instructions |
| `POST /api/defile/admin/login` / `logout` | Session admin (cookie signé) |
| `GET /api/defile/admin/pending` | Demandes en attente de validation |
| `POST /api/defile/admin/approuver` | Valide un paiement → QR WhatsApp → paye |
| `POST /api/defile/admin/scan` | Valide un QR / recherche à l'entrée |
| `GET /api/defile/admin/stats` | Total payés / entrés |
| `GET /api/defile/qr/[id]` | QR PNG (image envoyée sur WhatsApp) |

## Étapes de mise en service

### 1. Supabase
1. SQL Editor → exécuter `supabase/schema.sql` (table `invites`).
2. `SUPABASE_SERVICE_ROLE_KEY` est déjà dans `.env.local`.

### 2. Numéros Mobile Money
Renseigner `DEFILE_AIRTEL_NUMBER` et `DEFILE_MOOV_NUMBER` (numéros de
l'organisateur, affichés dans les instructions de paiement).

### 3. WaSender (WhatsApp)
1. Créer un compte (wasenderapi.com / wasender.app).
2. Connecter le WhatsApp BRUUX (scan du QR de session).
3. Récupérer l'API key → `WASENDER_API_KEY` (et `WASENDER_API_URL` si le host diffère).

### 4. Mot de passe admin
`DEFILE_ADMIN_PASSWORD` protège `/defile/admin`. **Choisir une valeur forte**
(remplacer `change-moi`).

### 5. Variables d'environnement
Remplir `.env.local` **et** Vercel → Settings → Env Variables. Voir `.env.example` :
`DEFILE_ADMIN_PASSWORD`, `DEFILE_AIRTEL_NUMBER`, `DEFILE_MOOV_NUMBER`,
`WASENDER_API_KEY`.

### 6. Photos des marques (optionnel)
Déposer les visuels dans `public/defile/photos/{marque}/look{1,2,3}.jpg`
(dossiers déjà créés). Tant qu'ils sont vides, des dégradés s'affichent.

## ⚠️ Points à vérifier

- **WaSender :** l'image s'envoie par **URL** (pas base64) — le QR est servi via
  `/api/defile/qr/{id}`. Confirmer l'endpoint exact (`/api/send-message`) et le
  nom des champs selon ton compte dans `src/lib/defile/wasender.ts`.
- **Rapprochement manuel :** la validation repose sur l'admin qui vérifie
  réellement le virement reçu. Le montant exact + le code BRX servent à
  l'identifier sans ambiguïté ; ne valider que les paiements effectivement reçus.
- **Réservations non payées :** une demande reste `en_attente` même si la
  personne ne paie jamais. Ce n'est pas bloquant (l'admin ne valide que les
  paiements reçus) ; on peut nettoyer périodiquement les vieilles lignes
  `en_attente` si besoin.

## Fichiers

```
public/defile/index.html              page publique (formulaire + instructions)
public/defile/admin.html              validation + scan
public/defile/photos/<marque>/        visuels (à remplir)
src/app/api/defile/inscription/       POST création demande
src/app/api/defile/qr/[id]/           QR PNG
src/app/api/defile/admin/login|logout|pending|approuver|scan|stats/
src/lib/defile/                       codes, wasender, auth, tickets, clients
supabase/schema.sql                   table invites
```
