"use client";

import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import type { PhotoCategory, PhotoRow } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

type Props = {
  photo: PhotoRow;
  index: number;
  onOpen: (photo: PhotoRow) => void;
};

const CATEGORY_LABELS: Record<PhotoCategory, string> = {
  sessions: "Session",
  evenements: "Événement",
  "brux-house": "Brux House",
  portraits: "Portrait",
};

const CATEGORY_GRADIENT: Record<PhotoCategory, string> = {
  sessions: "from-[#1f1f1f] via-[#141414] to-[#0a0a0a]",
  evenements: "from-[#221a1a] via-[#141414] to-[#0a0a0a]",
  "brux-house": "from-[#1a221a] via-[#141414] to-[#0a0a0a]",
  portraits: "from-[#1a1a22] via-[#141414] to-[#0a0a0a]",
};

const ASPECTS = ["aspect-[3/4]", "aspect-[4/5]", "aspect-square", "aspect-[3/4]"];

export function PhotoCard({ photo, index, onOpen }: Props) {
  const isPlaceholder = photo.image_url === "placeholder";
  const aspect = ASPECTS[index % ASPECTS.length];
  const gradient = photo.category
    ? CATEGORY_GRADIENT[photo.category]
    : CATEGORY_GRADIENT.sessions;
  const label = photo.category ? CATEGORY_LABELS[photo.category] : "Photo";

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(photo)}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      data-photo-card
      className={cn(
        "group relative block w-full overflow-hidden border border-border-subtle bg-bg-surface text-left",
        aspect,
      )}
      aria-label={`Ouvrir : ${photo.title ?? "Photo"}`}
    >
      {isPlaceholder ? (
        <>
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 bg-gradient-to-br transition-transform duration-700 ease-out group-hover:scale-105",
              gradient,
            )}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${30 + (index * 13) % 40}% ${20 + (index * 17) % 60}%, rgba(196,163,90,0.18), transparent 65%)`,
            }}
          />
        </>
      ) : (
        <img
          src={photo.image_url}
          alt={photo.title ?? "Photo BRUUX"}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110 img-bruux"
        />
      )}

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent opacity-90"
      />

      <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5">
        <span className="self-start border border-accent-border bg-accent-subtle px-2.5 py-1 font-ui text-[9px] font-semibold uppercase tracking-label text-accent backdrop-blur-sm">
          {label}
        </span>
        <div className="flex items-end justify-between gap-3">
          <p className="font-ui text-[11px] uppercase tracking-label text-text-primary line-clamp-2">
            {photo.title ?? "Sans titre"}
          </p>
          <span
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-border-medium bg-bg-primary/60 text-text-secondary opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:text-accent group-hover:border-accent"
          >
            <Expand size={14} />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
