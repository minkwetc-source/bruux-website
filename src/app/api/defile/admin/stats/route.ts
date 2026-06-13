import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/defile/service-client";
import { isAdminAuthed } from "@/lib/defile/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/defile/admin/stats
 * Renvoie le total d'invités payés et le nombre d'entrés (scannés).
 */
export async function GET() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const supabase = createServiceClient();

  // Total des billets réellement payés (payé + scanné).
  const { count: total } = await supabase
    .from("invites")
    .select("id", { count: "exact", head: true })
    .in("statut", ["paye", "scanne"]);

  // Entrés = déjà scannés.
  const { count: entered } = await supabase
    .from("invites")
    .select("id", { count: "exact", head: true })
    .eq("scanne", true);

  return NextResponse.json({
    total: total ?? 0,
    entered: entered ?? 0,
  });
}
