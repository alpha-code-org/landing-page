"use client";

import { motion } from "framer-motion";
import ServiceCard from "../cards/ServiceCard";
import { ServiceType } from "../utils/services";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const StickyScroll = ({ services }: { services: ServiceType[] }) => {
  const [activeCard, setActiveCard] = useState(0);

  const backgroundColors = ["#000", "#1E2444", "#335AA6"];

  const Icon = services[activeCard].icon;

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="flex gap-16 justify-center relativespace-x-10 rounded-md md:p-10"
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {services.map((item, index) => (
            <Card
              key={item.title}
              index={index}
              item={item}
              setActiveCard={setActiveCard}
            />
          ))}
        </div>
      </div>
      <motion.div className="hidden lg:block h-60 grow max-w-[40rem] rounded-md sticky top-0 translate-y-[20%]  overflow-hidden">
        <div className="relative h-96 w-full rounded-xl bg-slate-800 shadow-xl">
          <div className="flex w-full gap-1.5 rounded-t-xl bg-slate-900 p-3">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="p-2">
            <p className="font-mono text-lg text-slate-200">
              <span className="text-green-300">~</span>{" "}
              {services[activeCard].sideTitle}
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

const Card = ({
  item,
  index,
  setActiveCard,
}: {
  item: ServiceType;
  index: number;
  setActiveCard: Dispatch<SetStateAction<number>>;
}) => {
  const { containerRef, inView } = useIntersectionObserver();

  useEffect(() => {
    if (inView) {
      setActiveCard(index);
    }
  }, [inView, index, setActiveCard]);

  return (
    <div
      ref={containerRef}
      key={item.title}
      className="h-[100vh] my-10 lg:my-20"
    >
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: inView ? 1 : 0.8,
        }}
      >
        <ServiceCard
          title={item.title}
          description={item.description}
          imageSrc={item.imageSrc}
        />
      </motion.div>
    </div>
  );
};
