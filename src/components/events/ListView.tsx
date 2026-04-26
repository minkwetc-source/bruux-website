"use client";

import { motion } from "framer-motion";
import { Calendar as CalIcon, MapPin } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { EventRow, EventType } from "@/lib/supabase/types";

const TYPE_LABELS: Record<EventType, string> = {
  "night-class": "Night Class",
  "pool-party": "Pool Party",
  "soiree-speciale": "Soirée spéciale",
};

type Props = {
  events: EventRow[];
  onEventClick: (event: EventRow) => void;
};

/**
 * Vue liste alternative au calendrier — plus dense, plus scan-friendly.
 * Idéale pour mobile (CLAUDE.md §7 · 90% des users sont mobile).
 */
export function ListView({ events, onEventClick }: Props) {
  if (events.length === 0) {
    return (
      <div className="border border-border-subtle bg-bg-surface p-10 text-center">
        <p className="font-body text-sm text-text-secondary">
          Aucun événement à venir pour le moment.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col border-t border-border-subtle">
      {events.map((event, i) => {
        const date = new Date(event.date);
        const day = date.getDate();
        const month = date.toLocaleDateString("fr-FR", { month: "short" }).replace(".", "");
        const typeLabel = event.type ? TYPE_LABELS[event.type] : null;
        const isPast = event.status === "completed";

        return (
          <motion.li
            key={event.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              "group border-b border-border-subtle transition-colors hover:bg-bg-elevated",
              isPast && "opacity-60",
            )}
          >
            <button
              type="button"
              onClick={() => onEventClick(event)}
              className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 px-4 py-5 text-left md:grid-cols-[auto_1fr_auto_auto] md:gap-8 md:px-8 md:py-7"
            >
              {/* Date block */}
              <div className="flex min-w-[64px] flex-col items-center border border-accent-border bg-accent-subtle px-3 py-2 md:min-w-[80px] md:px-4 md:py-3">
                <span className="font-heading text-2xl uppercase leading-none tracking-wide text-accent md:text-3xl">
                  {String(day).padStart(2, "0")}
                </span>
                <span className="mt-1 font-ui text-[10px] uppercase tracking-label text-text-secondary">
                  {month}
                </span>
              </div>

              {/* Title + meta */}
              <div className="min-w-0">
                <h3 className="font-heading text-xl uppercase leading-tight tracking-wide text-white md:text-2xl">
                  {event.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {typeLabel && (
                    <span className="font-ui text-[10px] font-semibold uppercase tracking-label text-accent">
                      {typeLabel}
                    </span>
                  )}
                  {event.location && (
                    <span className="inline-flex items-center gap-1 font-ui text-[11px] text-text-secondary">
                      <MapPin size={11} /> {event.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Price (desktop) */}
              {event.price && (
                <span className="hidden font-heading text-lg uppercase tracking-wide text-accent md:inline md:text-xl">
                  {event.price}
                </span>
              )}

              {/* CTA arrow */}
              <span className="inline-flex h-10 w-10 items-center justify-center border border-border-medium text-text-secondary transition-all duration-300 group-hover:border-accent group-hover:text-accent">
                →
              </span>
            </button>
          </motion.li>
        );
      })}
    </ul>
  );
}
