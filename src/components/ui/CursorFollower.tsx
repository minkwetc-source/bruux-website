"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery, breakpoints } from "@/hooks/useMediaQuery";

type Variant = "default" | "hover";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-magnetic]';

/**
 * Custom cursor — desktop only. S'agrandit et devient or sur les éléments
 * interactifs. Respecte `prefers-reduced-motion`.
 */
export function CursorFollower() {
  const isDesktop = useMediaQuery(breakpoints.desktop);
  const prefersReducedMotion = useMediaQuery(breakpoints.reducedMotion);
  const [variant, setVariant] = useState<Variant>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 400, damping: 30, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 400, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) {
        setVariant("hover");
      } else {
        setVariant("default");
      }
    };

    document.body.classList.add("cursor-none");
    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
    };
  }, [isDesktop, prefersReducedMotion, x, y]);

  if (!isDesktop || prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: variant === "hover" ? 56 : 14,
        height: variant === "hover" ? 56 : 14,
        backgroundColor: variant === "hover" ? "#C4A35A" : "#FFFFFF",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    />
  );
}
