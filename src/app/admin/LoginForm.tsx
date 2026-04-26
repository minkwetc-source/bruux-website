"use client";

import { useFormState, useFormStatus } from "react-dom";
import { LogIn } from "lucide-react";
import { loginAction, type LoginState } from "./actions";
import { cn } from "@/lib/utils";

const initialState: LoginState = { error: null };

type Props = {
  redirectTo: string;
};

export function LoginForm({ redirectTo }: Props) {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirect" value={redirectTo} />

      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-ui text-[10px] font-semibold uppercase tracking-label text-text-secondary"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full border border-border-medium bg-bg-surface px-4 py-3.5 font-body text-sm text-text-primary placeholder:text-text-tertiary transition-colors focus:border-accent focus:outline-none"
          placeholder="admin@bruux.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block font-ui text-[10px] font-semibold uppercase tracking-label text-text-secondary"
        >
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full border border-border-medium bg-bg-surface px-4 py-3.5 font-body text-sm text-text-primary placeholder:text-text-tertiary transition-colors focus:border-accent focus:outline-none"
          placeholder="••••••••"
        />
      </div>

      {state.error && (
        <div className="border border-red-900/50 bg-red-950/30 px-4 py-3 font-body text-sm text-red-300">
          {state.error}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 bg-accent px-8 py-3.5 font-ui text-xs font-semibold uppercase tracking-button text-bg-primary transition-colors hover:bg-accent-hover",
        pending && "cursor-wait opacity-70",
      )}
    >
      <LogIn size={14} />
      {pending ? "Connexion…" : "Se connecter"}
    </button>
  );
}
