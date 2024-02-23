"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import ServiceCard from "../cards/ServiceCard";
import { ContentType } from "../utils/content";

export const StickyScroll = ({ content }: { content: ContentType[] }) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    cardsBreakpoints.forEach((breakpoint, index) => {
      if (latest > breakpoint - 0.1 && latest <= breakpoint + 0.2) {
        setActiveCard(() => index);
      }
    });
  });

  const backgroundColors = ["#000", "#1E2444", "#335AA6"];

  const Icon = content[activeCard].icon;

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[100vh] overflow-y-auto flex justify-center sticky top-0 space-x-10 rounded-md md:p-10"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title} className="my-20">
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
              >
                <ServiceCard
                  title={item.title}
                  description={item.description}
                  imageSrc={item.imageSrc}
                />
              </motion.div>
            </div>
          ))}
          <div className="h-20" />
        </div>
      </div>
      <motion.div className="hidden lg:block h-60 grow max-w-[40rem] rounded-md sticky top-[40%] translate-y-[-50%] overflow-hidden">
        <div className="relative h-96 w-full rounded-xl bg-slate-800 shadow-xl">
          <div className="flex w-full gap-1.5 rounded-t-xl bg-slate-900 p-3">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="p-2">
            <p className="font-mono text-lg text-slate-200">
              <span className="text-green-300">~</span>{" "}
              {content[activeCard].sideTitle}
            </p>
          </div>
        </div>

        <span className="absolute left-[50%] bottom-[15%] -translate-x-[50%]  text-slate-700">
          <Icon className="w-20 h-20" />
        </span>
      </motion.div>
    </motion.div>
  );
};
