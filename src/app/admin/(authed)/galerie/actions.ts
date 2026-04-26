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

export async function createPhoto(
  _prev: PhotoActionState,
  formData: FormData,
): Promise<PhotoActionState> {
  await requireAdmin();

  const image_url = String(formData.get("image_url") ?? "").trim();
  const title = emptyToNull(formData.get("title"));
  const session_name = emptyToNull(formData.get("session_name"));
  const session_date = emptyToNull(formData.get("session_date"));

  const catRaw = String(formData.get("category") ?? "");
  const category = (CATEGORIES as string[]).includes(catRaw)
    ? (catRaw as PhotoCategory)
    : null;

  if (!image_url) {
    return { ok: false, error: "L'URL de l'image est requise." };
  }

  const supabase = createServerClient();
  const { error } = await supabase.from("photos").insert({
    image_url,
    title,
    category,
    session_name,
    session_date,
  });

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
