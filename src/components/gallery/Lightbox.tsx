"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PhotoRow } from "@/lib/supabase/types";
import { formatDate } from "@/lib/utils";

type Props = {
  photo: PhotoRow | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({ photo, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    if (!photo) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [photo, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary/95 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal
          aria-label={photo.title ?? "Photo en grand"}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center border border-border-medium bg-bg-surface/80 text-text-primary backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-border-medium bg-bg-surface/80 text-text-primary backdrop-blur-sm transition-colors hover:border-accent hover:text-accent md:flex"
            aria-label="Photo précédente"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-border-medium bg-bg-surface/80 text-text-primary backdrop-blur-sm transition-colors hover:border-accent hover:text-accent md:flex"
            aria-label="Photo suivante"
          >
            <ChevronRight size={22} />
          </button>

          <motion.div
            key={photo.id}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col px-4"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-border-subtle bg-bg-surface md:aspect-[3/2]">
              {photo.image_url === "placeholder" ? (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-br from-[#1f1f1f] via-[#141414] to-[#0a0a0a]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(196,163,90,0.18), transparent 65%)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-4xl uppercase tracking-wider text-text-tertiary md:text-6xl">
                      BRUUX.
                    </span>
                  </div>
                </>
              ) : (
                <img
                  src={photo.image_url}
                  alt={photo.title ?? "Photo BRUUX"}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4">
              <div>
                <p className="font-heading text-lg uppercase tracking-wide text-text-primary md:text-xl">
                  {photo.title ?? "Sans titre"}
                </p>
                {photo.session_name && (
                  <p className="mt-1 font-ui text-[10px] uppercase tracking-label text-accent">
                    {photo.session_name}
                  </p>
                )}
              </div>
              {photo.session_date && (
                <p className="font-ui text-[11px] uppercase tracking-label text-text-secondary">
                  {formatDate(photo.session_date)}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
