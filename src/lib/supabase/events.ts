import { createServerClient } from "./server";
import type { EventRow } from "./types";

/**
 * Fallback data — identique au seed SQL. Utilisé si la table n'existe pas
 * encore, si RLS bloque la lecture, ou si la table est vide → la page
 * /evenements affiche toujours du contenu, même avant exécution du SQL.
 */
export const FALLBACK_EVENTS: EventRow[] = [
  {
    id: "fallback-1",
    title: "Night Class #5",
    slug: "night-class-5",
    description:
      "La 5e édition de la Night Class BRUUX. DJ résident, scénographie immersive, transport organisé depuis les principaux quartiers de Libreville.",
    date: "2026-05-15T21:00:00.000Z",
    end_date: null,
    location: "Villa Etami · Libreville",
    type: "night-class",
    image_url: null,
    price: "5 000 FCFA",
    status: "upcoming",
    whatsapp_link:
      "https://wa.me/24165467224?text=Salut%20BRUUX%20%21%20Je%20souhaite%20r%C3%A9server%20pour%20Night%20Class%20%235",
    created_at: "2026-04-01T00:00:00.000Z",
  },
  {
    id: "fallback-2",
    title: "Pool Party Summer",
    slug: "pool-party-summer",
    description:
      "Après-midi pool party ensoleillée : DJ set, activations partenaires, invités surprises. Ambiance Libreville summer.",
    date: "2026-06-07T15:00:00.000Z",
    end_date: null,
    location: "Piscine Résidence Amissa · Libreville",
    type: "pool-party",
    image_url: null,
    price: "3 000 FCFA",
    status: "upcoming",
    whatsapp_link:
      "https://wa.me/24165467224?text=Salut%20BRUUX%20%21%20Je%20souhaite%20r%C3%A9server%20pour%20Pool%20Party%20Summer",
    created_at: "2026-04-01T00:00:00.000Z",
  },
  {
    id: "fallback-3",
    title: "Night Class #4",
    slug: "night-class-4",
    description:
      "La Night Class #4 qui a fait vibrer Villa Etami — line-up local, bus organisés depuis Charbonnages, Okala et Avorbam.",
    date: "2026-04-01T21:00:00.000Z",
    end_date: null,
    location: "Villa Etami · Libreville",
    type: "night-class",
    image_url: null,
    price: "5 000 FCFA",
    status: "completed",
    whatsapp_link: "https://wa.me/24165467224",
    created_at: "2026-02-15T00:00:00.000Z",
  },
  {
    id: "fallback-4",
    title: "Brux Pool Party #2",
    slug: "brux-pool-party-2",
    description:
      "La 2e édition de la Brux Pool Party — ouverture de la saison 2026, piscine + activation food partenaire @az_burgers.",
    date: "2026-03-15T15:00:00.000Z",
    end_date: null,
    location: "Hôtel Résidence · Libreville",
    type: "pool-party",
    image_url: null,
    price: "3 000 FCFA",
    status: "completed",
    whatsapp_link: "https://wa.me/24165467224",
    created_at: "2026-02-01T00:00:00.000Z",
  },
  {
    id: "fallback-5",
    title: "Night Class Spéciale",
    slug: "night-class-speciale",
    description:
      "Night Class format exclusif — line-up international, dress code strict, accès sur sélection. Places limitées.",
    date: "2026-05-20T21:00:00.000Z",
    end_date: null,
    location: "Lieu tenu secret · Libreville",
    type: "soiree-speciale",
    image_url: null,
    price: "8 000 FCFA",
    status: "upcoming",
    whatsapp_link:
      "https://wa.me/24165467224?text=Salut%20BRUUX%20%21%20Je%20souhaite%20r%C3%A9server%20pour%20Night%20Class%20Sp%C3%A9ciale",
    created_at: "2026-04-01T00:00:00.000Z",
  },
];

async function queryEvents(
  modify: (q: ReturnType<ReturnType<typeof createServerClient>["from"]>) => PromiseLike<{
    data: EventRow[] | null;
    error: unknown;
  }>,
): Promise<EventRow[] | null> {
  try {
    const supabase = createServerClient();
    const { data, error } = await modify(supabase.from("events"));
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getUpcomingEvents(): Promise<EventRow[]> {
  const data = await queryEvents((q) =>
    q.select("*").eq("status", "upcoming").order("date", { ascending: true }),
  );
  if (data && data.length > 0) return data;
  return FALLBACK_EVENTS.filter((e) => e.status === "upcoming").sort(
    (a, b) => +new Date(a.date) - +new Date(b.date),
  );
}

export async function getPastEvents(limit = 12): Promise<EventRow[]> {
  const data = await queryEvents((q) =>
    q
      .select("*")
      .eq("status", "completed")
      .order("date", { ascending: false })
      .limit(limit),
  );
  if (data && data.length > 0) return data;
  return FALLBACK_EVENTS.filter((e) => e.status === "completed")
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, limit);
}

export async function getAllEvents(): Promise<EventRow[]> {
  const data = await queryEvents((q) =>
    q.select("*").order("date", { ascending: true }),
  );
  if (data && data.length > 0) return data;
  return [...FALLBACK_EVENTS].sort(
    (a, b) => +new Date(a.date) - +new Date(b.date),
  );
}

export async function getNextEvent(): Promise<EventRow | null> {
  const [next] = await getUpcomingEvents();
  return next ?? null;
}

export async function getEventBySlug(slug: string): Promise<EventRow | null> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (data) return data;
  } catch {
    // fallback
  }
  return FALLBACK_EVENTS.find((e) => e.slug === slug) ?? null;
}
