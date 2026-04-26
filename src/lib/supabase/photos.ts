import { createServerClient } from "./server";
import type { PhotoCategory, PhotoRow } from "./types";

/**
 * Photos fallback — identiques au seed SQL. Permet à /galerie de fonctionner
 * même avant l'exécution du SQL ou si la table est vide.
 *
 * image_url = "placeholder" est un sentinel reconnu par les composants gallery
 * → affiche un dégradé BRUUX au lieu d'une vraie image.
 */
export const FALLBACK_PHOTOS: PhotoRow[] = [
  {
    id: "fallback-p1",
    title: "bruxsessionpick · portrait 01",
    image_url: "placeholder",
    category: "sessions",
    session_name: "bruxsessionpick",
    session_date: "2026-03-10",
    created_at: "2026-03-10T00:00:00.000Z",
  },
  {
    id: "fallback-p2",
    title: "bruxsessionpick · portrait 02",
    image_url: "placeholder",
    category: "sessions",
    session_name: "bruxsessionpick",
    session_date: "2026-03-10",
    created_at: "2026-03-10T00:00:00.000Z",
  },
  {
    id: "fallback-p3",
    title: "bruxsessionpick · portrait 03",
    image_url: "placeholder",
    category: "sessions",
    session_name: "bruxsessionpick",
    session_date: "2026-03-24",
    created_at: "2026-03-24T00:00:00.000Z",
  },
  {
    id: "fallback-p4",
    title: "Villa Etami · session lifestyle",
    image_url: "placeholder",
    category: "sessions",
    session_name: "villa-etami-session",
    session_date: "2026-04-05",
    created_at: "2026-04-05T00:00:00.000Z",
  },
  {
    id: "fallback-p5",
    title: "Night Class #4 · scène",
    image_url: "placeholder",
    category: "evenements",
    session_name: null,
    session_date: "2026-04-01",
    created_at: "2026-04-02T00:00:00.000Z",
  },
  {
    id: "fallback-p6",
    title: "Night Class #4 · afterparty",
    image_url: "placeholder",
    category: "evenements",
    session_name: null,
    session_date: "2026-04-01",
    created_at: "2026-04-02T00:00:00.000Z",
  },
  {
    id: "fallback-p7",
    title: "Brux Pool Party #2 · piscine",
    image_url: "placeholder",
    category: "evenements",
    session_name: null,
    session_date: "2026-03-15",
    created_at: "2026-03-16T00:00:00.000Z",
  },
  {
    id: "fallback-p8",
    title: "Amissa · salon",
    image_url: "placeholder",
    category: "brux-house",
    session_name: null,
    session_date: "2026-02-20",
    created_at: "2026-02-21T00:00:00.000Z",
  },
  {
    id: "fallback-p9",
    title: "Amissa · terrasse",
    image_url: "placeholder",
    category: "brux-house",
    session_name: null,
    session_date: "2026-02-20",
    created_at: "2026-02-21T00:00:00.000Z",
  },
  {
    id: "fallback-p10",
    title: "Portrait · Simon",
    image_url: "placeholder",
    category: "portraits",
    session_name: null,
    session_date: "2026-03-12",
    created_at: "2026-03-13T00:00:00.000Z",
  },
];

async function safe<T>(fn: () => Promise<T | null>): Promise<T | null> {
  try {
    return await fn();
  } catch {
    return null;
  }
}

export async function getPhotos(options?: {
  category?: PhotoCategory;
}): Promise<PhotoRow[]> {
  const data = await safe<PhotoRow[]>(async () => {
    const supabase = createServerClient();
    let q = supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: false });
    if (options?.category) q = q.eq("category", options.category);
    const { data, error } = await q;
    if (error) throw error;
    return data;
  });

  if (data && data.length > 0) return data;
  let out = [...FALLBACK_PHOTOS];
  if (options?.category) out = out.filter((p) => p.category === options.category);
  return out;
}

export async function getBruxsessionpickPhotos(): Promise<PhotoRow[]> {
  const data = await safe<PhotoRow[]>(async () => {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .eq("session_name", "bruxsessionpick")
      .order("session_date", { ascending: false });
    if (error) throw error;
    return data;
  });
  if (data && data.length > 0) return data;
  return FALLBACK_PHOTOS.filter((p) => p.session_name === "bruxsessionpick");
}
