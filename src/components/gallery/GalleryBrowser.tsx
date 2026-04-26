"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { PhotoCategory, PhotoRow } from "@/lib/supabase/types";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { PhotoCard } from "./PhotoCard";
import { Lightbox } from "./Lightbox";
import { cn } from "@/lib/utils";

type Filter = "all" | PhotoCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Toutes" },
  { id: "sessions", label: "Sessions" },
  { id: "evenements", label: "Événements" },
  { id: "brux-house", label: "Brux House" },
  { id: "portraits", label: "Portraits" },
];

type Props = {
  photos: PhotoRow[];
};

export function GalleryBrowser({ photos }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return photos;
    return photos.filter((p) => p.category === filter);
  }, [photos, filter]);

  const activePhoto = activeIndex !== null ? filtered[activeIndex] ?? null : null;

  const handleOpen = (photo: PhotoRow) => {
    const idx = filtered.findIndex((p) => p.id === photo.id);
    if (idx >= 0) setActiveIndex(idx);
  };

  const handleClose = () => setActiveIndex(null);

  const handlePrev = () => {
    if (activeIndex === null || filtered.length === 0) return;
    setActiveIndex((activeIndex - 1 + filtered.length) % filtered.length);
  };

  const handleNext = () => {
    if (activeIndex === null || filtered.length === 0) return;
    setActiveIndex((activeIndex + 1) % filtered.length);
  };

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2 md:mb-14 md:gap-3">
        {FILTERS.map((f) => {
          const active = f.id === filter;
          return (
            <motion.button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              whileTap={{ scale: 0.96 }}
              className={cn(
                "border px-4 py-2.5 font-ui text-[11px] font-semibold uppercase tracking-button transition-colors",
                active
                  ? "border-accent bg-accent text-bg-primary"
                  : "border-border-medium bg-transparent text-text-secondary hover:border-accent hover:text-accent",
              )}
              aria-pressed={active}
            >
              {f.label}
            </motion.button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-border-subtle bg-bg-surface px-8 py-20 text-center">
          <p className="font-heading text-xl uppercase tracking-wide text-text-primary md:text-2xl">
            Aucune photo dans cette catégorie.
          </p>
          <p className="mt-3 font-body text-sm text-text-secondary">
            Reviens bientôt — la galerie se remplit chaque semaine.
          </p>
        </div>
      ) : (
        <ScrollReveal
          key={filter}
          selector="[data-photo-card]"
          animation="fade-up"
          stagger={0.06}
          duration={0.8}
        >
          <div className="columns-1 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3 xl:columns-4">
            {filtered.map((photo, i) => (
              <div key={photo.id} className="mb-5 break-inside-avoid">
                <PhotoCard photo={photo} index={i} onOpen={handleOpen} />
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}

      <Lightbox
        photo={activePhoto}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}
