import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

/**
 * Client Supabase « service role » — RÉSERVÉ AU SERVEUR.
 *
 * La table `invites` a RLS activé sans aucune policy publique : seule la clé
 * service_role peut la lire/écrire, et cette clé ne doit JAMAIS être exposée
 * au navigateur. Ce client n'est donc importé que par les route handlers
 * (/api/defile/*), jamais par un Client Component.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Variables Supabase manquantes : NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont requises côté serveur.",
    );
  }

  return createClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
