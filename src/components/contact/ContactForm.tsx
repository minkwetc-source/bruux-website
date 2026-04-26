"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { FloatingInput, FloatingTextarea } from "./FloatingInput";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    // Stub : pas de backend pour le moment.
    await new Promise((r) => window.setTimeout(r, 700));
    setStatus("success");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    window.setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <FloatingInput
          id="contact-name"
          label="Nom"
          value={name}
          onChange={setName}
          required
        />
        <FloatingInput
          id="contact-email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          required
        />
      </div>

      <FloatingInput
        id="contact-subject"
        label="Sujet"
        value={subject}
        onChange={setSubject}
        required
      />

      <FloatingTextarea
        id="contact-message"
        label="Message"
        rows={5}
        value={message}
        onChange={setMessage}
        required
      />

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={status === "idle" ? { scale: 1.02 } : undefined}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 px-10 py-3.5 font-ui text-xs font-semibold uppercase tracking-button transition-colors",
          status === "success"
            ? "bg-bg-elevated text-accent"
            : "bg-accent text-bg-primary hover:bg-accent-hover",
          status === "submitting" && "cursor-wait opacity-70",
        )}
      >
        {status === "success" ? (
          <>
            <Check size={14} /> Message envoyé
          </>
        ) : status === "submitting" ? (
          "Envoi…"
        ) : (
          <>
            <Send size={14} /> Envoyer le message
          </>
        )}
      </motion.button>

      {status === "success" && (
        <p className="font-body text-xs text-text-secondary">
          On revient vers toi sous 48h. Merci.
        </p>
      )}
    </form>
  );
}
