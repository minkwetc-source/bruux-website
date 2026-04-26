"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Parallax } from "@/components/animations/Parallax";
import { TextSplit } from "@/components/animations/TextSplit";

/**
 * Hero — plein écran, photo BRUUX en fond (priority, LCP), Parallax GSAP
 * + double overlay sombre pour garantir la lisibilité du logo BRUUX. centré.
 */
export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-bg-primary">
      {/* Photo de fond avec parallax — priority pour LCP */}
      <Parallax speed={0.6} className="absolute inset-0">
        <Image
          src="/images/bruxhouse/brux-family-2.jpg"
          alt="La famille BRUUX réunie — collectif créatif gabonais à Libreville"
          fill
          priority
          sizes="100vw"
          className="object-cover img-bruux"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-bg-primary/55"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(196,163,90,0.22),transparent_55%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_75%,rgba(196,163,90,0.10),transparent_50%)]"
        />
      </Parallax>

      {/* Dégradé top & bottom pour fade vers le dark BRUUX */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.85)_0%,rgba(10,10,10,0.35)_35%,rgba(10,10,10,0.35)_65%,rgba(10,10,10,0.95)_100%)]"
      />

      {/* Glow or central pour donner du punch */}
      <div aria-hidden className="bg-gold-glow pointer-events-none absolute inset-0" />

      {/* Content */}
      <div className="container-bruux relative z-10 flex h-full flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <h1 className="font-heading uppercase leading-none tracking-[0.06em] text-white text-[clamp(3.5rem,14vw,8.5rem)]">
            BRUUX.
          </h1>
        </motion.div>

        <div className="mt-10 overflow-hidden">
          <TextSplit
            as="p"
            type="word"
            stagger={0.1}
            delay={1}
            duration={1}
            immediate
            className="font-ui text-[11px] uppercase tracking-[0.4em] text-text-secondary md:text-[13px]"
          >
            Créativité. Événement. Famille.
          </TextSplit>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-16 max-w-md font-body text-sm leading-relaxed text-text-tertiary"
        >
          Entertainment company gabonaise. Des expériences qui rassemblent,
          marquent et fédèrent.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-text-secondary"
        >
          <span className="font-ui text-[10px] uppercase tracking-[0.35em]">
            Découvrir
          </span>
          <ChevronDown size={18} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
