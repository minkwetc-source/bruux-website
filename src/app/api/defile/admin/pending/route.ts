import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/defile/service-client";
import { isAdminAuthed } from "@/lib/defile/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/defile/admin/pending
 * Liste les demandes en attente de validation (paiement à vérifier).
 */
export async function GET() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("invites")
    .select("id, nom, telephone, ticket_type, montant, created_at")
    .eq("statut", "en_attente")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Erreur de lecture." }, { status: 500 });
  }

  return NextResponse.json({ invites: data ?? [] });
}
