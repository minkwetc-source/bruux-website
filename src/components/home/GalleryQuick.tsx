"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HorizontalScroll } from "@/components/animations/HorizontalScroll";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextSplit } from "@/components/animations/TextSplit";

// Photos signature pour le bandeau galerie de la home.
type Photo = { src: string; alt: string; label: string };
const PHOTOS: Photo[] = [
  { src: "/images/sessions/session-01.jpg", alt: "Brux Session 01 — portrait studio", label: "Brux Session 01" },
  { src: "/images/sessions/session-02.jpg", alt: "Brux Session 02 — portrait studio", label: "Brux Session 02" },
  { src: "/images/portraits/portrait-cameraman.jpg", alt: "Portrait cameraman BRUUX en backstage", label: "Backstage 03" },
  { src: "/images/sessions/session-03.jpg", alt: "Brux Session 04 — portrait signature", label: "Brux Session 04" },
  { src: "/images/sessions/session-04.jpg", alt: "Brux Session 05 — portrait signature", label: "Brux Session 05" },
  { src: "/images/portraits/portrait-plage.jpg", alt: "Portrait BRUUX — session lifestyle plage", label: "Plage 06" },
  { src: "/images/sessions/session-05.jpg", alt: "Brux Session 07 — portrait signature", label: "Brux Session 07" },
  { src: "/images/sessions/session-06.jpg", alt: "Brux Session 08 — portrait signature", label: "Brux Session 08" },
  { src: "/images/portraits/portrait-duo.jpg", alt: "Portrait duo BRUUX — direction artistique", label: "Duo 09" },
  { src: "/images/sessions/session-07.jpg", alt: "Brux Session 10 — portrait signature", label: "Brux Session 10" },
];

export function GalleryQuick() {
  return (
    <section className="overflow-hidden bg-bg-primary pb-12 md:pb-24">
      <div className="container-bruux pb-16 pt-20 md:pb-24 md:pt-32">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <ScrollReveal animation="fade-up">
              <p className="label-gold mb-4">Galerie</p>
            </ScrollReveal>
            <TextSplit
              as="h2"
              type="word"
              className="font-heading uppercase leading-[0.95] tracking-wide text-white text-[clamp(2.25rem,6vw,4rem)]"
            >
              Nos dernières sessions.
            </TextSplit>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-text-secondary">
                Sessions photo signature et moments captés au cœur des
                événements BRUUX.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fade-up" delay={0.3} className="hidden md:block">
            <Link
              href="/galerie"
              className="group inline-flex items-center gap-3 border-b border-accent pb-1 font-ui text-xs font-semibold uppercase tracking-button text-accent transition-colors hover:text-accent-hover"
            >
              Voir toute la galerie
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </ScrollReveal>
        </div>
      </div>

      <HorizontalScroll trackClassName="gap-5 pl-6 pr-[20vw] md:pl-20 md:pr-[15vw]">
        {PHOTOS.map((p, i) => (
          <div
            key={p.src}
            className="group relative h-[420px] w-[280px] shrink-0 snap-start overflow-hidden border border-border-subtle bg-bg-surface md:h-[520px] md:w-[380px]"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 768px) 380px, 280px"
              className="object-cover img-bruux transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-bg-primary/25 transition-opacity duration-700 group-hover:bg-bg-primary/10"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent"
            />
            <div className="absolute inset-0 flex items-end justify-between p-5 md:p-6">
              <span className="font-ui text-[10px] uppercase tracking-label text-accent md:text-[11px]">
                {p.label}
              </span>
              <span className="font-heading text-xs tracking-[0.3em] text-text-tertiary">
                {String(i + 1).padStart(2, "0")}/{PHOTOS.length}
              </span>
            </div>
          </div>
        ))}
      </HorizontalScroll>

      <div className="container-bruux mt-12 flex justify-center md:hidden">
        <Link
          href="/galerie"
          className="inline-flex items-center bg-accent px-8 py-[14px] font-body text-xs font-semibold uppercase tracking-button text-bg-primary"
        >
          Voir toute la galerie
        </Link>
      </div>
    </section>
  );
}
