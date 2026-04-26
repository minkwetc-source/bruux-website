"use client";

import type { PhotoRow } from "@/lib/supabase/types";
import { HorizontalScroll } from "@/components/animations/HorizontalScroll";
import { formatDate } from "@/lib/utils";

const FRAME_COLORS = ["#8B6914", "#1a3a2a", "#4a5568"];

type Props = {
  photos: PhotoRow[];
};

export function BruxsessionpickStrip({ photos }: Props) {
  if (photos.length === 0) return null;

  return (
    <HorizontalScroll trackClassName="gap-8 pl-6 pr-[20vw] md:pl-20 md:pr-[15vw]">
      {photos.map((photo, i) => {
        const frameColor = FRAME_COLORS[i % FRAME_COLORS.length];
        const isPlaceholder = photo.image_url === "placeholder";
        return (
          <div
            key={photo.id}
            className="relative h-[460px] w-[320px] shrink-0 bg-bg-surface md:h-[600px] md:w-[420px]"
            style={{
              border: `8px solid ${frameColor}`,
            }}
          >
            {isPlaceholder ? (
              <>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-br from-[#1f1f1f] via-[#141414] to-[#0a0a0a]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, rgba(196,163,90,0.16), transparent 65%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-3xl uppercase tracking-[0.3em] text-text-tertiary md:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </>
            ) : (
              <img
                src={photo.image_url}
                alt={photo.title ?? "Brux session pick"}
                className="absolute inset-0 h-full w-full object-cover img-bruux"
                loading="lazy"
              />
            )}

            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-6">
              <div>
                <p className="font-ui text-[10px] uppercase tracking-label text-accent md:text-[11px]">
                  bruxsessionpick
                </p>
                <p className="mt-1 font-heading text-base uppercase tracking-wide text-text-primary md:text-lg">
                  {photo.title?.replace(/^bruxsessionpick · /i, "") ?? "—"}
                </p>
              </div>
              {photo.session_date && (
                <span className="font-ui text-[10px] uppercase tracking-label text-text-secondary">
                  {formatDate(photo.session_date)}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </HorizontalScroll>
  );
}
