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

  const charDelay = 0.05; // 50ms per character

  const renderWords = () => {
    let charIndex = 0;
    return (
      <div className="relative">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => {
                const currentIndex = charIndex++;
                const isLastChar = idx === wordsArray.length - 1 && index === word.text.length - 1;
                return (
                  <span key={`char-${index}`} className="relative">
                    <span
                      className={cn(
                        "text-white",
                        word.className,
                        isInView ? "animate-typewriter-char" : "opacity-0",
                      )}
                      style={{
                        animationDelay: isInView ? `${currentIndex * charDelay}s` : undefined,
                      }}
                    >
                      {char}
                    </span>
                    <span
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-[4px] rounded-sm bg-blue-500 sm:h-6 xl:h-12 opacity-0",
                        cursorClassName,
                        isInView &&
                          (isLastChar ? "animate-cursor-blink" : "animate-cursor-move"),
                      )}
                      style={{
                        animationDelay: isInView ? `${currentIndex * charDelay}s` : undefined,
                      }}
                    />
                  </span>
                );
              })}
              <span
                className={cn(isInView ? "animate-typewriter-char" : "opacity-0")}
                style={{
                  animationDelay: isInView ? `${charIndex++ * charDelay}s` : undefined,
                }}
              >
                &nbsp;
              </span>
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

      <div ref={textRef} className={cn("my-6 hidden items-center md:flex", className)}>
        <div
          className="text-md font-bold md:text-xl lg:text-3xl xl:text-5xl"
          style={{
            whiteSpace: "nowrap",
            lineHeight: "1.2",
          }}
        >
          {renderWords()}
        </div>
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
