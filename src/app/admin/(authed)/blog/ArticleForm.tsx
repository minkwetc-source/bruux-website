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
import { MarkdownEditor } from "./MarkdownEditor";
import {
  createArticle,
  updateArticle,
  type ArticleActionState,
} from "./actions";
import type { ArticleRow } from "@/lib/supabase/types";

const initialState: ArticleActionState = { ok: false, error: null };

type Props = {
  article?: ArticleRow;
  onSuccess: () => void;
};

function toDateTimeLocal(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function ArticleForm({ article, onSuccess }: Props) {
  const isEdit = Boolean(article);
  const [state, action] = useFormState(
    isEdit ? updateArticle : createArticle,
    initialState,
  );

  useEffect(() => {
    if (state.ok) onSuccess();
  }, [state.ok, onSuccess]);

  return (
    <form action={action} className="space-y-5">
      {article && <input type="hidden" name="id" value={article.id} />}

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
            defaultValue={article?.title ?? ""}
            placeholder="Backstage · Night Class #4"
          />
        </div>
        <div>
          <FieldLabel htmlFor="slug">Slug</FieldLabel>
          <AdminInput
            id="slug"
            name="slug"
            type="text"
            defaultValue={article?.slug ?? ""}
            placeholder="auto si vide"
          />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="excerpt">Chapeau (extrait)</FieldLabel>
        <AdminTextarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={article?.excerpt ?? ""}
          placeholder="Une phrase d'accroche pour les cards et l'OG."
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor="category">Catégorie</FieldLabel>
          <AdminSelect
            id="category"
            name="category"
            defaultValue={article?.category ?? ""}
          >
            <option value="">— aucune —</option>
            <option value="vlogs">Vlogs</option>
            <option value="courts-metrages">Courts-métrages</option>
            <option value="jeux-soirees">Jeux & soirées</option>
            <option value="backstage">Backstage</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="special">Spécial</option>
          </AdminSelect>
        </div>
        <div>
          <FieldLabel htmlFor="author">Auteur</FieldLabel>
          <AdminInput
            id="author"
            name="author"
            type="text"
            defaultValue={article?.author ?? ""}
            placeholder="Léa Ngondo"
          />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="cover_image">Image de couverture (URL)</FieldLabel>
        <AdminInput
          id="cover_image"
          name="cover_image"
          type="url"
          defaultValue={article?.cover_image ?? ""}
          placeholder="https://res.cloudinary.com/…"
        />
      </div>

      <div>
        <FieldLabel htmlFor="content" required>
          Contenu (Markdown)
        </FieldLabel>
        <MarkdownEditor
          name="content"
          defaultValue={article?.content ?? ""}
          required
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor="published_at">Date de publication</FieldLabel>
          <AdminInput
            id="published_at"
            name="published_at"
            type="datetime-local"
            defaultValue={toDateTimeLocal(article?.published_at ?? null)}
          />
        </div>
        <div className="flex items-end">
          <label
            htmlFor="published"
            className="inline-flex cursor-pointer items-center gap-3 border border-border-medium bg-bg-elevated px-4 py-3"
          >
            <input
              id="published"
              name="published"
              type="checkbox"
              defaultChecked={article?.published ?? false}
              className="h-4 w-4 accent-[#C4A35A]"
            />
            <span className="font-ui text-[11px] font-semibold uppercase tracking-button text-text-primary">
              Publier l&apos;article
            </span>
          </label>
        </div>
      </div>

      {state.error && (
        <div className="border border-red-900/50 bg-red-950/30 px-4 py-3 font-body text-sm text-red-300">
          {state.error}
        </div>
      )}

      <div className="flex justify-end gap-3 border-t border-border-subtle pt-5">
        <SubmitButton>{isEdit ? "Mettre à jour" : "Créer l'article"}</SubmitButton>
      </div>
    </form>
  );
}
