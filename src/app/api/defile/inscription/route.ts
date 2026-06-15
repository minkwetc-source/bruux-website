import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/defile/service-client";
import { PRICES, isTicketType, CAPACITY } from "@/lib/defile/tickets";
import {
  generateInviteCode,
  randomAmountSuffix,
  fingerprintAmount,
} from "@/lib/defile/codes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_ATTEMPTS = 40;

function organizerNumbers() {
  return {
    airtel: process.env.DEFILE_AIRTEL_NUMBER ?? "+241 XX XX XX XX",
    moov: process.env.DEFILE_MOOV_NUMBER ?? "+241 XX XX XX XX",
  };
}

/**
 * POST /api/defile/inscription
 * Enregistre une demande de réservation en `en_attente` avec un code unique
 * (BRX-XXXX) et un montant « fingerprint » (prix + suffixe). Renvoie les
 * instructions de paiement (montant exact, code, numéros Mobile Money).
 * Le paiement se fait par virement manuel, validé ensuite par l'admin.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps JSON invalide." }, { status: 400 });
  }

  const { nom, telephone, ticket_type } = (payload ?? {}) as {
    nom?: unknown;
    telephone?: unknown;
    ticket_type?: unknown;
  };

  if (typeof nom !== "string" || !nom.trim()) {
    return NextResponse.json({ error: "Nom requis." }, { status: 400 });
  }
  if (typeof telephone !== "string" || !telephone.trim()) {
    return NextResponse.json({ error: "Numéro WhatsApp requis." }, { status: 400 });
  }
  if (!isTicketType(ticket_type)) {
    return NextResponse.json({ error: "Type de ticket invalide." }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Capacité : 300 places. Une fois 300 billets confirmés (payés/scannés),
  // on ferme les inscriptions.
  const { count: confirmed } = await supabase
    .from("invites")
    .select("id", { count: "exact", head: true })
    .in("statut", ["paye", "scanne"]);
  if ((confirmed ?? 0) >= CAPACITY) {
    return NextResponse.json(
      { error: "Complet — les 300 places du défilé sont déjà prises." },
      { status: 409 },
    );
  }

  const basePrice = PRICES[ticket_type];

  // Montants déjà utilisés par des demandes en attente (pour viser un montant unique).
  const { data: pending } = await supabase
    .from("invites")
    .select("montant")
    .eq("statut", "en_attente")
    .eq("ticket_type", ticket_type);
  const usedAmounts = new Set((pending ?? []).map((p) => p.montant));

  // On tente plusieurs (code, montant) jusqu'à insérer sans collision.
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const id = generateInviteCode();
    const suffix = randomAmountSuffix();
    const montant = fingerprintAmount(basePrice, suffix);

    // On évite un montant déjà « réservé » par une autre demande en attente.
    if (usedAmounts.has(montant) && attempt < MAX_ATTEMPTS - 1) continue;

    const { error } = await supabase.from("invites").insert({
      id,
      nom: nom.trim(),
      telephone: telephone.trim(),
      ticket_type,
      montant,
      statut: "en_attente",
    });

    if (!error) {
      const { airtel, moov } = organizerNumbers();
      return NextResponse.json({
        invite_id: id,
        code: id,
        montant,
        ticket_type,
        airtel,
        moov,
      });
    }

    // 23505 = violation d'unicité (collision de code) → on régénère.
    if ((error as { code?: string }).code !== "23505") {
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement." },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    { error: "Impossible de générer un code unique, réessaie." },
    { status: 500 },
  );
}
