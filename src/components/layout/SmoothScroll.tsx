"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery, breakpoints } from "@/hooks/useMediaQuery";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LenisContext = createContext<Lenis | null>(null);

export function useLenisInstance(): Lenis | null {
  return useContext(LenisContext);
}

type Props = {
  children: ReactNode;
};

/**
 * Lenis smooth-scroll provider intégré avec GSAP ScrollTrigger.
 * Sans cette intégration, les pin/scrub GSAP dérivent du scroll Lenis.
 *
 * Désactivé si prefers-reduced-motion: reduce — on utilise alors le scroll
 * natif du navigateur sans Lenis ni intégration GSAP.
 */
export function SmoothScroll({ children }: Props) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reduce = useMediaQuery(breakpoints.reducedMotion);

  useEffect(() => {
    if (reduce) return;

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    setLenis(instance);

    // Sync Lenis scroll events → ScrollTrigger update
    const handleScroll = () => ScrollTrigger.update();
    instance.on("scroll", handleScroll);

    // Drive Lenis via GSAP ticker (une seule boucle RAF pour tout)
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Refresh au mount pour recalculer les triggers après hydration
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      instance.off("scroll", handleScroll);
      instance.destroy();
      setLenis(null);
    };
  }, [reduce]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
