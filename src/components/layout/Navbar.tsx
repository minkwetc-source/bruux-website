"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { gsap } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/evenements", label: "Événements" },
  { href: "/blog", label: "Blog" },
  { href: "/galerie", label: "Galerie" },
  { href: "/famille", label: "La Famille" },
  { href: "/admin/dashboard", label: "Admin" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);

  // GSAP-driven background fade au scroll (>100px → #0A0A0A/95 + blur).
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const update = () => {
      const scrolled = window.scrollY > 100;
      gsap.to(bg, {
        opacity: scrolled ? 1 : 0,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Lock scroll quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Ferme le menu mobile au changement de route.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50">
        <div
          ref={bgRef}
          aria-hidden
          className="absolute inset-0 border-b border-border-subtle bg-bg-primary/95 opacity-0 backdrop-blur-[20px]"
        />
        <div className="container-bruux relative flex h-[72px] items-center justify-between">
          <Link
            href="/"
            className="font-heading text-[28px] leading-none tracking-[0.14em] text-white"
            aria-label="BRUUX — Accueil"
          >
            BRUUX.
          </Link>

          <ul className="hidden items-center gap-10 lg:flex">
            {LINKS.slice(0, -1).map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "font-body text-[13px] font-medium uppercase tracking-nav transition-colors duration-200",
                    isActive(l.href)
                      ? "text-white"
                      : "text-text-secondary hover:text-white",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="hidden bg-accent px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-button text-bg-primary transition-colors hover:bg-accent-hover lg:inline-flex"
          >
            Nous contacter
          </Link>

          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center text-white lg:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg-primary lg:hidden"
          >
            <div className="container-bruux flex min-h-screen flex-col justify-center pb-16 pt-24">
              <ul className="flex flex-col gap-6">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.08,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={l.href}
                      className={cn(
                        "font-heading text-5xl uppercase tracking-wide leading-none transition-colors",
                        isActive(l.href)
                          ? "text-accent"
                          : "text-white hover:text-accent",
                      )}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-12"
              >
                <Link
                  href="/contact"
                  className="inline-flex bg-accent px-8 py-[14px] font-body text-xs font-semibold uppercase tracking-button text-bg-primary"
                >
                  Nous contacter
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
