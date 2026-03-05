import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 px-6 py-8 text-sm text-neutral-500 dark:text-neutral-400 sm:flex-row sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex gap-4">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            GitHub
          </a>
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
