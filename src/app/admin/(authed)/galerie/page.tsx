import { requireAdmin } from "@/lib/supabase/admin";
import { createServerClient } from "@/lib/supabase/server";
import type { PhotoRow } from "@/lib/supabase/types";
import { Header } from "../Header";
import { GalleryManager } from "./GalleryManager";

export const dynamic = "force-dynamic";

async function getAllPhotos(): Promise<PhotoRow[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data;
}

export default async function AdminGalleryPage() {
  const admin = await requireAdmin();
  const photos = await getAllPhotos();

  return (
    <>
      <Header
        admin={admin}
        title="Galerie."
        subtitle="Ajoute des photos à la galerie publique. Les sessions « bruxsessionpick » apparaissent dans la bande horizontale signature."
      />
      <div className="px-6 py-10 md:px-10 md:py-14">
        <GalleryManager photos={photos} />
      </div>
    </>
  );
}
