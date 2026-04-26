"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import type { MemberSection } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

const ROLE_OPTIONS: { value: MemberSection | ""; label: string }[] = [
  { value: "", label: "Choisis un univers" },
  { value: "mannequins", label: "Mannequinat" },
  { value: "influenceurs", label: "Influence / création de contenu" },
  { value: "division-artistique", label: "Direction artistique" },
  { value: "section-a", label: "Coordination / logistique" },
];

type Status = "idle" | "submitting" | "success" | "error";

export function JoinForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [role, setRole] = useState<MemberSection | "">("");
  const [motivation, setMotivation] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    // Stub : pas de backend pour le moment — placeholder ~700ms.
    await new Promise((r) => window.setTimeout(r, 700));
    setStatus("success");
    setName("");
    setInstagram("");
    setRole("");
    setMotivation("");
    window.setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Nom complet" htmlFor="join-name">
        <input
          id="join-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex : Lina B."
          className={inputClass}
        />
      </Field>

      <Field label="Instagram" htmlFor="join-instagram">
        <input
          id="join-instagram"
          type="text"
          required
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          placeholder="@ton.handle"
          className={inputClass}
        />
      </Field>

      <Field label="Univers" htmlFor="join-role">
        <select
          id="join-role"
          required
          value={role}
          onChange={(e) => setRole(e.target.value as MemberSection | "")}
          className={cn(inputClass, "appearance-none bg-[length:14px] bg-[right_18px_center] bg-no-repeat pr-12")}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>\")",
          }}
        >
          {ROLE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
              {opt.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Pourquoi BRUUX ?" htmlFor="join-motivation">
        <textarea
          id="join-motivation"
          required
          rows={4}
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          placeholder="Raconte-nous ton univers, ton parcours, ce que tu cherches…"
          className={cn(inputClass, "min-h-32 resize-y leading-relaxed")}
        />
      </Field>

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={status === "idle" ? { scale: 1.02 } : undefined}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 px-8 py-3.5 font-ui text-xs font-semibold uppercase tracking-button transition-colors",
          status === "success"
            ? "bg-bg-elevated text-accent"
            : "bg-accent text-bg-primary hover:bg-accent-hover",
          status === "submitting" && "cursor-wait opacity-70",
        )}
      >
        {status === "success" ? (
          <>
            <Check size={14} /> Demande envoyée
          </>
        ) : status === "submitting" ? (
          "Envoi…"
        ) : (
          <>
            <Send size={14} /> Rejoindre la famille
          </>
        )}
      </motion.button>

      {status === "success" && (
        <p className="font-body text-xs text-text-secondary">
          On revient vers toi sous 7 jours par DM Instagram. À très vite.
        </p>
      )}
    </form>
  );
}

const inputClass =
  "w-full border border-border-medium bg-bg-surface px-4 py-3.5 font-body text-sm text-text-primary placeholder:text-text-tertiary transition-colors focus:border-accent focus:outline-none";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block font-ui text-[10px] font-semibold uppercase tracking-label text-text-secondary"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
