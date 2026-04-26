import type { Metadata } from "next";
import {
  getMembersBySection,
  SECTION_LABELS,
  SECTION_SUBTITLES,
} from "@/lib/supabase/members";
import { FamilySection } from "@/components/family/FamilySection";
import { JoinForm } from "@/components/family/JoinForm";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextSplit } from "@/components/animations/TextSplit";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "#BRUXFAMILLY",
  description:
    "La famille BRUUX — direction, division artistique, mannequins, influenceurs, section A. Les visages du collectif gabonais.",
  openGraph: {
    title: "#BRUXFAMILLY | BRUUX.",
    description:
      "Les visages BRUUX — direction, mannequins, influenceurs, équipe.",
  },
};

export const revalidate = 60;

export default async function FamillePage() {
  const groups = await getMembersBySection();

  return (
    <main>
      <FamilyHero />

      {groups.map((group) => (
        <FamilySection
          key={group.section}
          section={group.section}
          label={SECTION_LABELS[group.section]}
          subtitle={SECTION_SUBTITLES[group.section]}
          members={group.members}
        />
      ))}

      <JoinSection />

      <Footer />
    </main>
  );
}

function FamilyHero() {
  return (
    <section className="relative flex h-[55vh] min-h-[420px] w-full items-end overflow-hidden bg-bg-primary pb-12 pt-28 md:pb-20 md:pt-32">
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
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(196,163,90,0.16),transparent_55%)]"
      />

      <div className="container-bruux relative z-10">
        <ScrollReveal animation="fade-up" duration={0.8}>
          <p className="label-gold">Le collectif</p>
        </ScrollReveal>
        <div className="mt-4">
          <TextSplit
            as="h1"
            type="word"
            stagger={0.05}
            duration={1}
            immediate
            className="font-heading uppercase leading-[0.85] tracking-wide text-white text-[clamp(3rem,12vw,9rem)]"
          >
            #BRUXFAMILLY
          </TextSplit>
        </div>
        <ScrollReveal animation="fade-up" delay={0.4}>
          <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-text-secondary md:text-base">
            Direction, image, mannequinat, influence, coordination — la famille
            qui fait BRUUX. Plus qu&apos;une équipe : un univers partagé,
            ancré à Libreville.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

function JoinSection() {
  return (
    <section className="border-t border-border-subtle bg-bg-surface py-20 md:py-28">
      <div className="container-bruux">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <ScrollReveal animation="fade-up">
              <p className="label-gold">Postuler</p>
            </ScrollReveal>
            <TextSplit
              as="h2"
              type="word"
              className="mt-3 font-heading uppercase leading-[0.95] tracking-wide text-white text-[clamp(2rem,5vw,3.5rem)]"
            >
              Rejoindre la famille.
            </TextSplit>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-text-secondary md:text-base">
                Tu veux faire partie du prochain shoot, du prochain défilé,
                de la prochaine soirée ? Envoie ta demande — on lit tout, on
                répond sous 7 jours.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.3}>
              <ul className="mt-8 space-y-3 font-body text-sm text-text-secondary">
                <li className="flex gap-3">
                  <span className="text-accent">→</span>
                  Mannequins, créateurs, danseurs, photographes, vidéastes
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">→</span>
                  Basé·e à Libreville ou de passage — on s&apos;adapte
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">→</span>
                  Aucun prérequis sauf l&apos;univers et l&apos;envie
                </li>
              </ul>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <div className="border border-border-subtle bg-bg-primary p-6 md:p-8">
              <JoinForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
