import type { Heading } from "@/lib/types";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="mb-8">
      <details className="group rounded-lg border border-neutral-200 dark:border-neutral-800">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          On this page
        </summary>
        <ul className="border-t border-neutral-200 px-4 py-3 dark:border-neutral-800">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}
            >
              <a
                href={`#${heading.id}`}
                className="block py-1 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </nav>
  );
}
