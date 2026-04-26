import type { Metadata } from "next";
import { Instagram, Mail, MapPin } from "lucide-react";
import { TikTokIcon, WhatsAppIcon } from "@/components/ui/icons";
import { ContactForm } from "@/components/contact/ContactForm";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextSplit } from "@/components/animations/TextSplit";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contacter BRUUX — collaborations, événements, presse. Basé à Libreville, Gabon.",
  openGraph: {
    title: "Contact | BRUUX.",
    description: "Booker, collaborer, rejoindre BRUUX. Libreville, Gabon.",
  },
};

const SOCIALS = [
  {
    href: "https://wa.me/24177777777",
    label: "WhatsApp",
    handle: "+241 77 77 77 77",
    Icon: WhatsAppIcon,
    accent: "hover:border-[#25D366] hover:text-[#25D366]",
  },
  {
    href: "https://instagram.com/bruuxofficial",
    label: "Instagram",
    handle: "@bruuxofficial",
    Icon: Instagram,
    accent: "hover:border-accent hover:text-accent",
  },
  {
    href: "https://tiktok.com/@bruuxofficial",
    label: "TikTok",
    handle: "@bruuxofficial",
    Icon: TikTokIcon,
    accent: "hover:border-white hover:text-white",
  },
  {
    href: "mailto:hello@bruux.com",
    label: "Email",
    handle: "hello@bruux.com",
    Icon: Mail,
    accent: "hover:border-accent hover:text-accent",
  },
] as const;

export default function ContactPage() {
  return (
    <main>
      <ContactHero />

      <section className="bg-bg-primary py-16 md:py-24">
        <div className="container-bruux">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
            <ScrollReveal animation="fade-up">
              <div>
                <p className="label-gold">Écris-nous</p>
                <h2 className="mt-3 font-heading uppercase leading-[0.95] tracking-wide text-white text-[clamp(1.75rem,4vw,2.75rem)]">
                  Un projet, une idée ?
                </h2>
                <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-text-secondary md:text-base">
                  Réponse sous 48h. Pour les bookings événements et les
                  demandes presse, précise-le dans le sujet.
                </p>

                <div className="mt-12">
                  <ContactForm />
                </div>
              </div>
            </ScrollReveal>

            <div className="space-y-10">
              <ScrollReveal animation="fade-up" delay={0.15}>
                <div>
                  <p className="label-gold">Plus rapide</p>
                  <TextSplit
                    as="h3"
                    type="word"
                    className="mt-3 font-heading uppercase leading-[0.95] tracking-wide text-white text-[clamp(1.5rem,3vw,2.25rem)]"
                  >
                    Direct sur les réseaux.
                  </TextSplit>
                </div>
              </ScrollReveal>

              <ScrollReveal
                selector="[data-social]"
                animation="fade-up"
                stagger={0.08}
                delay={0.25}
              >
                <ul className="space-y-3">
                  {SOCIALS.map(({ href, label, handle, Icon, accent }) => (
                    <li key={label} data-social>
                      <a
                        href={href}
                        target={href.startsWith("mailto") ? undefined : "_blank"}
                        rel={
                          href.startsWith("mailto")
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className={`group flex items-center justify-between border border-border-medium bg-bg-surface px-5 py-4 transition-colors ${accent}`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="flex h-10 w-10 items-center justify-center border border-border-subtle bg-bg-elevated transition-colors group-hover:border-current">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="font-ui text-[10px] font-semibold uppercase tracking-label text-text-secondary transition-colors group-hover:text-current">
                              {label}
                            </p>
                            <p className="mt-0.5 font-body text-sm text-text-primary transition-colors group-hover:text-current">
                              {handle}
                            </p>
                          </div>
                        </div>
                        <span
                          aria-hidden
                          className="font-ui text-xs uppercase tracking-button text-text-tertiary transition-all group-hover:translate-x-1 group-hover:text-current"
                        >
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={0.35}>
                <div>
                  <div className="flex items-center gap-3 border-t border-border-subtle pt-8">
                    <MapPin size={14} className="text-accent" />
                    <p className="font-ui text-[10px] font-semibold uppercase tracking-label text-text-secondary">
                      Notre base
                    </p>
                  </div>
                  <p className="mt-3 font-heading text-2xl uppercase tracking-wide text-text-primary md:text-3xl">
                    Libreville, Gabon.
                  </p>
                  <p className="mt-2 font-body text-sm text-text-secondary">
                    Quartier Glass · sur rendez-vous uniquement
                  </p>

                  <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden border border-border-subtle bg-bg-surface">
                    <iframe
                      title="Carte Libreville"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=9.40%2C0.35%2C9.55%2C0.50&amp;layer=mapnik&amp;marker=0.4162%2C9.4673"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full"
                      style={{
                        filter:
                          "invert(92%) hue-rotate(180deg) brightness(0.85) contrast(1.1) saturate(0.6)",
                      }}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border-subtle"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ContactHero() {
  return (
    <section className="relative flex h-[40vh] min-h-[320px] w-full items-end overflow-hidden bg-bg-primary pb-12 pt-28 md:pb-16 md:pt-32">
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
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(196,163,90,0.14),transparent_55%)]"
      />

      <div className="container-bruux relative z-10">
        <ScrollReveal animation="fade-up" duration={0.8}>
          <p className="label-gold">Nous joindre</p>
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
            Contact.
          </TextSplit>
        </div>
        <ScrollReveal animation="fade-up" delay={0.3}>
          <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-text-secondary md:text-base">
            Bookings, collaborations, presse, candidatures : toutes les portes
            sont ouvertes.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
