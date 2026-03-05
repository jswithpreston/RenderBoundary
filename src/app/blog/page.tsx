import type { Metadata } from "next";
import { getAllPostMeta, getAllTags } from "@/lib/content";
import { BlogList } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description: "All posts on React, Next.js, TypeScript, and web engineering.",
};

export default function BlogPage() {
  const posts = getAllPostMeta();
  const tags = getAllTags();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {posts.length} posts
        </p>
      </div>
      <BlogList posts={posts} tags={tags} />
    </div>
  );
}
