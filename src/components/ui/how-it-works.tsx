"use client";

import { useRef } from "react";
import { ClipboardList, Search, Wrench } from "lucide-react";
import { cn } from "@/utils/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { BookingButton } from "./booking-button";
import { EmailLink } from "./email-link";

const steps = [
  {
    icon: Search,
    title: "Free review",
    description: "We look at where your team's week goes.",
  },
  {
    icon: ClipboardList,
    title: "Clear plan",
    description: "You get a list of what to automate and the hours it saves.",
  },
  {
    icon: Wrench,
    title: "We build it",
    description: "Automations that work inside the tools you already use.",
  },
];

export const HowItWorks = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="px-8 py-20 md:py-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium tracking-widest text-neutral-600 uppercase dark:text-neutral-400">
            How it works
          </p>
          <h2 className="text-2xl font-bold text-neutral-800 md:text-4xl dark:text-white">
            From first call to hours saved
          </h2>
        </div>

        <div className="relative w-full">
          {/* Line linking the three steps on desktop, drawn in once the section is visible */}
          <div
            aria-hidden
            className="absolute top-6 right-[16.6%] left-[16.6%] hidden h-px bg-neutral-300 md:block dark:bg-neutral-800"
          >
            <div
              className="bg-brand-code h-full origin-left transition-transform delay-300 duration-1000 ease-out dark:bg-blue-400"
              style={{ transform: `scaleX(${isInView ? 1 : 0})` }}
            />
          </div>

          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className={cn(
                  "relative flex flex-col items-center gap-3 text-center",
                  isInView ? "animate-step-in" : "opacity-0",
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-brand-code dark:bg-dark-bg relative flex size-12 items-center justify-center rounded-full border border-neutral-300 bg-stone-100 dark:border-neutral-700 dark:text-blue-400">
                  <step.icon className="size-5" aria-hidden />
                  <span className="bg-brand-code absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full text-[11px] font-bold text-white">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-bold text-neutral-800 dark:text-white">{step.title}</h3>
                <p className="max-w-60 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <BookingButton className="bg-brand-code hover:text-brand-code border-slate-800 font-bold text-white transition-colors hover:bg-white">
          Book a free review
        </BookingButton>
        <EmailLink />
      </div>
    </section>
  );
};
