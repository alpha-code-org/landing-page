"use client";

import { useCallback, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { cn } from "@/utils/cn";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isDark = resolvedTheme === "dark";

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const newTheme = isDark ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    }).ready;

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    );

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }, [isDark, duration, setTheme]);

  return (
    <button ref={buttonRef} onClick={toggleTheme} className={cn(className)} {...props}>
      <Sun className="hidden h-5 w-5 dark:block" />
      <Moon className="block h-5 w-5 dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
