"use client";

import { cn } from "@/utils/cn";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative inline-block h-12 w-48 cursor-pointer overflow-hidden bg-transparent p-[2px] text-xl md:h-16",
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <MovingBorder duration={duration} className={borderClassName} />

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/80 text-sm font-bold text-white antialiased md:text-base",
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

// A glow that travels around the border. It's a conic gradient spun with a CSS transform, so the
// animation runs on the compositor (GPU) with no per-frame JavaScript or repaints.
const MovingBorder = ({
  duration = 2000,
  className,
}: {
  duration?: number;
  className?: string;
}) => {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className={cn(
          // A square wider than the button's diagonal, centered, so it covers every edge as it spins
          "absolute top-1/2 left-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 animate-spin opacity-80",
          "bg-[conic-gradient(transparent_0deg,transparent_290deg,var(--color-sky-500)_335deg,transparent_360deg)]",
          className,
        )}
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  );
};
