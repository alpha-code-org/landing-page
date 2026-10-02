"use client";

import { cn } from "@/utils/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useRef, useState } from "react";

interface AnimatedSpanProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// Fades in after `delay` ms; the delay is handled by CSS so no timers or state are needed
export const AnimatedSpan = ({ children, delay = 0, className }: AnimatedSpanProps) => {
  return (
    <div
      className={cn(
        "animate-fade-in-up grid text-base font-normal tracking-tight md:text-lg",
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface TypingAnimationProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
}

export const TypingAnimation = ({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = "span",
}: TypingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const reducedMotion = useReducedMotion();

  // After `delay` ms, reveal one more character every `duration` ms
  useEffect(() => {
    if (reducedMotion) return;

    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      let length = 0;
      interval = setInterval(() => {
        length++;
        setDisplayedText(children.slice(0, length));
        if (length >= children.length) clearInterval(interval);
      }, duration);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [children, delay, duration, reducedMotion]);

  return (
    <Component className={cn("text-base font-normal tracking-tight md:text-lg", className)}>
      {reducedMotion ? children : displayedText}
    </Component>
  );
};

interface TerminalProps {
  className?: string;
}

export const ChecklistTerminal = ({ className }: TerminalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center bg-stone-100 px-4 py-20 md:py-40 dark:bg-neutral-950"
    >
      <div
        className={cn(
          "z-0 h-[540px] w-full max-w-lg rounded-xl border border-neutral-200 bg-white shadow-lg md:h-[500px] dark:border-neutral-800 dark:bg-neutral-900",
          className,
        )}
      >
        <div className="flex flex-col gap-y-2 rounded-t-xl border-b border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-800">
          <div className="flex flex-row gap-x-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </div>
        </div>
        <pre className="p-4">
          <code className="grid gap-y-2 overflow-auto px-1 pt-2 pb-4">
            {isInView && (
              <>
                <TypingAnimation duration={6}>
                  &gt; Alpha Code AI Automation Checklist
                </TypingAnimation>

                <AnimatedSpan delay={400} className="text-green-500">
                  <span>✔ Free review of what can be automated.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={800} className="text-green-500">
                  <span>✔ Built around the tools you already use.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={1200} className="text-green-500">
                  <span>✔ Hours saved every week, fewer mistakes.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={1600} className="text-green-500">
                  <span>✔ NDA signed before we look at anything.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={2000} className="text-green-500">
                  <span>✔ 100% customer satisfaction.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={3000} className="text-blue-500">
                  <span>ℹ What we want from you:</span>
                  <span className="pl-2">- Clear communication.</span>
                  <span className="pl-2">- Honest feedback.</span>
                  <span className="pl-2">- Active participation.</span>
                </AnimatedSpan>

                <TypingAnimation
                  delay={4000}
                  duration={15}
                  className="text-neutral-500 dark:text-neutral-400"
                >
                  Success! Project initialization completed.
                </TypingAnimation>

                <TypingAnimation
                  delay={5000}
                  duration={15}
                  className="text-neutral-500 dark:text-neutral-400"
                >
                  Let&apos;s automate your business.
                </TypingAnimation>
              </>
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};
