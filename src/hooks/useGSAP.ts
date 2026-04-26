"use client";

import { useEffect, useRef, type DependencyList, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type GsapCallback = (scope: HTMLElement) => void;

/**
 * Scoped GSAP hook — animations are scoped to `scopeRef` and automatically
 * reverted on unmount or when dependencies change. Prevents memory leaks
 * that would otherwise crash mobile browsers.
 *
 * NOTE: le callback reçoit uniquement l'élément scope, pas le contexte GSAP,
 * pour éviter une TDZ (gsap.context invoque le callback synchronement pendant
 * l'évaluation de la RHS de `const ctx = gsap.context(...)`).
 */
export function useGSAP<T extends HTMLElement = HTMLDivElement>(
  callback: GsapCallback,
  dependencies: DependencyList = [],
): RefObject<T> {
  const scopeRef = useRef<T>(null);

  useEffect(() => {
    const element = scopeRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      callback(element);
    }, element);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return scopeRef;
}

export { gsap, ScrollTrigger };
