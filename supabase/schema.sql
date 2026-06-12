-- ============================================================================
-- BRUUX — Billetterie Défilé 4 Juillet
-- Table `invites` : un invité = une inscription = un billet.
--
-- À exécuter dans Supabase → SQL Editor (une seule fois).
-- ============================================================================

create table if not exists invites (
  id            text primary key,                          -- code de réservation, format : BRX-XXXX
  nom           text not null,
  telephone     text not null,                             -- WhatsApp avec indicatif, ex : +241...
  ticket_type   text not null check (ticket_type in ('standard','vip','prestige')),
  montant       integer not null,                          -- FCFA exact attendu = prix + suffixe (ex : 5047)
  statut        text not null default 'en_attente'
                  check (statut in ('en_attente','paye','scanne')),
  scanne        boolean not null default false,
  scanne_at     timestamptz,
  qr_sent       boolean not null default false,
  created_at    timestamptz not null default now()
);

-- Index pour les lookups fréquents
create index if not exists invites_statut_idx      on invites (statut);
create index if not exists invites_created_at_idx  on invites (created_at desc);

-- ----------------------------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------------------------
-- On ACTIVE RLS sans créer AUCUNE policy publique : la table est donc
-- totalement inaccessible avec la clé anon (public). Toutes les opérations
-- (inscription, webhook, scan, stats) passent par les route handlers Next.js
-- qui utilisent la clé service_role — laquelle bypass RLS côté serveur.
--
-- Conséquence : impossible de lire/écrire la table depuis le navigateur.
alter table invites enable row level security;
