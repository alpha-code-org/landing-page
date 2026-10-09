"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, Clock, Sparkles } from "lucide-react";
import { cn } from "@/utils/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { workflows, type WorkflowStepType } from "@/data/workflows";
import { BOOKING_URL } from "@/utils/links";

// Working weeks in a year, after holidays, for the yearly estimate
const WORKING_WEEKS = 46;

// How long a finished run stays on screen before the next one starts
const FINISHED_HOLD_MS = 3200;

// Steps play faster than real time, but AI steps still visibly take longer than the rest
const stepDuration = (step: WorkflowStepType) => 700 + step.seconds * 350;

const sumSeconds = (steps: Array<WorkflowStepType>) =>
  steps.reduce((total, step) => total + step.seconds, 0);

function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) return `${hours} h ${minutes} min`;
  if (minutes > 0) return `${minutes} min ${Math.floor(totalSeconds % 60)} s`;
  return `${Math.floor(totalSeconds)} s`;
}

// Tweens a number towards `target` with requestAnimationFrame, so counters roll instead of jump
function useCountUp(target: number, duration = 800) {
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

  const [workflowIndex, setWorkflowIndex] = useState(0);
  // Index of the running step; equal to steps.length once the run has finished
  const [step, setStep] = useState(0);
  // Bumped on every new run, so the step list re-enters and one-shot animations replay
  const [run, setRun] = useState(0);
  // Once a visitor picks a tab, stop rotating through the workflows
  const [isPinned, setIsPinned] = useState(false);
  const [savedSeconds, setSavedSeconds] = useState(0);
  // Weekly volume per workflow, adjustable by the visitor to estimate their own savings
  const [volumes, setVolumes] = useState(() => workflows.map((item) => item.volume));

  const workflow = workflows[workflowIndex];
  const { steps } = workflow;
  const automatedSeconds = sumSeconds(steps);
  const manualSeconds = workflow.manualMinutes * 60;
  const savedPerRun = manualSeconds - automatedSeconds;
  const volume = volumes[workflowIndex];

  // With reduced motion the finished run is shown as a static diagram
  const currentStep = reducedMotion ? steps.length : step;
  const isFinished = currentStep === steps.length;
  const elapsed = useCountUp(sumSeconds(steps.slice(0, currentStep)), 400);
  const saved = useCountUp(savedSeconds, 1200);
  const weeklyHours = useCountUp((volume * savedPerRun) / 3600, 300);
  const yearlyDays = Math.round((weeklyHours * WORKING_WEEKS) / 8);

  // One timer drives the whole run, and it only ticks while the section is on screen
  useEffect(() => {
    if (!isInView || reducedMotion) return;

    if (step < steps.length) {
      const timeout = setTimeout(() => {
        setStep(step + 1);
        if (step + 1 === steps.length) setSavedSeconds((total) => total + savedPerRun);
      }, stepDuration(steps[step]));
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      if (!isPinned) setWorkflowIndex((index) => (index + 1) % workflows.length);
      setStep(0);
      setRun((count) => count + 1);
    }, FINISHED_HOLD_MS);
    return () => clearTimeout(timeout);
  }, [isInView, reducedMotion, step, steps, isPinned, savedPerRun]);

  function selectWorkflow(index: number) {
    if (index === workflowIndex) return;
    setWorkflowIndex(index);
    setStep(0);
    setRun((count) => count + 1);
    setIsPinned(true);
  }

  function changeVolume(value: number) {
    setVolumes((current) => current.map((item, index) => (index === workflowIndex ? value : item)));
    // Keep the visitor on the workflow they are estimating
    setIsPinned(true);
  }

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
              This is what happens to an everyday task once it is automated. AI reads and decides,
              your tools get updated, and nobody types anything twice.
            </p>
          </div>

          <WorkflowTabs activeIndex={workflowIndex} onSelect={selectWorkflow} />

          <div className="flex flex-col gap-5 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <TimeBar
              label="By hand"
              value={`≈ ${workflow.manualMinutes} min`}
              scale={1}
              isVisible={isInView || reducedMotion}
              className="bg-neutral-300 dark:bg-neutral-700"
            />
            <TimeBar
              label="Automated"
              value={`${automatedSeconds.toFixed(1)} s`}
              scale={Math.max(automatedSeconds / manualSeconds, 0.02)}
              isVisible={isInView || reducedMotion}
              className="bg-green-500"
            />

            <label className="flex flex-col gap-2 border-t border-neutral-200 pt-4 dark:border-neutral-800">
              <span className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Your {workflow.unit} per week
                </span>
                <span className="font-semibold text-neutral-800 tabular-nums dark:text-white">
                  {volume}
                </span>
              </span>
              <input
                type="range"
                min={5}
                max={workflow.volume * 4}
                step={5}
                value={volume}
                onChange={(event) => changeVolume(Number(event.target.value))}
                className="accent-brand-code w-full cursor-pointer dark:accent-blue-400"
              />
            </label>

            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-3xl font-bold text-neutral-800 tabular-nums dark:text-white">
                  {Math.round(weeklyHours)} hours
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  back every week, ≈ {yearlyDays} working days a year
                </p>
              </div>
              {!reducedMotion && (
                <p className="relative text-right text-xs text-neutral-500 dark:text-neutral-400">
                  {isFinished && (
                    <span
                      key={run}
                      className="animate-float-up absolute -top-6 right-0 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold whitespace-nowrap text-green-600 dark:text-green-400"
                    >
                      +{formatDuration(savedPerRun)}
                    </span>
                  )}
                  Saved while watching
                  <span className="block text-sm font-semibold text-green-600 tabular-nums dark:text-green-400">
                    {formatDuration(saved)}
                  </span>
                </p>
              )}
            </div>

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

        <div
          role="tabpanel"
          aria-label={`${workflow.name} workflow`}
          className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="flex items-center gap-3 border-b border-neutral-200 bg-neutral-100 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-800">
            <div className="flex shrink-0 gap-x-2">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>
            <p
              key={workflow.name}
              className="animate-step-in truncate text-sm font-medium text-neutral-700 dark:text-neutral-200"
            >
              {workflow.trigger}
            </p>
            <p className="ml-auto flex shrink-0 items-center gap-1.5 font-mono text-xs text-neutral-500 tabular-nums dark:text-neutral-400">
              <Clock className="size-3.5" aria-hidden />
              {elapsed.toFixed(1)} s
            </p>
          </div>

          {/* Overall progress, filling as each step completes */}
          <div className="h-0.5 bg-neutral-100 dark:bg-neutral-800">
            <div
              className="from-brand-code h-full origin-left bg-linear-to-r to-green-500 transition-transform duration-500 ease-out dark:from-blue-400"
              style={{ transform: `scaleX(${currentStep / steps.length})` }}
            />
          </div>

          <StepList key={`${workflowIndex}-${run}`} steps={steps} currentStep={currentStep} />

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
              Done in {automatedSeconds.toFixed(1)} s
            </span>
            <span className="truncate text-neutral-500 dark:text-neutral-400">
              instead of ≈ {workflow.manualMinutes} min by hand
            </span>
          </div>

          {/* A soft light sweeps across the card when a run completes */}
          {isFinished && !reducedMotion && (
            <div
              key={run}
              aria-hidden
              className="animate-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-green-400/15 to-transparent"
            />
          )}
        </div>
      </div>
    </section>
  );
};

