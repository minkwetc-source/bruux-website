"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar as CalIcon, Clock, MapPin } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { EventRow, EventType } from "@/lib/supabase/types";

type Variant = "featured" | "past";

type Props = {
  event: EventRow;
  variant?: Variant;
  onClick?: () => void;
  className?: string;
};

const TYPE_LABELS: Record<EventType, string> = {
  "night-class": "Night Class",
  "pool-party": "Pool Party",
  "soiree-speciale": "Soirée spéciale",
};

const TYPE_ACCENTS: Record<EventType, string> = {
  "night-class": "from-[#1f1f1f] via-[#141414] to-[#0a0a0a]",
  "pool-party": "from-[#1a1a22] via-[#141414] to-[#0a0a0a]",
  "soiree-speciale": "from-[#221a1a] via-[#1a1414] to-[#0a0a0a]",
};

function formatTime(date: Date) {
  return date
    .toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    .replace(":", "h");
}

export function EventCard({
  event,
  variant = "featured",
  onClick,
  className,
}: Props) {
  const date = new Date(event.date);
  const dateStr = formatDate(date);
  const timeStr = formatTime(date);
  const typeLabel = event.type ? TYPE_LABELS[event.type] : null;
  const accent = event.type ? TYPE_ACCENTS[event.type] : TYPE_ACCENTS["night-class"];

  if (variant === "featured") {
    return (
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className={cn(
          "group relative flex flex-col overflow-hidden border border-border-subtle bg-bg-surface transition-colors hover:border-accent-border",
          className,
        )}
      >
        <div className={cn("relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br", accent)}>
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,rgba(196,163,90,0.22),transparent_65%)] transition-opacity duration-500 group-hover:opacity-70"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg-surface via-bg-surface/40 to-transparent"
          />
          {typeLabel && (
            <span className="absolute left-5 top-5 border border-accent-border bg-bg-primary/50 backdrop-blur-sm px-3 py-1 font-ui text-[10px] font-semibold uppercase tracking-label text-accent">
              {typeLabel}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
          <p className="label-gold">{dateStr}</p>
          <h3 className="font-heading text-2xl uppercase leading-[0.95] tracking-wide text-white md:text-3xl lg:text-4xl">
            {event.title}
          </h3>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-2 font-ui text-xs text-text-secondary">
              <Clock size={14} className="text-accent" /> {timeStr}
            </span>
            {event.location && (
              <span className="inline-flex items-center gap-2 font-ui text-xs text-text-secondary">
                <MapPin size={14} className="text-accent" /> {event.location}
              </span>
            )}
          </div>

          {event.description && (
            <p className="font-body text-sm leading-relaxed text-text-secondary line-clamp-2">
              {event.description}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between gap-4 pt-2">
            {event.price && (
              <span className="font-heading text-lg uppercase tracking-wide text-accent md:text-xl">
                {event.price}
              </span>
            )}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClick}
                className="inline-flex items-center font-ui text-[11px] font-semibold uppercase tracking-button text-text-secondary transition-colors hover:text-accent"
              >
                Détails
              </button>
              {event.whatsapp_link && event.status !== "completed" && (
                <Link
                  href={event.whatsapp_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent px-5 py-3 font-body text-[11px] font-semibold uppercase tracking-button text-bg-primary transition-colors hover:bg-accent-hover"
                >
                  Réserver
                  <ArrowUpRight size={14} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Past variant
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onClick={onClick}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden border border-border-subtle bg-bg-surface transition-colors hover:border-border-medium",
        className,
      )}
    >
      <div className={cn("relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br", accent)}>
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(196,163,90,0.1),transparent_65%)]"
        />
        <span className="absolute right-3 top-3 border border-border-medium bg-bg-primary/60 px-3 py-1 font-ui text-[10px] font-semibold uppercase tracking-label text-text-secondary backdrop-blur-sm">
          Terminé
        </span>
        {typeLabel && (
          <span className="absolute bottom-3 left-3 font-ui text-[10px] font-semibold uppercase tracking-label text-text-tertiary">
            {typeLabel}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="font-ui text-[11px] uppercase tracking-label text-text-tertiary">
          {dateStr}
        </p>
        <h3 className="font-heading text-lg uppercase leading-tight tracking-wide text-white md:text-xl">
          {event.title}
        </h3>
        {event.location && (
          <p className="font-ui text-[11px] text-text-tertiary">
            {event.location}
          </p>
        )}
      </div>
    </motion.article>
  );
}
