import { createServerClient } from "./server";
import type { ArticleCategory, ArticleRow } from "./types";

const FALLBACK_CONTENT_1 = `Le 1er avril, **Villa Etami** a accueilli la Night Class #4. Dès 17h, l'équipe BRUUX était sur place pour les derniers réglages.

## L'avant

- Montage du dispositif son dès 17h
- Brief sécurité avec les agents à 19h30
- Test lumière et cue DJ à 20h15

## La soirée

Les premiers bus sont arrivés d'Alibandeng à 22h10. En 45 minutes, la Villa était pleine. DJ Wayne aux platines, une scénographie pensée pour tenir jusqu'au petit matin, et une #BRUXFAMILLY au rendez-vous.

> « L'énergie de cette édition, c'était autre chose. » — Simon

## Moments forts

- Le drop de DJ Wayne à 00h30
- La performance surprise d'un invité local
- L'after acoustique sur la terrasse jusqu'à 04h

Rendez-vous le **15 mai** pour la Night Class #5 — même lieu, autre ambiance.`;

const FALLBACK_CONTENT_2 = `Un court-métrage qui ne raconte pas une histoire. Qui capte une ambiance.

## Synopsis

*Amissa* suit trois membres de la #BRUXFAMILLY pendant 24 heures dans l'appartement Amissa. Pas de dialogue. Pas de narration. Juste l'image, le son, le moment.

Tourné sur deux jours en février 2026, avec du matériel léger. L'idée : capturer la routine, le silence, les détails. Ce qui fait que BRUX House est plus qu'un décor.

## Ce qu'il y a derrière

- **Réalisation** : Équipe BRUUX
- **Image** : Nidale
- **Son** : captation live + mix *a posteriori*
- **Montage** : coupé au plus serré, chaque plan pèse

## Où le voir

Disponible dès le 12 avril sur les comptes Instagram et TikTok officiels @brux.evnt. Version longue à venir sur le site début mai.`;

const FALLBACK_CONTENT_3 = `Organiser une Night Class à la Villa Etami, c'est une journée pleine de détails.

## Le matin

- **9h** : livraison bar et dispositif froid
- **11h** : arrivée de l'équipe son pour le montage
- **13h** : déjeuner staff sur place

## L'après-midi

- **14h** : briefing complet (sécurité, bar, accueil, DJ)
- **16h** : scénographie — installation lumière, fumée, décor
- **18h** : test complet son, lumière, issues de secours
- **19h** : dernières retouches

## Le soir

- **20h30** : ouverture staff
- **22h** : début des arrivées bus depuis Charbonnages, Okala, Avorbam
- **23h** : pic d'affluence

## La règle

Tout ça tient sur une checklist de **87 points**. Une seule règle : tout est maîtrisé, ou on annule.

C'est ça, la différence entre une soirée et un événement BRUUX.`;

const FALLBACK_CONTENT_4 = `On est en 2026. BRUUX a quatre ans. Et la #BRUXFAMILLY a doublé depuis l'an dernier.

## Où on en est

- **50+ membres** actifs sur Libreville
- **3 divisions** opérationnelles : Event, House, Artistique
- **6 partenariats** structurants signés en 2026
- **Phase 2** — Domination locale structurée

Mais les chiffres, c'est pas ce qui fait la famille.

## Ce qui fait la famille

Ce qui fait la famille, c'est :

- Les messages à 3h du mat après une soirée
- Les sessions photo qui finissent en tournage improvisé
- Les déplacements à l'étranger qu'on organise à plusieurs
- Les moments de doute qu'on traverse ensemble

## La suite

Phase 2, c'est structurer ce qui marche déjà. Partenariats multisectoriels, présence universitaire, divisions internes opérationnelles. L'objectif n'a pas changé : faire de BRUUX une référence incontournable en Afrique centrale.

Et si tu lis ceci, tu fais déjà partie du mouvement. **Bienvenue à la maison.**`;

