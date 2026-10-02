"use client";

import Link from "next/link";
import { useState } from "react";
import { industries } from "@/data/industries";
import { cn } from "@/utils/cn";

const INITIAL_VISIBLE_COUNT = 4;

export const Industries = () => {
  const [isExpanded, setIsExpanded] = useState(false);

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
          {industries.map((industry, i) => (
            <li
              key={industry.slug}
              className={cn(
                "border-t border-neutral-300 pt-4 dark:border-neutral-800",
                !isExpanded && i >= INITIAL_VISIBLE_COUNT && "hidden",
              )}
            >
              <Link href={`/ai-automation/${industry.slug}`} className="group block">
                <h3 className="font-bold text-neutral-800 underline-offset-4 group-hover:underline dark:text-white">
                  {industry.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
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
            className="self-center rounded-full border border-neutral-300 px-5 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-900"
          >
            Show {industries.length - INITIAL_VISIBLE_COUNT} more industries
          </button>
        )}
      </div>
    </section>
  );
};
