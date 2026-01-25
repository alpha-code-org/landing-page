import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/ui/footer";
import { cn } from "@/utils/cn";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

const title = "Alpha Code | We craft beautiful software";
const description =
  "Alpha Code delivers custom software solutions and in-depth codebase audits. We help businesses improve performance, security, and scalability through smart technology and clean code.";

export const metadata: Metadata = {
  metadataBase: new URL("https://alpha-code.hr"),
  title,
  description,
  keywords:
    "software development, codebase audit, business tools, small business, freelancing, programming, IT consulting, digital transformation, Alpha Code, AI, automation",
  openGraph: {
    type: "website",
    url: "https://alpha-code.hr",
    title,
    description,
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
    title,
    description,
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
    <html lang="en" suppressHydrationWarning>
      <body className={cn("flex flex-col bg-stone-100 dark:bg-black", montserrat.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
