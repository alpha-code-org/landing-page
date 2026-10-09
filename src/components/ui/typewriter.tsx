"use client";

import { cn } from "@/utils/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { BookingButton } from "./booking-button";
import { words } from "@/data/words";
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
                        "text-neutral-900 dark:text-white",
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
                        "absolute top-1/2 w-[4px] -translate-y-1/2 rounded-sm bg-blue-500 opacity-0 sm:h-6 xl:h-12",
                        cursorClassName,
                        isInView && (isLastChar ? "animate-cursor-blink" : "animate-cursor-move"),
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
    <div className="flex h-[50vh] flex-col items-center justify-center md:h-[75vh] dark:bg-dark-bg">
      <p className="mb-4 text-lg text-neutral-600 sm:text-xl md:mb-0 dark:text-neutral-200">
        Ready to automate the busywork?
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
      <div className="flex flex-col space-y-4 space-x-0 md:flex-row md:space-y-0 md:space-x-4">
        <BookingButton className="bg-brand-code hover:text-brand-code z-10 border-slate-800 font-bold text-white transition-colors hover:bg-white">
          Schedule a call
        </BookingButton>
      </div>
    </div>
  );
};
