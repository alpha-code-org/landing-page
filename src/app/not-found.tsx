import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Alpha Code",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-8 pt-28 pb-16 text-center">
      <p className="text-sm font-medium tracking-widest text-neutral-600 uppercase dark:text-neutral-400">
        404
      </p>
      <h1 className="text-3xl font-bold text-neutral-800 md:text-5xl dark:text-white">
        Page not found
      </h1>
      <p className="text-neutral-600 md:text-lg dark:text-neutral-400">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="text-brand-code font-semibold underline-offset-4 hover:underline dark:text-blue-400"
      >
        Back to homepage
      </Link>
    </main>
  );
}
