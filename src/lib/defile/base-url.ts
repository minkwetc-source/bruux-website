/**
 * Détermine l'URL de base absolue du site.
 * Priorité à DEFILE_BASE_URL (utile si derrière un proxy / domaine custom),
 * sinon on dérive de la requête entrante.
 */
export function getBaseUrl(request: Request): string {
  const env = process.env.DEFILE_BASE_URL;
  if (env) return env.replace(/\/$/, "");

  // Vercel place le host réel dans x-forwarded-host.
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  if (forwardedHost) return `${forwardedProto}://${forwardedHost}`;

  return new URL(request.url).origin;
}
