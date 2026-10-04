import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    // Inline the CSS into the HTML so it doesn't block first paint with an extra request
    inlineCss: true,
  },
  images: {
    // Next's defaults start at 640w, too big for the small cards whose `sizes` use vw
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
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
