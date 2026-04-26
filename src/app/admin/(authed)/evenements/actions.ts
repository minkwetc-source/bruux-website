"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/admin";
import { slugify } from "@/lib/utils";
import type { EventStatus, EventType } from "@/lib/supabase/types";

export type EventActionState = {
  ok: boolean;
  error: string | null;
};

const TYPES: EventType[] = ["night-class", "pool-party", "soiree-speciale"];
const STATUSES: EventStatus[] = ["upcoming", "sold-out", "completed"];

function emptyToNull(v: FormDataEntryValue | null): string | null {
  const s = String(v ?? "").trim();
  return s.length === 0 ? null : s;
}

function parseEventForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim() || slugify(title);
  const date = String(formData.get("date") ?? "").trim();
  const end_date = emptyToNull(formData.get("end_date"));
  const description = emptyToNull(formData.get("description"));
  const location = emptyToNull(formData.get("location"));
  const price = emptyToNull(formData.get("price"));
  const image_url = emptyToNull(formData.get("image_url"));
  const whatsapp_link = emptyToNull(formData.get("whatsapp_link"));

  const typeRaw = String(formData.get("type") ?? "");
  const type = (TYPES as string[]).includes(typeRaw)
    ? (typeRaw as EventType)
    : null;

  const statusRaw = String(formData.get("status") ?? "upcoming");
  const status = (STATUSES as string[]).includes(statusRaw)
    ? (statusRaw as EventStatus)
    : "upcoming";

  if (!title || !slug || !date) {
    return { error: "Titre, slug et date sont requis." as const };
  }

  return {
    error: null,
    payload: {
      title,
      slug,
      date: new Date(date).toISOString(),
      end_date: end_date ? new Date(end_date).toISOString() : null,
      description,
      location,
      price,
      image_url,
      whatsapp_link,
      type,
      status,
    },
  };
}

export async function createEvent(
  _prev: EventActionState,
  formData: FormData,
): Promise<EventActionState> {
  await requireAdmin();
  const parsed = parseEventForm(formData);
  if (parsed.error) return { ok: false, error: parsed.error };

  const supabase = createServerClient();
  const { error } = await supabase.from("events").insert(parsed.payload);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/evenements");
  revalidatePath("/evenements");
  revalidatePath("/");
  return { ok: true, error: null };
}

export async function updateEvent(
  _prev: EventActionState,
  formData: FormData,
): Promise<EventActionState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { ok: false, error: "ID manquant." };

  const parsed = parseEventForm(formData);
  if (parsed.error) return { ok: false, error: parsed.error };

  const supabase = createServerClient();
  const { error } = await supabase
    .from("events")
    .update(parsed.payload)
    .eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/evenements");
  revalidatePath("/evenements");
  revalidatePath("/");
  return { ok: true, error: null };
}

export async function deleteEvent(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createServerClient();
  await supabase.from("events").delete().eq("id", id);

  revalidatePath("/admin/evenements");
  revalidatePath("/evenements");
  revalidatePath("/");
}
