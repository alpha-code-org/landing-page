import { pageMetadata } from "@/utils/seo";
import { getPosts } from "@/lib/getPosts";
import { PostGrid } from "@/components/blog/post-grid";

export const metadata = pageMetadata({
  path: "/blog",
  title: "Alpha Code | Blog",
  description: "Articles on AI automation, software development and the craft of programming.",
});
export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main>
      <section className="relative w-full py-20 md:mb-40">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-8">
          <h1 className="mx-auto text-2xl font-bold md:text-3xl">Blog</h1>

          <PostGrid posts={posts} />
        </div>
      </section>
    </main>
  );
}
