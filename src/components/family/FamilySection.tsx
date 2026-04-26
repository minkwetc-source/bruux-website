import type { MemberRow, MemberSection as MemberSectionId } from "@/lib/supabase/types";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextSplit } from "@/components/animations/TextSplit";
import { MemberCard } from "./MemberCard";

type Props = {
  section: MemberSectionId;
  label: string;
  subtitle: string;
  members: MemberRow[];
};

export function FamilySection({ label, subtitle, members }: Props) {
  return (
    <section className="border-t border-border-subtle py-20 md:py-28">
      <div className="container-bruux">
        <div className="mb-12 max-w-2xl md:mb-16">
          <ScrollReveal animation="fade-up">
            <p className="label-gold">{label}</p>
          </ScrollReveal>
          <TextSplit
            as="h2"
            type="word"
            className="mt-3 font-heading uppercase leading-[0.95] tracking-wide text-white text-[clamp(1.75rem,4vw,2.75rem)]"
          >
            {`${label}.`}
          </TextSplit>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="mt-4 font-body text-sm leading-relaxed text-text-secondary md:text-base">
              {subtitle}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal selector="[data-member]" animation="fade-up" stagger={0.08}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 md:grid-cols-4 md:gap-x-8 md:gap-y-16">
            {members.map((m, i) => (
              <MemberCard key={m.id} member={m} index={i} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
