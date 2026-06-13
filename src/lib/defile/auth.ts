import crypto from "node:crypto";
import { cookies } from "next/headers";

/**
 * Authentification de l'interface de scan (/defile/admin).
 *
 * Modèle : un mot de passe partagé (DEFILE_ADMIN_PASSWORD) vérifié CÔTÉ SERVEUR.
 * En cas de succès, on pose un cookie httpOnly signé (HMAC) avec expiration.
 * Aucune clé Supabase n'est jamais envoyée au navigateur — le téléphone à
 * l'entrée ne fait qu'appeler /api/defile/admin/scan et /stats, qui revérifient
 * le cookie à chaque requête.
 */

export const COOKIE_NAME = "defile_admin";
const TTL_MS = 1000 * 60 * 60 * 16; // 16 h — couvre une soirée d'événement

/** Secret de signature : la clé service_role (serveur uniquement, toujours dispo). */
function signingSecret(): string {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY manquante : impossible de signer la session admin.",
    );
  }
  return secret;
}

function sign(value: string): string {
  return crypto
    .createHmac("sha256", signingSecret())
    .update(value)
    .digest("hex");
}

/** Vérifie le mot de passe admin (comparaison à temps constant). */
export function verifyAdminPassword(password: unknown): boolean {
  const expected = process.env.DEFILE_ADMIN_PASSWORD;
  if (!expected || typeof password !== "string") return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** Génère un jeton de session signé : base64(exp).signature */
export function createSessionToken(): string {
  const exp = String(Date.now() + TTL_MS);
  const payload = Buffer.from(exp).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

/** Vérifie la validité (signature + expiration) d'un jeton de session. */
export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const sa = Buffer.from(signature);
  const sb = Buffer.from(expected);
  if (sa.length !== sb.length || !crypto.timingSafeEqual(sa, sb)) return false;

  const exp = Number(Buffer.from(payload, "base64url").toString());
  return Number.isFinite(exp) && Date.now() < exp;
}

/** True si la requête courante porte un cookie de session admin valide. */
export function isAdminAuthed(): boolean {
  const token = cookies().get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export const cookieMaxAgeSeconds = Math.floor(TTL_MS / 1000);
