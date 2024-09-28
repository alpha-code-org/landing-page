import Link from "next/link";
import { readdir } from "fs/promises";
import path from "path";

export async function getPosts() {
  const slugs = await readdir(path.join(process.cwd(), "src/app/(posts)"));

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await import(`../(posts)/${slug}`);
      return { slug, ...metadata };
    }),
  );

  return posts;
}

export default async function Blog() {
  const posts = await getPosts();

  return (
    <ol>
      {posts.map(({ slug, title, publishDate }) => (
        <li key={slug}>
          <h2>
            <Link href={`blog/${slug}`}>{title}</Link>
          </h2>
          <p>
            <strong>Published:</strong> {new Date(publishDate).toLocaleDateString()}{" "}
          </p>
        </li>
      ))}
    </ol>
  );
}
