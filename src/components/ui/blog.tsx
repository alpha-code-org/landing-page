import { readdir } from "fs/promises";
import path from "path";
import ServiceCard from "../cards/ServiceCard";
import Link from "next/link";
import { CardItem } from "./3d-card";

async function getPosts() {
  const slugs = await readdir(path.join(process.cwd(), "src/app/(posts)"));

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await import(`../../app/(posts)/${slug}`);
      return { slug: slug.replace(".mdx", ""), ...metadata };
    }),
  );

  return posts;
}

const Blog = async () => {
  const posts = await getPosts();

  return (
    <section className="relative mb-20 w-full md:mb-40">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-8">
        <h2 className="mx-auto text-2xl font-bold md:text-3xl">Blog</h2>

        <ul className="grid grid-cols-12 place-items-start gap-4">
          {posts.map(({ slug, title, publishDate }) => (
            <li key={slug} className="col-span-12 flex justify-center md:col-span-6 lg:col-span-4">
              <Link href={`/blog/${slug}`}>
                <ServiceCard
                  title={title}
                  description={new Date(publishDate).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  imageSrc={`/blog/${slug}/hero.webp`}
                  width="w-full"
                >
                  <div className="mt-4 flex items-center justify-between md:mt-20">
                    <CardItem
                      translateZ={20}
                      className="rounded-xl px-4 py-2 text-base font-normal text-white"
                    >
                      Read now →
                    </CardItem>
                  </div>
                </ServiceCard>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Blog;
