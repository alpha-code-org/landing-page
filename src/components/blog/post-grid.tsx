import type { Post } from "@/lib/getPosts";
import { PostCard } from "./post-card";

export function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <ul className="grid auto-rows-max grid-cols-12 place-items-start items-stretch gap-4">
      {posts.map((post) => (
        <li
          key={post.slug}
          className="col-span-12 flex w-full justify-center md:col-span-6 lg:col-span-4"
        >
          <PostCard {...post} />
        </li>
      ))}
    </ul>
  );
}
