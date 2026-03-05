"use client";

import { useState, useMemo } from "react";
import type { PostMeta } from "@/lib/types";
import { PostCard } from "./PostCard";

export function BlogList({
  posts,
  tags,
}: {
  posts: PostMeta[];
  tags: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = posts;

    if (activeTag) {
      result = result.filter((p) => p.tags.includes(activeTag));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [posts, query, activeTag]);

  return (
    <div>
      <div className="mb-6">
        <input
          type="search"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-500 dark:focus:border-neutral-600"
          aria-label="Search posts"
        />
      </div>

      {tags.length > 0 && (
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by tag"
        >
          <button
            onClick={() => setActiveTag(null)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              activeTag === null
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeTag === tag
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {filtered.length > 0 ? (
          filtered.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="py-12 text-center text-sm text-neutral-500">
            No posts found.
          </p>
        )}
      </div>
    </div>
  );
}
