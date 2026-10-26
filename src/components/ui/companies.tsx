"use client";

import { companies } from "@/data/companies";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/utils/cn";
import { BOOKING_URL } from "@/utils/links";

export const Companies = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative py-20 md:py-32">
      <div ref={ref} className="mx-auto flex max-w-5xl flex-col items-center gap-16 px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium tracking-widest text-neutral-600 uppercase dark:text-neutral-400">
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
                isInView && "animate-fade-in-up",
              )}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={176}
                height={32}
                className="h-6 w-auto max-w-[290px] object-contain opacity-70 invert transition-opacity duration-300 hover:opacity-100 dark:invert-0"
              />
            </Link>
          ))}
        </div>

        <p
          className={cn(
            "text-center text-neutral-600 opacity-0 dark:text-neutral-400",
            isInView && "animate-fade-in-up",
          )}
          style={{ animationDelay: `${companies.length * 150}ms` }}
        >
          Want your business on this list?{" "}
          <Link
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-brand-code inline-flex items-center gap-1 font-semibold underline-offset-4 hover:underline dark:text-blue-400"
          >
            Become a trusted partner
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </p>
      </div>
    </section>
  );
};
