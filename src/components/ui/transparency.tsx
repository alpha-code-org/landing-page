"use client";

import { useRef } from "react";
import { Handshake, MessageSquareText, TrendingUp } from "lucide-react";
import { cn } from "@/utils/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const commitments = [
  {
    icon: MessageSquareText,
    title: "Honest from day one",
    description:
      "If an automation isn't worth building, we tell you and don't build it. If something stops working, you hear it from us first.",
  },
  {
    icon: Handshake,
    title: "A win for both sides",
    description:
      "We only do well when your business does. That keeps us focused on the work that saves you the most, not the work that makes the biggest invoice.",
  },
  {
    icon: TrendingUp,
    title: "Here for the long run",
    description:
      "Going live is where the work starts. We keep your automations running and improve them as your business grows.",
  },
];

export const Transparency = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="px-8 py-20 md:py-32">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[2fr_3fr] md:gap-16">
        <div className="flex flex-col gap-4 text-center md:text-left">
          <p className="text-sm font-medium tracking-widest text-neutral-600 uppercase dark:text-neutral-400">
            Transparency
          </p>
          <h2 className="text-2xl font-bold text-neutral-800 md:text-4xl dark:text-white">
            A partner, not a one-off project
          </h2>
          <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
            We want to work with you for years, not weeks. That only happens if you can trust every
            number we show you.
          </p>
        </div>

        <ul className="flex flex-col gap-8">
          {commitments.map((item, index) => (
            <li
              key={item.title}
              className={cn("flex gap-4", isInView ? "animate-step-in" : "opacity-0")}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-brand-code dark:bg-dark-bg flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-stone-100 dark:border-neutral-700 dark:text-blue-400">
                <item.icon className="size-5" aria-hidden />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-neutral-800 dark:text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
