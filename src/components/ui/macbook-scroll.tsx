"use client";

import React, { useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretDownFilled,
  IconCaretLeftFilled,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconCommand,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconSearch,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconWorld,
} from "@tabler/icons-react";
import { cn } from "@/utils/cn";
import { Highlight } from "./audit-highlight";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const MacbookScroll = ({
  src,
  animationDelay = 0.35,
}: {
  src?: string;
  animationDelay?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(false);
  const reducedMotion = useReducedMotion();

  // Track mobile state in ref to avoid re-renders
  useEffect(() => {
    const check = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll-driven animation via refs — no state, no re-renders
  useEffect(() => {
    if (!containerRef.current) return;

    let ticking = false;

    const updateTransforms = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      const rawProgress = (windowHeight - rect.top) / (windowHeight + elementHeight);
      const progress = Math.max(
        0,
        Math.min(1, (rawProgress - animationDelay) / (1 - animationDelay)),
      );

      const isMobile = isMobileRef.current;
      const scaleX = 1.2 + progress * (isMobile ? -0.2 : 0.1);
      const scaleY = Math.min(1.1, 0.6 + progress * (isMobile ? 0.4 : 1.5));
      const translateY = progress * 750;
      const rotateX = progress < 0.3 ? -28 + progress * 93.33 : 0;
      const textTranslateY = progress * 200;
      const textOpacity = Math.max(0, 1 - progress * 5);

      if (titleRef.current) {
        titleRef.current.style.transform = `translateY(${textTranslateY}px)`;
        titleRef.current.style.opacity = String(textOpacity);
      }

      if (screenRef.current) {
        screenRef.current.style.transform = `scaleX(${scaleX}) scaleY(${scaleY}) rotateX(${rotateX}deg) translateY(${translateY}px) translateZ(0px)`;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateTransforms);
        ticking = true;
      }
    };

    updateTransforms();
    // With reduced motion, keep the initial frame and skip scroll-driven updates
    if (reducedMotion) return;

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [animationDelay, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="mb-20 flex h-[1000px] shrink-0 flex-col items-center py-40 md:h-[1680px] md:py-80"
      style={{
        // Force hardware acceleration and optimize rendering
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        perspective: "1000px",
      }}
    >
      <div
        ref={titleRef}
        className="text-center text-3xl font-bold text-neutral-800 will-change-transform md:mb-20 dark:text-white"
      >
        <span className="scale-200 md:scale-100">
          Automate manual tasks with{" "}
          <Highlight className="whitespace-nowrap text-white">AI workflows</Highlight>
        </span>
      </div>
      <div className="flex shrink-0 scale-[0.5] transform flex-col items-center justify-start py-0 will-change-transform backface-hidden perspective-midrange sm:scale-50 md:scale-100">
        {/* Lid */}
        <CSSLid src={src} screenRef={screenRef} />
        {/* Base area */}
        <div className="relative -z-10 h-88 w-lg overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#272729]">
          {/* above keyboard bar */}
          <div className="relative h-10 w-full">
            <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
          </div>
          <div className="relative flex">
            <div className="mx-auto h-full w-[10%] overflow-hidden">
              <SpeakerGrid />
            </div>
            <div className="mx-auto h-full w-[80%]">
              <Keypad />
            </div>
            <div className="mx-auto h-full w-[10%] overflow-hidden">
              <SpeakerGrid />
            </div>
          </div>
          <Trackpad />
          <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-linear-to-t from-[#272729] to-[#050505]" />
        </div>
      </div>
    </div>
  );
};

export const CSSLid = React.memo(
  ({ src, screenRef }: { src?: string; screenRef: React.RefObject<HTMLDivElement | null> }) => {
    return (
      <div className="relative will-change-transform perspective-midrange">
        <div
          style={{
            transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
            transformOrigin: "bottom",
            transformStyle: "preserve-3d",
          }}
          className="relative h-48 w-lg rounded-2xl bg-[#010101] p-2 will-change-transform backface-hidden"
        >
          <div
            style={{
              boxShadow: "0px 2px 0px 2px #171717 inset",
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
        <div
          ref={screenRef}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "top",
          }}
          className="absolute inset-0 h-96 w-lg rounded-2xl bg-[#010101] p-2 will-change-transform backface-hidden"
        >
          <div className="absolute inset-0 rounded-lg bg-[#272729]" />
          {src && (
            <Image
              src={src}
              alt="screen content"
              className="absolute inset-0 h-full w-full rounded-lg object-cover object-top-left"
              width={1536}
              height={1024}
              sizes="(max-width: 768px) 320px, 640px"
              loading="lazy"
              quality={90}
            />
          )}
        </div>
      </div>
    );
  },
);
CSSLid.displayName = "CSSLid";

export const Trackpad = React.memo(() => {
  return (
    <div
      className="mx-auto my-1 h-32 w-[40%] rounded-xl"
      style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}
    ></div>
  );
});
Trackpad.displayName = "Trackpad";

const ICON = "h-[6px] w-[6px]";
const ROW = "mb-[2px] flex w-full shrink-0 gap-[2px]";

const FUNCTION_KEYS = [
  [IconBrightnessDown, "F1"],
  [IconBrightnessUp, "F2"],
  [IconTable, "F3"],
  [IconSearch, "F4"],
  [IconMicrophone, "F5"],
  [IconMoon, "F6"],
  [IconPlayerTrackPrev, "F7"],
  [IconPlayerSkipForward, "F8"],
  [IconPlayerTrackNext, "F9"],
  [IconVolume3, "F10"],
  [IconVolume2, "F11"],
  [IconVolume, "F12"],
] as const;

// [shifted, unshifted] pairs; letters have no second character
const NUMBER_KEYS = [
  ["!", "1"],
  ["@", "2"],
  ["#", "3"],
  ["$", "4"],
  ["%", "5"],
  ["^", "6"],
  ["&", "7"],
  ["*", "8"],
  ["(", "9"],
  [")", "0"],
  ["—", "_"],
  ["+", " = "],
];
const QWERTY_KEYS = [..."QWERTYUIOP"]
  .map((c) => [c])
  .concat([
    ["{", "["],
    ["}", "]"],
    ["|", "\\"],
  ]);
const HOME_KEYS = [..."ASDFGHJKL"]
  .map((c) => [c])
  .concat([
    [":", ";"],
    ['"', "'"],
  ]);
const BOTTOM_KEYS = [..."ZXCVBNM"]
  .map((c) => [c])
  .concat([
    ["<", ","],
    [">", "."],
    ["?", "/"],
  ]);

// Key with one or two stacked characters
const CharKey = ({
  chars: [top, bottom],
  bottomClassName,
}: {
  chars: string[];
  bottomClassName?: string;
}) => (
  <KBtn>
    <span className="block">{top}</span>
    {bottom !== undefined && <span className={cn(bottomClassName, "block")}>{bottom}</span>}
  </KBtn>
);

// Wide text key (esc, tab, shift, ...) with its label pinned to the outer edge
const ModifierKey = ({
  label,
  width,
  side,
}: {
  label: string;
  width: string;
  side: "left" | "right";
}) =>
  side === "left" ? (
    <KBtn
      className={cn(width, "items-end justify-start pb-[2px] pl-[4px]")}
      childrenClassName="items-start"
    >
      {label}
    </KBtn>
  ) : (
    <KBtn
      className={cn(width, "items-end justify-end pr-[4px] pb-[2px]")}
      childrenClassName="items-end"
    >
      {label}
    </KBtn>
  );

// Bottom-row key with a symbol above its label
const StackedKey = ({
  top,
  bottom,
  topAlign = "end",
  className = "",
}: {
  top: React.ReactNode;
  bottom: React.ReactNode;
  topAlign?: "start" | "end";
  className?: string;
}) => (
  <KBtn className={className} childrenClassName="h-full justify-between py-[4px]">
    <div
      className={cn("flex w-full", topAlign === "end" ? "justify-end pr-1" : "justify-start pl-1")}
    >
      {top}
    </div>
    <div className="flex w-full justify-start pl-1">{bottom}</div>
  </KBtn>
);

export const Keypad = React.memo(() => {
  return (
    <div className="mx-1 h-full rounded-md bg-[#050505] p-1">
      <div className={ROW}>
        <ModifierKey label="esc" width="w-10" side="left" />
        {FUNCTION_KEYS.map(([Icon, label]) => (
          <KBtn key={label}>
            <Icon className={ICON} />
            <span className="mt-1 inline-block">{label}</span>
          </KBtn>
        ))}
        {/* Power / Touch ID */}
        <KBtn>
          <div className="h-4 w-4 rounded-full bg-linear-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">
            <div className="h-full w-full rounded-full bg-black" />
          </div>
        </KBtn>
      </div>

      <div className={ROW}>
        <CharKey chars={["~", "`"]} bottomClassName="mt-1" />
        {NUMBER_KEYS.map((chars) => (
          <CharKey key={chars[0]} chars={chars} />
        ))}
        <ModifierKey label="delete" width="w-10" side="right" />
      </div>

      <div className={ROW}>
        <ModifierKey label="tab" width="w-10" side="left" />
        {QWERTY_KEYS.map((chars) => (
          <CharKey key={chars[0]} chars={chars} />
        ))}
      </div>

      <div className={ROW}>
        <ModifierKey label="caps lock" width="w-[2.8rem]" side="left" />
        {HOME_KEYS.map((chars) => (
          <CharKey key={chars[0]} chars={chars} />
        ))}
        <ModifierKey label="return" width="w-[2.85rem]" side="right" />
      </div>

      <div className={ROW}>
        <ModifierKey label="shift" width="w-[3.65rem]" side="left" />
        {BOTTOM_KEYS.map((chars) => (
          <CharKey key={chars[0]} chars={chars} />
        ))}
        <ModifierKey label="shift" width="w-[3.65rem]" side="right" />
      </div>

      <div className={ROW}>
        <StackedKey
          top={<span className="block">fn</span>}
          bottom={<IconWorld className={ICON} />}
        />
        <StackedKey
          top={<IconChevronUp className={ICON} />}
          bottom={<span className="block">control</span>}
        />
        <StackedKey
          top={<OptionKey className={ICON} />}
          bottom={<span className="block">option</span>}
        />
        <StackedKey
          className="w-8"
          top={<IconCommand className={ICON} />}
          bottom={<span className="block">command</span>}
        />
        <KBtn className="w-[8.2rem]"></KBtn>
        <StackedKey
          className="w-8"
          topAlign="start"
          top={<IconCommand className={ICON} />}
          bottom={<span className="block">command</span>}
        />
        <StackedKey
          topAlign="start"
          top={<OptionKey className={ICON} />}
          bottom={<span className="block">option</span>}
        />
        <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
          <KBtn className="h-3 w-6">
            <IconCaretUpFilled className={ICON} />
          </KBtn>
          <div className="flex">
            <KBtn className="h-3 w-6">
              <IconCaretLeftFilled className={ICON} />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretDownFilled className={ICON} />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretRightFilled className={ICON} />
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
        className={cn("rounded-[4px] p-[0.5px]", backlit && "bg-white/20 shadow-xl shadow-white")}
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

export const SpeakerGrid = React.memo(() => {
  const backgroundStyle = useMemo(() => {
    return {
      backgroundImage: "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
      backgroundSize: "3px 3px",
    };
  }, []);

  return <div className="mt-2 flex h-40 gap-[2px] px-[0.5px]" style={backgroundStyle}></div>;
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
