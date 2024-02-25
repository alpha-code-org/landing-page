import Image from "next/image";
import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative w-full">
      <div className="mx-auto w-full max-w-7xl px-8 flex flex-col gap-4">
        <Image
          src="/logo-white.png"
          alt="alpha-logo"
          width={100}
          height={100}
        />
        <div className="w-full h-[1px] bg-slate-300 opacity-20" />
        <div className="flex w-full flex-col items-center justify-center  pb-4 md:flex-row md:justify-between">
          <p className="text-sm text-slate-400 mb-4 md:mb-0">
            &copy; {currentYear} Alpha Code d.o.o. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <Link
              href="https://twitter.com/matteoo_eth"
              target="__blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <Twitter size={24} color="currentColor" />
            </Link>
            <Link
              href="https://github.com/mateogalic112"
              target="__blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <Github size={24} color="currentColor" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/alpha-code-doo"
              target="__blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-100"
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
