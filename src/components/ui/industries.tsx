"use client";

import Link from "next/link";
import { useState } from "react";
import { industries } from "@/data/industries";
import { cn } from "@/utils/cn";

const INITIAL_VISIBLE_COUNT = 4;

export const Industries = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium tracking-widest text-neutral-600 uppercase dark:text-neutral-400">
            What we automate
          </p>
          <h2 className="text-2xl font-bold text-neutral-800 md:text-4xl dark:text-white">
            AI automation for your industry
          </h2>
        </div>

        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {industries.map((industry, i) => (
            <li
              key={industry.slug}
              className={cn(
                "border-t border-neutral-300 pt-4 dark:border-neutral-800",
                !isExpanded && i >= INITIAL_VISIBLE_COUNT && "hidden",
              )}
            >
              <Link href={`/ai-automation/${industry.slug}`} className="group block">
                <h3 className="text-lg font-bold text-neutral-800 underline-offset-4 group-hover:underline md:text-xl dark:text-white">
                  {industry.name}
                </h3>
                <p className="mt-2 leading-relaxed text-neutral-600 md:text-lg dark:text-neutral-400">
                  {industry.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        {!isExpanded && industries.length > INITIAL_VISIBLE_COUNT && (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="hover:border-brand-code hover:text-brand-code cursor-pointer self-center rounded-full border border-neutral-300 px-5 py-2 font-medium text-neutral-800 transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-50 hover:shadow-md active:translate-y-0 dark:border-neutral-800 dark:text-white dark:hover:border-blue-400 dark:hover:bg-neutral-900 dark:hover:text-blue-400"
          >
            Show {industries.length - INITIAL_VISIBLE_COUNT} more industries
          </button>
        )}
      </div>
    </section>
  );
};
