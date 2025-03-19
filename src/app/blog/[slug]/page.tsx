import fs from "fs/promises";
import path from "path";
import { useMDXComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import rehypeHighlight from "rehype-highlight";

export const dynamic = "force-static";

const CONTENT_SOURCE = "src/app/(posts)";

export async function generateStaticParams() {
  const files = await fs.readdir(path.join(process.cwd(), CONTENT_SOURCE));
  return files.map((file) => ({ slug: file.replace(".mdx", "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await import(`../../(posts)/${slug}.mdx`);

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

async function getPostContent(slug: string) {
  return await fs.readFile(path.join(process.cwd(), CONTENT_SOURCE, `${slug}.mdx`), "utf8");
}

function BlogPostContent({ source }: { source: string }) {
  const components = useMDXComponents({});

  return (
    <article className="mx-auto w-full max-w-4xl p-4 md:p-8">
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions: { rehypePlugins: [rehypeHighlight] } }}
      />
    </article>
  );
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const source = await getPostContent(slug);

  return <BlogPostContent source={source} />;
}
