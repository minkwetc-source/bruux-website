"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextSplit } from "@/components/animations/TextSplit";

type Universe = {
  href: string;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const UNIVERSES: Universe[] = [
  {
    href: "/evenements",
    label: "BRUX Event",
    title: "Les soirées qui font vibrer Libreville.",
    description: "Night Class · Pool Party · Soirées spéciales",
    image: "/images/events/event-nightclass-1.jpg",
    imageAlt: "Ambiance Night Class BRUUX — soirée à Libreville",
  },
  {
    href: "/blog",
    label: "BRUX House",
    title: "Le laboratoire lifestyle & création.",
    description: "Vlogs · Courts-métrages · Backstage",
    image: "/images/bruxhouse/brux-family.jpg",
    imageAlt: "BRUX House — la famille créative au quotidien",
  },
  {
    href: "/galerie",
    label: "Division Artistique",
    title: "Mannequinat, image & direction.",
    description: "Mannequinat · bruxsessionpick · Scénographie",
    image: "/images/portraits/portrait-mur-vert.jpg",
    imageAlt:
      "Portrait signature bruxsessionpick — direction artistique BRUUX",
  },
];

export function Universes() {
  return (
    <section className="bg-bg-primary py-20 md:py-32">
      <div className="container-bruux">
        <div className="mb-12 flex flex-col items-start gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <ScrollReveal animation="fade-up">
              <p className="label-gold mb-4">Explorer</p>
            </ScrollReveal>
            <TextSplit
              as="h2"
              type="word"
              className="font-heading uppercase leading-[0.95] tracking-wide text-white text-[clamp(2.25rem,6vw,4rem)]"
            >
              Nos Univers.
            </TextSplit>
          </div>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="max-w-sm font-body text-sm leading-relaxed text-text-secondary">
              Trois univers complémentaires qui dessinent l’ADN BRUUX —
              événementiel, lifestyle et direction artistique.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal
          selector="[data-universe-card]"
          animation="fade-up"
          stagger={0.15}
          duration={1.1}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {UNIVERSES.map((u) => (
              <UniverseCard key={u.href} universe={u} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function UniverseCard({ universe }: { universe: Universe }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      data-universe-card
      style={{ perspective: 1200 }}
      className="h-[400px]"
    >
      <Link href={universe.href} className="block h-full">
        <motion.div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border-subtle bg-bg-surface transition-colors duration-500 hover:border-accent-border"
        >
          {/* Photo de fond — lazy par défaut */}
          <Image
            src={universe.image}
            alt={universe.imageAlt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover img-bruux transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-bg-primary/45 transition-opacity duration-500 group-hover:bg-bg-primary/30"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,163,90,0.16),transparent_60%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg-primary via-bg-primary/70 to-transparent"
          />

          {/* Content — lifted in 3D */}
          <div
            className="relative flex h-full flex-col justify-between p-8"
            style={{ transform: "translateZ(40px)" }}
          >
            <div className="flex items-start justify-between">
              <p className="label-gold">{universe.label}</p>
              <motion.span
                className="text-text-secondary transition-colors duration-300 group-hover:text-accent"
                whileHover={{ x: 4, y: -4 }}
              >
                <ArrowUpRight size={28} strokeWidth={1.5} />
              </motion.span>
            </div>

            <div>
              <h3 className="font-heading text-2xl uppercase leading-tight tracking-wide text-white md:text-3xl">
                {universe.title}
              </h3>
              <p className="mt-4 font-ui text-xs uppercase tracking-label text-text-secondary">
                {universe.description}
              </p>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
