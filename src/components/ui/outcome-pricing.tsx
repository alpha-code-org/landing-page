"use client";

import { Fragment, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const feeStages = [
  { when: "Before it works", figure: "€0", detail: "No upfront fee" },
  { when: "Year one", figure: "50%", detail: "of the savings we prove" },
  {
    when: "Year two onwards",
    figure: "100%",
    detail: "of the savings are yours",
    isHighlight: true,
  },
];

export const OutcomePricing = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="pricing"
      className="scroll-mt-12 bg-stone-200/30 px-8 py-20 md:py-32 dark:bg-transparent"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium tracking-widest text-neutral-600 uppercase dark:text-neutral-400">
            Outcome-based pricing
          </p>
          <h2 className="text-2xl font-bold text-neutral-800 md:text-4xl dark:text-white">
            We get paid when it pays off
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">You pay for results, not hours.</p>
        </div>

        <ol className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {feeStages.map((stage, index) => (
            <Fragment key={stage.when}>
              {index > 0 && (
                <li aria-hidden className="place-self-center">
                  <ArrowRight className="size-5 text-neutral-400 max-md:rotate-90" />
                </li>
              )}
              <li
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl border p-6 text-center md:p-8",
                  stage.isHighlight
                    ? "border-green-500 bg-green-500/10 dark:border-green-400"
                    : "dark:bg-dark-bg border-neutral-300 bg-white dark:border-neutral-800",
                  isInView ? "animate-step-in" : "opacity-0",
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  {stage.when}
                </span>
                <span
                  className={cn(
                    "text-5xl font-bold tabular-nums md:text-6xl",
                    stage.isHighlight
                      ? "text-green-600 dark:text-green-400"
                      : "text-neutral-800 dark:text-white",
                  )}
                >
                  {stage.figure}
                </span>
                <span className="text-neutral-700 dark:text-neutral-300">{stage.detail}</span>
              </li>
            </Fragment>
          ))}
        </ol>

        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          No savings, no fee. Results are reported monthly, running costs passed on at cost.
        </p>
      </div>
    </section>
  );
};
