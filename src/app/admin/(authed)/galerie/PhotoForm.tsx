"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import {
  AdminInput,
  AdminSelect,
  FieldLabel,
  SubmitButton,
} from "../ui";
import { createPhoto, type PhotoActionState } from "./actions";

const initialState: PhotoActionState = { ok: false, error: null };

export function PhotoForm({ onSuccess }: { onSuccess: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(createPhoto, initialState);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      onSuccess();
    }
  }, [state.ok, onSuccess]);

  return (
    <form ref={formRef} action={action} className="space-y-5">
      <div>
        <FieldLabel htmlFor="image_url" required>
          URL de l&apos;image
        </FieldLabel>
        <AdminInput
          id="image_url"
          name="image_url"
          type="url"
          required
          placeholder="https://res.cloudinary.com/… ou « placeholder »"
        />
        <p className="mt-1.5 font-body text-xs text-text-tertiary">
          Astuce : entre <code className="bg-bg-elevated px-1 text-accent">placeholder</code> pour
          afficher un dégradé BRUUX en attendant la vraie image.
        </p>
      </div>

      <div>
        <FieldLabel htmlFor="title">Titre / légende</FieldLabel>
        <AdminInput
          id="title"
          name="title"
          type="text"
          placeholder="Night Class #4 · piscine 03"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor="category">Catégorie</FieldLabel>
          <AdminSelect id="category" name="category" defaultValue="">
            <option value="">— aucune —</option>
            <option value="sessions">Sessions</option>
            <option value="evenements">Événements</option>
            <option value="brux-house">Brux House</option>
            <option value="portraits">Portraits</option>
          </AdminSelect>
        </div>
        <div>
          <FieldLabel htmlFor="session_date">Date de session</FieldLabel>
          <AdminInput id="session_date" name="session_date" type="date" />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="session_name">Nom de la session</FieldLabel>
        <AdminInput
          id="session_name"
          name="session_name"
          type="text"
          placeholder="bruxsessionpick"
        />
        <p className="mt-1.5 font-body text-xs text-text-tertiary">
          Utilise <code className="bg-bg-elevated px-1 text-accent">bruxsessionpick</code> pour
          afficher la photo dans la bande horizontale signature.
        </p>
      </div>

      {state.error && (
        <div className="border border-red-900/50 bg-red-950/30 px-4 py-3 font-body text-sm text-red-300">
          {state.error}
        </div>
      )}

      <div className="flex justify-end gap-3 border-t border-border-subtle pt-5">
        <SubmitButton>Ajouter la photo</SubmitButton>
      </div>
    </form>
  );
}
