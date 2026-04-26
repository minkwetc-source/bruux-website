import type { Metadata } from "next";
import {
  computeCategoryCounts,
  getArticles,
} from "@/lib/supabase/articles";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BlogBrowser } from "@/components/blog/BlogBrowser";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextSplit } from "@/components/animations/TextSplit";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Blog & Brux House",
  description:
    "Le blog de BRUUX — vlogs, courts-métrages, backstage, lifestyle. Le laboratoire de l'identité BRUX House.",
  openGraph: {
    title: "Blog & Brux House | BRUUX.",
    description:
      "Le blog de BRUUX — vlogs, courts-métrages, backstage, lifestyle.",
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  const articles = await getArticles();
  const [featured, ...rest] = articles;
  const recent = articles.slice(0, 5);
  const counts = computeCategoryCounts(articles);

  return (
    <main>
      <BlogHero />

      {featured && (
        <section className="bg-bg-surface py-20 md:py-28">
          <div className="container-bruux">
            <ScrollReveal animation="fade-up" duration={0.9}>
              <ArticleCard article={featured} variant="featured" />
            </ScrollReveal>
          </div>
        </section>
      )}

      <section className="bg-bg-primary py-20 md:py-28">
        <div className="container-bruux">
          <div className="mb-12 md:mb-16">
            <ScrollReveal animation="fade-up">
              <p className="label-gold">Tous les articles</p>
            </ScrollReveal>
            <TextSplit
              as="h2"
              type="word"
              className="mt-3 font-heading uppercase leading-[0.95] tracking-wide text-white text-[clamp(2rem,5vw,3.5rem)]"
            >
              Parcourir par catégorie.
            </TextSplit>
          </div>

          <BlogBrowser articles={rest} recent={recent} counts={counts} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function BlogHero() {
  return (
    <section className="relative flex h-[40vh] min-h-[340px] w-full items-end overflow-hidden bg-bg-primary pb-16 pt-28 md:pb-20 md:pt-32">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#0a0a0a]"
      />
      <div
        aria-hidden
        className="bg-gold-glow pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(196,163,90,0.14),transparent_55%)]"
      />

      <div className="container-bruux relative z-10">
        <ScrollReveal animation="fade-up" duration={0.8}>
          <p className="label-gold">BRUX House</p>
        </ScrollReveal>
        <div className="mt-4">
          <TextSplit
            as="h1"
            type="word"
            stagger={0.05}
            duration={0.9}
            immediate
            className="font-heading uppercase leading-[0.9] tracking-wide text-white text-[clamp(2.5rem,8vw,5.5rem)]"
          >
            Blog & Brux House.
          </TextSplit>
        </div>
        <ScrollReveal animation="fade-up" delay={0.3}>
          <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-text-secondary md:text-base">
            Vlogs, courts-métrages, backstage, lifestyle. Le laboratoire de
            l&apos;identité BRUUX — plus qu&apos;un blog, un journal de bord.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
