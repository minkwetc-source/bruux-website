import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n'existe pas ou plus. Retour à l'accueil BRUUX.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-primary px-6 py-24">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#0a0a0a]"
      />
      <div
        aria-hidden
        className="bg-gold-glow pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(196,163,90,0.14),transparent_60%)]"
      />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        <p className="label-gold">Erreur 404</p>

        <h1 className="mt-6 font-heading uppercase leading-[0.85] tracking-wide text-white text-[clamp(5rem,18vw,12rem)]">
          404.
        </h1>

        <span
          aria-hidden
          className="mt-2 block h-px w-32 bg-accent"
        />

        <h2 className="mt-10 font-heading text-2xl uppercase tracking-wide text-text-primary md:text-3xl">
          Cette page n&apos;existe pas.
        </h2>

        <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-text-secondary md:text-base">
          Le lien est cassé, la page a été déplacée, ou tu as tapé l&apos;URL
          un peu trop vite. Retourne à l&apos;accueil — il y a beaucoup mieux
          à voir.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-accent px-8 py-3.5 font-ui text-xs font-semibold uppercase tracking-button text-bg-primary transition-colors hover:bg-accent-hover"
          >
            <ArrowLeft size={14} />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/evenements"
            className="inline-flex items-center gap-2 border border-border-medium bg-transparent px-8 py-3.5 font-ui text-xs font-semibold uppercase tracking-button text-text-primary transition-colors hover:border-accent hover:text-accent"
          >
            Voir les événements
          </Link>
        </div>
      </div>
    </main>
  );
}
