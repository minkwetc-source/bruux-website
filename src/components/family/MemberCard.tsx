"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import type { MemberRow } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

type Props = {
  member: MemberRow;
  index: number;
};

const PLACEHOLDER_GRADIENTS = [
  "from-[#1f1f1f] to-[#0a0a0a]",
  "from-[#1a221a] to-[#0a0a0a]",
  "from-[#221a1a] to-[#0a0a0a]",
  "from-[#1a1a22] to-[#0a0a0a]",
];

export function MemberCard({ member, index }: Props) {
  const isPlaceholder = !member.photo_url;
  const gradient =
    PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length] ??
    PLACEHOLDER_GRADIENTS[0];
  const initials = member.name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.article
      data-member
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="group flex flex-col items-center text-center"
    >
      <div className="relative h-40 w-40 overflow-hidden rounded-full border border-border-subtle md:h-48 md:w-48">
        {isPlaceholder ? (
          <>
            <div
              aria-hidden
              className={cn("absolute inset-0 bg-gradient-to-br", gradient)}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 35%, rgba(196,163,90,0.18), transparent 65%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading text-4xl uppercase tracking-wider text-text-tertiary md:text-5xl">
                {initials}
              </span>
            </div>
          </>
        ) : (
          <img
            src={member.photo_url ?? ""}
            alt={member.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover img-bruux"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full ring-0 ring-accent-border transition-all duration-500 group-hover:ring-2"
        />
        <div
          aria-hidden
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow: "0 0 40px rgba(196,163,90,0.35)",
          }}
        />
      </div>

      <h3 className="mt-5 font-heading text-xl uppercase tracking-wide text-text-primary md:text-2xl">
        {member.name}
      </h3>
      {member.role && (
        <p className="mt-1 font-ui text-[11px] uppercase tracking-label text-accent">
          {member.role}
        </p>
      )}
      {member.instagram && (
        <a
          href={`https://instagram.com/${member.instagram.replace(/^@/, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 font-body text-xs text-text-secondary transition-colors hover:text-accent"
        >
          <Instagram size={13} />
          {member.instagram}
        </a>
      )}
    </motion.article>
  );
}
