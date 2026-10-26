"use client";
import { cn } from "@/utils/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import React, { useRef } from "react";
import { dotPatterns } from "@/utils/dot-patterns";
import { BookingButton } from "./booking-button";

// On the codebase audit page this banner is the hero, so its heading becomes the h1
export const AuditHighlight = ({ as: Heading = "h2" }: { as?: "h1" | "h2" }) => {
  return (
    <HeroHighlight>
      <div className="animate-fade-in-bounce mx-auto flex max-w-4xl flex-col items-center gap-12 px-4">
        <Heading className="text-center text-2xl leading-relaxed font-bold text-neutral-700 md:text-4xl lg:text-5xl lg:leading-snug dark:text-white">
          We find what&apos;s putting{" "}
          <Highlight className="whitespace-nowrap text-white">your codebase at risk</Highlight>
        </Heading>

        <BookingButton className="bg-brand-alpha hover:text-brand-code z-20 border-slate-800 text-white transition-colors hover:bg-white">
          Request an audit
        </BookingButton>
      </div>
    </HeroHighlight>
  );
};

const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  // Update CSS variables directly instead of React state to avoid a re-render per mousemove
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    currentTarget.style.setProperty("--mouse-x", `${clientX - left}px`);
    currentTarget.style.setProperty("--mouse-y", `${clientY - top}px`);
  }

  const spotlightMask =
    "radial-gradient(200px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black 0%, transparent 100%)";
  return (
    <div
      className={cn(
        "group dark:bg-dark-bg relative flex h-160 w-full items-center justify-center bg-stone-100",
        containerClassName,
      )}
      onMouseMove={handleMouseMove}
    >
      <div
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          backgroundImage: dotPatterns.light.default,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: dotPatterns.dark.default,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden"
        style={{
          backgroundImage: dotPatterns.light.hover,
          WebkitMaskImage: spotlightMask,
          maskImage: spotlightMask,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden opacity-0 transition duration-300 group-hover:opacity-100 dark:block"
        style={{
          backgroundImage: dotPatterns.dark.hover,
          WebkitMaskImage: spotlightMask,
          maskImage: spotlightMask,
        }}
      />

      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useIntersectionObserver(ref, {
    once: true,
    amount: 0.5,
  });

  return (
    <span ref={ref} className={cn("relative isolate inline-block px-1 pb-1", className)}>
      {/* Swept in with a transform instead of background-size, so it animates on the GPU */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 origin-left rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 transition-transform duration-800 ease-linear",
          isInView ? "scale-x-100" : "scale-x-0",
        )}
      />
      {children}
    </span>
  );
};
