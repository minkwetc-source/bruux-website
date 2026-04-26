"use client";

import { type ReactNode } from "react";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { useMediaQuery, breakpoints } from "@/hooks/useMediaQuery";

type Props = {
  children: ReactNode;
  /**
   * Intensité du parallax. 0 = statique. 0.5 = subtil (défaut). 1 = marqué.
   * Valeur négative inverse la direction.
   */
  speed?: number;
  direction?: "vertical" | "horizontal";
  className?: string;
};

/**
 * Applique un parallax au scroll sur le contenu. Utilise `yPercent`/`xPercent`
 * pour éviter toute animation de `top`/`left` (cf. DESIGN.md §Performance).
 */
export function Parallax({
  children,
  speed = 0.5,
  direction = "vertical",
  className,
}: Props) {
  const isMobile = useMediaQuery(breakpoints.mobile);
  const reduce = useMediaQuery(breakpoints.reducedMotion);
  // Mobile: parallax intensité réduite de 50% (cf DESIGN.md §Mobile-Specific Rules).
  const effectiveSpeed = reduce ? 0 : isMobile ? speed * 0.5 : speed;

  const ref = useGSAP<HTMLDivElement>(
    (scope) => {
      if (effectiveSpeed === 0) return;

      const distance = 20 * effectiveSpeed;
      const prop = direction === "vertical" ? "yPercent" : "xPercent";

      gsap.fromTo(
        scope,
        { [prop]: -distance },
        {
          [prop]: distance,
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    [effectiveSpeed, direction],
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
