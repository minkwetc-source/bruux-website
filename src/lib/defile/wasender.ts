/**
 * Envoi WhatsApp via WaSender.
 *
 * ⚠️ HOST / ENDPOINT À CONFIRMER selon ton compte WaSender :
 *   - Doc « wasenderapi.com » : POST /api/send-message  { phone_number, image, caption }
 *   - Variante « api.wasender.app » : POST /api/send-media
 * On rend l'URL configurable via WASENDER_API_URL (défaut : wasenderapi.com).
 *
 * Point clé confirmé dans la doc : l'image s'envoie par URL publique, PAS en
 * base64. C'est pourquoi le QR est servi via /api/defile/qr/{id} (URL publique
 * mais non-devinable) et c'est cette URL qu'on transmet ici.
 */

function apiUrl(): string {
  const base = process.env.WASENDER_API_URL ?? "https://wasenderapi.com";
  return `${base.replace(/\/$/, "")}/api/send-message`;
}

function apiKey(): string {
  const key = process.env.WASENDER_API_KEY;
  if (!key) throw new Error("WASENDER_API_KEY manquante dans les variables d'env.");
  return key;
}

async function send(payload: Record<string, unknown>): Promise<void> {
  const res = await fetch(apiUrl(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`WaSender → HTTP ${res.status} : ${text}`);
  }
}

/** Envoie une image (par URL) avec légende sur WhatsApp. */
export async function sendImage(params: {
  phone: string;
  imageUrl: string;
  caption: string;
}): Promise<void> {
  await send({
    phone_number: params.phone,
    image: params.imageUrl,
    caption: params.caption,
  });
}

/** Construit le message d'accompagnement du QR. */
export function billetMessage(nom: string, ticketType: string): string {
  return [
    "🎟 BRUUX · Défilé 4 Juillet",
    "",
    `Bonjour ${nom} !`,
    `Ton billet ${ticketType} est confirmé.`,
    "Présente ce QR code à l'entrée.",
    "",
    "Nzeng Ayong · 4 Juillet · 15h00",
  ].join("\n");
}
