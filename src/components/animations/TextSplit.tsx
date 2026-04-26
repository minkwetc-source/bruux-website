"use client";

import { useGSAP, gsap } from "@/hooks/useGSAP";
import { useMediaQuery, breakpoints } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type Props = {
  children: string;
  type?: "letter" | "word";
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  /** Si true, joue l'animation dès le mount au lieu d'attendre le scroll. */
  immediate?: boolean;
};

/**
 * Révèle le texte lettre par lettre (ou mot par mot) avec un stagger GSAP.
 * Utilisé principalement sur les titres Bebas Neue.
 */
export function TextSplit({
  children,
  type = "letter",
  stagger = 0.03,
  duration = 0.9,
  delay = 0,
  start = "top 80%",
  as: Tag = "span",
  className,
  immediate = false,
}: Props) {
  const reduce = useMediaQuery(breakpoints.reducedMotion);

  const ref = useGSAP<HTMLElement>(
    (scope) => {
      if (reduce) return;

      const targets = scope.querySelectorAll<HTMLSpanElement>("[data-split]");
      if (!targets.length) return;

      gsap.from(targets, {
        yPercent: 110,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        ...(immediate
          ? {}
          : {
              scrollTrigger: {
                trigger: scope,
                start,
                toggleActions: "play none none none",
              },
            }),
      });
    },
    [type, stagger, duration, delay, start, immediate, reduce],
  );

  const chunks =
    type === "letter"
      ? [...children].map((c) => (c === " " ? " " : c))
      : children.split(/(\s+)/);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref as never}
      className={cn("inline-block", className)}
      aria-label={children}
    >
      {chunks.map((chunk, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden
        >
          <span data-split className="inline-block will-change-transform">
            {chunk === " " ? " " : chunk}
          </span>
        </span>
      ))}
    </Component>
  );
}
