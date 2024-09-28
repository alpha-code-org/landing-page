import fs from "fs/promises";
import path from "path";
import { useMDXComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import { Lato } from "next/font/google";
import { cn } from "@/utils/cn";

export const dynamic = "force-static";

const CONTENT_SOURCE = "src/app/(posts)";

export async function generateStaticParams() {
  const files = await fs.readdir(path.join(process.cwd(), CONTENT_SOURCE));
  return files.map((file) => ({ slug: file.replace(".mdx", "") }));
}

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { metadata } = await import(`../../(posts)/${params.slug}`);

  return {
    title: "Alpha Code | " + metadata.title,
  };
}

export default async function BlogPost({ params: { slug } }: Params) {
  // Read the MDX file from the content source direectory
  const source = await fs.readFile(path.join(process.cwd(), CONTENT_SOURCE, `${slug}`), "utf8");

  const components = useMDXComponents({});

  return (
    <article className={cn("mx-auto w-full max-w-4xl", lato.className)}>
      {/* Render the compiled MDX content */}
      <MDXRemote source={source} components={components} />
    </article>
  );
}
