"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { Button } from "./moving-border-button";
import Link from "next/link";
import { words } from "../utils/words";

export const Typewriter = ({
  className,
  cursorClassName,
}: {
  className?: string;
  cursorClassName?: string;
}) => {
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
                <span
                  key={`char-${index}`}
                  className={cn(`text-black dark:text-white`, word.className)}
                >
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
      <p className="mb-4 text-lg text-neutral-600 dark:text-neutral-200 sm:text-xl md:mb-0">
        Looking forward meeting you.
      </p>

      <div className={cn("my-6 hidden space-x-1 md:flex", className)}>
        <motion.div
          className="overflow-hidden"
          initial={{
            width: "0%",
          }}
          whileInView={{
            width: "fit-content",
          }}
          transition={{
            duration: 1.2,
            ease: "linear",
            delay: 1,
          }}
        >
          <div
            className="lg:text:3xl text-xs font-bold sm:text-base md:text-xl xl:text-5xl"
            style={{
              whiteSpace: "nowrap",
              lineHeight: "1.2",
            }}
          >
            {renderWords()}{" "}
          </div>{" "}
        </motion.div>
        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={cn(
            "block w-[4px] rounded-sm bg-blue-500 sm:h-6 xl:h-12",
            cursorClassName,
          )}
          style={{ height: "100%" }}
        ></motion.span>
      </div>
      <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <Link href="https://calendly.com/alphacode/alpha-code" target="__blank">
          <Button
            borderRadius="1.75rem"
            className="z-10 border-neutral-200 bg-brand-code font-bold text-white transition-colors hover:bg-white hover:text-brand-code dark:border-slate-800"
          >
            Schedule a call
          </Button>
        </Link>
      </div>
    </div>
  );
};
