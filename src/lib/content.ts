import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostMeta, PostFrontmatter, Heading } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "posts");

function getPostFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => /\.mdx?$/.test(file));
}

function parsePost(slug: string): Post | null {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  if (frontmatter.draft) return null;

  return {
    slug,
    content,
    readingTime: readingTime(content).text,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    tags: frontmatter.tags ?? [],
    coverImage: frontmatter.coverImage,
  };
}

export function getAllPosts(): Post[] {
  return getPostFiles()
    .map((file) => file.replace(/\.mdx?$/, ""))
    .map(parsePost)
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllPostMeta(): PostMeta[] {
  return getAllPosts().map(({ content: _, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | null {
  return parsePost(slug);
}

export function getAllSlugs(): string[] {
  return getPostFiles().map((file) => file.replace(/\.mdx?$/, ""));
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

export function getAdjacentPosts(
  slug: string
): { prev: PostMeta | null; next: PostMeta | null } {
  const posts = getAllPostMeta();
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const regex = /^(#{2,4})\s+(.+)$/gm;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const text = match[2]
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/`(.+?)`/g, "$1")
      .replace(/\[(.+?)\]\(.+?\)/g, "$1")
      .trim();

    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({ level: match[1].length, text, id });
  }

  return headings;
}
