# RenderBoundary

A production-grade technical blog built with Next.js, TypeScript, and MDX. Designed for long-form engineering content — minimal, fast, and focused on readability.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Content**: MDX with frontmatter, parsed at build time
- **Styling**: Tailwind CSS + Typography plugin
- **Syntax highlighting**: Shiki via rehype-pretty-code
- **Fonts**: Inter (body) + JetBrains Mono (code)

## Project structure

```
├── content/
│   └── posts/              # MDX blog posts live here
│       └── my-post.mdx
├── public/
│   └── images/             # Static assets (cover images, avatar)
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with metadata, fonts, theme script
│   │   ├── page.tsx        # Homepage (recent posts)
│   │   ├── blog/
│   │   │   ├── page.tsx    # Blog index with search and tag filtering
│   │   │   └── [slug]/
│   │   │       └── page.tsx # Individual post page
│   │   ├── feed.xml/
│   │   │   └── route.ts    # RSS feed generator
│   │   └── sitemap.ts      # Auto-generated sitemap
│   ├── components/
│   │   ├── blog/           # Blog-specific components
│   │   ├── layout/         # Header, Footer
│   │   ├── mdx/            # MDX component overrides
│   │   └── ui/             # Reusable UI (ThemeToggle, CopyButton)
│   └── lib/
│       ├── config.ts       # Site-wide configuration
│       ├── content.ts      # Content loading and parsing
│       └── types.ts        # TypeScript interfaces
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

## Adding a new post

Create a `.mdx` file in `content/posts/`:

```mdx
---
title: "Your Post Title"
description: "A brief description for SEO and post cards."
date: "2026-03-01"
tags: ["react", "typescript"]
coverImage: "/images/my-cover.jpg"  # optional
draft: true                          # optional, hides from listing
---

Your markdown content here. You can use all standard markdown plus:

- GitHub Flavored Markdown (tables, strikethrough, task lists)
- Fenced code blocks with syntax highlighting and line highlighting
- Custom React components

## Using custom components

<Callout type="warning">
  This is a warning callout. Supports `info`, `warning`, and `error` types.
</Callout>
```

The filename becomes the URL slug: `my-post-title.mdx` → `/blog/my-post-title`.

### Frontmatter fields

| Field         | Required | Description                          |
|---------------|----------|--------------------------------------|
| `title`       | Yes      | Post title                           |
| `description` | Yes      | Short description for SEO/cards      |
| `date`        | Yes      | Publication date (YYYY-MM-DD)        |
| `tags`        | Yes      | Array of tag strings                 |
| `coverImage`  | No       | Path to cover image in `/public`     |
| `draft`       | No       | Set `true` to hide from listings     |

### Code blocks

Syntax highlighting is automatic. Use standard fenced code blocks:

````
```tsx title="components/Example.tsx"
export function Example() {
  return <div>highlighted</div>;
}
```
````

Features:
- Language detection via info string
- Optional `title` meta for filename display
- Line highlighting with `{1,3-5}` syntax
- Copy-to-clipboard button (appears on hover)

### Custom MDX components

You can use any React component inside MDX. Register new components in `src/components/mdx/index.tsx`:

```tsx
// Add to mdxComponents object
export const mdxComponents = {
  // ... existing components
  MyWidget: MyWidgetComponent,
};
```

Then use it in any `.mdx` file:

```mdx
<MyWidget prop="value" />
```

## Configuration

Edit `src/lib/config.ts` to set:

- Site name, description, URL
- Author info and bio
- Social links (GitHub, Twitter)

## Deployment

### Vercel (recommended)

Push to GitHub and import the repository on [vercel.com](https://vercel.com). Zero configuration needed — Vercel detects Next.js automatically.

### Static export

For static hosting (GitHub Pages, Netlify, etc.), add to `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};
```

Then run `npm run build` — the static site outputs to `out/`.

## Architecture decisions

**Why MDX over a CMS?** Content lives in the repo. No external dependency, no API latency, full version control. MDX gives us React component embedding for interactive examples.

**Why `next-mdx-remote` over `@next/mdx`?** `next-mdx-remote/rsc` renders MDX as a React Server Component. No client-side MDX runtime ships to the browser. `@next/mdx` works at the webpack level and doesn't support dynamic content paths as cleanly.

**Why Tailwind Typography?** The `prose` class handles all the subtle typographic details (line height, spacing, list styling, blockquote formatting) that make long-form content readable. Building this from scratch would be hundreds of lines of CSS for marginal benefit.

**Why a client-side BlogList component?** For instant search and tag filtering without round-trips. Post metadata is small (~200 bytes per post), so even with 300+ posts the payload is under 60KB. The trade-off of a small client component is worth the UX improvement over server-side filtering with page reloads.

**Why a blocking theme script?** The inline script in `<head>` runs synchronously before paint, preventing the flash of wrong theme that occurs with `useEffect`-based approaches. The ThemeToggle client component syncs state after hydration.

## Scaling to 300+ posts

The content system reads from the filesystem at build time. Build performance scales linearly with post count. For very large sites:

- Each post is independently statically generated via `generateStaticParams`
- The blog index passes only metadata (not content) to the client
- No runtime database or API — everything is computed at build time
- Incremental Static Regeneration (ISR) can be enabled per-page if needed

## License

MIT
