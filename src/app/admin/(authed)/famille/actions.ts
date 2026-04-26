"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/admin";
import type { MemberSection } from "@/lib/supabase/types";

export type MemberActionState = {
  ok: boolean;
  error: string | null;
};

const SECTIONS: MemberSection[] = [
  "direction",
  "division-artistique",
  "mannequins",
  "influenceurs",
  "section-a",
];

function emptyToNull(v: FormDataEntryValue | null): string | null {
  const s = String(v ?? "").trim();
  return s.length === 0 ? null : s;
}

function parseMember(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const role = emptyToNull(formData.get("role"));
  const photo_url = emptyToNull(formData.get("photo_url"));
  const instagram = emptyToNull(formData.get("instagram"));

  const sectionRaw = String(formData.get("section") ?? "");
  const section = (SECTIONS as string[]).includes(sectionRaw)
    ? (sectionRaw as MemberSection)
    : null;

  const orderRaw = String(formData.get("display_order") ?? "0");
  const parsed = Number.parseInt(orderRaw, 10);
  const display_order = Number.isFinite(parsed) ? parsed : 0;

  if (!name) {
    return { error: "Le nom est requis." as const };
  }

  return {
    error: null,
    payload: { name, role, photo_url, instagram, section, display_order },
  };
}

export async function createMember(
  _prev: MemberActionState,
  formData: FormData,
): Promise<MemberActionState> {
  await requireAdmin();
  const parsed = parseMember(formData);
  if (parsed.error) return { ok: false, error: parsed.error };

  const supabase = createServerClient();
  const { error } = await supabase.from("members").insert(parsed.payload);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/famille");
  revalidatePath("/famille");
  return { ok: true, error: null };
}

export async function updateMember(
  _prev: MemberActionState,
  formData: FormData,
): Promise<MemberActionState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { ok: false, error: "ID manquant." };

  const parsed = parseMember(formData);
  if (parsed.error) return { ok: false, error: parsed.error };

  const supabase = createServerClient();
  const { error } = await supabase
    .from("members")
    .update(parsed.payload)
    .eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/famille");
  revalidatePath("/famille");
  return { ok: true, error: null };
}

export async function deleteMember(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createServerClient();
  await supabase.from("members").delete().eq("id", id);

  revalidatePath("/admin/famille");
  revalidatePath("/famille");
}
