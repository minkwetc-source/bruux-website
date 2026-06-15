"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MapPin, Calendar } from "lucide-react";
import { PinSection } from "@/components/animations/PinSection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import type { EventRow } from "@/lib/supabase/types";

const FALLBACK_AFFICHE = "/images/events/night-class-affiche.jpg";
const DEFAULT_WHATSAPP = "https://wa.me/24105500807";

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

export function NextEvent({ event }: { event: EventRow | null }) {
  if (!event) return <NextEventEmpty />;
  return <NextEventContent event={event} />;
}

function NextEventContent({ event }: { event: EventRow }) {
  const date = useMemo(() => new Date(event.date), [event.date]);
  const { d, h, m, s } = useCountdown(date);

  const formattedDate = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  const imageSrc = event.image_url ?? FALLBACK_AFFICHE;
  const ticketHref = event.whatsapp_link ?? DEFAULT_WHATSAPP;

  return (
    <PinSection end="+=80%">
      <section className="relative flex min-h-screen items-center overflow-hidden bg-bg-primary">
        <div aria-hidden className="bg-gold-glow absolute inset-0" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(196,163,90,0.08),transparent_70%)]"
        />

        <div className="container-bruux relative z-10 grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2 md:gap-16 md:py-0">
          {/* Affiche officielle */}
          <ScrollReveal animation="slide-right" duration={1.2}>
            <div className="relative aspect-video w-full overflow-hidden border border-accent-border">
              <Image
                src={imageSrc}
                alt={`Affiche officielle ${event.title}${
                  event.location ? ` — ${event.location}` : ""
                }`}
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
                  <p className="label-gold">{event.title}</p>
                  <p className="mt-2 font-heading text-5xl uppercase tracking-wide text-white md:text-6xl">
                    {day}
                    <span className="text-accent">.</span>
                    {month}
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
                {event.title}
              </h2>

              <div className="mt-6 flex flex-col gap-3 md:flex-row md:gap-6">
                <div className="flex items-center gap-2 font-ui text-sm text-text-secondary">
                  <Calendar size={16} className="text-accent" />
                  <span className="uppercase tracking-wide">{formattedDate}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2 font-ui text-sm text-text-secondary">
                    <MapPin size={16} className="text-accent" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>

              {event.description && (
                <p className="mt-6 max-w-md font-body text-[15px] leading-relaxed text-text-secondary">
                  {event.description}
                </p>
              )}

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
                  href={ticketHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-accent px-8 py-[14px] font-body text-xs font-semibold uppercase tracking-button text-bg-primary transition-colors hover:bg-accent-hover"
                >
                  Réserver ma place
                </Link>
                <Link
                  href={`/evenements/${event.slug}`}
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

function NextEventEmpty() {
  return (
    <section className="relative flex items-center overflow-hidden bg-bg-primary py-28 md:py-36">
      <div aria-hidden className="bg-gold-glow absolute inset-0" />
      <div className="container-bruux relative z-10">
        <ScrollReveal animation="fade-up">
          <span className="inline-flex w-fit items-center border border-accent-border bg-accent-subtle px-4 py-2 font-ui text-[11px] font-semibold uppercase tracking-label text-accent">
            Prochain événement
          </span>
          <h2 className="mt-6 max-w-2xl font-heading uppercase leading-[0.95] tracking-wide text-white text-[clamp(2.5rem,6vw,4.5rem)]">
            Bientôt de retour.
          </h2>
          <p className="mt-6 max-w-md font-body text-[15px] leading-relaxed text-text-secondary">
            Aucune date programmée pour le moment. La prochaine soirée se
            prépare — reste connecté pour ne rien manquer.
          </p>
          <Link
            href="/evenements"
            className="mt-10 inline-flex items-center justify-center border-b border-transparent font-body text-xs font-semibold uppercase tracking-button text-text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            Voir tous les événements
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
