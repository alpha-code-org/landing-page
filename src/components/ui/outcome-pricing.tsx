"use client";

import { useRef } from "react";
import { Eye, Handshake, Target, TrendingUp } from "lucide-react";
import { cn } from "@/utils/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const feeSteps = [
  {
    title: "We agree on the goal",
    description:
      "Before any work starts, we pick a result we can measure together, like hours saved each week or invoices processed without a person touching them.",
  },
  {
    title: "We measure it in the open",
    description:
      "You see the same numbers we do. Every month you get a short report of what ran, what it saved and what it cost.",
  },
  {
    title: "Our fee follows the result",
    description:
      "We take 50% of the proven savings for the first year. After that, every euro saved is yours. If the automation doesn't save anything, we don't earn anything.",
  },
];

const EXAMPLE_SAVINGS = 100_000;
const OUR_SHARE = 0.5;

const formatEuro = (amount: number) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);

const exampleYears = [
  { label: "First year", ourShare: OUR_SHARE },
  { label: "Every year after", ourShare: 0 },
];

const commitments = [
  {
    icon: Handshake,
    title: "A win for both sides",
    description:
      "We only do well when your business does. That keeps us focused on the work that saves you the most time, not the work that makes the biggest invoice.",
  },
  {
    icon: Eye,
    title: "Nothing hidden",
    description:
      "Clear numbers, plain language and no surprise costs. If something isn't working, you hear it from us first.",
  },
  {
    icon: TrendingUp,
    title: "Here for the long run",
    description:
      "Going live is where the work starts. We keep improving your automations as your business grows, because that's how we both get more out of them.",
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
      <div className="mx-auto flex max-w-5xl flex-col gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium tracking-widest text-neutral-600 uppercase dark:text-neutral-400">
            Outcome-based pricing
          </p>
          <h2 className="text-2xl font-bold text-neutral-800 md:text-4xl dark:text-white">
            We get paid when it pays off
          </h2>
          <p className="max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-400">
            You don&apos;t pay for hours spent building. You pay for what the automation actually
            does for your business.
          </p>
        </div>

        <div className="dark:bg-dark-bg rounded-2xl border border-neutral-300 bg-white p-6 md:p-10 dark:border-neutral-800">
          <div className="text-brand-code mb-8 flex items-center gap-2 text-sm font-semibold dark:text-blue-400">
            <Target className="size-4" aria-hidden />
            How the fee works
          </div>
          <ol className="grid gap-8 md:grid-cols-3">
            {feeSteps.map((step, index) => (
              <li
                key={step.title}
                className={cn(
                  "flex flex-col gap-2 border-t border-neutral-300 pt-4 dark:border-neutral-800",
                  isInView ? "animate-step-in" : "opacity-0",
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <span className="text-brand-code text-sm font-bold dark:text-blue-400">
                  0{index + 1}
                </span>
                <h3 className="font-bold text-neutral-800 dark:text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>

          <div
            className={cn(
              "mt-10 flex flex-col gap-6 border-t border-neutral-300 pt-8 dark:border-neutral-800",
              isInView ? "animate-step-in" : "opacity-0",
            )}
            style={{ animationDelay: "450ms" }}
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-neutral-800 dark:text-white">
                Example: automation that saves {formatEuro(EXAMPLE_SAVINGS)} a year
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                Savings are measured against the numbers we agreed on before we started.
              </p>
            </div>

            <dl className="flex flex-col gap-5">
              {exampleYears.map((year) => {
                const ours = EXAMPLE_SAVINGS * year.ourShare;
                const yours = EXAMPLE_SAVINGS - ours;

                return (
                  <div key={year.label} className="flex flex-col gap-2">
                    <dt className="text-sm font-semibold text-neutral-800 dark:text-white">
                      {year.label}
                    </dt>
                    <dd className="flex flex-col gap-2">
                      {/* Bar split between what the client keeps and our share, grown in once visible */}
                      <div className="flex h-3 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                        <div
                          className="h-full origin-left bg-emerald-600 transition-transform delay-700 duration-1000 ease-out dark:bg-emerald-400"
                          style={{
                            width: `${(yours / EXAMPLE_SAVINGS) * 100}%`,
                            transform: `scaleX(${isInView ? 1 : 0})`,
                          }}
                        />
                        {ours > 0 && (
                          <div
                            className="h-full bg-neutral-400 transition-opacity delay-1000 duration-700 dark:bg-neutral-600"
                            style={{
                              width: `${(ours / EXAMPLE_SAVINGS) * 100}%`,
                              opacity: isInView ? 1 : 0,
                            }}
                          />
                        )}
                      </div>
                      <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
                        <span className="text-neutral-800 dark:text-white">
                          You keep <strong>{formatEuro(yours)}</strong>
                        </span>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Our fee <strong>{formatEuro(ours)}</strong>
                        </span>
                      </div>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>

        <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
          {commitments.map((item, index) => (
            <li
              key={item.title}
              className={cn("flex flex-col gap-3", isInView ? "animate-step-in" : "opacity-0")}
              style={{ animationDelay: `${450 + index * 150}ms` }}
            >
              <div className="text-brand-code dark:bg-dark-bg flex size-10 items-center justify-center rounded-full border border-neutral-300 bg-stone-100 dark:border-neutral-700 dark:text-blue-400">
                <item.icon className="size-5" aria-hidden />
              </div>
              <h3 className="font-bold text-neutral-800 dark:text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
