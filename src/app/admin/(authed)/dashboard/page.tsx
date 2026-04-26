import {
  Calendar,
  FileText,
  Image as ImageIcon,
  Users,
} from "lucide-react";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/admin";
import { createServerClient } from "@/lib/supabase/server";
import { Header } from "../Header";

export const dynamic = "force-dynamic";

async function getCounts() {
  const supabase = createServerClient();
  // count: 'exact', head: true → ne renvoie pas les rows, juste le count.
  const [events, articles, photos, members] = await Promise.all([
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("articles").select("*", { count: "exact", head: true }),
    supabase.from("photos").select("*", { count: "exact", head: true }),
    supabase.from("members").select("*", { count: "exact", head: true }),
  ]);
  return {
    events: events.count ?? 0,
    articles: articles.count ?? 0,
    photos: photos.count ?? 0,
    members: members.count ?? 0,
  };
}

export default async function DashboardPage() {
  const admin = await requireAdmin();
  const counts = await getCounts();

  const stats = [
    {
      label: "Événements",
      value: counts.events,
      href: "/admin/evenements",
      Icon: Calendar,
    },
    {
      label: "Articles",
      value: counts.articles,
      href: "/admin/blog",
      Icon: FileText,
    },
    {
      label: "Photos",
      value: counts.photos,
      href: "/admin/galerie",
      Icon: ImageIcon,
    },
    {
      label: "Membres",
      value: counts.members,
      href: "/admin/famille",
      Icon: Users,
    },
  ];

  return (
    <>
      <Header
        admin={admin}
        title="Dashboard."
        subtitle="Vue d'ensemble du contenu BRUUX. Clique sur une carte pour gérer la section correspondante."
      />

      <div className="px-6 py-10 md:px-10 md:py-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col justify-between border border-border-subtle bg-bg-surface p-6 transition-colors hover:border-accent-border"
            >
              <div className="flex items-center justify-between">
                <span className="font-ui text-[10px] font-semibold uppercase tracking-label text-text-secondary">
                  {label}
                </span>
                <Icon
                  size={16}
                  className="text-text-tertiary transition-colors group-hover:text-accent"
                />
              </div>
              <p className="mt-6 font-heading text-5xl tracking-wide text-text-primary md:text-6xl">
                {value.toString().padStart(2, "0")}
              </p>
              <p className="mt-3 inline-flex items-center gap-2 font-ui text-[10px] font-semibold uppercase tracking-button text-accent opacity-0 transition-opacity group-hover:opacity-100">
                Gérer →
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="border border-border-subtle bg-bg-surface p-6">
            <p className="label-gold mb-3">Bonnes pratiques</p>
            <ul className="space-y-2 font-body text-sm text-text-secondary">
              <li>→ Publie les articles uniquement quand ils sont prêts (case « publié »).</li>
              <li>→ Les images sont servies via leur URL. Pousse-les sur Cloudinary avant.</li>
              <li>→ L&apos;ordre d&apos;affichage des membres se règle via le champ « ordre ».</li>
              <li>→ Les événements passés gardent leur statut ; ne les supprime pas.</li>
            </ul>
          </div>

          <div className="border border-border-subtle bg-bg-surface p-6">
            <p className="label-gold mb-3">Raccourcis</p>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/admin/evenements"
                className="border border-border-medium bg-bg-elevated px-4 py-3 font-ui text-[11px] font-semibold uppercase tracking-button text-text-primary transition-colors hover:border-accent hover:text-accent"
              >
                + Événement
              </Link>
              <Link
                href="/admin/blog"
                className="border border-border-medium bg-bg-elevated px-4 py-3 font-ui text-[11px] font-semibold uppercase tracking-button text-text-primary transition-colors hover:border-accent hover:text-accent"
              >
                + Article
              </Link>
              <Link
                href="/admin/galerie"
                className="border border-border-medium bg-bg-elevated px-4 py-3 font-ui text-[11px] font-semibold uppercase tracking-button text-text-primary transition-colors hover:border-accent hover:text-accent"
              >
                + Photo
              </Link>
              <Link
                href="/admin/famille"
                className="border border-border-medium bg-bg-elevated px-4 py-3 font-ui text-[11px] font-semibold uppercase tracking-button text-text-primary transition-colors hover:border-accent hover:text-accent"
              >
                + Membre
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
