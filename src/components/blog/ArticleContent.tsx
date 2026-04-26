import ReactMarkdown from "react-markdown";

type Props = {
  content: string;
};

/**
 * Rendu markdown stylé pour les articles BRUUX. Server component — le markdown
 * est converti en HTML au moment du SSR (idéal pour le SEO).
 *
 * Style de chaque élément respecte DESIGN.md §Typography :
 * - h2/h3 en Bebas Neue uppercase tracking
 * - p en Inter leading 1.7
 * - blockquote avec bordure or à gauche
 * - li avec bullet or custom
 * - code inline en bg-bg-elevated
 */
export function ArticleContent({ content }: Props) {
  return (
    <div className="mx-auto max-w-2xl">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="mt-14 font-heading text-3xl uppercase leading-tight tracking-wide text-white md:text-4xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-10 font-heading text-xl uppercase leading-tight tracking-wide text-accent md:text-2xl">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mt-6 font-body text-[16px] leading-[1.75] text-text-secondary md:text-[17px]">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mt-6 flex flex-col gap-2 font-body text-[16px] leading-[1.7] text-text-secondary md:text-[17px]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-6 flex list-decimal flex-col gap-2 pl-6 font-body text-[16px] leading-[1.7] text-text-secondary marker:text-accent md:text-[17px]">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="relative pl-6 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:bg-accent">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="relative mt-10 border-l-2 border-accent pl-6 font-body text-lg italic leading-[1.6] text-white md:text-xl">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="my-12 border-t border-border-subtle" />,
          code: ({ children }) => (
            <code className="bg-bg-elevated px-1.5 py-0.5 font-ui text-sm text-accent">
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
