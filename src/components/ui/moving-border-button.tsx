"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
      <div className="absolute inset-0" style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(var(--color-sky-500)_40%,transparent_60%)] opacity-[0.8]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/80 text-sm font-bold text-white antialiased backdrop-blur-xl md:text-base",
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

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Animate via direct DOM writes (no React re-renders) and only while on screen
  useEffect(() => {
    const pathElement = pathRef.current;
    const marker = markerRef.current;
    if (!pathElement || !marker || reducedMotion) return;

    let frame: number | undefined;
    let startTime: number | undefined;
    let length = pathElement.getTotalLength();

    const animate = (timestamp: number) => {
      startTime ??= timestamp;
      const elapsed = timestamp - startTime;
      const point = pathElement.getPointAtLength(((elapsed % duration) / duration) * length);
      marker.style.transform = `translateX(${point.x}px) translateY(${point.y}px) translateX(-50%) translateY(-50%)`;
      frame = requestAnimationFrame(animate);
    };

    const stop = () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      frame = undefined;
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (frame === undefined) frame = requestAnimationFrame(animate);
      } else {
        stop();
      }
    });
    const resizeObserver = new ResizeObserver(() => {
      length = pathElement.getTotalLength();
    });

    visibilityObserver.observe(pathElement);
    resizeObserver.observe(pathElement);

    return () => {
      stop();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [duration, reducedMotion]);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <div
        ref={markerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform: "translateX(-50%) translateY(-50%)",
        }}
      >
        {children}
      </div>
    </>
  );
};
