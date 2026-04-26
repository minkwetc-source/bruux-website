import { requireAdmin } from "@/lib/supabase/admin";
import { createServerClient } from "@/lib/supabase/server";
import type { EventRow } from "@/lib/supabase/types";
import { Header } from "../Header";
import { EventsManager } from "./EventsManager";

export const dynamic = "force-dynamic";

async function getAllEvents(): Promise<EventRow[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });
  if (error || !data) return [];
  return data;
}

export default async function AdminEventsPage() {
  const admin = await requireAdmin();
  const events = await getAllEvents();

  return (
    <>
      <Header
        admin={admin}
        title="Événements."
        subtitle="Gère les soirées, pool parties et sessions spéciales. Les modifications s'appliquent immédiatement sur le site public."
      />
      <div className="px-6 py-10 md:px-10 md:py-14">
        <EventsManager events={events} />
      </div>
    </>
  );
}
