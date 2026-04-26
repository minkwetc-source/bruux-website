"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin, Calendar } from "lucide-react";
import { PinSection } from "@/components/animations/PinSection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

// Événement fictionnel (à remplacer par une requête Supabase une fois la
// table `events` peuplée).
const NEXT_EVENT = {
  title: "Night Class #5",
  slug: "night-class-5",
  date: new Date("2026-05-15T22:00:00+01:00"),
  location: "Villa Etami · Libreville",
  description:
    "La 5e édition de la Night Class BRUUX. DJ résident, scénographie immersive, transport organisé depuis les principaux quartiers.",
  ticketWhatsapp:
    "https://wa.me/24165467224?text=Salut%20BRUUX%2C%20je%20souhaite%20r%C3%A9server%20pour%20Night%20Class%20%235",
};

type TimeLeft = { d: number; h: number; m: number; s: number };
const ZERO: TimeLeft = { d: 0, h: 0, m: 0, s: 0 };

function compute(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    d: Math.floor(diff / (1000 * 60 * 60 * 24)),
    h: Math.floor((diff / (1000 * 60 * 60)) % 24),
    m: Math.floor((diff / (1000 * 60)) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

function useCountdown(target: Date): TimeLeft {
  // Initial zero — évite hydration mismatch (Date.now() diffère server/client).
  const [time, setTime] = useState<TimeLeft>(ZERO);

  useEffect(() => {
    setTime(compute(target));
    const id = window.setInterval(() => setTime(compute(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return time;
}

export function NextEvent() {
  const { d, h, m, s } = useCountdown(NEXT_EVENT.date);
  const formattedDate = NEXT_EVENT.date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <PinSection end="+=80%">
      <section className="relative flex min-h-screen items-center overflow-hidden bg-bg-primary">
        <div aria-hidden className="bg-gold-glow absolute inset-0" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(196,163,90,0.08),transparent_70%)]"
        />

        <div className="container-bruux relative z-10 grid grid-cols-1 gap-12 py-20 md:grid-cols-2 md:gap-16 md:py-0">
          {/* Affiche officielle Night Class */}
          <ScrollReveal animation="slide-right" duration={1.2}>
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-accent-border md:aspect-[3/4]">
              <Image
                src="/images/events/night-class-affiche.jpg"
                alt="Affiche officielle Night Class #5 — 15 mai 2026, Villa Etami, Libreville"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover img-bruux"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(196,163,90,0.18),transparent_65%)] mix-blend-overlay"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent"
              />
              <div className="absolute inset-0 flex items-end p-6 md:p-8">
                <div>
                  <p className="label-gold">Night Class #5</p>
                  <p className="mt-2 font-heading text-5xl uppercase tracking-wide text-white md:text-6xl">
                    15<span className="text-accent">.</span>05
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal animation="fade-up" delay={0.2}>
            <div className="flex flex-col">
              <span className="inline-flex w-fit items-center border border-accent-border bg-accent-subtle px-4 py-2 font-ui text-[11px] font-semibold uppercase tracking-label text-accent">
                Prochain événement
              </span>

              <h2 className="mt-6 font-heading uppercase leading-[0.95] tracking-wide text-white text-[clamp(2.5rem,6vw,4.5rem)]">
                {NEXT_EVENT.title}
              </h2>

              <div className="mt-6 flex flex-col gap-3 md:flex-row md:gap-6">
                <div className="flex items-center gap-2 font-ui text-sm text-text-secondary">
                  <Calendar size={16} className="text-accent" />
                  <span className="uppercase tracking-wide">{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 font-ui text-sm text-text-secondary">
                  <MapPin size={16} className="text-accent" />
                  <span>{NEXT_EVENT.location}</span>
                </div>
              </div>

              <p className="mt-6 max-w-md font-body text-[15px] leading-relaxed text-text-secondary">
                {NEXT_EVENT.description}
              </p>

              {/* Countdown */}
              <div className="mt-10 grid max-w-md grid-cols-4 gap-2 md:gap-3">
                {(
                  [
                    { v: d, l: "Jours" },
                    { v: h, l: "Heures" },
                    { v: m, l: "Min" },
                    { v: s, l: "Sec" },
                  ] as const
                ).map((item) => (
                  <div
                    key={item.l}
                    className="border border-border-subtle bg-bg-surface px-2 py-4 text-center"
                  >
                    <p className="font-heading text-3xl uppercase leading-none tracking-wide text-white tabular-nums md:text-5xl">
                      {String(item.v).padStart(2, "0")}
                    </p>
                    <p className="mt-2 font-ui text-[9px] uppercase tracking-label text-text-tertiary md:text-[10px]">
                      {item.l}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href={NEXT_EVENT.ticketWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-accent px-8 py-[14px] font-body text-xs font-semibold uppercase tracking-button text-bg-primary transition-colors hover:bg-accent-hover"
                >
                  Réserver ma place
                </Link>
                <Link
                  href={`/evenements/${NEXT_EVENT.slug}`}
                  className="inline-flex items-center justify-center border-b border-transparent font-body text-xs font-semibold uppercase tracking-button text-text-secondary transition-colors hover:border-accent hover:text-accent"
                >
                  Voir les détails
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PinSection>
  );
}
