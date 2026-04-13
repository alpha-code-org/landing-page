import { Metadata } from "next";
import { getPosts } from "@/lib/getPosts";
import { PostCard } from "@/components/blog/post-card";
import { sortByDate } from "@/utils/post";

export const metadata: Metadata = {
  title: "Alpha Code | Blog",
  description: "Articles on software development, AI, and the craft of programming.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main>
      <section className="relative w-full py-20 md:mb-40">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-8">
          <h2 className="mx-auto text-2xl font-bold md:text-3xl">Blog</h2>

          <ul className="grid auto-rows-max grid-cols-12 place-items-start items-stretch gap-4">
            {sortByDate(posts).map((post) => (
              <li
                key={post.slug}
                className="col-span-12 flex w-full justify-center md:col-span-6 lg:col-span-4"
              >
                <PostCard {...post} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
