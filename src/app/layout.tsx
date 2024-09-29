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
  title: "Alpha Code | Innovative IT Solutions for Business Growth",
  description:
    "Alpha Code delivers cutting-edge IT solutions tailored to propel your business into the future. Discover innovative technology designed for efficiency, growth, and unparalleled expertise.",
  keywords:
    "IT solutions, business technology, software development, tech consulting, digital transformation, Alpha Code",
  openGraph: {
    type: "website",
    url: "https://alpha-code.hr",
    title: "Alpha Code | Innovative IT Solutions for Business Growth",
    description:
      "Alpha Code delivers cutting-edge IT solutions tailored to propel your business into the future. Discover innovative technology designed for efficiency, growth, and unparalleled expertise.",
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
    title: "Alpha Code | Innovative IT Solutions for Business Growth",
    description:
      "Alpha Code delivers cutting-edge IT solutions tailored to propel your business into the future. Discover innovative technology designed for efficiency, growth, and unparalleled expertise.",
    images: "https://alpha-code.hr/logo-white-bg.jpg",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
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
      <body className={cn("flex min-h-[100dvh] flex-col", montserrat.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
