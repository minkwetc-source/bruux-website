import { createServerClient } from "./server";
import type { MemberRow, MemberSection } from "./types";

/**
 * Fallback = 8 profils du seed SQL. Le code les utilise si la table est vide
 * ou inaccessible.
 */
export const FALLBACK_MEMBERS: MemberRow[] = [
  {
    id: "fallback-m1",
    name: "Simon Ntsagui",
    role: "Fondateur & CEO",
    section: "direction",
    photo_url: null,
    instagram: "@adn_Simon",
    display_order: 1,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-m2",
    name: "Léa Ngondo",
    role: "Directrice artistique",
    section: "division-artistique",
    photo_url: null,
    instagram: "@lea.ngondo",
    display_order: 1,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-m3",
    name: "Nidale",
    role: "Mannequin & image",
    section: "mannequins",
    photo_url: null,
    instagram: "@nid3.ale",
    display_order: 1,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-m4",
    name: "Kevrell",
    role: "Mannequin",
    section: "mannequins",
    photo_url: null,
    instagram: "@kev_rell",
    display_order: 2,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-m5",
    name: "Helen Kellyse",
    role: "Influenceuse",
    section: "influenceurs",
    photo_url: null,
    instagram: "@helen.kellyse",
    display_order: 1,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-m6",
    name: "Jordy M.",
    role: "Créateur de contenu",
    section: "influenceurs",
    photo_url: null,
    instagram: "@jordy.m",
    display_order: 2,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-m7",
    name: "Yvan",
    role: "Co-dirigeant",
    section: "section-a",
    photo_url: null,
    instagram: "@yvn_a",
    display_order: 1,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-m8",
    name: "Larissa Obame",
    role: "Coordination & logistique",
    section: "section-a",
    photo_url: null,
    instagram: "@lar_obame",
    display_order: 2,
    created_at: "2026-01-01T00:00:00.000Z",
  },
];

async function safe<T>(fn: () => Promise<T | null>): Promise<T | null> {
  try {
    return await fn();
  } catch {
    return null;
  }
}

export async function getAllMembers(): Promise<MemberRow[]> {
  const data = await safe<MemberRow[]>(async () => {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("section")
      .order("display_order");
    if (error) throw error;
    return data;
  });
  if (data && data.length > 0) return data;
  return [...FALLBACK_MEMBERS];
}

/**
 * Groupe les membres par section dans l'ordre canonique BRUUX.
 */
export async function getMembersBySection(): Promise<
  Array<{ section: MemberSection; members: MemberRow[] }>
> {
  const members = await getAllMembers();
  const order: MemberSection[] = [
    "direction",
    "division-artistique",
    "mannequins",
    "influenceurs",
    "section-a",
  ];

  return order
    .map((section) => ({
      section,
      members: members
        .filter((m) => m.section === section)
        .sort((a, b) => a.display_order - b.display_order),
    }))
    .filter((group) => group.members.length > 0);
}

export const SECTION_LABELS: Record<MemberSection, string> = {
  direction: "Direction",
  "division-artistique": "Division Artistique",
  mannequins: "Mannequins",
  influenceurs: "Influenceurs",
  "section-a": "Section A",
};

export const SECTION_SUBTITLES: Record<MemberSection, string> = {
  direction: "Le pilotage stratégique et la vision long terme.",
  "division-artistique":
    "Direction artistique, scénographie et image de marque.",
  mannequins: "Les visages BRUUX — shootings, défilés, collaborations.",
  influenceurs: "Les voix qui portent la marque au quotidien.",
  "section-a": "Coordination, logistique, et soutien transverse.",
};
