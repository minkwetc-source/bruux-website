import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/defile/service-client";
import { isAdminAuthed } from "@/lib/defile/auth";
import { sendImage, billetMessage } from "@/lib/defile/wasender";
import { getBaseUrl } from "@/lib/defile/base-url";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/defile/admin/approuver  { invite_id }
 * L'admin a vérifié le paiement (montant exact / code motif dans son historique
 * Airtel ou Moov). On génère le QR et on l'envoie sur WhatsApp via WaSender,
 * puis on passe l'invité en `paye`.
 *
 * Le statut ne devient `paye` QUE si l'envoi WhatsApp réussit : en cas d'échec,
 * l'invité reste `en_attente` et réapparaît dans la liste pour réessayer.
 */
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

  if (invite.statut === "paye") {
    return NextResponse.json({
      result: "already",
      invite: { nom: invite.nom, ticket_type: invite.ticket_type },
    });
  }

  // statut === 'en_attente' : on envoie le QR via WhatsApp.
  try {
    const qrUrl = `${getBaseUrl(request)}/api/defile/qr/${encodeURIComponent(invite.id)}`;
    await sendImage({
      phone: invite.telephone,
      imageUrl: qrUrl,
      caption: billetMessage(invite.nom, invite.ticket_type),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Envoi WhatsApp échoué.";
    // On NE change PAS le statut : l'invité reste en attente pour réessayer.
    return NextResponse.json(
      { result: "qr_failed", error: message },
      { status: 502 },
    );
  }

  await supabase
    .from("invites")
    .update({ statut: "paye", qr_sent: true })
    .eq("id", invite.id);

  return NextResponse.json({
    result: "approved",
    invite: { nom: invite.nom, ticket_type: invite.ticket_type },
  });
}
