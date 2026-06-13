import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/defile/service-client";
import { isAdminAuthed } from "@/lib/defile/auth";
import type { InviteRow } from "@/lib/supabase/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ScanResult = "success" | "already" | "not_paid" | "not_found";

/** Extrait un id BRX d'un code scanné (texte brut ou JSON), sinon null. */
function extractId(code: string): string | null {
  if (code.startsWith("BRX-")) return code;
  try {
    const obj = JSON.parse(code);
    if (obj && typeof obj.id === "string" && obj.id.startsWith("BRX-")) {
      return obj.id;
    }
  } catch {
    /* pas du JSON */
  }
  return null;
}

/**
 * POST /api/defile/admin/scan
 * Valide un QR / une recherche manuelle et marque l'invité comme entré.
 * Toute la logique base de données reste côté serveur (clé service_role).
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

  const code = String((body as { code?: unknown })?.code ?? "").trim();
  if (!code) {
    return NextResponse.json({ error: "Code manquant." }, { status: 400 });
  }

  const supabase = createServiceClient();
  const id = extractId(code);

  let invite: InviteRow | null = null;
  if (id) {
    const { data } = await supabase
      .from("invites")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    invite = data;
  } else {
    // Recherche manuelle par nom (premier résultat).
    const { data } = await supabase
      .from("invites")
      .select("*")
      .ilike("nom", `%${code}%`)
      .limit(1);
    invite = data?.[0] ?? null;
  }

  if (!invite) {
    return NextResponse.json({ result: "not_found" as ScanResult, code });
  }

  // Billet non payé → refus à l'entrée.
  if (invite.statut === "en_attente") {
    return NextResponse.json({
      result: "not_paid" as ScanResult,
      invite: { nom: invite.nom, ticket_type: invite.ticket_type },
    });
  }

  // Déjà scanné → on signale (anti double-entrée).
  if (invite.scanne) {
    return NextResponse.json({
      result: "already" as ScanResult,
      invite: {
        nom: invite.nom,
        ticket_type: invite.ticket_type,
        scanne_at: invite.scanne_at,
      },
    });
  }

  // Première entrée valide → on marque scanné.
  const scanneAt = new Date().toISOString();
  await supabase
    .from("invites")
    .update({ scanne: true, scanne_at: scanneAt, statut: "scanne" })
    .eq("id", invite.id);

  return NextResponse.json({
    result: "success" as ScanResult,
    invite: {
      nom: invite.nom,
      ticket_type: invite.ticket_type,
      scanne_at: scanneAt,
    },
  });
}
