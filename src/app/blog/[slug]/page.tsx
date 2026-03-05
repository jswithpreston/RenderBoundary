import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import {
  getPostBySlug,
  getAllSlugs,
  getAdjacentPosts,
  extractHeadings,
} from "@/lib/content";
import { siteConfig } from "@/lib/config";
import { mdxComponents } from "@/components/mdx";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { PostNavigation } from "@/components/blog/PostNavigation";
import { Newsletter } from "@/components/blog/Newsletter";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${post.slug}`,
      authors: [siteConfig.author.name],
      ...(post.coverImage && {
        images: [{ url: post.coverImage }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(post.coverImage && { images: [post.coverImage] }),
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const { prev, next } = getAdjacentPosts(slug);

  return (
    <article>
      <header className="mb-8">
        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          {post.title}
        </h1>
        <p className="mt-2 text-base text-neutral-600 dark:text-neutral-400">
          {post.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <TableOfContents headings={headings} />

      <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypePrettyCode,
                  {
                    theme: "github-dark-dimmed",
                    defaultLang: "plaintext",
                    keepBackground: true,
                  },
                ],
              ],
            },
          }}
        />
      </div>

      <div className="mt-12 space-y-8">
        <AuthorBio />
        <Newsletter />
        <PostNavigation prev={prev} next={next} />
      </div>
    </article>
  );
}
