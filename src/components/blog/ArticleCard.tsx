import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { ArticleCategory, ArticleRow } from "@/lib/supabase/types";

type Variant = "featured" | "grid" | "compact";

type Props = {
  article: ArticleRow;
  variant?: Variant;
  className?: string;
};

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  vlogs: "Vlogs",
  "courts-metrages": "Courts-métrages",
  "jeux-soirees": "Jeux & Soirées",
  backstage: "Backstage",
  lifestyle: "Lifestyle",
  special: "Spécial",
};

const CATEGORY_ACCENTS: Record<ArticleCategory, string> = {
  vlogs: "from-[#1f1f1f] via-[#141414] to-[#0a0a0a]",
  "courts-metrages": "from-[#1a1a22] via-[#141414] to-[#0a0a0a]",
  "jeux-soirees": "from-[#1a221a] via-[#141414] to-[#0a0a0a]",
  backstage: "from-[#221a1a] via-[#141414] to-[#0a0a0a]",
  lifestyle: "from-[#22201a] via-[#141414] to-[#0a0a0a]",
  special: "from-[#221a22] via-[#141414] to-[#0a0a0a]",
};

function Cover({
  category,
  ratio,
}: {
  category: ArticleCategory | null;
  ratio: string;
}) {
  const accent = category
    ? CATEGORY_ACCENTS[category]
    : CATEGORY_ACCENTS.vlogs;
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-br",
        accent,
        ratio,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(196,163,90,0.18),transparent_65%)] transition-opacity duration-500 group-hover:opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg-surface via-bg-surface/40 to-transparent"
      />
    </div>
  );
}

function CategoryBadge({ category }: { category: ArticleCategory }) {
  return (
    <span className="inline-flex items-center border border-accent-border bg-accent-subtle px-3 py-1 font-ui text-[10px] font-semibold uppercase tracking-label text-accent backdrop-blur-sm">
      {CATEGORY_LABELS[category]}
    </span>
  );
}

export function ArticleCard({ article, variant = "grid", className }: Props) {
  const href = `/blog/${article.slug}`;
  const dateStr = article.published_at
    ? formatDate(article.published_at)
    : null;

  if (variant === "featured") {
    return (
      <Link
        href={href}
        className={cn(
          "group relative grid grid-cols-1 overflow-hidden border border-border-subtle bg-bg-surface transition-colors duration-500 hover:border-accent-border md:grid-cols-2",
          className,
        )}
      >
        <div className="relative md:min-h-[400px]">
          <Cover
            category={article.category}
            ratio="aspect-[16/10] md:aspect-auto md:absolute md:inset-0"
          />
          {article.category && (
            <span className="absolute left-5 top-5 z-10 border border-accent-border bg-bg-primary/60 px-3 py-1 font-ui text-[10px] font-semibold uppercase tracking-label text-accent backdrop-blur-sm">
              {CATEGORY_LABELS[article.category]}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-between gap-6 p-6 md:p-10 lg:p-12">
          <div>
            <p className="label-gold">À la une</p>
            <h2 className="mt-4 font-heading text-3xl uppercase leading-[0.95] tracking-wide text-white md:text-4xl lg:text-5xl">
              {article.title}
            </h2>
            {article.excerpt && (
              <p className="mt-5 font-body text-[15px] leading-relaxed text-text-secondary">
                {article.excerpt}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-border-subtle pt-5">
            <div className="flex flex-col gap-1">
              {article.author && (
                <span className="font-ui text-[11px] uppercase tracking-label text-text-secondary">
                  {article.author}
                </span>
              )}
              {dateStr && (
                <span className="font-ui text-[11px] text-text-tertiary">
                  {dateStr}
                </span>
              )}
            </div>
            <span className="inline-flex items-center gap-2 font-ui text-[11px] font-semibold uppercase tracking-button text-accent transition-colors group-hover:text-accent-hover">
              Lire l&apos;article
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className={cn(
          "group flex items-center gap-4 border-b border-border-subtle py-4 transition-colors hover:bg-bg-elevated",
          className,
        )}
      >
        <div className="relative aspect-square h-16 w-16 shrink-0 overflow-hidden">
          <Cover category={article.category} ratio="absolute inset-0" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-heading text-sm uppercase leading-tight tracking-wide text-white transition-colors group-hover:text-accent line-clamp-2">
            {article.title}
          </h4>
          {dateStr && (
            <p className="mt-1 font-ui text-[10px] uppercase tracking-label text-text-tertiary">
              {dateStr}
            </p>
          )}
        </div>
      </Link>
    );
  }

  // Grid variant (default)
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border border-border-subtle bg-bg-surface transition-colors duration-500 hover:border-accent-border",
        className,
      )}
    >
      <div className="relative">
        <Cover category={article.category} ratio="aspect-[4/3]" />
        {article.category && (
          <span className="absolute left-4 top-4 z-10">
            <CategoryBadge category={article.category} />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center gap-3 font-ui text-[10px] uppercase tracking-label text-text-tertiary">
          {dateStr && <span>{dateStr}</span>}
          {article.author && (
            <>
              <span aria-hidden>·</span>
              <span>{article.author}</span>
            </>
          )}
        </div>
        <h3 className="font-heading text-xl uppercase leading-tight tracking-wide text-white transition-colors group-hover:text-accent md:text-2xl">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="font-body text-sm leading-relaxed text-text-secondary line-clamp-3">
            {article.excerpt}
          </p>
        )}
        <span className="mt-auto inline-flex items-center gap-2 pt-2 font-ui text-[11px] font-semibold uppercase tracking-button text-text-secondary transition-colors group-hover:text-accent">
          Lire
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
