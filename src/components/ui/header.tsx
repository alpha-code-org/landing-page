import Image from "next/image";
import Link from "next/link";
import { AnimatedThemeToggler } from "./theme-toggle";

const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full translate-y-[-1rem] animate-fade-in bg-stone-100/90 opacity-0 backdrop-blur-[12px] [--animation-delay:300ms] dark:bg-black/80">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-2 md:px-12">
        <Link href="/" aria-label="Go to homepage">
          <Image
            src="/logo.png"
            alt="alpha-logo"
            width={20}
            height={20}
            loading="lazy"
            className="hidden dark:block"
          />
          <Image
            src="/logo-dark.png"
            alt="alpha-logo"
            width={20}
            height={20}
            loading="lazy"
            className="block dark:hidden"
          />
        </Link>
        <AnimatedThemeToggler />
      </div>
    </header>
  );
};

export default Header;
