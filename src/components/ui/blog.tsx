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

        <ul className="grid auto-rows-max grid-cols-12 place-items-start items-stretch gap-4">
          {posts
            .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
            .map(({ slug, title, publishDate }) => (
              <li
                key={slug}
                className="col-span-12 flex w-full justify-center md:col-span-6 lg:col-span-4"
              >
                <Link href={`/blog/${slug}`} className="flex w-full flex-col">
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
