import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";
import { ThemedLogo } from "./themed-logo";
import { industries } from "@/data/industries";

const Footer = () => {
  return (
    <footer className="relative mt-auto w-full bg-stone-100 pt-8 dark:bg-neutral-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-8">
        <Link href="/" aria-label="Go to homepage">
          <ThemedLogo width={32} height={32} />
        </Link>
        <nav aria-label="AI automation by industry" className="flex flex-col gap-3 py-6">
          <h2 className="text-sm font-medium tracking-widest text-neutral-500 uppercase">
            AI automation by industry
          </h2>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 md:grid-cols-5">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={`/ai-automation/${industry.slug}`}
                  className="text-sm text-neutral-600 underline-offset-4 hover:underline dark:text-neutral-400"
                >
                  {industry.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="h-px w-full bg-neutral-300 dark:bg-neutral-800" />
        <div className="flex w-full flex-col items-center justify-center pb-4 md:flex-row md:justify-between">
          <p className="mb-4 text-sm text-slate-600 md:mb-0 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Alpha Code d.o.o. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-neutral-700 sm:justify-center dark:text-white">
            <Link
              href="https://twitter.com/matteoo_eth"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-100"
              aria-label="Follow us on Twitter"
            >
              <Twitter size={24} color="currentColor" />
            </Link>
            <Link
              href="https://github.com/mateogalic112"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-100"
              aria-label="View our GitHub profile"
            >
              <Github size={24} color="currentColor" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/alpha-code-doo"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-100"
              aria-label="Connect with us on LinkedIn"
            >
              <Linkedin size={24} color="currentColor" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
