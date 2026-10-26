import Link from "next/link";
import { AnimatedThemeToggler } from "./theme-toggle";
import { ThemedLogo } from "./themed-logo";
import { SectionLink } from "./section-link";
import { BOOKING_URL } from "@/utils/links";

const Header = () => {
  return (
    // backdrop-blur re-blurs everything behind the fixed header on every scroll frame, which drops
    // frames on low-end phones — so small screens get a near-opaque background instead
    <header className="animate-fade-in dark:bg-dark-bg/95 md:dark:bg-dark-bg/80 fixed top-0 left-0 z-50 w-full bg-stone-100/95 opacity-0 md:bg-stone-100/90 md:backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2">
        <Link href="/" aria-label="Go to homepage">
          <ThemedLogo width={24} height={24} className="h-6 w-6" />
        </Link>
        <div className="flex items-center gap-6">
          <SectionLink
            id="pricing"
            className="text-sm font-medium text-neutral-900 underline-offset-4 hover:underline dark:text-white"
          >
            Pricing
          </SectionLink>
          <Link
            href="/blog"
            className="text-sm font-medium text-neutral-900 underline-offset-4 hover:underline dark:text-white"
          >
            Blog
          </Link>
          <AnimatedThemeToggler className="cursor-pointer" />
          <Link
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-code hover:bg-brand-alpha dark:hover:text-brand-code rounded-full px-4 py-1.5 text-sm font-bold text-white transition-colors dark:hover:bg-white"
          >
            <span className="sm:hidden">Free review</span>
            <span className="hidden sm:inline">Book a free review</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
