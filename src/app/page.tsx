import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Universes } from "@/components/home/Universes";
import { NextEvent } from "@/components/home/NextEvent";
import { GalleryQuick } from "@/components/home/GalleryQuick";
import { Footer } from "@/components/layout/Footer";
import { getNextEvent } from "@/lib/supabase/events";

export const metadata: Metadata = {
  title: {
    absolute: "BRUUX. | Collectif Créatif Gabonais",
  },
  description:
    "BRUUX — entertainment company gabonaise. Événements, création de contenus, mannequinat et direction artistique. Night Class, Pool Party, BRUX House. Libreville, Gabon.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "BRUUX. | Collectif Créatif Gabonais",
    description:
      "Plateforme dédiée à la création d'expériences, de contenus et d'événements à Libreville. Créativité. Événement. Famille.",
    url: "/",
    images: [
      {
        url: "/images/events/night-class-affiche.jpg",
        width: 1200,
        height: 630,
        alt: "BRUUX — Collectif Créatif Gabonais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BRUUX. | Collectif Créatif Gabonais",
    description:
      "Entertainment company gabonaise. Événements, contenus, mannequinat.",
    images: ["/images/events/night-class-affiche.jpg"],
  },
};

export const revalidate = 60; // garde le prochain événement à jour

export default async function HomePage() {
  const nextEvent = await getNextEvent();

  return (
    <main>
      <Hero />
      <About />
      <Universes />
      <NextEvent event={nextEvent} />
      <GalleryQuick />
      <Footer />
    </main>
  );
}
