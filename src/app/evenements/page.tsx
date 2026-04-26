import type { Metadata } from "next";
import {
  getAllEvents,
  getPastEvents,
  getUpcomingEvents,
} from "@/lib/supabase/events";
import { EventCard } from "@/components/events/EventCard";
import { EventsBrowser } from "@/components/events/EventsBrowser";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextSplit } from "@/components/animations/TextSplit";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Événements",
  description:
    "Tous les événements BRUUX — Night Class, Pool Party, soirées spéciales à Libreville. Calendrier, prochaines dates, réservations WhatsApp.",
  openGraph: {
    title: "Événements BRUUX | Night Class, Pool Party & soirées à Libreville",
    description:
      "Le calendrier officiel des événements BRUUX. Réserver, voir les détails, rejoindre la communauté.",
  },
};

export const revalidate = 60; // revalidate server-fetched events every minute

export default async function EventsPage() {
  // Une seule requête, puis filtrage en mémoire.
  const [allEvents, upcoming, past] = await Promise.all([
    getAllEvents(),
    getUpcomingEvents(),
    getPastEvents(9),
  ]);

  return (
    <main>
      <EventsHero />

      <UpcomingSection events={upcoming} />

      {/* Calendrier + list view */}
      <section className="bg-bg-primary py-20 md:py-28">
        <div className="container-bruux">
          <EventsBrowser events={allEvents} />
        </div>
      </section>

      <PastSection events={past} />

      <Footer />
    </main>
  );
}

function EventsHero() {
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
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(196,163,90,0.15),transparent_55%)]"
      />

      <div className="container-bruux relative z-10">
        <ScrollReveal animation="fade-up" duration={0.8}>
          <p className="label-gold">BRUX Event</p>
        </ScrollReveal>
        <div className="mt-4">
          <TextSplit
            as="h1"
            type="word"
            stagger={0.05}
            duration={0.9}
            immediate
            className="font-heading uppercase leading-[0.9] tracking-wide text-white text-[clamp(3rem,9vw,6rem)]"
          >
            Événements.
          </TextSplit>
        </div>
        <ScrollReveal animation="fade-up" delay={0.4}>
          <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-text-secondary md:text-base">
            Night Class, Pool Party, soirées spéciales. Le calendrier officiel
            des événements BRUUX à Libreville.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

function UpcomingSection({ events }: { events: Awaited<ReturnType<typeof getUpcomingEvents>> }) {
  if (events.length === 0) {
    return (
      <section className="bg-bg-surface py-20 md:py-28">
        <div className="container-bruux">
          <SectionHeader label="À venir" title="Prochaines dates" />
          <div className="border border-border-subtle bg-bg-primary p-10 text-center">
            <p className="font-body text-sm text-text-secondary">
              Aucun événement programmé pour le moment. Reviens bientôt.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const [featured, ...rest] = events;

  return (
    <section className="bg-bg-surface py-20 md:py-28">
      <div className="container-bruux">
        <SectionHeader label="À venir" title="Prochaines dates" />

        <ScrollReveal
          selector="[data-upcoming-card]"
          animation="fade-up"
          stagger={0.12}
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Carte featured prend toute la largeur sur grands écrans */}
            {featured && (
              <div data-upcoming-card className="lg:col-span-2">
                <EventCard event={featured} variant="featured" />
              </div>
            )}
            {rest.map((event) => (
              <div key={event.id} data-upcoming-card>
                <EventCard event={event} variant="featured" />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function PastSection({ events }: { events: Awaited<ReturnType<typeof getPastEvents>> }) {
  if (events.length === 0) return null;

  return (
    <section className="bg-bg-surface py-20 md:py-28">
      <div className="container-bruux">
        <SectionHeader label="Archives" title="Événements passés" />

        <ScrollReveal
          selector="[data-past-card]"
          animation="fade-up"
          stagger={0.08}
          duration={0.8}
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} data-past-card>
                <EventCard event={event} variant="past" />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-12 md:mb-16">
      <ScrollReveal animation="fade-up">
        <p className="label-gold">{label}</p>
      </ScrollReveal>
      <TextSplit
        as="h2"
        type="word"
        className="mt-3 font-heading uppercase leading-[0.95] tracking-wide text-white text-[clamp(2rem,5vw,3.5rem)]"
      >
        {title}
      </TextSplit>
    </div>
  );
}
