import Image from "next/image";
import Link from "next/link";
import { AnimatedThemeToggler } from "./theme-toggle";

const Header = () => {
  return (
    <header className="animate-fade-in fixed top-0 left-0 z-50 w-full bg-stone-100/90 opacity-0 backdrop-blur-md [--animation-delay:300ms] dark:bg-black/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2">
        <Link href="/" aria-label="Go to homepage">
          <Image
            src="/logo.png"
            alt="alpha-logo"
            width={20}
            height={20}
            loading="lazy"
            className="hidden h-auto w-auto dark:block"
          />
          <Image
            src="/logo-dark.png"
            alt="alpha-logo"
            width={20}
            height={20}
            loading="lazy"
            className="block h-auto w-auto dark:hidden"
          />
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-sm font-medium text-neutral-900 underline-offset-4 hover:underline dark:text-white"
          >
            Blog
          </Link>
          <AnimatedThemeToggler className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
