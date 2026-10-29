"use client";

import { useRef } from "react";
import { Handshake, MessageSquareText } from "lucide-react";
import { cn } from "@/utils/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const milestones = [
  { when: "Launch", what: "Your automation goes live" },
  { when: "Every month", what: "A report of what it saved" },
  { when: "As you grow", what: "We improve and extend it" },
  { when: "Years later", what: "Still here, still running", isOngoing: true },
];

const commitments = [
  { icon: MessageSquareText, text: "If it isn't worth building, we tell you." },
  { icon: Handshake, text: "We only do well when your business does." },
];

export const Transparency = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="px-8 py-20 md:py-32">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col gap-6 text-center md:text-left">
          <p className="text-sm font-medium tracking-widest text-neutral-600 uppercase dark:text-neutral-400">
            Transparency
          </p>
          <h2 className="text-3xl font-bold text-neutral-800 md:text-5xl dark:text-white">
            Here for <span className="text-green-600 dark:text-green-400">years</span>, not weeks
          </h2>
          <p className="text-neutral-600 md:text-lg dark:text-neutral-400">
            Going live is where our work starts, not where it ends.
          </p>
          <ul className="flex flex-col items-center gap-3 md:items-start">
            {commitments.map((item) => (
              <li
                key={item.text}
                className="flex items-start gap-2 text-left text-neutral-700 dark:text-neutral-300"
              >
                <item.icon
                  className="text-brand-code mt-1 size-4 shrink-0 dark:text-blue-400"
                  aria-hidden
                />
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <ol className="dark:bg-dark-bg rounded-2xl border border-neutral-300 bg-white p-8 dark:border-neutral-800">
          {milestones.map((item, index) => (
            <li
              key={item.when}
              className={cn(
                "relative flex flex-col gap-1 border-l-2 pl-6",
                item.isOngoing
                  ? "border-dashed border-green-500 [mask-image:linear-gradient(to_bottom,black_calc(100%_-_2.5rem),transparent)] pb-10 dark:border-green-400"
                  : "border-neutral-300 pb-8 dark:border-neutral-700",
                isInView ? "animate-step-in" : "opacity-0",
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute top-1 -left-[7px] size-3 rounded-full",
                  item.isOngoing
                    ? "bg-green-500 dark:bg-green-400"
                    : "bg-brand-code dark:bg-blue-400",
                )}
              />
              <span
                className={cn(
                  "text-lg font-bold",
                  item.isOngoing
                    ? "text-green-600 dark:text-green-400"
                    : "text-neutral-800 dark:text-white",
                )}
              >
                {item.when}
              </span>
              <span className="text-neutral-600 dark:text-neutral-400">{item.what}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
