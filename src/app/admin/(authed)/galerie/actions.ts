"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/admin";
import type { PhotoCategory } from "@/lib/supabase/types";

export type PhotoActionState = {
  ok: boolean;
  error: string | null;
};

const CATEGORIES: PhotoCategory[] = [
  "sessions",
  "evenements",
  "brux-house",
  "portraits",
];

function emptyToNull(v: FormDataEntryValue | null): string | null {
  const s = String(v ?? "").trim();
  return s.length === 0 ? null : s;
}

/**
 * Lit les URLs uploadées : champ « image_urls » (JSON array, upload multiple)
 * avec repli sur « image_url » (URL unique). Dédupliqué, vides retirés.
 */
function parseImageUrls(
  multi: FormDataEntryValue | null,
  single: FormDataEntryValue | null,
): string[] {
  const urls: string[] = [];

  const raw = String(multi ?? "").trim();
  if (raw) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        for (const u of parsed) {
          if (typeof u === "string" && u.trim()) urls.push(u.trim());
        }
      }
    } catch {
      /* champ malformé — ignoré */
    }
  }

  const one = String(single ?? "").trim();
  if (one) urls.push(one);

  return Array.from(new Set(urls));
}

export async function createPhoto(
  _prev: PhotoActionState,
  formData: FormData,
): Promise<PhotoActionState> {
  await requireAdmin();

  const image_urls = parseImageUrls(
    formData.get("image_urls"),
    formData.get("image_url"),
  );
  const title = emptyToNull(formData.get("title"));
  const session_name = emptyToNull(formData.get("session_name"));
  const session_date = emptyToNull(formData.get("session_date"));

  const catRaw = String(formData.get("category") ?? "");
  const category = (CATEGORIES as string[]).includes(catRaw)
    ? (catRaw as PhotoCategory)
    : null;

  if (image_urls.length === 0) {
    return { ok: false, error: "Ajoute au moins une image." };
  }

  // Métadonnées partagées par toutes les photos du lot.
  const rows = image_urls.map((image_url) => ({
    image_url,
    title,
    category,
    session_name,
    session_date,
  }));

  const supabase = createServerClient();
  const { error } = await supabase.from("photos").insert(rows);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/galerie");
  revalidatePath("/galerie");
  return { ok: true, error: null };
}

export async function deletePhoto(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createServerClient();
  await supabase.from("photos").delete().eq("id", id);

  revalidatePath("/admin/galerie");
  revalidatePath("/galerie");
}
