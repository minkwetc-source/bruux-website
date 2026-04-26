"use client";

import { useEffect, useState } from "react";

/**
 * Reactive media query hook. Returns `false` during SSR and on first client
 * render to avoid hydration mismatch, then syncs to the real value.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export const breakpoints = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px) and (max-width: 1024px)",
  desktop: "(min-width: 1025px)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;
