"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
} from "@tabler/icons-react";
import { IconSearch } from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { IconCommand } from "@tabler/icons-react";
import { IconCaretLeftFilled } from "@tabler/icons-react";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { motion, MotionValue, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/utils/cn";
import { Highlight } from "./audit-highlight";

// Detect if device is Android for performance optimizations
const isAndroid = () => {
  if (typeof window === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
};

// Detect if device has limited performance capabilities
const isLowEndDevice = () => {
  if (typeof window === "undefined") return false;
  // Check for various indicators of low-end devices
  const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
  const isLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 2;
  return isSlowDevice || isLowMemory || isAndroid();
};

export const MacbookScroll = ({
  src,
  showGradient,
  title,
  badge,
}: {
  src?: string;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerf, setIsLowPerf] = useState(false);

  // Memoize device detection to avoid repeated calculations
  const deviceInfo = useMemo(
    () => ({
      isMobile: typeof window !== "undefined" && window.innerWidth < 768,
      isLowPerformance: isLowEndDevice(),
    }),
    [],
  );

  useEffect(() => {
    setIsMobile(deviceInfo.isMobile);
    setIsLowPerf(deviceInfo.isLowPerformance);

    // Throttled resize handler with longer delay for low-end devices
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      const delay = deviceInfo.isLowPerformance ? 200 : 100;
      timeoutId = setTimeout(() => {
        const newIsMobile = window.innerWidth < 768;
        setIsMobile(newIsMobile);
      }, delay);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [deviceInfo]);

  // More aggressive throttling for low-performance devices
  const springConfig = useMemo(() => {
    if (isLowPerf) {
      return {
        stiffness: 50, // Reduced from 100
        damping: 20, // Increased from 10
        restDelta: 0.01, // Increased from 0.001
        mass: 0.5, // Increased from 0.25
      };
    }
    return {
      stiffness: 100,
      damping: 10,
      restDelta: 0.001,
      mass: 0.25,
    };
  }, [isLowPerf]);

  const throttledScrollYProgress = useSpring(scrollYProgress, springConfig);

  // Create transform hooks at the top level - conditional based on performance
  // Low-performance transforms (simplified)
  const lowPerfScaleX = useTransform(throttledScrollYProgress, [0, 0.5], [1.1, isMobile ? 1 : 1.3]);
  const lowPerfScaleY = useTransform(throttledScrollYProgress, [0, 0.5], [0.8, isMobile ? 1 : 1.3]);
  const lowPerfTranslate = useTransform(
    throttledScrollYProgress,
    [0, 0.8],
    [0, isMobile ? 600 : 400],
  );
  const lowPerfRotate = useTransform(throttledScrollYProgress, [0.2, 0.5], [-20, 0]);
  const lowPerfTextTransform = useTransform(throttledScrollYProgress, [0, 0.4], [0, 80]);
  const lowPerfTextOpacity = useTransform(throttledScrollYProgress, [0, 0.3], [1, 0]);

  // High-performance transforms (full animations)
  const highPerfScaleX = useTransform(
    throttledScrollYProgress,
    [0, 0.3],
    [1.2, isMobile ? 1 : 1.5],
  );
  const highPerfScaleY = useTransform(
    throttledScrollYProgress,
    [0, 0.3],
    [0.6, isMobile ? 1 : 1.5],
  );
  const highPerfTranslate = useTransform(
    throttledScrollYProgress,
    [0, 0.6],
    [0, isMobile ? 800 : 600],
  );
  const highPerfRotate = useTransform(throttledScrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const highPerfTextTransform = useTransform(throttledScrollYProgress, [0, 0.3], [0, 100]);
  const highPerfTextOpacity = useTransform(throttledScrollYProgress, [0, 0.2], [1, 0]);

  // Memoize the transform object selection
  const transforms = useMemo(() => {
    if (isLowPerf) {
      return {
        scaleX: lowPerfScaleX,
        scaleY: lowPerfScaleY,
        translate: lowPerfTranslate,
        rotate: lowPerfRotate,
        textTransform: lowPerfTextTransform,
        textOpacity: lowPerfTextOpacity,
      };
    }

    return {
      scaleX: highPerfScaleX,
      scaleY: highPerfScaleY,
      translate: highPerfTranslate,
      rotate: highPerfRotate,
      textTransform: highPerfTextTransform,
      textOpacity: highPerfTextOpacity,
    };
  }, [
    isLowPerf,
    lowPerfScaleX,
    lowPerfScaleY,
    lowPerfTranslate,
    lowPerfRotate,
    lowPerfTextTransform,
    lowPerfTextOpacity,
    highPerfScaleX,
    highPerfScaleY,
    highPerfTranslate,
    highPerfRotate,
    highPerfTextTransform,
    highPerfTextOpacity,
  ]);

  return (
    <div
      ref={ref}
      className="mb-20 flex h-[1000px] shrink-0 flex-col items-center py-40 md:h-[1680px] md:py-80"
      style={{
        // Force hardware acceleration and optimize rendering
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        perspective: "1000px",
      }}
    >
      <motion.h2
        style={{
          translateY: transforms.textTransform,
          opacity: transforms.textOpacity,
        }}
        className="text-center text-2xl font-bold text-neutral-800 dark:text-white md:mb-20"
      >
        {title || (
          <span className="scale-200 md:scale-100">
            Automate boring manual tasks with AI. <br />
            <Highlight className="whitespace-nowrap text-black dark:text-white">
              Save time and resources.
            </Highlight>
          </span>
        )}
      </motion.h2>
      <div className="flex shrink-0 scale-[0.5] transform flex-col items-center justify-start py-0 [backface-visibility:hidden] [perspective:800px] [will-change:transform] sm:scale-50 md:scale-100">
        {/* Lid */}
        <Lid
          src={src}
          scaleX={transforms.scaleX}
          scaleY={transforms.scaleY}
          rotate={transforms.rotate}
          translate={transforms.translate}
          isLowPerf={isLowPerf}
        />
        {/* Base area */}
        <div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-gray-200 [will-change:transform] dark:bg-[#272729]">
          {/* above keyboard bar */}
          <div className="relative h-10 w-full">
            <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
          </div>
          <div className="relative flex">
            <div className="mx-auto h-full w-[10%] overflow-hidden">
              <SpeakerGrid isLowPerf={isLowPerf} />
            </div>
            <div className="mx-auto h-full w-[80%]">
              <Keypad isLowPerf={isLowPerf} />
            </div>
            <div className="mx-auto h-full w-[10%] overflow-hidden">
              <SpeakerGrid isLowPerf={isLowPerf} />
            </div>
          </div>
          <Trackpad />
          <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
          {showGradient && (
            <div className="absolute inset-x-0 bottom-0 z-50 h-40 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black"></div>
          )}
          {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
        </div>
      </div>
    </div>
  );
};

export const Lid = React.memo(
  ({
    scaleX,
    scaleY,
    rotate,
    translate,
    src,
    isLowPerf = false,
  }: {
    scaleX: MotionValue<number>;
    scaleY: MotionValue<number>;
    rotate: MotionValue<number>;
    translate: MotionValue<number>;
    src?: string;
    isLowPerf?: boolean;
  }) => {
    // Optimize rendering for low-performance devices
    const lidStyle = useMemo(
      () => ({
        transform: isLowPerf
          ? "perspective(600px) rotateX(-20deg) translateZ(0px)"
          : "perspective(800px) rotateX(-25deg) translateZ(0px)",
        transformOrigin: "bottom",
        transformStyle: "preserve-3d" as const,
      }),
      [isLowPerf],
    );

    const motionProps = useMemo(
      () => ({
        style: {
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d" as const,
          transformOrigin: "top",
        },
        // Reduce animation frequency for low-performance devices
        ...(isLowPerf && {
          transition: { type: "tween", ease: "easeOut", duration: 0.3 },
        }),
      }),
      [scaleX, scaleY, rotate, translate, isLowPerf],
    );

    return (
      <div className="relative [perspective:800px] [will-change:transform]">
        <div
          style={lidStyle}
          className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2 [backface-visibility:hidden] [will-change:transform]"
        >
          <div
            style={{
              boxShadow: isLowPerf
                ? "0px 1px 0px 1px #171717 inset"
                : "0px 2px 0px 2px #171717 inset",
            }}
            className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]"
          >
            <Image
              src="/logo-white.png"
              alt="alpha code logo"
              width={66}
              height={65}
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        </div>
        <motion.div
          {...motionProps}
          className="absolute inset-0 h-96 w-[32rem] rounded-2xl bg-[#010101] p-2 [backface-visibility:hidden] [will-change:transform]"
        >
          <div className="absolute inset-0 rounded-lg bg-[#272729]" />
          {src && (
            <Image
              src={src}
              alt="screen content"
              className="absolute inset-0 h-full w-full rounded-lg object-cover object-left-top"
              width={isLowPerf ? 768 : 1536} // Reduce image size for low-perf devices
              height={isLowPerf ? 512 : 1024}
              loading="lazy"
              quality={isLowPerf ? 75 : 90} // Reduce image quality for low-perf devices
            />
          )}
        </motion.div>
      </div>
    );
  },
);
Lid.displayName = "Lid";

export const Trackpad = React.memo(() => {
  return (
    <div
      className="mx-auto my-1 h-32 w-[40%] rounded-xl [will-change:transform]"
      style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}
    ></div>
  );
});
Trackpad.displayName = "Trackpad";

export const Keypad = React.memo(({ isLowPerf = false }: { isLowPerf?: boolean }) => {
  // For low-performance devices, simplify the keypad rendering
  if (isLowPerf) {
    return (
      <div className="mx-1 h-full rounded-md bg-[#050505] p-1 [transform:translateZ(0)] [will-change:transform]">
        {/* Simplified keypad for low-performance devices */}
        <div className="flex h-full items-center justify-center">
          <div className="text-xs text-neutral-400">Keyboard</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-1 h-full rounded-md bg-[#050505] p-1 [transform:translateZ(0)] [will-change:transform]">
      {/* First Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-10 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          esc
        </KBtn>
        <KBtn>
          <IconBrightnessDown className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F1</span>
        </KBtn>
        <KBtn>
          <IconBrightnessUp className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F2</span>
        </KBtn>
        <KBtn>
          <IconTable className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F3</span>
        </KBtn>
        <KBtn>
          <IconSearch className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F4</span>
        </KBtn>
        <KBtn>
          <IconMicrophone className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F5</span>
        </KBtn>
        <KBtn>
          <IconMoon className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F6</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackPrev className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F7</span>
        </KBtn>
        <KBtn>
          <IconPlayerSkipForward className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F8</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackNext className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F8</span>
        </KBtn>
        <KBtn>
          <IconVolume3 className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F10</span>
        </KBtn>
        <KBtn>
          <IconVolume2 className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F11</span>
        </KBtn>
        <KBtn>
          <IconVolume className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F12</span>
        </KBtn>
        <KBtn>
          <div className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">
            <div className="h-full w-full rounded-full bg-black" />
          </div>
        </KBtn>
      </div>

      {/* Second row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn>
          <span className="block">~</span>
          <span className="mt-1 block">`</span>
        </KBtn>
        <KBtn>
          <span className="block">!</span>
          <span className="block">1</span>
        </KBtn>
        <KBtn>
          <span className="block">@</span>
          <span className="block">2</span>
        </KBtn>
        <KBtn>
          <span className="block">#</span>
          <span className="block">3</span>
        </KBtn>
        <KBtn>
          <span className="block">$</span>
          <span className="block">4</span>
        </KBtn>
        <KBtn>
          <span className="block">%</span>
          <span className="block">5</span>
        </KBtn>
        <KBtn>
          <span className="block">^</span>
          <span className="block">6</span>
        </KBtn>
        <KBtn>
          <span className="block">&</span>
          <span className="block">7</span>
        </KBtn>
        <KBtn>
          <span className="block">*</span>
          <span className="block">8</span>
        </KBtn>
        <KBtn>
          <span className="block">(</span>
          <span className="block">9</span>
        </KBtn>
        <KBtn>
          <span className="block">)</span>
          <span className="block">0</span>
        </KBtn>
        <KBtn>
          <span className="block">&mdash;</span>
          <span className="block">_</span>
        </KBtn>
        <KBtn>
          <span className="block">+</span>
          <span className="block"> = </span>
        </KBtn>
        <KBtn
          className="w-10 items-end justify-end pb-[2px] pr-[4px]"
          childrenClassName="items-end"
        >
          delete
        </KBtn>
      </div>

      {/* Third row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-10 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          tab
        </KBtn>
        <KBtn>
          <span className="block">Q</span>
        </KBtn>
        <KBtn>
          <span className="block">W</span>
        </KBtn>
        <KBtn>
          <span className="block">E</span>
        </KBtn>
        <KBtn>
          <span className="block">R</span>
        </KBtn>
        <KBtn>
          <span className="block">T</span>
        </KBtn>
        <KBtn>
          <span className="block">Y</span>
        </KBtn>
        <KBtn>
          <span className="block">U</span>
        </KBtn>
        <KBtn>
          <span className="block">I</span>
        </KBtn>
        <KBtn>
          <span className="block">O</span>
        </KBtn>
        <KBtn>
          <span className="block">P</span>
        </KBtn>
        <KBtn>
          <span className="block">{`{`}</span>
          <span className="block">{`[`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`}`}</span>
          <span className="block">{`]`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`|`}</span>
          <span className="block">{`\\`}</span>
        </KBtn>
      </div>

      {/* Fourth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          caps lock
        </KBtn>
        <KBtn>
          <span className="block">A</span>
        </KBtn>
        <KBtn>
          <span className="block">S</span>
        </KBtn>
        <KBtn>
          <span className="block">D</span>
        </KBtn>
        <KBtn>
          <span className="block">F</span>
        </KBtn>
        <KBtn>
          <span className="block">G</span>
        </KBtn>
        <KBtn>
          <span className="block">H</span>
        </KBtn>
        <KBtn>
          <span className="block">J</span>
        </KBtn>
        <KBtn>
          <span className="block">K</span>
        </KBtn>
        <KBtn>
          <span className="block">L</span>
        </KBtn>
        <KBtn>
          <span className="block">{`:`}</span>
          <span className="block">{`;`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`"`}</span>
          <span className="block">{`'`}</span>
        </KBtn>
        <KBtn
          className="w-[2.85rem] items-end justify-end pb-[2px] pr-[4px]"
          childrenClassName="items-end"
        >
          return
        </KBtn>
      </div>

      {/* Fifth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          shift
        </KBtn>
        <KBtn>
          <span className="block">Z</span>
        </KBtn>
        <KBtn>
          <span className="block">X</span>
        </KBtn>
        <KBtn>
          <span className="block">C</span>
        </KBtn>
        <KBtn>
          <span className="block">V</span>
        </KBtn>
        <KBtn>
          <span className="block">B</span>
        </KBtn>
        <KBtn>
          <span className="block">N</span>
        </KBtn>
        <KBtn>
          <span className="block">M</span>
        </KBtn>
        <KBtn>
          <span className="block">{`<`}</span>
          <span className="block">{`,`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`>`}</span>
          <span className="block">{`.`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`?`}</span>
          <span className="block">{`/`}</span>
        </KBtn>
        <KBtn
          className="w-[3.65rem] items-end justify-end pb-[2px] pr-[4px]"
          childrenClassName="items-end"
        >
          shift
        </KBtn>
      </div>

      {/* sixth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <span className="block">fn</span>
          </div>
          <div className="flex w-full justify-start pl-1">
            <IconWorld className="h-[6px] w-[6px]" />
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <IconChevronUp className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">control</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="w-[8.2rem]"></KBtn>
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
          <KBtn className="h-3 w-6">
            <IconCaretUpFilled className="h-[6px] w-[6px]" />
          </KBtn>
          <div className="flex">
            <KBtn className="h-3 w-6">
              <IconCaretLeftFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretDownFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretRightFilled className="h-[6px] w-[6px]" />
            </KBtn>
          </div>
        </div>
      </div>
    </div>
  );
});
Keypad.displayName = "Keypad";

export const KBtn = React.memo(
  ({
    className,
    children,
    childrenClassName,
    backlit = true,
  }: {
    className?: string;
    children?: React.ReactNode;
    childrenClassName?: string;
    backlit?: boolean;
  }) => {
    return (
      <div
        className={cn(
          "rounded-[4px] p-[0.5px] [backface-visibility:hidden] [transform:translateZ(0)] [will-change:transform]",
          backlit && "bg-white/[0.2] shadow-xl shadow-white",
        )}
      >
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D]",
            className,
          )}
          style={{
            boxShadow: "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
          }}
        >
          <div
            className={cn(
              "flex w-full flex-col items-center justify-center text-[5px] text-neutral-200",
              childrenClassName,
              backlit && "text-white",
            )}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
KBtn.displayName = "KBtn";

export const SpeakerGrid = React.memo(({ isLowPerf = false }: { isLowPerf?: boolean }) => {
  // Simplify speaker grid for low-performance devices
  const backgroundStyle = useMemo(() => {
    if (isLowPerf) {
      return {
        backgroundImage: "radial-gradient(circle, #08080A 1px, transparent 1px)",
        backgroundSize: "6px 6px", // Larger pattern, fewer elements
      };
    }
    return {
      backgroundImage: "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
      backgroundSize: "3px 3px",
    };
  }, [isLowPerf]);

  return (
    <div
      className="mt-2 flex h-40 gap-[2px] px-[0.5px] [will-change:transform]"
      style={backgroundStyle}
    ></div>
  );
});
SpeakerGrid.displayName = "SpeakerGrid";

export const OptionKey = React.memo(({ className }: { className: string }) => {
  return (
    <svg
      fill="none"
      version="1.1"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <rect stroke="currentColor" strokeWidth={2} x="18" y="5" width="10" height="2" />
      <polygon
        stroke="currentColor"
        strokeWidth={2}
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "
      />
      <rect id="_Transparent_Rectangle_" className="st0" width="32" height="32" stroke="none" />
    </svg>
  );
});
OptionKey.displayName = "OptionKey";
