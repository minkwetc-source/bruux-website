import { requireAdmin } from "@/lib/supabase/admin";
import { createServerClient } from "@/lib/supabase/server";
import type { MemberRow } from "@/lib/supabase/types";
import { Header } from "../Header";
import { FamilyManager } from "./FamilyManager";

export const dynamic = "force-dynamic";

async function getAllMembers(): Promise<MemberRow[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("section")
    .order("display_order");
  if (error || !data) return [];
  return data;
}

export default async function AdminFamillePage() {
  const admin = await requireAdmin();
  const members = await getAllMembers();

  return (
    <>
      <Header
        admin={admin}
        title="Famille."
        subtitle="Gère les membres de #BRUXFAMILLY. L'ordre d'affichage est par section + champ « ordre »."
      />
      <div className="px-6 py-10 md:px-10 md:py-14">
        <FamilyManager members={members} />
      </div>
    </>
  );
}
