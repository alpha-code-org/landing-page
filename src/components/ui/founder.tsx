import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";

export const Founder = () => {
  return (
    <section className="px-8 py-20 md:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center md:flex-row md:items-center md:gap-10 md:text-left">
        <Image
          src="/team/mateo.webp"
          alt="Mateo Galić, founder of Alpha Code"
          width={160}
          height={160}
          sizes="(min-width: 768px) 8rem, 7rem"
          className="size-28 shrink-0 rounded-full object-cover ring-4 ring-white md:size-32 dark:ring-neutral-800"
        />

        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium tracking-widest text-neutral-600 uppercase dark:text-neutral-400">
            Who you will work with
          </p>
          <h2 className="text-2xl font-bold text-neutral-800 md:text-3xl dark:text-white">
            Hi, I&apos;m Mateo, founder of Alpha Code
          </h2>
          <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
            We are based in Zagreb and build software for companies across Europe and the US. You
            talk to me directly, from the first review to the day your automation goes live.
          </p>
          <Link
            href="https://www.linkedin.com/company/alpha-code-doo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-code inline-flex items-center gap-2 self-center text-sm font-semibold underline-offset-4 hover:underline md:self-start dark:text-blue-400"
          >
            <Linkedin className="size-4" aria-hidden />
            Alpha Code on LinkedIn
          </Link>
        </div>
      </div>
    </section>
  );
};
