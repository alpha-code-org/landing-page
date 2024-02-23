/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "aceternity.com",
      },
      { hostname: "source.unsplash.com" },
    ],
  },
};

export default nextConfig;
