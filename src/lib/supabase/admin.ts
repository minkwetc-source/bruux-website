import { cache } from "react";
import { redirect } from "next/navigation";
import { createServerClient } from "./server";

export type AdminUser = {
  id: string;
  email: string;
  displayName: string | null;
};

/**
 * Renvoie l'admin connecté, ou null. Dédupliqué par requête via React cache()
 * pour qu'une page admin (layout + page) n'appelle Supabase qu'une seule fois.
 */
export const getAdminUser = cache(async (): Promise<AdminUser | null> => {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: row } = await supabase
    .from("admin_users")
    .select("display_name")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!row) return null;

  return {
    id: user.id,
    email: user.email ?? "",
    displayName: row.display_name ?? null,
  };
});

/**
 * À utiliser en haut d'un Server Component admin pour garantir l'auth.
 * Redirige vers /admin si l'utilisateur n'est pas un admin valide.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin");
  return admin;
}
