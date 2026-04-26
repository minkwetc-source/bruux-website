"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArticleCard, CATEGORY_LABELS } from "./ArticleCard";
import { cn } from "@/lib/utils";
import type { ArticleCategory, ArticleRow } from "@/lib/supabase/types";

type Filter = "all" | ArticleCategory;

const FILTERS: Array<{ value: Filter; label: string }> = [
  { value: "all", label: "Tous" },
  { value: "vlogs", label: CATEGORY_LABELS.vlogs },
  { value: "courts-metrages", label: CATEGORY_LABELS["courts-metrages"] },
  { value: "jeux-soirees", label: CATEGORY_LABELS["jeux-soirees"] },
  { value: "backstage", label: CATEGORY_LABELS.backstage },
  { value: "lifestyle", label: CATEGORY_LABELS.lifestyle },
  { value: "special", label: CATEGORY_LABELS.special },
];

type Props = {
  articles: ArticleRow[];
  recent: ArticleRow[];
  counts: Record<Filter, number>;
};

export function BlogBrowser({ articles, recent, counts }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? articles
        : articles.filter((a) => a.category === filter),
    [articles, filter],
  );

  return (
    <div className="grid grid-cols-1 gap-12 xl:grid-cols-[1fr_320px] xl:gap-14">
      <div>
        {/* Filter chips */}
        <div
          role="tablist"
          aria-label="Filtrer par catégorie"
          className="mb-10 flex flex-wrap gap-2 md:gap-3"
        >
          {FILTERS.map((f) => {
            const active = filter === f.value;
            const count = counts[f.value];
            return (
              <button
                key={f.value}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setFilter(f.value)}
                className={cn(
                  "inline-flex items-center gap-2 border px-4 py-2 font-ui text-[11px] font-semibold uppercase tracking-button transition-all duration-200",
                  active
                    ? "border-accent bg-accent text-bg-primary"
                    : "border-border-medium bg-transparent text-text-secondary hover:border-accent hover:text-accent",
                )}
              >
                {f.label}
                <span
                  className={cn(
                    "font-heading text-[10px] tracking-wide",
                    active ? "text-bg-primary/70" : "text-text-tertiary",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {filtered.length === 0 ? (
            <div className="border border-border-subtle bg-bg-surface p-10 text-center">
              <p className="font-body text-sm text-text-secondary">
                Aucun article dans cette catégorie pour le moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <ArticleCard article={a} variant="grid" />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Sidebar */}
      <aside className="flex flex-col gap-10">
        <div>
          <p className="label-gold mb-4">Récent</p>
          <div className="flex flex-col">
            {recent.map((a) => (
              <ArticleCard key={a.id} article={a} variant="compact" />
            ))}
          </div>
        </div>

        <div>
          <p className="label-gold mb-4">Catégories</p>
          <ul className="flex flex-col">
            {FILTERS.map((f) => {
              const active = filter === f.value;
              const count = counts[f.value];
              return (
                <li key={f.value}>
                  <button
                    type="button"
                    onClick={() => setFilter(f.value)}
                    className={cn(
                      "flex w-full items-center justify-between border-b border-border-subtle py-3 font-ui text-xs uppercase tracking-label transition-colors",
                      active
                        ? "text-accent"
                        : "text-text-secondary hover:text-white",
                    )}
                  >
                    <span>{f.label}</span>
                    <span className="font-heading text-sm tracking-wide text-text-tertiary">
                      {count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}
