import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    // Inline the CSS into the HTML so it doesn't block first paint with an extra request
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "aceternity.com",
      },
      { hostname: "source.unsplash.com" },
      { hostname: "avatars.githubusercontent.com" },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/, // Specify file extensions for MDX
  options: {
    // Plugins are referenced by name so the config stays serializable for Turbopack
    rehypePlugins: ["rehype-highlight"],
  },
});

export default withMDX(nextConfig);
