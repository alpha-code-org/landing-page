import path from "path";
import { readdir } from "fs/promises";
import type { MDXContent } from "mdx/types";

export const POSTS_DIR = path.join(process.cwd(), "src/app/(posts)");

export type PostMetadata = {
  title: string;
  description: string;
  publishDate: string;
  author: string;
};

export type Post = PostMetadata & { slug: string };

export async function getPostSlugs() {
  const files = await readdir(POSTS_DIR);
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
}

async function importPost(slug: string): Promise<{ default: MDXContent; metadata: PostMetadata }> {
  return import(`../app/(posts)/${slug}.mdx`);
}

export async function getPostMetadata(slug: string) {
  return (await importPost(slug)).metadata;
}

// Compiled post body; MDX element overrides come from src/mdx-components.tsx
export async function getPostContent(slug: string) {
  return (await importPost(slug)).default;
}

// All posts, newest first
export async function getPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => ({ slug, ...(await getPostMetadata(slug)) })),
  );

  return posts.sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  );
}
