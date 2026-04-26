"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import {
  AdminInput,
  AdminSelect,
  FieldLabel,
  SubmitButton,
} from "../ui";
import {
  createMember,
  updateMember,
  type MemberActionState,
} from "./actions";
import type { MemberRow } from "@/lib/supabase/types";

const initialState: MemberActionState = { ok: false, error: null };

type Props = {
  member?: MemberRow;
  onSuccess: () => void;
};

export function MemberForm({ member, onSuccess }: Props) {
  const isEdit = Boolean(member);
  const [state, action] = useFormState(
    isEdit ? updateMember : createMember,
    initialState,
  );

  useEffect(() => {
    if (state.ok) onSuccess();
  }, [state.ok, onSuccess]);

  return (
    <form action={action} className="space-y-5">
      {member && <input type="hidden" name="id" value={member.id} />}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor="name" required>
            Nom complet
          </FieldLabel>
          <AdminInput
            id="name"
            name="name"
            type="text"
            required
            defaultValue={member?.name ?? ""}
            placeholder="Simon Ntsagui"
          />
        </div>
        <div>
          <FieldLabel htmlFor="role">Rôle</FieldLabel>
          <AdminInput
            id="role"
            name="role"
            type="text"
            defaultValue={member?.role ?? ""}
            placeholder="Fondateur & CEO"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor="section">Section</FieldLabel>
          <AdminSelect
            id="section"
            name="section"
            defaultValue={member?.section ?? ""}
          >
            <option value="">— aucune —</option>
            <option value="direction">Direction</option>
            <option value="division-artistique">Division Artistique</option>
            <option value="mannequins">Mannequins</option>
            <option value="influenceurs">Influenceurs</option>
            <option value="section-a">Section A</option>
          </AdminSelect>
        </div>
        <div>
          <FieldLabel htmlFor="display_order">Ordre d&apos;affichage</FieldLabel>
          <AdminInput
            id="display_order"
            name="display_order"
            type="number"
            min={0}
            step={1}
            defaultValue={member?.display_order ?? 0}
          />
          <p className="mt-1.5 font-body text-xs text-text-tertiary">
            Les membres avec le plus petit nombre apparaissent en premier dans leur section.
          </p>
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="instagram">Instagram</FieldLabel>
        <AdminInput
          id="instagram"
          name="instagram"
          type="text"
          defaultValue={member?.instagram ?? ""}
          placeholder="@adn_simon"
        />
      </div>

      <div>
        <FieldLabel htmlFor="photo_url">Photo de profil (URL)</FieldLabel>
        <AdminInput
          id="photo_url"
          name="photo_url"
          type="url"
          defaultValue={member?.photo_url ?? ""}
          placeholder="https://res.cloudinary.com/…"
        />
      </div>

      {state.error && (
        <div className="border border-red-900/50 bg-red-950/30 px-4 py-3 font-body text-sm text-red-300">
          {state.error}
        </div>
      )}

      <div className="flex justify-end gap-3 border-t border-border-subtle pt-5">
        <SubmitButton>{isEdit ? "Mettre à jour" : "Ajouter le membre"}</SubmitButton>
      </div>
    </form>
  );
}
