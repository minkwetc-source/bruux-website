import clsx, { type ClassValue } from "clsx";

/**
 * Concatène des classes CSS conditionnellement.
 * Exemple: cn("base", isActive && "active", variant === "gold" && "text-accent")
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Formate une date ISO en français long: "28 mars 2026"
 */
export function formatDate(date: string | Date, locale = "fr-FR"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Formate une date ISO en format court: "28/03/2026"
 */
export function formatDateShort(
  date: string | Date,
  locale = "fr-FR",
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Formate une heure: "22h30"
 */
export function formatTime(date: string | Date, locale = "fr-FR"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d
    .toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(":", "h");
}

/**
 * Produit un slug URL à partir d'un titre français.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Clamp un nombre entre min et max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Construit un lien WhatsApp avec message pré-rempli.
 */
export function whatsappLink(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const base = `https://wa.me/${cleanPhone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
