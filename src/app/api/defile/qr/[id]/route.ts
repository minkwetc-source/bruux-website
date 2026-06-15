import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { createServiceClient } from "@/lib/defile/service-client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/defile/qr/[id]
 * Renvoie le QR code PNG d'un invité. Le contenu encodé est simplement l'id
 * (BRX-XXXX) : c'est cette URL qui est transmise à WaSender pour l'envoi
 * WhatsApp après validation du paiement par l'admin.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  if (!id || !id.startsWith("BRX-")) {
    return NextResponse.json({ error: "ID invalide." }, { status: 400 });
  }

  // On ne génère le QR que pour un invité réellement existant.
  const supabase = createServiceClient();
  const { data: invite } = await supabase
    .from("invites")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (!invite) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const png = await QRCode.toBuffer(id, {
    width: 400,
    margin: 2,
    color: { dark: "#0f0d0c", light: "#ffffff" },
  });

  const headers: Record<string, string> = {
    "Content-Type": "image/png",
    "Cache-Control": "public, max-age=86400, immutable",
  };
  // ?download=1 → force le téléchargement du fichier (lien envoyé à l'invité).
  if (new URL(request.url).searchParams.has("download")) {
    headers["Content-Disposition"] = `attachment; filename="billet-${id}.png"`;
  }

  return new Response(new Uint8Array(png), { headers });
}
