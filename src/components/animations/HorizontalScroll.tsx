"use client";

import { type ReactNode } from "react";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { useMediaQuery, breakpoints } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  /** Vitesse de scroll horizontal. 1 = distance naturelle. 1.5 = plus lent. */
  scrubSpeed?: number;
};

/**
 * Pin la section et scroll le track horizontalement pendant le scroll vertical.
 * Le track interne doit contenir des enfants en `inline-flex` pour s'aligner
 * horizontalement.
 *
 * Mobile (<768px) ou prefers-reduced-motion: fallback en swipe horizontal natif
 * (overflow-x: auto) — pas de pin GSAP, pas de scrub. Performances + UX touch.
 */
export function HorizontalScroll({
  children,
  className,
  trackClassName,
  scrubSpeed = 1,
}: Props) {
  const isMobile = useMediaQuery(breakpoints.mobile);
  const reduce = useMediaQuery(breakpoints.reducedMotion);
  const useFallback = isMobile || reduce;

  const ref = useGSAP<HTMLDivElement>(
    (scope) => {
      if (useFallback) return;

      const track = scope.querySelector<HTMLElement>("[data-hs-track]");
      if (!track) return;

      const getDistance = () => track.scrollWidth - scope.clientWidth;
      const initialDistance = getDistance();
      if (initialDistance <= 0) return;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: () => `+=${getDistance() * scrubSpeed}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    [scrubSpeed, useFallback],
  );

  if (useFallback) {
    return (
      <div
        ref={ref}
        className={cn(
          "scrollbar-hide overflow-x-auto overflow-y-hidden",
          className,
        )}
      >
        <div
          className={cn("flex w-max snap-x snap-mandatory", trackClassName)}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div
        data-hs-track
        className={cn("flex will-change-transform", trackClassName)}
      >
        {children}
      </div>
    </div>
  );
}
