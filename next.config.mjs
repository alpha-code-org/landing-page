import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        hostname: "aceternity.com",
      },
      { hostname: "source.unsplash.com" },
    ],
  },
  transpilePackages: ["next-mdx-remote"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/, // Specify file extensions for MDX
});

export default withMDX(nextConfig);
