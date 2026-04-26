import type { Metadata } from "next";
import {
  getBruxsessionpickPhotos,
  getPhotos,
} from "@/lib/supabase/photos";
import { GalleryBrowser } from "@/components/gallery/GalleryBrowser";
import { BruxsessionpickStrip } from "@/components/gallery/BruxsessionpickStrip";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextSplit } from "@/components/animations/TextSplit";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "La galerie BRUUX — sessions photo signature, événements, Brux House, portraits. L'identité visuelle du collectif gabonais.",
  openGraph: {
    title: "Galerie | BRUUX.",
    description:
      "Sessions photo, événements, Brux House et portraits — l'univers visuel BRUUX.",
  },
};

export const revalidate = 60;

export default async function GaleriePage() {
  const [photos, bruxsessionpick] = await Promise.all([
    getPhotos(),
    getBruxsessionpickPhotos(),
  ]);

  return (
    <main>
      <GalleryHero />

      {bruxsessionpick.length > 0 && (
        <section className="overflow-hidden bg-bg-surface pb-12 md:pb-24">
          <div className="container-bruux pb-12 pt-20 md:pb-16 md:pt-28">
            <ScrollReveal animation="fade-up">
              <p className="label-gold mb-3">#bruxsessionpick</p>
            </ScrollReveal>
            <TextSplit
              as="h2"
              type="word"
              className="font-heading uppercase leading-[0.95] tracking-wide text-white text-[clamp(2rem,5vw,3.5rem)]"
            >
              Les sessions signature.
            </TextSplit>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-text-secondary md:text-base">
                Cadres bronze, vert forêt, ardoise — la signature visuelle
                bruxsessionpick. Chaque session est un moment, une lumière,
                un visage.
              </p>
            </ScrollReveal>
          </div>

          <BruxsessionpickStrip photos={bruxsessionpick} />
        </section>
      )}

      <section className="bg-bg-primary py-20 md:py-28">
        <div className="container-bruux">
          <div className="mb-10 md:mb-14">
            <ScrollReveal animation="fade-up">
              <p className="label-gold">Toutes les photos</p>
            </ScrollReveal>
            <TextSplit
              as="h2"
              type="word"
              className="mt-3 font-heading uppercase leading-[0.95] tracking-wide text-white text-[clamp(2rem,5vw,3.5rem)]"
            >
              Parcourir l&apos;archive.
            </TextSplit>
          </div>

          <GalleryBrowser photos={photos} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function GalleryHero() {
  return (
    <section className="relative flex h-[45vh] min-h-[360px] w-full items-end overflow-hidden bg-bg-primary pb-16 pt-28 md:pb-20 md:pt-32">
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
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(196,163,90,0.14),transparent_55%)]"
      />

      <div className="container-bruux relative z-10">
        <ScrollReveal animation="fade-up" duration={0.8}>
          <p className="label-gold">Archive visuelle</p>
        </ScrollReveal>
        <div className="mt-4">
          <TextSplit
            as="h1"
            type="word"
            stagger={0.05}
            duration={0.9}
            immediate
            className="font-heading uppercase leading-[0.9] tracking-wide text-white text-[clamp(3rem,9vw,6.5rem)]"
          >
            Galerie.
          </TextSplit>
        </div>
        <ScrollReveal animation="fade-up" delay={0.3}>
          <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-text-secondary md:text-base">
            Sessions, événements, Brux House, portraits — l&apos;univers visuel
            BRUUX, capté à Libreville et au-delà.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