const WorkflowTabs = ({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // Slide one pill behind the active tab. Styles are written to the DOM directly, and
  // `data-ready` swaps the server-rendered tab background for the pill after hydration.
  useLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const place = () => {
      const tab = list.querySelectorAll<HTMLElement>('[role="tab"]')[activeIndex];
      if (!tab) return;
      indicator.style.width = `${tab.offsetWidth}px`;
      indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
      list.dataset.ready = "";
    };

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [activeIndex]);

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Example workflows"
      className="group/tabs relative flex justify-center gap-2 self-center md:self-start"
    >
      <span
        ref={indicatorRef}
        aria-hidden
        className="bg-brand-alpha absolute top-0 left-0 h-full rounded-full opacity-0 transition-[transform,width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-ready/tabs:opacity-100 dark:bg-white"
      />
      {workflows.map((item, index) => (
        <button
          key={item.name}
          type="button"
          role="tab"
          aria-selected={index === activeIndex}
          onClick={() => onSelect(index)}
          className={cn(
            "relative rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-300",
            index === activeIndex
              ? "border-brand-alpha bg-brand-alpha text-white group-data-ready/tabs:bg-transparent dark:border-white dark:bg-white dark:text-neutral-900 dark:group-data-ready/tabs:bg-transparent"
              : "border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900",
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

const TimeBar = ({
  label,
  value,
  scale,
  isVisible,
  className,
}: {
  label: string;
  value: string;
  scale: number;
  isVisible: boolean;
  className: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex justify-between text-sm">
      <span className="text-neutral-600 dark:text-neutral-400">{label}</span>
      <span className="font-semibold text-neutral-800 tabular-nums dark:text-white">{value}</span>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
      {/* scaleX instead of width keeps the bar animation on the compositor */}
      <div
        className={cn(
          "h-full origin-left rounded-full transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
          className,
        )}
        style={{ transform: `scaleX(${isVisible ? scale : 0})` }}
      />
    </div>
  </div>
);

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
    <ol ref={listRef} className="relative p-5 md:p-6">
      <div
        ref={highlightRef}
        aria-hidden
        className="bg-brand-code/5 ring-brand-code/10 absolute inset-x-3 top-0 rounded-xl opacity-0 ring-1 transition-[transform,height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:inset-x-4 dark:bg-blue-400/10 dark:ring-blue-400/15"
      />
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
