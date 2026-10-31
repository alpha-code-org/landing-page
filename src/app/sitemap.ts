import { MetadataRoute } from "next";
import { getPosts } from "@/lib/getPosts";
import { industries } from "@/data/industries";
import { SITE_URL } from "@/utils/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...industries.map((industry) => ({
      url: `${SITE_URL}/ai-automation/${industry.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/codebase-audit`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/modern-website-design`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.6 },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
