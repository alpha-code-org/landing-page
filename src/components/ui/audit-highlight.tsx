"use client";
import { cn } from "@/utils/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import React, { useRef } from "react";
import { dotPatterns } from "@/utils/dot-patterns";
import { BookingButton } from "./booking-button";

export const AuditHighlight = () => {
  return (
    <HeroHighlight>
      <div className="animate-fade-in-bounce mx-auto flex max-w-4xl flex-col items-center gap-12 px-4">
        <h2 className="text-center text-2xl leading-relaxed font-bold text-neutral-700 md:text-4xl lg:text-5xl lg:leading-snug dark:text-white">
          We identify security vulnerabilities{" "}
          <Highlight className="whitespace-nowrap text-white">in your codebase</Highlight>
        </h2>

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
        "group relative flex h-160 w-full items-center justify-center bg-stone-100 dark:bg-black",
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
    <span
      ref={ref}
      className={cn(
        "relative inline-block rounded-lg px-1 pb-1",
        isInView && "animate-highlight-sweep",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--color-indigo-500), var(--color-purple-500))",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        backgroundSize: "0% 100%",
        animationDuration: "800ms",
      }}
    >
      {children}
    </span>
  );
};
