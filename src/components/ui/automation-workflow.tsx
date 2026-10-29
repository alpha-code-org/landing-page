"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Check, Clock, Sparkles } from "lucide-react";
import { cn } from "@/utils/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  invoiceSavings,
  invoiceWorkflow,
  sumSeconds,
  type WorkflowStepType,
} from "@/data/invoice-workflow";
import { BOOKING_URL } from "@/utils/links";
import { formatEuro } from "@/utils/format";

// How long a finished run stays on screen before the next one starts
const FINISHED_HOLD_MS = 3200;

// Steps play faster than real time, but AI steps still visibly take longer than the rest
const stepDuration = (step: WorkflowStepType) => 700 + step.seconds * 350;

const { trigger, steps, manualMinutes, invoicesPerWeek, hourlyCost, workingWeeks } =
  invoiceWorkflow;
const automatedLabel = `${invoiceSavings.automatedSeconds.toFixed(1)} s`;
const yearlySavedLabel = formatEuro(invoiceSavings.eurosPerYear);
const perInvoiceSavedLabel = formatEuro(invoiceSavings.eurosPerInvoice, 2);
const hourlyCostLabel = formatEuro(hourlyCost);

// Tweens a number towards `target` with requestAnimationFrame, so counters roll instead of jump
function useCountUp(target: number, duration = 400) {
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);

  useEffect(() => {
    const from = valueRef.current;
    if (from === target) return;

    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      valueRef.current = from + (target - from) * eased;
      setValue(valueRef.current);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

export const AutomationWorkflow = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(ref, { amount: 0.3 });
  const reducedMotion = useReducedMotion();

  // Index of the running step; equal to steps.length once the run has finished
  const [step, setStep] = useState(0);
  // Bumped on every new run, so the step list re-enters and one-shot animations replay
  const [run, setRun] = useState(0);

  // With reduced motion the finished run is shown as a static diagram
  const currentStep = reducedMotion ? steps.length : step;
  const isFinished = currentStep === steps.length;
  const elapsed = useCountUp(sumSeconds(steps.slice(0, currentStep)));

  // One timer drives the whole run, and it only ticks while the section is on screen
  useEffect(() => {
    if (!isInView || reducedMotion) return;

    if (step < steps.length) {
      const timeout = setTimeout(() => setStep(step + 1), stepDuration(steps[step]));
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setStep(0);
      setRun((count) => count + 1);
    }, FINISHED_HOLD_MS);
    return () => clearTimeout(timeout);
  }, [isInView, reducedMotion, step]);

  return (
    <section ref={ref} className="bg-stone-200/30 px-4 py-20 md:px-8 md:py-32 dark:bg-transparent">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1fr_1.15fr] md:gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <p className="text-sm font-medium tracking-widest text-neutral-600 uppercase dark:text-neutral-400">
              AI automation in action
            </p>
            <h2 className="text-2xl font-bold text-neutral-800 md:text-4xl dark:text-white">
              Watch the work do itself
            </h2>
            <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
              Supplier invoices, read, checked, booked and matched to the bank without anyone
              touching them.
            </p>
          </div>

          <div className="flex flex-col gap-5 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <div>
              <p className="text-4xl font-bold text-green-600 tabular-nums md:text-5xl dark:text-green-400">
                {yearlySavedLabel}
              </p>
              <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                saved a year on {invoicesPerWeek} invoices a week
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-4 border-t border-neutral-200 pt-5 dark:border-neutral-800">
              <div>
                <dt className="text-sm text-neutral-600 dark:text-neutral-400">Per invoice</dt>
                <dd className="mt-1 flex items-center gap-1.5 font-semibold text-neutral-800 tabular-nums dark:text-white">
                  <span className="text-neutral-400 line-through dark:text-neutral-500">
                    {manualMinutes} min
                  </span>
                  <ArrowRight className="size-4 text-neutral-400" aria-hidden />
                  {automatedLabel}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-neutral-600 dark:text-neutral-400">Every week</dt>
                <dd className="mt-1 font-semibold text-neutral-800 tabular-nums dark:text-white">
                  {Math.round(invoiceSavings.weeklyHoursSaved)} hours back
                </dd>
              </div>
            </dl>

            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Based on {hourlyCostLabel}/hour staff cost and {workingWeeks} working weeks.
            </p>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-code text-sm font-semibold underline-offset-4 hover:underline dark:text-blue-400"
            >
              Get your exact numbers in a free review →
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-3 border-b border-neutral-200 bg-neutral-100 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-800">
            <div className="flex shrink-0 gap-x-2">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>
            <p className="truncate text-sm font-medium text-neutral-700 dark:text-neutral-200">
              {trigger}
            </p>
            <p className="ml-auto flex shrink-0 items-center gap-1.5 font-mono text-xs text-neutral-500 tabular-nums dark:text-neutral-400">
              <Clock className="size-3.5" aria-hidden />
              {elapsed.toFixed(1)} s
            </p>
          </div>

          <div className="h-0.5 bg-neutral-100 dark:bg-neutral-800">
            <div
              className="from-brand-code h-full origin-left bg-linear-to-r to-green-500 transition-transform duration-500 ease-out dark:from-blue-400"
              style={{ transform: `scaleX(${currentStep / steps.length})` }}
            />
          </div>

          <StepList key={run} steps={steps} currentStep={currentStep} />

          <div
            className={cn(
              "flex items-center gap-2 border-t border-neutral-200 px-5 py-3 text-sm transition duration-500 ease-out md:px-6 dark:border-neutral-800",
              isFinished ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
          >
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
              <Check className="size-3.5" strokeWidth={3} aria-hidden />
            </span>
            <span className="font-medium text-neutral-800 dark:text-white">
              Done in {automatedLabel}
            </span>
            <span
              className={cn(
                "ml-auto shrink-0 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-600 dark:text-green-400",
                isFinished && !reducedMotion && "animate-pop",
              )}
            >
              {perInvoiceSavedLabel} saved
            </span>
          </div>

          {/* A soft light sweeps across the card when a run completes */}
          {isFinished && !reducedMotion && (
            <div
              aria-hidden
              className="animate-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-green-400/15 to-transparent"
            />
          )}
        </div>
      </div>
    </section>
  );
};

const StepList = ({
  steps,
  currentStep,
}: {
  steps: Array<WorkflowStepType>;
  currentStep: number;
}) => {
  const listRef = useRef<HTMLOListElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  // Glide a single highlight to the active row instead of toggling one per row
  useLayoutEffect(() => {
    const list = listRef.current;
    const highlight = highlightRef.current;
    if (!list || !highlight) return;

    const place = () => {
      const row = list.querySelectorAll<HTMLElement>("[data-step-row]")[currentStep];
      if (!row) {
        highlight.style.opacity = "0";
        return;
      }
      // offsetTop ignores the rows' entrance transforms, unlike getBoundingClientRect
      const top = (row.parentElement as HTMLElement).offsetTop;
      highlight.style.opacity = "1";
      highlight.style.height = `${row.offsetHeight + 16}px`;
      highlight.style.transform = `translateY(${top - 8}px)`;
    };

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [currentStep]);

  return (
    // The highlight sits beside the <ol>, which may only contain <li> elements. The wrapper is
    // the rows' offsetParent, so their offsetTop lines up with the highlight's coordinates.
    <div className="relative p-5 md:p-6">
      <div
        ref={highlightRef}
        aria-hidden
        className="bg-brand-code/5 ring-brand-code/10 absolute inset-x-3 top-0 rounded-xl opacity-0 ring-1 transition-[transform,height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:inset-x-4 dark:bg-blue-400/10 dark:ring-blue-400/15"
      />
      <ol ref={listRef}>
        {steps.map((item, index) => (
          <WorkflowStep
            key={item.title}
            step={item}
            index={index}
            state={index < currentStep ? "done" : index === currentStep ? "active" : "pending"}
            isLast={index === steps.length - 1}
            // The connector below the step that just finished carries a glowing packet down
            showPacket={index === currentStep - 1}
          />
        ))}
      </ol>
    </div>
  );
};

const WorkflowStep = ({
  step,
  index,
  state,
  isLast,
  showPacket,
}: {
  step: WorkflowStepType;
  index: number;
  state: "pending" | "active" | "done";
  isLast: boolean;
  showPacket: boolean;
}) => {
  const Icon = step.icon;

  return (
    <li
      className={cn("animate-step-in relative", !isLast && "pb-6")}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {!isLast && (
        <>
          <div className="absolute top-12 bottom-1 left-5 w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            <div
              className="h-full w-full origin-top bg-green-500 transition-transform duration-500 ease-out"
              style={{ transform: `scaleY(${state === "done" ? 1 : 0})` }}
            />
          </div>
          {showPacket && (
            <div aria-hidden className="animate-packet absolute top-12 bottom-1 left-5 w-0">
              <span className="absolute -left-1 size-2 rounded-full bg-green-400 shadow-[0_0_10px_3px] shadow-green-400/60" />
            </div>
          )}
        </>
      )}

      <div data-step-row className="relative flex gap-4">
        <div className="relative size-10 shrink-0">
          {/* Spinning gradient ring while the step runs */}
          {state === "active" && (
            <span
              aria-hidden
              className={cn(
                "absolute -inset-[3px] animate-spin rounded-full [animation-duration:1.2s]",
                step.ai
                  ? "bg-[conic-gradient(transparent_35%,#8b5cf6,#38bdf8)]"
                  : "bg-[conic-gradient(transparent_35%,#335aa6)] dark:bg-[conic-gradient(transparent_35%,#60a5fa)]",
              )}
            />
          )}
          {state === "done" && (
            <span
              aria-hidden
              className="animate-burst absolute inset-0 rounded-full border-2 border-green-500"
            />
          )}
          <div
            className={cn(
              "relative flex size-10 items-center justify-center rounded-full border-2 transition-colors duration-300",
              state === "pending" &&
                "border-neutral-200 bg-white text-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-500",
              state === "active" &&
                "text-brand-code border-transparent bg-white dark:bg-neutral-900 dark:text-blue-400",
              state === "active" && step.ai && "text-violet-600 dark:text-violet-300",
              state === "done" && "animate-pop border-green-500 bg-green-500 text-white",
            )}
          >
            <Icon className="size-4.5" aria-hidden />
          </div>
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-center gap-2">
            <p
              className={cn(
                "truncate text-sm font-semibold transition-colors duration-300 md:text-base",
                state === "pending"
                  ? "text-neutral-400 dark:text-neutral-500"
                  : "text-neutral-800 dark:text-white",
              )}
            >
              {step.title}
            </p>
            {step.ai && (
              <span
                className={cn(
                  "inline-flex shrink-0 items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-[11px] font-semibold text-violet-700 transition-opacity duration-300 dark:bg-violet-500/15 dark:text-violet-300",
                  state === "pending" && "opacity-50",
                )}
              >
                <Sparkles
                  className={cn("size-3", state === "active" && "animate-pulse")}
                  aria-hidden
                />
                AI
              </span>
            )}
            <span
              className={cn(
                "ml-auto shrink-0 font-mono text-xs text-neutral-500 tabular-nums transition duration-300 dark:text-neutral-400",
                state === "done" ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0",
              )}
            >
              {step.seconds.toFixed(1)} s
            </span>
          </div>

          {/* Both lines share one grid cell, so swapping them never shifts the layout */}
          <div className="mt-1 grid text-sm">
            <p
              className={cn(
                "truncate text-neutral-600 [grid-area:1/1] dark:text-neutral-400",
                state !== "done" && "invisible",
                // AI output is written out left to right, everything else slides in
                state === "done" && (step.ai ? "animate-reveal" : "animate-step-in"),
              )}
            >
              {step.detail}
            </p>
            {state === "active" && (
              <p
                className={cn(
                  "animate-shimmer bg-size-[200%_100%] bg-clip-text font-medium text-transparent [grid-area:1/1]",
                  step.ai
                    ? "bg-[linear-gradient(90deg,#7c3aed,#38bdf8,#7c3aed)]"
                    : "bg-[linear-gradient(90deg,#335aa6,#93c5fd,#335aa6)]",
                )}
              >
                {step.ai ? "AI is thinking…" : "Working…"}
              </p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};
