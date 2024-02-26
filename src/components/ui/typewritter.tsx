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
  // split text inside of words into array of characters
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
                  className={cn(`dark:text-white text-black `, word.className)}
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
    <div className="flex flex-col items-center justify-center h-[100vh] bg-black">
      <p className="text-neutral-600 dark:text-neutral-200 text-lg sm:text-xl mb-4 md:mb-0">
        Looking forward meeting you.
      </p>

      <div className={cn("hidden md:flex space-x-1 my-6", className)}>
        <motion.div
          className="overflow-hidden "
          initial={{
            width: "0%",
          }}
          whileInView={{
            width: "fit-content",
          }}
          transition={{
            duration: 2,
            ease: "linear",
            delay: 1,
          }}
        >
          <div
            className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold"
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
            "block rounded-sm w-[4px] sm:h-6 xl:h-12 bg-blue-500",
            cursorClassName
          )}
          style={{ height: "100%" }}
        ></motion.span>
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link href="https://calendly.com/alphacode/alpha-code" target="__blank">
          <Button
            borderRadius="1.75rem"
            className="bg-brand-code hover:bg-white hover:text-brand-code transition-colors font-bold text-white border-neutral-200 dark:border-slate-800 z-10"
          >
            Schedule a call
          </Button>
        </Link>
      </div>
    </div>
  );
};
