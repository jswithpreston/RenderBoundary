import { siteConfig } from "@/lib/config";

export function AuthorBio() {
  const { author } = siteConfig;

  return (
    <div className="flex items-start gap-4 rounded-lg border border-neutral-200 p-5 dark:border-neutral-800">
      <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800" />
      <div>
        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {author.name}
        </p>
        <p className="mt-0.5 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {author.bio}
        </p>
      </div>
    </div>
  );
}
