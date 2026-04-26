import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Universes } from "@/components/home/Universes";
import { NextEvent } from "@/components/home/NextEvent";
import { GalleryQuick } from "@/components/home/GalleryQuick";
import { Footer } from "@/components/layout/Footer";

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
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Universes />
      <NextEvent />
      <GalleryQuick />
      <Footer />
    </main>
  );
}
