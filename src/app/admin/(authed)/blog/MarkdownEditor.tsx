"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Eye, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  defaultValue?: string;
  required?: boolean;
};

export function MarkdownEditor({ name, defaultValue = "", required }: Props) {
  const [value, setValue] = useState(defaultValue);
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  return (
    <div className="border border-border-medium bg-bg-elevated">
      <div className="flex items-center justify-between border-b border-border-medium bg-bg-surface px-3 py-2">
        <div className="flex">
          <TabButton active={tab === "edit"} onClick={() => setTab("edit")}>
            <Pencil size={12} /> Édition
          </TabButton>
          <TabButton active={tab === "preview"} onClick={() => setTab("preview")}>
            <Eye size={12} /> Aperçu
          </TabButton>
        </div>
        <p className="font-ui text-[10px] uppercase tracking-label text-text-tertiary">
          Markdown · {value.length} caractères
        </p>
      </div>

      {tab === "edit" ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required={required}
          rows={18}
          spellCheck={false}
          placeholder={`# Titre\n\nUn paragraphe.\n\n## Sous-titre\n\n- Liste\n- Items\n\n> Citation\n\n\`\`\`\ncode\n\`\`\``}
          className="block w-full resize-y bg-bg-elevated px-4 py-4 font-mono text-[13px] leading-relaxed text-text-primary placeholder:text-text-tertiary focus:outline-none"
          style={{ minHeight: "420px" }}
        />
      ) : (
        <>
          <input type="hidden" name={name} value={value} />
          <div className="prose-bruux px-5 py-6">
            {value.trim().length === 0 ? (
              <p className="font-body text-sm italic text-text-tertiary">
                L&apos;aperçu apparaîtra ici dès que tu écris.
              </p>
            ) : (
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="font-heading text-3xl uppercase tracking-wide text-text-primary md:text-4xl">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mt-8 font-heading text-2xl uppercase tracking-wide text-text-primary md:text-3xl">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mt-6 font-heading text-xl uppercase tracking-wide text-accent">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mt-4 font-body text-sm leading-relaxed text-text-secondary md:text-base">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mt-4 space-y-2 font-body text-sm text-text-secondary md:text-base">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                      <span>{children}</span>
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="mt-6 border-l-2 border-accent pl-5 font-body text-sm italic text-text-secondary md:text-base">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-bg-elevated px-1.5 py-0.5 font-mono text-xs text-accent">
                      {children}
                    </code>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-accent underline underline-offset-2 hover:text-accent-hover"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {value}
              </ReactMarkdown>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 font-ui text-[10px] font-semibold uppercase tracking-button transition-colors",
        active ? "text-accent" : "text-text-secondary hover:text-text-primary",
      )}
    >
      {children}
    </button>
  );
}
