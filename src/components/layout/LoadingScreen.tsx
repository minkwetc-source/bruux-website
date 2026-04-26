"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const FLAG_KEY = "bruux:loading-shown";
const DURATION_MS = 1800;

/**
 * Écran de chargement initial. Affiché uniquement au premier chargement de la
 * session (flag sessionStorage) — pas sur les navigations internes.
 * Skip complet si prefers-reduced-motion: reduce.
 */
export function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);

    if (reduce) {
      sessionStorage.setItem(FLAG_KEY, "1");
      return;
    }

    if (sessionStorage.getItem(FLAG_KEY)) return;

    setShow(true);

    // IMPORTANT: on flag sessionStorage seulement à la fin du timeout, pas avant.
    // En React strict mode, useEffect se monte → cleanup → remount. Si on flaggait
    // avant le timeout, le 2e run verrait le flag et sauterait le setTimeout →
    // `show` resterait bloqué à `true`.
    const timeout = window.setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(FLAG_KEY, "1");
    }, DURATION_MS);

    return () => window.clearTimeout(timeout);
  }, [reduce]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading-screen"
          aria-hidden
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-bg-primary"
        >
          <div className="bg-gold-glow pointer-events-none absolute inset-0" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <h1 className="font-heading text-6xl uppercase leading-none tracking-[0.12em] text-white md:text-8xl">
              BRUUX.
            </h1>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 0.6,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-4 block h-px w-full origin-left bg-accent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
