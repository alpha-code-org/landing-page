import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="animate-fade-in fixed left-0 top-0 z-50 w-full translate-y-[-1rem] opacity-0 backdrop-blur-[12px] [--animation-delay:300ms]">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-2 md:px-8">
        <Link href="/" aria-label="Go to homepage">
          <Image src="/logo-white.png" alt="alpha-logo" width={40} height={40} loading="lazy" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
