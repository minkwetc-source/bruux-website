"use client";

import { type ReactNode } from "react";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { useMediaQuery, breakpoints } from "@/hooks/useMediaQuery";

type Animation =
  | "fade-up"
  | "fade-in"
  | "slide-left"
  | "slide-right"
  | "scale-in";

type Props = {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  className?: string;
  /**
   * Si défini, applique l'animation à chaque enfant correspondant au selector
   * (ex: `"[data-reveal]"` ou `"> *"`). Sinon, l'élément entier est animé.
   */
  selector?: string;
};

const ANIMATIONS: Record<Animation, gsap.TweenVars> = {
  "fade-up": { y: 60, opacity: 0 },
  "fade-in": { opacity: 0 },
  "slide-left": { x: -80, opacity: 0 },
  "slide-right": { x: 80, opacity: 0 },
  "scale-in": { scale: 0.92, opacity: 0 },
};

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  stagger = 0.1,
  duration = 1,
  start = "top 80%",
  className,
  selector,
}: Props) {
  const reduce = useMediaQuery(breakpoints.reducedMotion);

  const ref = useGSAP<HTMLDivElement>(
    (scope) => {
      if (reduce) return;

      const from = ANIMATIONS[animation];
      const targets: Element[] = selector
        ? Array.from(scope.querySelectorAll(selector))
        : [scope];

      if (!targets.length) return;

      gsap.from(targets, {
        ...from,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope,
          start,
          toggleActions: "play none none none",
        },
      });
    },
    [animation, delay, stagger, duration, start, selector, reduce],
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
