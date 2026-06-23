import { createServerClient } from "./server";
import type { MemberRow, MemberSection } from "./types";

/**
 * Fallback = membres BRUUX du seed SQL. Le code les utilise si la table est
 * vide ou inaccessible.
 *
 * Mapping section :
 * - direction            → Administration (board, postes statutaires)
 * - division-artistique  → Responsables de divisions (heads of division)
 * - influenceurs         → Influenceurs / créateurs
 */
export const FALLBACK_MEMBERS: MemberRow[] = [
  // ── Administration ──────────────────────────────────────────────
  {
    id: "fallback-admin-1",
    name: "Akaye Yvan",
    role: "Vice-Président",
    section: "direction",
    photo_url: null,
    instagram: null,
    tiktok: null,
    display_order: 1,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-admin-2",
    name: "Louis Dylan",
    role: "Directeur Général",
    section: "direction",
    photo_url: null,
    instagram: "@nxus3_0",
    tiktok: "@nxus3_0",
    display_order: 2,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-admin-3",
    name: "Layal Nidale",
    role: "Secrétaire Générale",
    section: "direction",
    photo_url: null,
    instagram: null,
    tiktok: null,
    display_order: 3,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-admin-4",
    name: "Stéphane Iloko",
    role: "Conseiller Stratégique",
    section: "direction",
    photo_url: null,
    instagram: null,
    tiktok: null,
    display_order: 4,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-admin-5",
    name: "Alicia Autechaud",
    role: "Responsable Relations",
    section: "direction",
    photo_url: null,
    instagram: null,
    tiktok: null,
    display_order: 5,
    created_at: "2026-01-01T00:00:00.000Z",
  },

  // ── Influenceurs ────────────────────────────────────────────────
  {
    id: "fallback-inf-1",
    name: "Laenaïck",
    role: "Mannequin",
    section: "influenceurs",
    photo_url: null,
    instagram: "@laenaick",
    tiktok: "@_danielo_7",
    display_order: 1,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-inf-2",
    name: "Helen-Kellyse",
    role: "Blogging",
    section: "influenceurs",
    photo_url: null,
    instagram: "@helen_kellyse",
    tiktok: "@helen_kellyse",
    display_order: 2,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-inf-3",
    name: "Paule Gracely",
    role: "Influence",
    section: "influenceurs",
    photo_url: null,
    instagram: "@vamp_ahr",
    tiktok: "@paule_gracely",
    display_order: 3,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-inf-4",
    name: "Brel Dusal",
    role: "Influence",
    section: "influenceurs",
    photo_url: null,
    instagram: "@breldusal__lll",
    tiktok: "@breldusal",
    display_order: 4,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-inf-5",
    name: "Teken",
    role: "Humour",
    section: "influenceurs",
    photo_url: null,
    instagram: null,
    tiktok: "@teken241",
    display_order: 5,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-inf-6",
    name: "Aryss Da Silva",
    role: "Créateur Vidéo",
    section: "influenceurs",
    photo_url: null,
    instagram: "@aryss_dasilva_",
    tiktok: "@_arys_s",
    display_order: 6,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-inf-7",
    name: "Vinita",
    role: "Lifestyle / Beauté",
    section: "influenceurs",
    photo_url: null,
    instagram: "@vinita.lbd",
    tiktok: "@vinita.lbd3",
    display_order: 7,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-inf-8",
    name: "Trycia Irn (Shawty)",
    role: "Lifestyle / GRWM",
    section: "influenceurs",
    photo_url: null,
    instagram: "@shawty_tryx",
    tiktok: "@trycia.irn",
    display_order: 8,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-inf-9",
    name: "Velass Wrld",
    role: "Mannequin",
    section: "influenceurs",
    photo_url: null,
    instagram: "@velas_wrld",
    tiktok: "@velasswrld",
    display_order: 9,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-inf-10",
    name: "Angie Cristal",
    role: "Créatrice Digitale",
    section: "influenceurs",
    photo_url: null,
    instagram: "@la_princesse_fang_.08",
    tiktok: "@la_princesse_fang_.08",
    display_order: 10,
    created_at: "2026-01-01T00:00:00.000Z",
  },

  // ── Responsables de divisions ───────────────────────────────────
  {
    id: "fallback-head-1",
    name: "Bruxia",
    role: "Resp. Division Influence",
    section: "division-artistique",
    photo_url: null,
    instagram: null,
    tiktok: null,
    display_order: 1,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-head-2",
    name: "Gaella",
    role: "Co-resp. Division Événements",
    section: "division-artistique",
    photo_url: null,
    instagram: null,
    tiktok: null,
    display_order: 2,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-head-3",
    name: "Maxime",
    role: "Co-resp. Division Événements",
    section: "division-artistique",
    photo_url: null,
    instagram: null,
    tiktok: null,
    display_order: 3,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-head-4",
    name: "Isabelle",
    role: "Resp. Division Mannequinat",
    section: "division-artistique",
    photo_url: null,
    instagram: null,
    tiktok: null,
    display_order: 4,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-head-5",
    name: "Oliviera Cruz",
    role: "Resp. Division Digital",
    section: "division-artistique",
    photo_url: null,
    instagram: null,
    tiktok: null,
    display_order: 5,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-head-6",
    name: "Brenda",
    role: "Resp. Communication",
    section: "division-artistique",
    photo_url: null,
    instagram: null,
    tiktok: null,
    display_order: 6,
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
    "influenceurs",
    "division-artistique",
    "mannequins",
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
  direction: "Administration",
  "division-artistique": "Responsables de divisions",
  mannequins: "Mannequins",
  influenceurs: "Influenceurs",
  "section-a": "Section A",
};

export const SECTION_SUBTITLES: Record<MemberSection, string> = {
  direction: "Le bureau et les postes statutaires du collectif.",
  "division-artistique":
    "Les têtes qui pilotent chaque division — événements, mannequinat, tech, communication.",
  mannequins: "Les visages BRUUX — shootings, défilés, collaborations.",
  influenceurs:
    "Créateurs et créatrices qui portent BRUUX au quotidien sur Instagram et TikTok.",
  "section-a": "Coordination, logistique et soutien transverse.",
};
