import Image from "next/image";
import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-auto w-full bg-black pt-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-8">
        <Link href="/" aria-label="Go to homepage">
          <Image src="/logo-white.png" alt="alpha-logo" width={100} height={100} loading="lazy" />
        </Link>
        <div className="h-[1px] w-full bg-slate-300 opacity-20" />
        <div className="flex w-full flex-col items-center justify-center pb-4 md:flex-row md:justify-between">
          <p className="mb-4 text-sm text-slate-400 md:mb-0">
            &copy; {new Date().getFullYear()} Alpha Code d.o.o. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-white sm:justify-center">
            <Link
              href="https://twitter.com/matteoo_eth"
              target="__blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-100"
              aria-label="Follow us on Twitter"
            >
              <Twitter size={24} color="currentColor" />
            </Link>
            <Link
              href="https://github.com/mateogalic112"
              target="__blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-100"
              aria-label="View our GitHub profile"
            >
              <Github size={24} color="currentColor" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/alpha-code-doo"
              target="__blank"
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
