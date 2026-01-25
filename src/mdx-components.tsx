import type { MDXComponents } from "mdx/types";
import Highlight from "./components/blog/highlight";
import { BlogHeader } from "./components/blog/header";
import Image from "next/image";
import { BlogFooter } from "./components/blog/footer";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Highlight,
    BlogHeader: ({ author }: { author: string }) => <BlogHeader author={author} />,
    BlogFooter: ({ publishDate }: { publishDate: string }) => (
      <BlogFooter publishDate={publishDate} />
    ),
    h1: ({ children }) => (
      <h1 className="mb-6 text-2xl font-bold leading-tight text-stone-900 dark:text-white md:mb-8 md:text-3xl lg:text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 text-xl font-semibold text-stone-800 dark:text-stone-100 md:text-2xl lg:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 text-lg font-semibold text-stone-800 dark:text-stone-200 md:text-xl">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-6 text-base leading-relaxed text-stone-700 dark:text-stone-300 md:text-lg md:leading-8">
        {children}
      </p>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-2 transition-colors hover:text-blue-800 hover:decoration-blue-800/50 dark:text-blue-400 dark:decoration-blue-400/30 dark:hover:text-blue-300"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="rounded-md bg-stone-100 px-1.5 py-0.5 font-mono text-sm text-stone-800 dark:bg-neutral-800 dark:text-stone-200">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-6 overflow-x-auto rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm dark:border-neutral-700 dark:bg-neutral-800">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 rounded-r-lg border-l-4 border-blue-500 bg-blue-50 py-4 pl-6 pr-4 text-stone-700 dark:border-blue-400 dark:bg-blue-950/30 dark:text-stone-300">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="mb-6 ml-4 list-disc space-y-2 text-stone-700 marker:text-stone-400 dark:text-stone-300 dark:marker:text-stone-500 md:ml-6">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-6 ml-4 list-decimal space-y-2 text-stone-700 marker:text-stone-500 dark:text-stone-300 dark:marker:text-stone-400 md:ml-6">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-base leading-relaxed md:text-lg">{children}</li>
    ),
    hr: () => <hr className="my-10 border-stone-200 dark:border-neutral-700" />,
    figure: ({ children }) => <figure className="my-8 text-center">{children}</figure>,
    figcaption: ({ children }) => (
      <figcaption className="mx-auto mt-3 block text-sm text-stone-500 dark:text-stone-400">
        {children}
      </figcaption>
    ),
    img: (props) => (
      <Image
        src={props.src as string}
        className="mx-auto w-full max-w-4xl rounded-lg shadow-md"
        alt={props.alt || "Image"}
        width={800}
        height={500}
        loading="lazy"
      />
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-stone-900 dark:text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-stone-600 dark:text-stone-400">{children}</em>,
    ...components,
  };
}
