"use client";

import { companies } from "@/utils/companies";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/utils/cn";

export const Companies = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative py-20 md:py-32">
      <div ref={ref} className="mx-auto flex max-w-5xl flex-col items-center gap-16 px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            Trusted partners
          </p>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-12 md:gap-16">
          {companies.map((company, i) => (
            <Link
              key={company.name}
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "opacity-0 transition-all duration-500 hover:scale-105",
                isInView && "animate-fade-in-up opacity-100",
              )}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={176}
                height={32}
                className="h-6 w-auto max-w-[300px] object-contain opacity-70 invert transition-opacity duration-300 hover:opacity-100 dark:invert-0"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
