import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAdminUser } from "@/lib/supabase/admin";
import { LoginForm } from "./LoginForm";

type Props = {
  searchParams: { redirect?: string };
};

export default async function AdminLoginPage({ searchParams }: Props) {
  // Si déjà loggé en admin → on saute la page de login.
  const admin = await getAdminUser();
  if (admin) redirect(searchParams.redirect ?? "/admin/dashboard");

  const redirectTo = searchParams.redirect ?? "/admin/dashboard";

  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(196,163,90,0.10),transparent_60%)]"
      />

      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 font-ui text-[11px] font-semibold uppercase tracking-button text-text-secondary transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} /> Retour au site
        </Link>

        <div className="border border-border-subtle bg-bg-surface p-8 md:p-10">
          <p className="font-heading text-3xl uppercase tracking-[0.2em] text-text-primary">
            BRUUX.
          </p>
          <p className="mt-1 font-ui text-[10px] font-semibold uppercase tracking-label text-accent">
            Administration
          </p>

          <h1 className="mt-8 font-heading text-2xl uppercase tracking-wide text-text-primary md:text-3xl">
            Connexion.
          </h1>
          <p className="mt-2 font-body text-sm text-text-secondary">
            Espace réservé à l&apos;équipe BRUUX.
          </p>

          <div className="mt-8">
            <LoginForm redirectTo={redirectTo} />
          </div>
        </div>

        <p className="mt-6 text-center font-body text-xs text-text-tertiary">
          Accès réservé · Tentatives surveillées
        </p>
      </div>
    </main>
  );
}
