"use client";

import { AlertTriangle, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type UploadItem = {
  id: string;
  name: string;
  previewUrl: string;
  status: "uploading" | "done" | "error";
  progress: number;
  url?: string;
  error?: string;
};

type Props = {
  item: UploadItem;
  shape: "square" | "circle";
  onRemove: (id: string) => void;
};

export function ImageThumbnail({ item, shape, onRemove }: Props) {
  const rounded = shape === "circle" ? "rounded-full" : "";

  return (
    <div
      className={cn(
        "group relative aspect-square overflow-hidden border border-border-subtle bg-bg-elevated",
        rounded,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.url ?? item.previewUrl}
        alt={item.name}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity",
          item.status === "uploading" && "opacity-50",
        )}
      />

      {item.status === "uploading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-end bg-bg-primary/30 p-2">
          <div className="mb-1 font-ui text-[10px] font-semibold uppercase tracking-label text-text-primary">
            {item.progress}%
          </div>
          <div className="h-1 w-full overflow-hidden bg-bg-primary/60">
            <div
              className="h-full bg-accent transition-[width] duration-200 ease-out"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      )}

      {item.status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-red-950/70 p-2 text-center">
          <AlertTriangle size={16} className="text-red-300" />
          <span className="font-body text-[10px] leading-tight text-red-200">
            {item.error ?? "Échec"}
          </span>
        </div>
      )}

      {item.status === "done" && (
        <div className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-bg-primary opacity-0 transition-opacity group-hover:opacity-100">
          <Check size={12} strokeWidth={3} />
        </div>
      )}

      <button
        type="button"
        onClick={() => onRemove(item.id)}
        aria-label={`Retirer ${item.name}`}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center border border-border-medium bg-bg-primary/80 text-text-primary backdrop-blur-sm transition-colors hover:border-red-500 hover:text-red-300"
      >
        <X size={14} />
      </button>
    </div>
  );
}
