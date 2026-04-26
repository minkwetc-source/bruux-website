"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/admin";
import { slugify } from "@/lib/utils";
import type { ArticleCategory } from "@/lib/supabase/types";

export type ArticleActionState = {
  ok: boolean;
  error: string | null;
};

const CATEGORIES: ArticleCategory[] = [
  "vlogs",
  "courts-metrages",
  "jeux-soirees",
  "backstage",
  "lifestyle",
  "special",
];

function emptyToNull(v: FormDataEntryValue | null): string | null {
  const s = String(v ?? "").trim();
  return s.length === 0 ? null : s;
}

function parseArticle(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim() || slugify(title);
  const content = String(formData.get("content") ?? "").trim();
  const excerpt = emptyToNull(formData.get("excerpt"));
  const cover_image = emptyToNull(formData.get("cover_image"));
  const author = emptyToNull(formData.get("author"));
  const published = formData.get("published") === "on";

  const catRaw = String(formData.get("category") ?? "");
  const category = (CATEGORIES as string[]).includes(catRaw)
    ? (catRaw as ArticleCategory)
    : null;

  const publishedAtRaw = String(formData.get("published_at") ?? "").trim();
  const published_at = publishedAtRaw
    ? new Date(publishedAtRaw).toISOString()
    : published
      ? new Date().toISOString()
      : null;

  if (!title || !slug || !content) {
    return { error: "Titre, slug et contenu sont requis." as const };
  }

  return {
    error: null,
    payload: {
      title,
      slug,
      content,
      excerpt,
      cover_image,
      author,
      category,
      published,
      published_at,
    },
  };
}

export async function createArticle(
  _prev: ArticleActionState,
  formData: FormData,
): Promise<ArticleActionState> {
  await requireAdmin();
  const parsed = parseArticle(formData);
  if (parsed.error) return { ok: false, error: parsed.error };

  const supabase = createServerClient();
  const { error } = await supabase.from("articles").insert(parsed.payload);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${parsed.payload.slug}`);
  return { ok: true, error: null };
}

export async function updateArticle(
  _prev: ArticleActionState,
  formData: FormData,
): Promise<ArticleActionState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { ok: false, error: "ID manquant." };

  const parsed = parseArticle(formData);
  if (parsed.error) return { ok: false, error: parsed.error };

  const supabase = createServerClient();
  const { error } = await supabase
    .from("articles")
    .update(parsed.payload)
    .eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${parsed.payload.slug}`);
  return { ok: true, error: null };
}

export async function deleteArticle(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createServerClient();
  await supabase.from("articles").delete().eq("id", id);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
