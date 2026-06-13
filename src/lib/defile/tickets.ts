import type { TicketType } from "@/lib/supabase/types";

/**
 * Tarifs officiels (FCFA) — source de vérité côté serveur.
 * Le montant n'est JAMAIS lu depuis le client : il est recalculé ici à partir
 * du `ticket_type` pour qu'un visiteur ne puisse pas falsifier le prix.
 */
export const PRICES: Record<TicketType, number> = {
  standard: 5000,
  vip: 30000,
  prestige: 40000,
};

export const TICKET_TYPES: TicketType[] = ["standard", "vip", "prestige"];

export function isTicketType(value: unknown): value is TicketType {
  return (
    typeof value === "string" && (TICKET_TYPES as string[]).includes(value)
  );
}

/** Libellé court affiché dans l'interface de scan (toast, log). */
export function ticketLabel(type: string | null | undefined): string {
  switch ((type ?? "").toLowerCase()) {
    case "prestige":
      return "Prestige · 40 000 FCFA";
    case "vip":
      return "VIP · 30 000 FCFA";
    case "standard":
      return "Standard · 5 000 FCFA";
    default:
      return type ?? "—";
  }
}
