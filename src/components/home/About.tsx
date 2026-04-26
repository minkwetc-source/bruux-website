"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Parallax } from "@/components/animations/Parallax";
import { CounterAnimation } from "@/components/animations/CounterAnimation";
import { TextSplit } from "@/components/animations/TextSplit";

const STATS = [
  { value: 10, suffix: "+", label: "Événements" },
  { value: 50, suffix: "+", label: "Membres" },
  { value: 3, suffix: "", label: "Villes" },
];

/**
 * Section À propos — layout 2 colonnes, photo placeholder avec Parallax,
 * 3 compteurs animés en bas.
 */
export function About() {
  return (
    <section className="bg-bg-surface py-20 md:py-32">
      <div className="container-bruux">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div>
            <ScrollReveal animation="fade-up">
              <p className="label-gold mb-6">Qui sommes-nous</p>
            </ScrollReveal>

            <TextSplit
              as="h2"
              type="word"
              stagger={0.06}
              duration={0.9}
              className="font-heading uppercase leading-[0.95] tracking-wide text-white text-[clamp(2.25rem,6vw,4rem)]"
            >
              Une nouvelle culture gabonaise.
            </TextSplit>

            <ScrollReveal
              animation="fade-up"
              delay={0.3}
              selector="[data-para]"
              stagger={0.12}
            >
              <div className="mt-8 space-y-5 font-body text-[15px] leading-[1.7] text-text-secondary md:text-base">
                <p data-para>
                  BRUUX est une entertainment company dédiée à la création
                  d’expériences, de contenus et d’événements qui rassemblent,
                  marquent et fédèrent.
                </p>
                <p data-para>
                  Nous imaginons et produisons des moments de divertissement à
                  fort impact, en combinant événementiel, création artistique,
                  influence et image, avec une exigence professionnelle et une
                  vision long terme.
                </p>
                <p data-para>
                  BRUUX évolue à l’intersection de la culture, du lifestyle et
                  du business, en structurant les talents et en connectant les
                  publics, les marques et les institutions autour d’expériences
                  mémorables.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Photo signature BRUUX — portrait 4:5 avec parallax */}
          <Parallax speed={-0.3} className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-border-subtle">
              <Image
                src="/images/portraits/portrait-solo.jpg"
                alt="Portrait BRUUX — l'identité visuelle du collectif"
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover img-bruux"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(196,163,90,0.18),transparent_65%)] mix-blend-overlay"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg-primary/70 via-bg-primary/20 to-transparent"
              />
              <div className="absolute inset-0 flex items-end justify-between p-6 md:p-8">
                <span className="label-gold">BRUUX · Libreville</span>
                <span className="font-heading text-sm tracking-[0.3em] text-text-tertiary">
                  02.26
                </span>
              </div>
            </div>
          </Parallax>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-6 border-t border-border-subtle pt-16 md:mt-32 md:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading uppercase leading-none tracking-wide text-accent text-[clamp(2.5rem,8vw,6rem)]">
                <CounterAnimation
                  to={stat.value}
                  suffix={stat.suffix}
                  duration={2}
                />
              </p>
              <p className="label-muted mt-3 md:mt-5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
