"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import {
  AdminInput,
  AdminSelect,
  AdminTextarea,
  FieldLabel,
  SubmitButton,
} from "../ui";
import {
  createEvent,
  updateEvent,
  type EventActionState,
} from "./actions";
import type { EventRow } from "@/lib/supabase/types";

const initialState: EventActionState = { ok: false, error: null };

type Props = {
  event?: EventRow;
  onSuccess: () => void;
};

function toDateTimeLocal(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function EventForm({ event, onSuccess }: Props) {
  const isEdit = Boolean(event);
  const [state, action] = useFormState(
    isEdit ? updateEvent : createEvent,
    initialState,
  );

  useEffect(() => {
    if (state.ok) onSuccess();
  }, [state.ok, onSuccess]);

  return (
    <form action={action} className="space-y-5">
      {event && <input type="hidden" name="id" value={event.id} />}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor="title" required>
            Titre
          </FieldLabel>
          <AdminInput
            id="title"
            name="title"
            type="text"
            required
            defaultValue={event?.title ?? ""}
            placeholder="Night Class #5"
          />
        </div>
        <div>
          <FieldLabel htmlFor="slug">Slug</FieldLabel>
          <AdminInput
            id="slug"
            name="slug"
            type="text"
            defaultValue={event?.slug ?? ""}
            placeholder="auto si vide"
          />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="description">Description</FieldLabel>
        <AdminTextarea
          id="description"
          name="description"
          rows={3}
          defaultValue={event?.description ?? ""}
          placeholder="Le pitch de la soirée…"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor="date" required>
            Date & heure
          </FieldLabel>
          <AdminInput
            id="date"
            name="date"
            type="datetime-local"
            required
            defaultValue={toDateTimeLocal(event?.date ?? null)}
          />
        </div>
        <div>
          <FieldLabel htmlFor="end_date">Fin (optionnel)</FieldLabel>
          <AdminInput
            id="end_date"
            name="end_date"
            type="datetime-local"
            defaultValue={toDateTimeLocal(event?.end_date ?? null)}
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor="location">Lieu</FieldLabel>
          <AdminInput
            id="location"
            name="location"
            type="text"
            defaultValue={event?.location ?? ""}
            placeholder="Villa Etami, Libreville"
          />
        </div>
        <div>
          <FieldLabel htmlFor="price">Prix</FieldLabel>
          <AdminInput
            id="price"
            name="price"
            type="text"
            defaultValue={event?.price ?? ""}
            placeholder="15 000 FCFA"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor="type">Type</FieldLabel>
          <AdminSelect id="type" name="type" defaultValue={event?.type ?? ""}>
            <option value="">— aucun —</option>
            <option value="night-class">Night Class</option>
            <option value="pool-party">Pool Party</option>
            <option value="soiree-speciale">Soirée spéciale</option>
          </AdminSelect>
        </div>
        <div>
          <FieldLabel htmlFor="status">Statut</FieldLabel>
          <AdminSelect
            id="status"
            name="status"
            defaultValue={event?.status ?? "upcoming"}
          >
            <option value="upcoming">À venir</option>
            <option value="sold-out">Sold-out</option>
            <option value="completed">Terminé</option>
          </AdminSelect>
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="image_url">Image (URL Cloudinary)</FieldLabel>
        <AdminInput
          id="image_url"
          name="image_url"
          type="url"
          defaultValue={event?.image_url ?? ""}
          placeholder="https://res.cloudinary.com/…"
        />
      </div>

      <div>
        <FieldLabel htmlFor="whatsapp_link">Lien WhatsApp</FieldLabel>
        <AdminInput
          id="whatsapp_link"
          name="whatsapp_link"
          type="url"
          defaultValue={event?.whatsapp_link ?? ""}
          placeholder="https://wa.me/241…"
        />
      </div>

      {state.error && (
        <div className="border border-red-900/50 bg-red-950/30 px-4 py-3 font-body text-sm text-red-300">
          {state.error}
        </div>
      )}

      <div className="flex justify-end gap-3 border-t border-border-subtle pt-5">
        <SubmitButton>{isEdit ? "Mettre à jour" : "Créer l'événement"}</SubmitButton>
      </div>
    </form>
  );
}
