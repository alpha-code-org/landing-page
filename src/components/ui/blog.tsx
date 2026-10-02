import Link from "next/link";
import { getPosts } from "@/lib/getPosts";
import { PostGrid } from "../blog/post-grid";

const Blog = async () => {
  const posts = await getPosts();

  return (
    <section className="relative w-full py-20 md:mb-40">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-8">
        <h2 className="mx-auto text-2xl font-bold md:text-3xl">Blog</h2>

        <PostGrid posts={posts.slice(0, 3)} />

        {posts.length > 3 && (
          <Link
            href="/blog"
            className="mx-auto text-base font-medium text-neutral-900 underline-offset-4 hover:underline dark:text-white"
          >
            View all articles →
          </Link>
        )}
      </div>
    </section>
  );
};

export default Blog;
