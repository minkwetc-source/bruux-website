import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/defile/service-client";
import { isAdminAuthed } from "@/lib/defile/auth";
import { getBaseUrl } from "@/lib/defile/base-url";
import { ticketLabel } from "@/lib/defile/tickets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/defile/admin/approuver  { invite_id }
 *
 * Envoi MANUEL du billet (pas d'abonnement WaSender). L'admin a vérifié le
 * paiement : on marque l'invité `paye` et on renvoie le QR + un lien WhatsApp
 * pré-rempli. L'admin clique pour ouvrir WhatsApp et envoyer lui-même le
 * message — qui contient l'URL publique (non devinable) du QR à présenter à
 * l'entrée.
 */
function buildMessage(nom: string, ticketType: string, qrUrl: string): string {
  return [
    "🎟 BRUUX · Défilé 4 Juillet",
    "",
    `Bonjour ${nom} !`,
    `Ton billet ${ticketLabel(ticketType)} est confirmé ✅`,
    "Voici ton QR code, à présenter à l'entrée :",
    qrUrl,
    "",
    "📍 Nzeng Ayong · 4 Juillet · 15h00",
  ].join("\n");
}

function whatsappLink(phone: string, text: string): string {
  const digits = String(phone ?? "").replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export async function POST(request: Request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps invalide." }, { status: 400 });
  }

  const inviteId = String((body as { invite_id?: unknown })?.invite_id ?? "").trim();
  if (!inviteId) {
    return NextResponse.json({ error: "invite_id manquant." }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data: invite } = await supabase
    .from("invites")
    .select("*")
    .eq("id", inviteId)
    .maybeSingle();

  if (!invite) {
    return NextResponse.json({ error: "Invité introuvable." }, { status: 404 });
  }

  if (invite.statut === "scanne") {
    return NextResponse.json(
      { result: "scanne", error: "Déjà entré à l'événement." },
      { status: 409 },
    );
  }

  const qrUrl = `${getBaseUrl(request)}/api/defile/qr/${encodeURIComponent(invite.id)}`;
  const waUrl = whatsappLink(
    invite.telephone,
    buildMessage(invite.nom, invite.ticket_type, qrUrl),
  );
  const payload = {
    invite: {
      id: invite.id,
      nom: invite.nom,
      ticket_type: invite.ticket_type,
      telephone: invite.telephone,
    },
    qrUrl,
    waUrl,
  };

  // Déjà payé : on renvoie quand même le QR pour pouvoir le renvoyer.
  if (invite.statut === "paye") {
    return NextResponse.json({ result: "already", ...payload });
  }

  // en_attente → on confirme le paiement.
  await supabase
    .from("invites")
    .update({ statut: "paye", qr_sent: false })
    .eq("id", invite.id);

  return NextResponse.json({ result: "approved", ...payload });
}
