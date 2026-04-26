"use client";

import { useState } from "react";
import { Calendar as CalIcon, List } from "lucide-react";
import { motion } from "framer-motion";
import { Calendar } from "./Calendar";
import { ListView } from "./ListView";
import { EventModal } from "./EventModal";
import { cn } from "@/lib/utils";
import type { EventRow } from "@/lib/supabase/types";

type View = "calendar" | "list";

type Props = {
  events: EventRow[];
};

/**
 * Orchestrateur — gère le toggle vue (calendrier/liste), l'état du modal,
 * et passe les événements aux sous-composants.
 */
export function EventsBrowser({ events }: Props) {
  const [view, setView] = useState<View>("calendar");
  const [selectedEvent, setSelectedEvent] = useState<EventRow | null>(null);

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4 md:mb-10">
        <div>
          <p className="label-gold">Calendrier</p>
          <h2 className="mt-2 font-heading text-3xl uppercase tracking-wide text-white md:text-4xl">
            Explorer par date
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Choix de la vue"
          className="inline-flex border border-border-medium bg-bg-surface"
        >
          <ViewButton
            active={view === "calendar"}
            onClick={() => setView("calendar")}
            icon={<CalIcon size={14} />}
            label="Calendrier"
          />
          <ViewButton
            active={view === "list"}
            onClick={() => setView("list")}
            icon={<List size={14} />}
            label="Liste"
          />
        </div>
      </div>

      <motion.div
        key={view}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {view === "calendar" ? (
          <Calendar events={events} onEventClick={setSelectedEvent} />
        ) : (
          <ListView events={events} onEventClick={setSelectedEvent} />
        )}
      </motion.div>

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}

function ViewButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2.5 font-ui text-[11px] font-semibold uppercase tracking-button transition-colors",
        active
          ? "bg-accent text-bg-primary"
          : "bg-transparent text-text-secondary hover:text-white",
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
