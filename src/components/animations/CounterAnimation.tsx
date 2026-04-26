"use client";

import { useState } from "react";
import { useGSAP, gsap } from "@/hooks/useGSAP";

type Props = {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  className?: string;
};

/**
 * Compteur animé `from → to` déclenché au scroll. Formate en locale `fr-FR`
 * par défaut (espace insécable comme séparateur de milliers).
 */
export function CounterAnimation({
  from = 0,
  to,
  duration = 2,
  prefix = "",
  suffix = "",
  locale = "fr-FR",
  className,
}: Props) {
  const [value, setValue] = useState(from);

  const ref = useGSAP<HTMLSpanElement>(
    (scope) => {
      const obj = { val: from };

      gsap.to(obj, {
        val: to,
        duration,
        ease: "power2.out",
        onUpdate: () => setValue(Math.round(obj.val)),
        scrollTrigger: {
          trigger: scope,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    [from, to, duration],
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString(locale)}
      {suffix}
    </span>
  );
}
