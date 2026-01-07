"use client";

import { cn } from "@/utils/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Button } from "./moving-border-button";
import Link from "next/link";
import { words } from "../utils/words";
import { useRef } from "react";

export const Typewriter = ({
  className,
  cursorClassName,
}: {
  className?: string;
  cursorClassName?: string;
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(textRef, {
    once: true,
    amount: 0.3,
  });

  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span key={`char-${index}`} className={cn(`text-white`, word.className)}>
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center bg-black md:h-[75vh]">
      <p className="mb-4 text-lg text-neutral-200 sm:text-xl md:mb-0">
        Looking forward meeting you.
      </p>

      <div className={cn("my-6 hidden space-x-1 md:flex", className)}>
        <div
          ref={textRef}
          className={cn("overflow-hidden", isInView && "animate-reveal-width")}
          style={{
            width: isInView ? "fit-content" : "0",
            animationDelay: "0.2s",
          }}
        >
          <div
            className="text-md font-bold md:text-xl lg:text-3xl xl:text-5xl"
            style={{
              whiteSpace: "nowrap",
              lineHeight: "1.2",
            }}
          >
            {renderWords()}{" "}
          </div>{" "}
        </div>
        <span
          className={cn(
            "block w-[4px] rounded-sm bg-blue-500 sm:h-6 xl:h-12 animate-cursor-blink",
            cursorClassName
          )}
          style={{
            height: "100%",
            animationDelay: "1.2s",
          }}
        ></span>
      </div>
      <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <Link href="https://calendly.com/alphacode/alpha-code" target="__blank">
          <Button
            borderRadius="1.75rem"
            className="z-10 border-slate-800 bg-brand-code font-bold text-white transition-colors hover:bg-white hover:text-brand-code"
          >
            Schedule a call
          </Button>
        </Link>
      </div>
    </div>
  );
};
