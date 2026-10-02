import fs from "fs/promises";
import path from "path";
import { useMDXComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import rehypeHighlight from "rehype-highlight";
import { Comments } from "@/components/blog/comments";
import { SITE_URL, pageMetadata } from "@/utils/seo";

export const dynamic = "force-static";

const CONTENT_SOURCE = "src/app/(posts)";

export async function generateStaticParams() {
  const files = await fs.readdir(path.join(process.cwd(), CONTENT_SOURCE));
  return files.map((file) => ({ slug: file.replace(".mdx", "") }));
}

async function getPostMetadata(slug: string) {
  const { metadata } = await import(`../../(posts)/${slug}.mdx`);
  return metadata as { title: string; description: string; author: string; publishDate: string };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostMetadata(slug);
  const title = "Alpha Code | " + post.title;
  const image = {
    url: `${SITE_URL}/blog/${slug}/hero.webp`,
    width: 1200,
    height: 627,
    alt: title,
  };
  const base = pageMetadata({
    path: `/blog/${slug}`,
    title,
    description: post.description,
    type: "article",
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      authors: [post.author],
      publishedTime: post.publishDate,
      images: [image],
    },
    twitter: { ...base.twitter, images: image.url },
  };
}

async function getPostContent(slug: string) {
  return await fs.readFile(path.join(process.cwd(), CONTENT_SOURCE, `${slug}.mdx`), "utf8");
}

function BlogPostContent({ source, structuredData }: { source: string; structuredData: object }) {
  const components = useMDXComponents({});

  return (
    <div className="min-h-screen bg-stone-100 py-8 md:py-16 dark:bg-neutral-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="mx-auto w-full max-w-prose rounded-2xl bg-stone-50 px-6 py-8 shadow-sm md:px-12 md:py-12 lg:max-w-4xl dark:bg-neutral-800">
        <MDXRemote
          source={source}
          components={components}
          options={{ mdxOptions: { rehypePlugins: [rehypeHighlight] } }}
        />
        <Comments />
      </article>
    </div>
  );
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [source, post] = await Promise.all([getPostContent(slug), getPostMetadata(slug)]);
  const url = `${SITE_URL}/blog/${slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishDate,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Alpha Code", url: SITE_URL },
    image: `${url}/hero.webp`,
    url,
    mainEntityOfPage: url,
  };

  return <BlogPostContent source={source} structuredData={structuredData} />;
}
