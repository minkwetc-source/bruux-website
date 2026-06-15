import type { MetadataRoute } from "next";
import { getAllEvents } from "@/lib/supabase/events";
import { getArticles } from "@/lib/supabase/articles";
import { getPhotos } from "@/lib/supabase/photos";

const BASE_URL = "https://bruuux.com";

// Marques diacritiques combinées (U+0300–U+036F) issues de normalize("NFD").
// Construit via fromCharCode pour garder une source 100% ASCII (pas de glyphes
// combinants invisibles dans le fichier).
const COMBINING_MARKS = new RegExp(
  `[${String.fromCharCode(0x0300)}-${String.fromCharCode(0x036f)}]`,
  "g",
);

/**
 * Normalise un slug pour le sitemap : minuscules, accents retirés, tout
 * caractère non alphanumérique remplacé par un tiret. Évite les espaces et
 * caractères accentués non encodés dans les URLs.
 */
function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [events, articles, photos] = await Promise.all([
    getAllEvents(),
    getArticles(),
    getPhotos(),
  ]);

  const now = new Date();

  const latestEventDate = events.reduce<Date>((acc, e) => {
    const d = new Date(e.created_at ?? e.date);
    return d > acc ? d : acc;
  }, new Date(0));

  const latestArticleDate = articles.reduce<Date>((acc, a) => {
    const d = new Date(a.published_at ?? a.created_at);
    return d > acc ? d : acc;
  }, new Date(0));

  const latestPhotoDate = photos.reduce<Date>((acc, p) => {
    const d = new Date(p.created_at);
    return d > acc ? d : acc;
  }, new Date(0));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/evenements`,
      lastModified: latestEventDate.getTime() ? latestEventDate : now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: latestArticleDate.getTime() ? latestArticleDate : now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/galerie`,
      lastModified: latestPhotoDate.getTime() ? latestPhotoDate : now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/famille`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const eventRoutes: MetadataRoute.Sitemap = events
    // Écarte tout slug contenant un espace (donnée non valide en base).
    .filter((event) => !/\s/.test(event.slug) && toSlug(event.slug))
    .map((event) => ({
      url: `${BASE_URL}/evenements/${toSlug(event.slug)}`,
      lastModified: new Date(event.created_at ?? event.date),
      changeFrequency: "weekly",
      priority: event.status === "upcoming" ? 0.8 : 0.5,
    }));

  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((article) => !/\s/.test(article.slug) && toSlug(article.slug))
    .map((article) => ({
      url: `${BASE_URL}/blog/${toSlug(article.slug)}`,
      lastModified: new Date(article.published_at ?? article.created_at),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...eventRoutes, ...articleRoutes];
}
