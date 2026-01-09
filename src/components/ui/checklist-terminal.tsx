"use client";

import { cn } from "@/utils/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useEffect, useRef, useState } from "react";

interface AnimatedSpanProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedSpan = ({ children, delay = 0, className }: AnimatedSpanProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        "grid text-base font-normal tracking-tight md:text-lg",
        shouldAnimate && "animate-fade-in-up",
        className,
      )}
      style={{
        opacity: shouldAnimate ? undefined : 0,
        transform: shouldAnimate ? undefined : "translateY(-5px)",
      }}
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
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children must be a string. Received:");
  }

  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [children, duration, started]);

  return (
    <Component className={cn("text-base font-normal tracking-tight md:text-lg", className)}>
      {displayedText}
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
      className="flex flex-col items-center justify-center bg-black px-4 py-20 md:py-40"
    >
      <div
        className={cn(
          "border-border bg-background z-0 h-[540px] w-full max-w-lg rounded-xl border md:h-[500px]",
          className,
        )}
      >
        <div className="border-border flex flex-col gap-y-2 border-b p-4">
          <div className="flex flex-row gap-x-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </div>
        </div>
        <pre className="p-4">
          <code className="grid gap-y-2 overflow-auto px-1 pb-4 pt-2">
            {isInView && (
              <>
                <TypingAnimation duration={6}>
                  &gt; Alpha Code Software Development Checklist
                </TypingAnimation>

                <AnimatedSpan delay={400} className="text-green-500">
                  <span>✔ Modern design.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={800} className="text-green-500">
                  <span>✔ Blazingly fast performance.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={1200} className="text-green-500">
                  <span>✔ SEO optimized.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={1600} className="text-green-500">
                  <span>✔ Robust testing suite.</span>
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

                <TypingAnimation delay={4000} duration={15} className="text-muted-foreground">
                  Success! Project initialization completed.
                </TypingAnimation>

                <TypingAnimation delay={5000} duration={15} className="text-muted-foreground">
                  Let&apos;s make your business grow.
                </TypingAnimation>
              </>
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};
