"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Instagram, Send } from "lucide-react";
import { TikTokIcon, WhatsAppIcon } from "@/components/ui/icons";
import { whatsappLink } from "@/lib/utils";

const SOCIALS = [
  {
    href: "https://instagram.com/brux.evnt",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "https://tiktok.com/@brux.evnt",
    label: "TikTok",
    Icon: TikTokIcon,
  },
  {
    href: whatsappLink("24165467224"),
    label: "WhatsApp",
    Icon: WhatsAppIcon,
  },
];

const NAV_COLS = [
  {
    title: "Univers",
    links: [
      { href: "/evenements", label: "BRUX Event" },
      { href: "/blog", label: "BRUX House" },
      { href: "/galerie", label: "Division Artistique" },
    ],
  },
  {
    title: "Navigation",
    links: [
      { href: "/famille", label: "#BRUXFAMILLY" },
      { href: "/contact", label: "Contact" },
      { href: "/evenements", label: "Calendrier" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-surface">
      <div className="container-bruux py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
          <div>
            <Link
              href="/"
              className="font-heading text-5xl leading-none tracking-[0.1em] text-white md:text-6xl"
            >
              BRUUX.
            </Link>
            <p className="mt-4 max-w-xs font-body text-sm text-text-secondary">
              Entertainment company gabonaise. Libreville, Gabon.
            </p>
          </div>

          {NAV_COLS.map((col) => (
            <div key={col.title}>
              <p className="label-muted">{col.title}</p>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={`${col.title}-${l.href}-${l.label}`}>
                    <Link
                      href={l.href}
                      className="font-body text-sm text-text-primary transition-colors duration-200 hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-border-subtle pt-12 md:grid-cols-2 md:items-center">
          <Newsletter />

          <div className="flex items-center gap-6 md:justify-end">
            {SOCIALS.map(({ href, label, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-text-secondary"
                whileHover={{ scale: 1.18, color: "#C4A35A" }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border-subtle pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-xs text-text-tertiary">
            © 2026 BRUUX. Tous droits réservés.
          </p>
          <p className="font-ui text-[11px] uppercase tracking-label text-text-tertiary">
            Libreville · Gabon
          </p>
        </div>
      </div>
    </footer>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    // TODO: brancher sur supabase.from("subscribers").insert({ email })
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <p className="label-muted mb-3">Newsletter</p>
      <p className="mb-4 font-body text-sm text-text-secondary">
        Reste informé des prochains événements.
      </p>
      <div className="flex items-stretch border border-border-medium transition-colors focus-within:border-accent">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ton@email.com"
          className="min-w-0 flex-1 bg-transparent px-4 py-3 font-body text-sm text-white placeholder:text-text-tertiary focus:outline-none"
          aria-label="Adresse email"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 bg-accent px-5 py-3 font-body text-xs font-semibold uppercase tracking-button text-bg-primary transition-colors duration-200 hover:bg-accent-hover disabled:opacity-60"
        >
          {status === "success" ? "Merci" : status === "loading" ? "..." : "S’inscrire"}
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </form>
  );
}