export const FALLBACK_ARTICLES: ArticleRow[] = [
  {
    id: "fallback-a4",
    title: "#BRUXFAMILLY : grandir ensemble en 2026",
    slug: "bruxfamilly-2026",
    excerpt:
      "BRUUX a quatre ans, la famille a doublé, et on entre en Phase 2. Point d'étape et perspectives.",
    content: FALLBACK_CONTENT_4,
    cover_image: null,
    category: "lifestyle",
    author: "Simon Ntsagui",
    published: true,
    published_at: "2026-04-23T11:00:00.000Z",
    created_at: "2026-04-23T11:00:00.000Z",
  },
  {
    id: "fallback-a3",
    title: "Préparer la Villa Etami pour une Night Class",
    slug: "preparer-villa-etami-night-class",
    excerpt:
      "Une journée complète pour que 4 heures de soirée tiennent la route. Le détail du dispositif Night Class.",
    content: FALLBACK_CONTENT_3,
    cover_image: null,
    category: "backstage",
    author: "Équipe BRUUX",
    published: true,
    published_at: "2026-04-20T13:00:00.000Z",
    created_at: "2026-04-20T13:00:00.000Z",
  },
  {
    id: "fallback-a2",
    title: "Amissa — une nuit ensemble",
    slug: "amissa-une-nuit-ensemble",
    excerpt:
      "Notre premier court-métrage de l'année. 24 heures dans l'appartement Amissa, sans dialogue.",
    content: FALLBACK_CONTENT_2,
    cover_image: null,
    category: "courts-metrages",
    author: "Nidale",
    published: true,
    published_at: "2026-04-12T09:00:00.000Z",
    created_at: "2026-04-12T09:00:00.000Z",
  },
  {
    id: "fallback-a1",
    title: "Dans les coulisses de la Night Class #4",
    slug: "coulisses-night-class-4",
    excerpt:
      "Retour en images sur la Night Class du 1er avril à la Villa Etami — préparation, ambiance, moments forts.",
    content: FALLBACK_CONTENT_1,
    cover_image: null,
    category: "vlogs",
    author: "Équipe BRUUX",
    published: true,
    published_at: "2026-04-03T17:00:00.000Z",
    created_at: "2026-04-03T17:00:00.000Z",
  },
];

async function safeQuery<T>(fn: () => Promise<T | null>): Promise<T | null> {
  try {
    return await fn();
  } catch {
    return null;
  }
}

/**
 * Retourne les articles publiés, triés du plus récent au plus ancien.
 * Fallback sur FALLBACK_ARTICLES si la table est vide/inaccessible.
 */
export async function getArticles(options?: {
  category?: ArticleCategory;
  limit?: number;
}): Promise<ArticleRow[]> {
  const data = await safeQuery<ArticleRow[]>(async () => {
    const supabase = createServerClient();
    let q = supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (options?.category) q = q.eq("category", options.category);
    if (options?.limit) q = q.limit(options.limit);

    const { data, error } = await q;
    if (error) throw error;
    return data;
  });

  const source =
    data && data.length > 0
      ? data
      : FALLBACK_ARTICLES.filter((a) => a.published);

  let filtered = source;
  if (options?.category) {
    filtered = filtered.filter((a) => a.category === options.category);
  }
  if (options?.limit) filtered = filtered.slice(0, options.limit);
  return filtered;
}

export async function getFeaturedArticle(): Promise<ArticleRow | null> {
  const [latest] = await getArticles({ limit: 1 });
  return latest ?? null;
}

export async function getArticleBySlug(
  slug: string,
): Promise<ArticleRow | null> {
  const data = await safeQuery<ArticleRow>(async () => {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw error;
    return data;
  });
  if (data) return data;
  return FALLBACK_ARTICLES.find((a) => a.slug === slug) ?? null;
}

export async function getRelatedArticles(
  currentSlug: string,
  category: ArticleCategory | null,
  limit = 3,
): Promise<ArticleRow[]> {
  const all = await getArticles();
  // Priorité: même catégorie, puis autres articles récents pour compléter.
  const sameCat = all.filter(
    (a) => a.slug !== currentSlug && a.category === category,
  );
  const others = all.filter(
    (a) => a.slug !== currentSlug && a.category !== category,
  );
  return [...sameCat, ...others].slice(0, limit);
}

export function computeCategoryCounts(
  articles: ArticleRow[],
): Record<"all" | ArticleCategory, number> {
  const base: Record<"all" | ArticleCategory, number> = {
    all: articles.length,
    vlogs: 0,
    "courts-metrages": 0,
    "jeux-soirees": 0,
    backstage: 0,
    lifestyle: 0,
    special: 0,
  };
  for (const a of articles) {
    if (a.category) base[a.category]++;
  }
  return base;
}
