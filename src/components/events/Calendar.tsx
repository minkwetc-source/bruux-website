"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils";
import type { EventRow } from "@/lib/supabase/types";

const MONTHS_FR = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

// Semaine commence le lundi (usage FR).
const DAYS_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

type Props = {
  events: EventRow[];
  onEventClick: (event: EventRow) => void;
};

export function Calendar({ events, onEventClick }: Props) {
  const [{ year, month }, setCurrent] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  // Événements indexés par jour du mois courant.
  const eventsByDay = useMemo(() => {
    const map = new Map<number, EventRow[]>();
    for (const e of events) {
      const d = new Date(e.date);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        const list = map.get(day);
        if (list) list.push(e);
        else map.set(day, [e]);
      }
    }
    return map;
  }, [events, year, month]);

  // Cellules du mois (avec blancs pour aligner sur lundi).
  const cells = useMemo(() => {
    const first = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // getDay: 0 (Dim) - 6 (Sam). Convertir en Lundi-first (0=Lun, 6=Dim).
    const leadBlanks = (first.getDay() + 6) % 7;
    const arr: Array<number | null> = [];
    for (let i = 0; i < leadBlanks; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [year, month]);

  // Animation GSAP cell-by-cell au changement de mois.
  const gridRef = useGSAP<HTMLDivElement>(
    (scope) => {
      const targets = scope.querySelectorAll("[data-cell]");
      if (!targets.length) return;
      gsap.from(targets, {
        opacity: 0,
        scale: 0.85,
        y: 14,
        duration: 0.4,
        stagger: { amount: 0.5, from: "start" },
        ease: "power3.out",
      });
    },
    [year, month],
  );

  const prev = () =>
    setCurrent(({ year, month }) =>
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 },
    );
  const next = () =>
    setCurrent(({ year, month }) =>
      month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 },
    );

  const isCurrentMonth = (() => {
    const now = new Date();
    return now.getFullYear() === year && now.getMonth() === month;
  })();
  const today = new Date().getDate();

  return (
    <div className="border border-border-subtle bg-bg-surface p-5 md:p-10">
      <div className="flex items-center justify-between border-b border-border-subtle pb-5 md:pb-6">
        <button
          type="button"
          onClick={prev}
          aria-label="Mois précédent"
          className="inline-flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-accent"
        >
          <ChevronLeft size={22} />
        </button>
        <h3 className="font-heading text-2xl uppercase tracking-wide text-white md:text-3xl">
          {MONTHS_FR[month]} {year}
        </h3>
        <button
          type="button"
          onClick={next}
          aria-label="Mois suivant"
          className="inline-flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-accent"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-1.5 md:gap-2">
        {DAYS_FR.map((d) => (
          <div
            key={d}
            className="text-center font-ui text-[10px] font-semibold uppercase tracking-label text-text-tertiary"
          >
            {d}
          </div>
        ))}
      </div>

      <div ref={gridRef} className="mt-3 grid grid-cols-7 gap-1.5 md:gap-2">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={i} data-cell className="aspect-square" />;
          }
          const dayEvents = eventsByDay.get(day) ?? [];
          const hasEvent = dayEvents.length > 0;
          const isToday = isCurrentMonth && day === today;

          return (
            <button
              key={i}
              data-cell
              type="button"
              onClick={() => hasEvent && dayEvents[0] && onEventClick(dayEvents[0])}
              disabled={!hasEvent}
              aria-label={
                hasEvent
                  ? `${day} ${MONTHS_FR[month]} — ${dayEvents[0]?.title}`
                  : `${day} ${MONTHS_FR[month]}`
              }
              className={cn(
                "relative flex aspect-square flex-col items-center justify-center border transition-all duration-200",
                hasEvent
                  ? "cursor-pointer border-accent-border bg-accent-subtle text-white hover:bg-accent/25"
                  : "cursor-default border-border-subtle text-text-tertiary",
                isToday && "ring-1 ring-accent/50",
              )}
            >
              <span
                className={cn(
                  "font-ui text-sm font-medium md:text-base",
                  isToday && "text-accent",
                )}
              >
                {day}
              </span>
              {hasEvent && (
                <span className="absolute bottom-1.5 flex gap-0.5">
                  {dayEvents.slice(0, 3).map((e) => (
                    <span
                      key={e.id}
                      className="h-1 w-1 rounded-full bg-accent md:h-1.5 md:w-1.5"
                      aria-hidden
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
