import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import type { AdminUser } from "@/lib/supabase/admin";

type Props = {
  admin: AdminUser;
  title: string;
  subtitle?: string;
};

export function Header({ admin, title, subtitle }: Props) {
  const greetingName = admin.displayName ?? admin.email.split("@")[0];

  return (
    <header className="border-b border-border-subtle bg-bg-primary/95 backdrop-blur-md">
      <div className="flex flex-col gap-4 px-6 py-6 md:flex-row md:items-end md:justify-between md:px-10 md:py-8">
        <div>
          <p className="font-ui text-[10px] font-semibold uppercase tracking-label text-accent">
            Bienvenue, {greetingName}
          </p>
          <h1 className="mt-2 font-heading text-3xl uppercase tracking-wide text-text-primary md:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 max-w-xl font-body text-sm text-text-secondary">
              {subtitle}
            </p>
          )}
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 border border-border-medium bg-bg-surface px-4 py-2.5 font-ui text-[11px] font-semibold uppercase tracking-button text-text-primary transition-colors hover:border-accent hover:text-accent"
          >
            <LogOut size={13} />
            Déconnexion
          </button>
        </form>
      </div>
    </header>
  );
}
