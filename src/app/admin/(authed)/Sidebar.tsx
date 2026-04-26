"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  FileText,
  Home,
  Image as ImageIcon,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", Icon: Home },
  { href: "/admin/evenements", label: "Événements", Icon: Calendar },
  { href: "/admin/blog", label: "Blog", Icon: FileText },
  { href: "/admin/galerie", label: "Galerie", Icon: ImageIcon },
  { href: "/admin/famille", label: "Famille", Icon: Users },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border-subtle bg-bg-surface md:flex md:flex-col">
      <div className="border-b border-border-subtle px-6 py-6">
        <p className="font-heading text-2xl uppercase tracking-[0.2em] text-text-primary">
          BRUUX.
        </p>
        <p className="mt-1 font-ui text-[9px] font-semibold uppercase tracking-label text-accent">
          Administration
        </p>
      </div>

      <nav className="flex-1 px-3 py-6">
        <ul className="space-y-1">
          {NAV.map(({ href, label, Icon }) => {
            const active =
              pathname === href ||
              (href !== "/admin/dashboard" && pathname?.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "group relative flex items-center gap-3 px-4 py-3 font-ui text-xs font-semibold uppercase tracking-button transition-colors",
                    active
                      ? "bg-bg-elevated text-accent"
                      : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 bg-accent transition-opacity",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <Icon size={15} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border-subtle px-6 py-4">
        <p className="font-body text-[10px] uppercase tracking-label text-text-tertiary">
          v1.0 · BRUUX Studio
        </p>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="border-b border-border-subtle bg-bg-surface md:hidden">
      <ul className="flex overflow-x-auto px-3 py-2 scrollbar-hide">
        {NAV.map(({ href, label, Icon }) => {
          const active =
            pathname === href ||
            (href !== "/admin/dashboard" && pathname?.startsWith(href));
          return (
            <li key={href} className="shrink-0">
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 font-ui text-[11px] font-semibold uppercase tracking-button transition-colors",
                  active
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                <Icon size={13} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
