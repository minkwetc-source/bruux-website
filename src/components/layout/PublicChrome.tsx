"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { CursorFollower } from "@/components/ui/CursorFollower";
import { WhatsAppFloat } from "@/components/animations/WhatsAppFloat";

/**
 * Enveloppe les pages publiques avec Lenis + Navbar + chrome BRUUX.
 * Sur /admin/*, on rend juste les enfants — le dashboard a son propre layout
 * (sidebar, pas de smooth scroll, pas de WhatsAppFloat).
 */
export function PublicChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <LoadingScreen />
      <CursorFollower />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-accent focus:px-4 focus:py-3 focus:font-ui focus:text-xs focus:font-semibold focus:uppercase focus:tracking-button focus:text-bg-primary"
      >
        Aller au contenu principal
      </a>
      <Navbar />
      <PageTransition>
        <div id="main-content">{children}</div>
      </PageTransition>
      <WhatsAppFloat />
    </SmoothScroll>
  );
}
