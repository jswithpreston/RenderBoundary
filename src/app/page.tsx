import Link from "next/link";
import { getAllPostMeta } from "@/lib/content";
import { PostCard } from "@/components/blog/PostCard";

export default function Home() {
  const posts = getAllPostMeta().slice(0, 5);

  return (
    <div>
      <section className="pb-10">
        <h1 className="text-3xl font-bold tracking-tight">RenderBoundary</h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
          Deep dives into React, Next.js, and modern web engineering. No
          fluff&mdash;just internals, patterns, and production-grade techniques.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Posts</h2>
          <Link
            href="/blog"
            className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="mt-2 divide-y divide-neutral-100 dark:divide-neutral-800">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
