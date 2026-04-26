import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar as CalIcon, User } from "lucide-react";
import {
  FALLBACK_ARTICLES,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/supabase/articles";
import {
  ArticleCard,
  CATEGORY_LABELS,
} from "@/components/blog/ArticleCard";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { Parallax } from "@/components/animations/Parallax";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextSplit } from "@/components/animations/TextSplit";
import { Footer } from "@/components/layout/Footer";
import { formatDate } from "@/lib/utils";

type Props = {
  params: { slug: string };
};

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  // Pre-render au moins les articles fallback pour avoir des routes statiques
  // avant même que la table Supabase soit peuplée.
  return FALLBACK_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: "Article introuvable" };
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    authors: article.author ? [{ name: article.author }] : undefined,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt ?? undefined,
      publishedTime: article.published_at ?? undefined,
      authors: article.author ? [article.author] : undefined,
    },
  };
}

const CATEGORY_ACCENT: Record<string, string> = {
  vlogs: "from-[#1f1f1f] via-[#141414] to-[#0a0a0a]",
  "courts-metrages": "from-[#1a1a22] via-[#141414] to-[#0a0a0a]",
  "jeux-soirees": "from-[#1a221a] via-[#141414] to-[#0a0a0a]",
  backstage: "from-[#221a1a] via-[#141414] to-[#0a0a0a]",
  lifestyle: "from-[#22201a] via-[#141414] to-[#0a0a0a]",
  special: "from-[#221a22] via-[#141414] to-[#0a0a0a]",
};

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = await getRelatedArticles(
    article.slug,
    article.category,
    3,
  );
  const dateStr = article.published_at
    ? formatDate(article.published_at)
    : null;
  const accent = article.category
    ? CATEGORY_ACCENT[article.category]
    : CATEGORY_ACCENT.vlogs;

  return (
    <main>
      {/* Fullscreen cover with parallax */}
      <section className="relative h-[75vh] min-h-[500px] w-full overflow-hidden bg-bg-primary">
        <Parallax speed={0.5} className="absolute inset-0">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${accent}`}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(196,163,90,0.2),transparent_65%)]"
          />
        </Parallax>

        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg-primary via-bg-primary/70 to-transparent"
        />

        <div className="container-bruux relative z-10 flex h-full flex-col justify-end pb-16 pt-28 md:pb-20 md:pt-32">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 font-ui text-[11px] font-semibold uppercase tracking-button text-text-secondary transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} />
            Retour au blog
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {article.category && (
              <span className="border border-accent-border bg-accent-subtle px-3 py-1 font-ui text-[10px] font-semibold uppercase tracking-label text-accent backdrop-blur-sm">
                {CATEGORY_LABELS[article.category]}
              </span>
            )}
            {dateStr && (
              <span className="inline-flex items-center gap-2 font-ui text-[11px] uppercase tracking-label text-text-secondary">
                <CalIcon size={12} className="text-accent" /> {dateStr}
              </span>
            )}
            {article.author && (
              <span className="inline-flex items-center gap-2 font-ui text-[11px] uppercase tracking-label text-text-secondary">
                <User size={12} className="text-accent" /> {article.author}
              </span>
            )}
          </div>

          <div className="mt-6 max-w-4xl">
            <TextSplit
              as="h1"
              type="word"
              stagger={0.04}
              duration={0.9}
              immediate
              className="font-heading uppercase leading-[0.95] tracking-wide text-white text-[clamp(2.5rem,7vw,5.5rem)]"
            >
              {article.title}
            </TextSplit>
          </div>

          {article.excerpt && (
            <ScrollReveal animation="fade-up" delay={0.4}>
              <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-text-secondary md:text-lg">
                {article.excerpt}
              </p>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Body */}
      <article className="bg-bg-primary py-16 md:py-24">
        <div className="container-bruux">
          <ArticleContent content={article.content} />
          <div className="mx-auto mt-16 max-w-2xl">
            <ShareButtons title={article.title} slug={article.slug} />
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-bg-surface py-16 md:py-24">
          <div className="container-bruux">
            <div className="mb-10 md:mb-14">
              <ScrollReveal animation="fade-up">
                <p className="label-gold">À lire ensuite</p>
              </ScrollReveal>
              <TextSplit
                as="h2"
                type="word"
                className="mt-3 font-heading uppercase leading-[0.95] tracking-wide text-white text-[clamp(1.75rem,4vw,2.75rem)]"
              >
                Articles similaires.
              </TextSplit>
            </div>

            <ScrollReveal
              selector="[data-related]"
              animation="fade-up"
              stagger={0.1}
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((a) => (
                  <div key={a.id} data-related>
                    <ArticleCard article={a} variant="grid" />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
