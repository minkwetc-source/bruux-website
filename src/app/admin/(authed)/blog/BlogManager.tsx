"use client";

import { useState } from "react";
import { ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import type { ArticleCategory, ArticleRow } from "@/lib/supabase/types";
import { formatDate } from "@/lib/utils";
import { Modal } from "../Modal";
import { AdminButton } from "../ui";
import { ArticleForm } from "./ArticleForm";
import { deleteArticle } from "./actions";

const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  vlogs: "Vlogs",
  "courts-metrages": "Courts-métrages",
  "jeux-soirees": "Jeux & soirées",
  backstage: "Backstage",
  lifestyle: "Lifestyle",
  special: "Spécial",
};

type Props = {
  articles: ArticleRow[];
};

export function BlogManager({ articles }: Props) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ArticleRow | null>(null);

  const startCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const startEdit = (a: ArticleRow) => {
    setEditing(a);
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
    setEditing(null);
  };

  const handleDelete = (e: React.FormEvent<HTMLFormElement>, title: string) => {
    if (!window.confirm(`Supprimer l'article « ${title} » ?`)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="font-ui text-[11px] font-semibold uppercase tracking-label text-text-secondary">
          {articles.length} article{articles.length > 1 ? "s" : ""}
        </p>
        <AdminButton onClick={startCreate}>
          <Plus size={14} />
          Nouvel article
        </AdminButton>
      </div>

      {articles.length === 0 ? (
        <div className="border border-border-subtle bg-bg-surface px-8 py-16 text-center">
          <p className="font-heading text-xl uppercase tracking-wide text-text-primary">
            Aucun article.
          </p>
          <p className="mt-2 font-body text-sm text-text-secondary">
            Lance le premier post — il apparaîtra sur /blog.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-border-subtle bg-bg-surface">
          <table className="w-full min-w-[800px] text-left">
            <thead className="border-b border-border-subtle bg-bg-elevated">
              <tr>
                <Th>Titre</Th>
                <Th>Catégorie</Th>
                <Th>Statut</Th>
                <Th>Publié le</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-border-subtle last:border-b-0 hover:bg-bg-elevated/50"
                >
                  <Td>
                    <p className="font-heading text-base uppercase tracking-wide text-text-primary">
                      {a.title}
                    </p>
                    <p className="mt-0.5 font-body text-xs text-text-tertiary">
                      /{a.slug} {a.author && <>· {a.author}</>}
                    </p>
                  </Td>
                  <Td>
                    {a.category ? (
                      <span className="font-body text-sm text-text-secondary">
                        {CATEGORY_LABELS[a.category]}
                      </span>
                    ) : (
                      <span className="font-body text-sm text-text-tertiary">—</span>
                    )}
                  </Td>
                  <Td>
                    {a.published ? (
                      <span className="inline-flex border border-accent-border bg-accent-subtle px-2.5 py-1 font-ui text-[10px] font-semibold uppercase tracking-label text-accent">
                        Publié
                      </span>
                    ) : (
                      <span className="inline-flex border border-border-medium bg-bg-elevated px-2.5 py-1 font-ui text-[10px] font-semibold uppercase tracking-label text-text-secondary">
                        Brouillon
                      </span>
                    )}
                  </Td>
                  <Td>
                    <p className="font-body text-sm text-text-secondary">
                      {a.published_at ? formatDate(a.published_at) : "—"}
                    </p>
                  </Td>
                  <Td className="text-right">
                    <div className="inline-flex items-center gap-2">
                      {a.published && (
                        <Link
                          href={`/blog/${a.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Voir l'article"
                          className="inline-flex items-center justify-center border border-border-medium bg-transparent px-3 py-2.5 text-text-primary transition-colors hover:border-accent hover:text-accent"
                        >
                          <ExternalLink size={13} />
                        </Link>
                      )}
                      <AdminButton variant="outline" onClick={() => startEdit(a)}>
                        <Pencil size={13} />
                      </AdminButton>
                      <form
                        action={deleteArticle}
                        onSubmit={(e) => handleDelete(e, a.title)}
                      >
                        <input type="hidden" name="id" value={a.id} />
                        <AdminButton type="submit" variant="danger">
                          <Trash2 size={13} />
                        </AdminButton>
                      </form>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={open}
        onClose={close}
        title={editing ? `Modifier · ${editing.title}` : "Nouvel article"}
        size="xl"
      >
        <ArticleForm article={editing ?? undefined} onSuccess={close} />
      </Modal>
    </>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-5 py-3.5 font-ui text-[10px] font-semibold uppercase tracking-label text-text-secondary ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-5 py-4 align-top ${className}`}>{children}</td>;
}
