import { Metadata } from "next";

export const SITE_URL = "https://alpha-code.hr";

export const homeTitle = "Alpha Code | AI Automation for Small and Medium Businesses";
export const homeDescription =
  "Alpha Code builds AI automation for small and medium businesses: invoices entered automatically, bookings and enquiries answered around the clock, paperwork filled in for you. Start with a free review of what your business can automate.";

const defaultImage = {
  url: `${SITE_URL}/logo-white-bg.jpg`,
  width: 1200,
  height: 627,
  alt: "Alpha Code Logo",
};

// Next replaces a parent's openGraph and twitter objects instead of merging
// them, so every page builds its own from here, with its own canonical URL.
export function pageMetadata({
  path,
  title,
  description,
  type = "website",
}: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type, url, title, description, siteName: "Alpha Code", images: [defaultImage] },
    twitter: {
      card: "summary_large_image",
      site: "@matteoo_eth",
      title,
      description,
      images: defaultImage.url,
    },
  };
}
