import Link from "next/link";
import type { PostMeta } from "@/lib/types";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group py-6">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readingTime}</span>
          </div>
          <h2 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
            {post.title}
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {post.description}
          </p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
