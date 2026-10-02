import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { cn } from "@/utils/cn";
import { SITE_URL, homeDescription, homeTitle } from "@/utils/seo";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: homeTitle,
  description: homeDescription,
  keywords:
    "AI automation, business process automation, AI automation for small businesses, AI automation agency, workflow automation, invoice automation, booking automation, AI for SMEs, custom software development, codebase audit, Alpha Code, Zagreb, Croatia",
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
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
