"use client";

import { useRef } from "react";
import { MessageSquareText } from "lucide-react";
import { cn } from "@/utils/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const milestones = [
  { when: "Launch", what: "Your automation goes live" },
  { when: "Month 1", what: "Monthly savings verified" },
  { when: "Year 1", what: "Extending as your business grows" },
  { when: "Year 5+", what: "Still here, still running", isOngoing: true },
];

export const Transparency = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="overflow-hidden px-8 py-20 md:py-32">
      <div className="mx-auto flex max-w-5xl flex-col gap-14 md:gap-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium tracking-widest text-neutral-600 uppercase dark:text-neutral-400">
            Transparency
          </p>
          <h2 className="text-3xl font-bold text-neutral-800 md:text-5xl dark:text-white">
            We don&apos;t leave after{" "}
            <span className="text-green-600 dark:text-green-400">launch</span>
          </h2>
          <p className="max-w-xl text-neutral-600 md:text-lg dark:text-neutral-400">
            We only do well when your business does.
          </p>
        </div>

        <ol className="grid md:grid-cols-4">
          {milestones.map((item, index) => (
            <li
              key={item.when}
              className={cn(
                "relative flex flex-col gap-1 pb-10 pl-8 md:pt-8 md:pr-6 md:pb-0 md:pl-0",
                isInView ? "animate-step-in" : "opacity-0",
              )}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute top-2 bottom-0 left-[5px] w-0.5 md:top-[5px] md:right-0 md:bottom-auto md:left-0 md:h-0.5 md:w-auto",
                  item.isOngoing
                    ? "border-l-2 border-dashed border-green-500 [mask-image:linear-gradient(to_bottom,black,transparent)] md:-right-[50vw] md:border-t-2 md:border-l-0 md:[mask-image:linear-gradient(to_right,black,transparent_40%)] dark:border-green-400"
                    : "bg-neutral-300 dark:bg-neutral-700",
                )}
              />
              <span aria-hidden className="absolute top-1 left-0 flex size-3 md:top-0">
                {item.isOngoing && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-60 dark:bg-green-400" />
                )}
                <span
                  className={cn(
                    "relative size-3 rounded-full",
                    item.isOngoing
                      ? "bg-green-500 dark:bg-green-400"
                      : "bg-brand-code dark:bg-blue-400",
                  )}
                />
              </span>
              <span
                className={cn(
                  "text-3xl font-bold tabular-nums md:text-4xl",
                  item.isOngoing
                    ? "text-green-600 dark:text-green-400"
                    : "text-neutral-800 dark:text-white",
                )}
              >
                {item.when}
              </span>
              <span className="text-neutral-600 md:text-lg dark:text-neutral-400">{item.what}</span>
            </li>
          ))}
        </ol>

        <div className="dark:bg-dark-bg flex flex-col items-center gap-4 rounded-2xl border border-neutral-300 bg-white p-6 text-center md:flex-row md:items-start md:gap-5 md:p-8 md:text-left dark:border-neutral-800">
          <span className="text-brand-code flex size-10 shrink-0 items-center justify-center rounded-full bg-stone-100 dark:bg-neutral-900 dark:text-blue-400">
            <MessageSquareText className="size-5" aria-hidden />
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-neutral-800 md:text-xl dark:text-white">
              Not worth building? We&apos;ll tell you
            </h3>
            <p className="text-neutral-600 md:text-lg dark:text-neutral-400">
              If it won&apos;t pay off or fit your long-term vision, we&apos;ll honestly say so.{" "}
              <strong className="font-semibold text-neutral-800 dark:text-white">
                No cost to you.
              </strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
