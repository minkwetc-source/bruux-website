"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  slug: string;
};

export function ShareButtons({ title, slug }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/blog/${slug}`
        : `/blog/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Pas de clipboard (ex: contexte non-sécurisé) — fallback silencieux.
    }
  };

  const shareText = encodeURIComponent(
    `${title} · via BRUUX → ${typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : `/blog/${slug}`}`,
  );
  const whatsappHref = `https://wa.me/?text=${shareText}`;

  return (
    <div className="flex flex-col items-start gap-4 border-y border-border-subtle py-8 md:flex-row md:items-center md:justify-between">
      <p className="label-muted">Partager</p>
      <div className="flex flex-wrap items-center gap-3">
        <motion.a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Partager sur WhatsApp"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-flex items-center gap-2 border border-border-medium bg-bg-surface px-4 py-2.5 font-ui text-[11px] font-semibold uppercase tracking-button text-text-primary transition-colors hover:border-[#25D366] hover:text-[#25D366]"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </motion.a>

        <motion.button
          type="button"
          onClick={handleCopy}
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(
            "inline-flex items-center gap-2 border px-4 py-2.5 font-ui text-[11px] font-semibold uppercase tracking-button transition-colors",
            copied
              ? "border-accent bg-accent-subtle text-accent"
              : "border-border-medium bg-bg-surface text-text-primary hover:border-accent hover:text-accent",
          )}
          aria-live="polite"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copié" : "Copier le lien"}
        </motion.button>
      </div>
    </div>
  );
}
