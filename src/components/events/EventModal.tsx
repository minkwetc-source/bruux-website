"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar as CalIcon, Clock, MapPin, X, ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { EventRow, EventType } from "@/lib/supabase/types";

const TYPE_LABELS: Record<EventType, string> = {
  "night-class": "Night Class",
  "pool-party": "Pool Party",
  "soiree-speciale": "Soirée spéciale",
};

type Props = {
  event: EventRow | null;
  onClose: () => void;
};

export function EventModal({ event, onClose }: Props) {
  useEffect(() => {
    if (!event) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [event, onClose]);

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/80 px-4 py-8 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden border border-border-medium bg-bg-surface"
          >
            <ModalBody event={event} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalBody({ event, onClose }: { event: EventRow; onClose: () => void }) {
  const date = new Date(event.date);
  const dateStr = formatDate(date);
  const timeStr = date
    .toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    .replace(":", "h");
  const typeLabel = event.type ? TYPE_LABELS[event.type] : null;
  const isPast = event.status === "completed";

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-white"
      >
        <X size={22} />
      </button>

      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-[#1f1f1f] via-[#141414] to-[#0a0a0a]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(196,163,90,0.24),transparent_65%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg-surface to-transparent"
        />
        {typeLabel && (
          <span className="absolute left-5 top-5 border border-accent-border bg-bg-primary/60 px-3 py-1 font-ui text-[10px] font-semibold uppercase tracking-label text-accent backdrop-blur-sm">
            {typeLabel}
          </span>
        )}
      </div>

      <div className="p-6 md:p-8">
        <p className="label-gold">{dateStr}</p>
        <h3
          id="event-modal-title"
          className="mt-3 font-heading text-3xl uppercase leading-[0.95] tracking-wide text-white md:text-4xl"
        >
          {event.title}
        </h3>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
          <span className="inline-flex items-center gap-2 font-ui text-sm text-text-secondary">
            <CalIcon size={16} className="text-accent" /> {dateStr}
          </span>
          <span className="inline-flex items-center gap-2 font-ui text-sm text-text-secondary">
            <Clock size={16} className="text-accent" /> {timeStr}
          </span>
          {event.location && (
            <span className="inline-flex items-center gap-2 font-ui text-sm text-text-secondary">
              <MapPin size={16} className="text-accent" /> {event.location}
            </span>
          )}
        </div>

        {event.description && (
          <p className="mt-6 font-body text-[15px] leading-relaxed text-text-secondary">
            {event.description}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-6">
          {event.price && (
            <div>
              <p className="label-muted">Participation</p>
              <p className="mt-1 font-heading text-2xl uppercase tracking-wide text-accent">
                {event.price}
              </p>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Link
              href={`/evenements/${event.slug}`}
              onClick={onClose}
              className="inline-flex items-center font-ui text-[11px] font-semibold uppercase tracking-button text-text-secondary transition-colors hover:text-accent"
            >
              Voir la page
            </Link>
            {!isPast && event.whatsapp_link && (
              <Link
                href={event.whatsapp_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent px-6 py-3 font-body text-xs font-semibold uppercase tracking-button text-bg-primary transition-colors hover:bg-accent-hover"
              >
                Réserver sur WhatsApp
                <ArrowUpRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
