"use client";

import { cn } from "@/utils/cn";
import { motion, MotionProps, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedSpanProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedSpan = ({ children, delay = 0, className, ...props }: AnimatedSpanProps) => (
  <motion.div
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: delay / 1000 }}
    className={cn("grid text-base font-normal tracking-tight md:text-lg", className)}
    {...props}
  >
    {children}
  </motion.div>
);

interface TypingAnimationProps extends MotionProps {
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
  ...props
}: TypingAnimationProps) => {
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children must be a string. Received:");
  }

  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

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
    <MotionComponent
      ref={elementRef}
      className={cn("text-base font-normal tracking-tight md:text-lg", className)}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
};

interface TerminalProps {
  className?: string;
}

export const ChecklistTerminal = ({ className }: TerminalProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center bg-black px-4 py-20 md:py-40"
    >
      <div
        className={cn(
          "border-border bg-background z-0 h-[540px] w-full max-w-lg rounded-xl border md:h-[600px]",
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
          <code className="grid gap-y-1 overflow-auto px-1 pb-4 pt-2">
            {isInView && (
              <>
                <TypingAnimation duration={6}>
                  &gt; Alpha Code Software Development Checklist
                </TypingAnimation>

                <AnimatedSpan delay={600} className="text-green-500">
                  <span>✔ Modern design.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={1000} className="text-green-500">
                  <span>✔ Blazingly fast performance.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={1500} className="text-green-500">
                  <span>✔ SEO optimized.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={2000} className="text-green-500">
                  <span>✔ Listening to your feedback.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={2500} className="text-green-500">
                  <span>✔ Robust testing suite.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={3000} className="text-green-500">
                  <span>✔ Continuous integration and deployment.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={3500} className="text-green-500">
                  <span>✔ Scalable and maintainable code.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={4000} className="text-green-500">
                  <span>✔ Regular updates and improvements.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={4500} className="text-green-500">
                  <span>✔ 100% customer satisfaction.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={5000} className="text-blue-500">
                  <span>ℹ What we want from you:</span>
                  <span className="pl-2">- Clear communication.</span>
                  <span className="pl-2">- Honest feedback.</span>
                  <span className="pl-2">- Active participation.</span>
                </AnimatedSpan>

                <TypingAnimation delay={5500} duration={15} className="text-muted-foreground">
                  Success! Project initialization completed.
                </TypingAnimation>

                <TypingAnimation delay={6500} duration={15} className="text-muted-foreground">
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
