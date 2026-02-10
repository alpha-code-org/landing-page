"use client";

import { useEffect, useRef, useState } from "react";
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
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative h-12 w-48 overflow-hidden bg-transparent p-[2px] text-xl md:h-16 cursor-pointer",
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const pathElement = pathRef.current;
      if (!pathElement) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const length = pathElement.getTotalLength();
      const elapsed = timestamp - startTimeRef.current;
      const progress = ((elapsed % duration) / duration) * length;

      const point = pathElement.getPointAtLength(progress);
      setPosition({ x: point.x, y: point.y });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [duration]);

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
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform: `translateX(${position.x}px) translateY(${position.y}px) translateX(-50%) translateY(-50%)`,
        }}
      >
        {children}
      </div>
    </>
  );
};
