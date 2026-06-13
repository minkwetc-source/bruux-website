import crypto from "node:crypto";

/**
 * Génération du code de réservation et du « montant fingerprint ».
 *
 * - Code : BRX-XXXX (4 caractères). Sert d'identifiant de l'invité, de motif de
 *   virement, et de contenu du QR. Charset sans caractères ambigus (pas de
 *   0/O, 1/I/L) pour éviter les erreurs de saisie dans le motif du transfert.
 * - Montant fingerprint : prix du billet + suffixe de 2 chiffres (00–99), pour
 *   que l'admin reconnaisse un paiement par son montant exact (ex : 5 047 au
 *   lieu de 5 000). Le code BRX reste le repère principal en cas de collision.
 */

const CODE_CHARSET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // sans 0,O,1,I,L
const CODE_LENGTH = 4;

/** Génère un code de la forme BRX-7K3F. */
export function generateInviteCode(): string {
  let suffix = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    const idx = crypto.randomInt(0, CODE_CHARSET.length);
    suffix += CODE_CHARSET[idx];
  }
  return `BRX-${suffix}`;
}

/** Suffixe de montant aléatoire entre 0 et 99. */
export function randomAmountSuffix(): number {
  return crypto.randomInt(0, 100);
}

/** Prix de base + suffixe (ex : 5000 + 47 = 5047). */
export function fingerprintAmount(basePrice: number, suffix: number): number {
  return basePrice + suffix;
}
