import Link from "next/link";
import { industries } from "@/components/utils/industries";

export const Industries = () => {
  return (
    <section className="relative px-8 py-20 md:py-32">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium tracking-widest text-neutral-500 uppercase">
            AI automation by industry
          </p>
          <h2 className="text-2xl font-bold text-neutral-800 md:text-4xl dark:text-white">
            What we automate
          </h2>
        </div>

        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {industries.map((industry) => (
            <li
              key={industry.slug}
              className="border-t border-neutral-300 pt-4 dark:border-neutral-800"
            >
              <Link href={`/ai-automation/${industry.slug}`} className="group block">
                <h3 className="font-bold text-neutral-800 underline-offset-4 group-hover:underline dark:text-white">
                  {industry.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {industry.automation}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
