import { requireAdmin } from "@/lib/supabase/admin";
import { createServerClient } from "@/lib/supabase/server";
import type { ArticleRow } from "@/lib/supabase/types";
import { Header } from "../Header";
import { BlogManager } from "./BlogManager";

export const dynamic = "force-dynamic";

async function getAllArticles(): Promise<ArticleRow[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data;
}

export default async function AdminBlogPage() {
  const admin = await requireAdmin();
  const articles = await getAllArticles();

  return (
    <>
      <Header
        admin={admin}
        title="Blog."
        subtitle="Brouillons et articles publiés. Markdown supporté avec aperçu live."
      />
      <div className="px-6 py-10 md:px-10 md:py-14">
        <BlogManager articles={articles} />
      </div>
    </>
  );
}
