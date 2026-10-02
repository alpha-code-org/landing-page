import { MetadataRoute } from "next";
import { getPosts } from "@/lib/getPosts";
import { industries } from "@/components/utils/industries";

const BASE_URL = "https://alpha-code.hr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  return [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
    ...industries.map((industry) => ({
      url: `${BASE_URL}/ai-automation/${industry.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.6 },
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
