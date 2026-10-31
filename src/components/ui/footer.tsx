import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";
import { ThemedLogo } from "./themed-logo";
import { industries } from "@/data/industries";
import {
  COMPANY_ADDRESS,
  COMPANY_COURT,
  COMPANY_MBS,
  COMPANY_VAT,
  CONTACT_EMAIL,
} from "@/utils/links";

const Footer = () => {
  return (
    <footer className="dark:bg-dark-bg relative mt-auto w-full bg-stone-100 pt-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-8">
        <Link href="/" aria-label="Go to homepage">
          <ThemedLogo width={32} height={32} />
        </Link>
        <nav aria-label="AI automation by industry" className="flex flex-col gap-3 py-6">
          <h2 className="text-sm font-medium tracking-widest text-neutral-600 uppercase dark:text-neutral-400">
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
        <div className="flex flex-col gap-6 pb-6">
          <nav aria-label="Other services" className="flex flex-col gap-3">
            <h2 className="text-sm font-medium tracking-widest text-neutral-600 uppercase dark:text-neutral-400">
              Other services
            </h2>
            <Link
              href="/codebase-audit"
              className="self-start text-sm text-neutral-600 underline-offset-4 hover:underline dark:text-neutral-400"
            >
              Codebase audit
            </Link>
            <Link
              href="/modern-website-design"
              className="self-start text-sm text-neutral-600 underline-offset-4 hover:underline dark:text-neutral-400"
            >
              Modern website design
            </Link>
          </nav>
          <nav aria-label="Resources" className="flex flex-col gap-3">
            <h2 className="text-sm font-medium tracking-widest text-neutral-600 uppercase dark:text-neutral-400">
              Resources
            </h2>
            <Link
              href="/blog"
              className="self-start text-sm text-neutral-600 underline-offset-4 hover:underline dark:text-neutral-400"
            >
              Blog
            </Link>
          </nav>
        </div>
        <div className="h-px w-full bg-neutral-300 dark:bg-neutral-800" />
        <div className="flex w-full flex-col items-center gap-4 pt-2 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-x-4 gap-y-1 text-center text-sm text-slate-600 sm:flex-row md:text-left dark:text-slate-400">
            <p>&copy; {new Date().getFullYear()} Alpha Code d.o.o. All Rights Reserved.</p>
            <Link
              href="/privacy-policy"
              className="font-medium underline underline-offset-4 transition-colors hover:text-neutral-900 dark:hover:text-white"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="flex gap-4 text-neutral-700 dark:text-white">
            <Link
              href={`mailto:${CONTACT_EMAIL}`}
              className="opacity-80 transition-opacity hover:opacity-100"
              aria-label={`Email us at ${CONTACT_EMAIL}`}
            >
              <Mail size={24} color="currentColor" />
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
        <p className="flex flex-col items-center gap-x-2 gap-y-1 pt-2 pb-6 text-center text-xs text-slate-600 md:items-start md:text-left lg:flex-row dark:text-slate-400">
          <span>{COMPANY_ADDRESS}</span>
          <span aria-hidden className="hidden lg:inline">
            ·
          </span>
          <span>
            MBS: {COMPANY_MBS} ({COMPANY_COURT})
          </span>
          <span aria-hidden className="hidden lg:inline">
            ·
          </span>
          <span>VAT: {COMPANY_VAT}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
