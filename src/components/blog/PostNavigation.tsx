import Link from "next/link";
import type { PostMeta } from "@/lib/types";

export function PostNavigation({
  prev,
  next,
}: {
  prev: PostMeta | null;
  next: PostMeta | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Post navigation"
      className="mt-12 grid gap-4 border-t border-neutral-200 pt-8 dark:border-neutral-800 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
        >
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Previous
          </span>
          <p className="mt-1 text-sm font-medium text-neutral-900 group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group rounded-lg border border-neutral-200 p-4 text-right transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
        >
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Next
          </span>
          <p className="mt-1 text-sm font-medium text-neutral-900 group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
            {next.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
