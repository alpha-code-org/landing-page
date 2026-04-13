import path from "path";
import { readdir } from "fs/promises";

export async function getPosts() {
  const slugs = await readdir(path.join(process.cwd(), "src/app/(posts)"));

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await import(`../app/(posts)/${slug}`);
      return { slug: slug.replace(".mdx", ""), ...metadata };
    }),
  );

  return posts;
}
