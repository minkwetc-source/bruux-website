"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { PhotoCategory, PhotoRow } from "@/lib/supabase/types";
import { formatDate } from "@/lib/utils";
import { Modal } from "../Modal";
import { AdminButton } from "../ui";
import { PhotoForm } from "./PhotoForm";
import { deletePhoto } from "./actions";

const CATEGORY_LABELS: Record<PhotoCategory, string> = {
  sessions: "Sessions",
  evenements: "Événements",
  "brux-house": "Brux House",
  portraits: "Portraits",
};

type Props = {
  photos: PhotoRow[];
};

export function GalleryManager({ photos }: Props) {
  const [open, setOpen] = useState(false);

  const handleDelete = (
    e: React.FormEvent<HTMLFormElement>,
    title: string,
  ) => {
    if (!window.confirm(`Supprimer la photo « ${title} » ?`)) e.preventDefault();
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="font-ui text-[11px] font-semibold uppercase tracking-label text-text-secondary">
          {photos.length} photo{photos.length > 1 ? "s" : ""}
        </p>
        <AdminButton onClick={() => setOpen(true)}>
          <Plus size={14} />
          Nouvelle photo
        </AdminButton>
      </div>

      {photos.length === 0 ? (
        <div className="border border-border-subtle bg-bg-surface px-8 py-16 text-center">
          <p className="font-heading text-xl uppercase tracking-wide text-text-primary">
            Aucune photo.
          </p>
          <p className="mt-2 font-body text-sm text-text-secondary">
            Ajoute la première — elle apparaîtra immédiatement sur /galerie.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {photos.map((p) => (
            <PhotoCell key={p.id} photo={p} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Nouvelle photo"
        size="lg"
      >
        <PhotoForm onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}

function PhotoCell({
  photo,
  onDelete,
}: {
  photo: PhotoRow;
  onDelete: (e: React.FormEvent<HTMLFormElement>, title: string) => void;
}) {
  const isPlaceholder = photo.image_url === "placeholder";
  return (
    <div className="group relative aspect-[3/4] overflow-hidden border border-border-subtle bg-bg-surface">
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
              background:
                "radial-gradient(circle at 50% 40%, rgba(196,163,90,0.18), transparent 65%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading text-2xl uppercase tracking-wider text-text-tertiary">
              BRUUX
            </span>
          </div>
        </>
      ) : (
        <img
          src={photo.image_url}
          alt={photo.title ?? "Photo"}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-3">
        {photo.category && (
          <span className="inline-flex border border-accent-border bg-accent-subtle px-2 py-0.5 font-ui text-[9px] font-semibold uppercase tracking-label text-accent backdrop-blur-sm">
            {CATEGORY_LABELS[photo.category]}
          </span>
        )}
        <p className="mt-1.5 font-ui text-[11px] uppercase tracking-label text-text-primary line-clamp-2">
          {photo.title ?? "Sans titre"}
        </p>
        {photo.session_date && (
          <p className="mt-0.5 font-body text-[10px] text-text-tertiary">
            {formatDate(photo.session_date)}
          </p>
        )}
      </div>

      <form
        action={deletePhoto}
        onSubmit={(e) => onDelete(e, photo.title ?? "cette photo")}
        className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <input type="hidden" name="id" value={photo.id} />
        <button
          type="submit"
          aria-label="Supprimer"
          className="flex h-8 w-8 items-center justify-center border border-red-900/60 bg-red-950/60 text-red-300 backdrop-blur-sm transition-colors hover:border-red-500 hover:text-red-100"
        >
          <Trash2 size={13} />
        </button>
      </form>
    </div>
  );
}
