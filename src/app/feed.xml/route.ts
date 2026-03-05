import { Feed } from "feed";
import { getAllPosts } from "@/lib/content";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: siteConfig.locale,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.author.name}`,
    author: {
      name: siteConfig.author.name,
      link: siteConfig.url,
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}/blog/${post.slug}`,
      link: `${siteConfig.url}/blog/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
      author: [{ name: siteConfig.author.name }],
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
