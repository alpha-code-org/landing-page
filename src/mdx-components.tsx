import type { MDXComponents } from "mdx/types";
import Highlight from "./components/blog/highlight";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Highlight,
    h1: ({ children }) => <h1 className="mb-12 text-4xl font-bold text-white">{children}</h1>,
    h2: ({ children }) => <h2 className="mb-4 text-3xl font-semibold text-gray-300">{children}</h2>,
    p: ({ children }) => <p className="mb-6 text-lg leading-7 text-gray-300">{children}</p>,
    a: ({ children, href }) => (
      <a href={href} className="text-white underline transition-colors hover:text-gray-300">
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="block rounded px-2 py-1 text-sm text-gray-300">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="mb-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-200">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="rounded-md border-l-4 border-gray-700 bg-gray-800 p-4 pl-4 italic text-gray-400">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-inside list-disc text-gray-300">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-inside list-decimal text-gray-300">{children}</ol>
    ),
    li: ({ children }) => <li className="mb-2">{children}</li>,
    figure: ({ children }) => <figure className="my-6 text-center">{children}</figure>,
    figcaption: ({ children }) => (
      <figcaption className="mx-auto mt-2 block text-sm text-gray-400">{children}</figcaption>
    ),
    img: (props) => (
      <Image
        src={props.src as string}
        className="mx-auto w-full max-w-4xl rounded-lg shadow-lg"
        alt={props.alt || "Image"}
        width={400} // You can set default width and height
        height={250}
      />
    ),
    ...components,
  };
}
