"use client";

import { type ReactNode } from "react";
import { useGSAP, ScrollTrigger } from "@/hooks/useGSAP";
import { useMediaQuery, breakpoints } from "@/hooks/useMediaQuery";

type Props = {
  children: ReactNode;
  /**
   * Distance de pin. Ex: `"+=100%"` (une viewport), `"+=800"` (800px).
   * Défaut: `"+=100%"`.
   */
  end?: string;
  pinSpacing?: boolean;
  start?: string;
  className?: string;
};

/**
 * Épingle une section pendant un scroll donné (effet Apple).
 * Le contenu interne peut être animé séparément avec ScrollReveal / TextSplit.
 */
export function PinSection({
  children,
  end = "+=100%",
  pinSpacing = true,
  start = "top top",
  className,
}: Props) {
  const isMobile = useMediaQuery(breakpoints.mobile);
  const reduce = useMediaQuery(breakpoints.reducedMotion);
  // Pin désactivé sur mobile (mauvaise UX touch) et reduced-motion.
  const skip = isMobile || reduce;

  const ref = useGSAP<HTMLDivElement>(
    (scope) => {
      if (skip) return;
      ScrollTrigger.create({
        trigger: scope,
        start,
        end,
        pin: true,
        pinSpacing,
      });
    },
    [end, pinSpacing, start, skip],
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
