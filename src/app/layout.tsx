import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alpha Code | IT Solutions",
  description:
    "Dive into the future of IT with Alpha Code, where cutting-edge solutions meet unparalleled expertise. Our platform is designed to propel your business into a new era of efficiency, innovation, and growth. Discover the power of technology tailored to your unique needs.",
  openGraph: {
    type: "website",
    url: "https://alpha-code.hr",
    title: "Alpha Code | IT Solutions",
    description:
      "Dive into the future of IT with Alpha Code, where cutting-edge solutions meet unparalleled expertise. Our platform is designed to propel your business into a new era of efficiency, innovation, and growth. Discover the power of technology tailored to your unique needs.",
    images: [
      {
        url: "https://alpha-code.hr/logo-white-bg.jpg",
        width: 1200,
        height: 627,
        alt: "Alpha Code | IT Solutions",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
