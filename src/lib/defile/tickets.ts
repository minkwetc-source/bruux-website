import type { TicketType } from "@/lib/supabase/types";

/**
 * Tarifs officiels (FCFA) — source de vérité côté serveur.
 * Le montant n'est JAMAIS lu depuis le client : il est recalculé ici à partir
 * du `ticket_type` pour qu'un visiteur ne puisse pas falsifier le prix.
 */
export const PRICES: Record<TicketType, number> = {
  standard: 5000,
  vip: 15000,
  prestige: 20000,
};

export const TICKET_TYPES: TicketType[] = ["standard", "vip", "prestige"];

/** Capacité totale du défilé : 300 places. Au-delà, les inscriptions ferment. */
export const CAPACITY = 300;

export function isTicketType(value: unknown): value is TicketType {
  return (
    typeof value === "string" && (TICKET_TYPES as string[]).includes(value)
  );
}

/** Libellé court affiché dans l'interface de scan (toast, log). */
export function ticketLabel(type: string | null | undefined): string {
  switch ((type ?? "").toLowerCase()) {
    case "prestige":
      return "Prestige · 20 000 FCFA";
    case "vip":
      return "VIP · 15 000 FCFA";
    case "standard":
      return "Standard · 5 000 FCFA";
    default:
      return type ?? "—";
  }
}
