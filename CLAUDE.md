# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `yarn dev` - Start development server at http://localhost:3000
- `yarn build` - Build production application
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier

## Technology Stack

- **Framework**: Next.js 15.2.8 (App Router)
- **React**: 19.0.0
- **TypeScript**: 5.8.2
- **Styling**: Tailwind CSS 3.4.17
- **Content**: MDX with next-mdx-remote
- **Animations**: Framer Motion 12.5.0
- **Analytics**: Vercel Analytics

## Architecture Overview

### Project Structure

This is a landing page for Alpha Code with an integrated blog. All source code lives in `src/`:

- `src/app/` - Next.js App Router pages and layouts
  - `(posts)/` - Route group containing MDX blog posts
  - `blog/[slug]/page.tsx` - Dynamic blog post renderer
- `src/components/` - Reusable components
  - `ui/` - UI components (hero sections, cards, scrolling effects)
  - `blog/` - Blog-specific components (header, footer, comments)
  - `cards/` - Card components
  - `utils/` - Data files (products, services, words)
- `src/providers/` - React context providers (theme)
- `src/utils/` - Utility functions

### Path Aliases

The project uses `@/*` to reference `./src/*` (configured in tsconfig.json).

### MDX Blog System

Blog posts are MDX files in `src/app/(posts)/`. Each post exports metadata:

```typescript
export const metadata = {
  title: "Post Title",
  description: "Post description",
  publishDate: "2025-03-27T00:00:00.000Z",
  author: "Author Name",
};
```

**Blog post workflow:**

- Posts are stored in `src/app/(posts)/*.mdx`
- Static generation via `generateStaticParams()` in `src/app/blog/[slug]/page.tsx`
- Metadata is extracted for SEO (OpenGraph, Twitter cards)
- Custom MDX components defined in `src/mdx-components.tsx`
- Syntax highlighting via rehype-highlight
- Custom header/footer components: `<BlogHeader>` and `<BlogFooter>`
- Code highlights use `<Highlight>` component
- Comments powered by Giscus (@giscus/react)

### Styling System

- **Dark theme enforced** via ThemeProvider with `forcedTheme="dark"`
- **Tailwind config** includes custom brand colors:
  - `brand-alpha`: #1E2444
  - `brand-code`: #335AA6
  - `brand-alpha-dark`: #FFFFFF
- **Custom plugin** adds all Tailwind colors as CSS variables (e.g., `var(--gray-200)`)
- **Utility function** `cn()` in `src/utils/cn.ts` merges Tailwind classes using clsx and tailwind-merge

### Main Landing Page Components

The home page (`src/app/page.tsx`) is composed of stacked sections:

1. **HeroParallax** - Parallax scrolling hero with product showcase
2. **StickyScroll** - Sticky scroll reveal for services
3. **MacbookScroll** - Macbook mockup scroll animation
4. **AuditHighlight** - Audit services highlight
5. **ChecklistTerminal** - Terminal-style checklist
6. **Typewriter** - Typewriter effect component
7. **Blog** - Blog post previews

Most UI components use client-side features ("use client") for animations and interactivity.

### Image Configuration

Remote image patterns allowed in next.config.mjs:

- aceternity.com
- source.unsplash.com
- avatars.githubusercontent.com

### Metadata & SEO

Root layout (`src/app/layout.tsx`) defines comprehensive metadata:

- OpenGraph tags with 1200x627 images
- Twitter card configuration
- Canonical URLs
- Robots directives
- Site: https://alpha-code.hr

Blog posts generate individual metadata via `generateMetadata()` with post-specific OpenGraph images.

## Code Style

- **ESLint**: Extends `next/core-web-vitals` with strict `react-hooks/exhaustive-deps` enforcement
- **Prettier**: 100 character line width with Tailwind class sorting plugin
- Format with `npm run format` before committing

## Key Implementation Patterns

- **Client components**: Mark with "use client" when using React hooks, framer-motion, or browser APIs
- **Dynamic imports**: Use `next/dynamic` for heavy client components when needed
- **MDX components**: Custom components registered in `useMDXComponents()` apply consistent styling
- **Scroll optimization**: Use `requestAnimationFrame` and passive listeners for scroll animations
