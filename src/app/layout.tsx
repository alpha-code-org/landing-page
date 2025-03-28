import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/ui/footer";
import { cn } from "@/utils/cn";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://alpha-code.hr"),
  title: "Alpha Code | IT Solutions for Small Business Growth",
  description:
    "Alpha Code delivers cutting-edge IT solutions tailored to propel your business into the future. Discover power of AI and automation technology designed for efficiency and growth.",
  keywords:
    "software development, business tools, small business, freelancing, programming, IT consulting, digital transformation, Alpha Code",
  openGraph: {
    type: "website",
    url: "https://alpha-code.hr",
    title: "Alpha Code | IT Solutions for Small Business Growth",
    description:
      "Alpha Code delivers cutting-edge IT solutions tailored to propel your business into the future. Discover power of AI and automation technology designed for efficiency and growth.",
    siteName: "Alpha Code",
    images: [
      {
        url: "https://alpha-code.hr/logo-white-bg.jpg",
        width: 1200,
        height: 627,
        alt: "Alpha Code Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AlphaCode",
    title: "Alpha Code | IT Solutions for Small Business Growth",
    description:
      "Alpha Code delivers cutting-edge IT solutions tailored to propel your business into the future. Discover power of AI and automation technology designed for efficiency and growth.",
    images: "https://alpha-code.hr/logo-white-bg.jpg",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  alternates: {
    canonical: "https://alpha-code.hr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn("flex flex-col", montserrat.className)}>
        <ThemeProvider attribute="class" forcedTheme="dark">
          {children}
          <Footer />
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
