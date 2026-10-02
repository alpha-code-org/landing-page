import { Metadata } from "next";
import { Comments } from "@/components/blog/comments";
import { getPostContent, getPostMetadata, getPostSlugs } from "@/lib/getPosts";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const metadata = await getPostMetadata(slug);

  return {
    title: "Alpha Code | " + metadata.title,
    description: metadata.description,
    openGraph: {
      type: "article",
      authors: [metadata.author],
      publishedTime: metadata.publishDate,
      url: `https://alpha-code.hr/blog/${slug}`,
      title: "Alpha Code | " + metadata.title,
      description: metadata.description,
      siteName: "Alpha Code",
      images: [
        {
          url: `https://alpha-code.hr/blog/${slug}/hero.webp`,
          width: 1200,
          height: 627,
          alt: "Alpha Code | " + metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@AlphaCode",
      title: "Alpha Code | " + metadata.title,
      description: metadata.description,
      images: `https://alpha-code.hr/blog/${slug}/hero.webp`,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const PostContent = await getPostContent(slug);

  return (
    <div className="min-h-screen bg-stone-100 py-8 md:py-16 dark:bg-neutral-900">
      <article className="mx-auto w-full max-w-prose rounded-2xl bg-stone-50 px-6 py-8 shadow-sm md:px-12 md:py-12 lg:max-w-4xl dark:bg-neutral-800">
        <PostContent />
        <Comments />
      </article>
    </div>
  );
}
