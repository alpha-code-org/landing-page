"use client";

import { motion, useInView } from "framer-motion";
import ServiceCard from "../cards/ServiceCard";
import { ServiceType } from "../utils/services";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export const StickyScroll = ({ services }: { services: ServiceType[] }) => {
  const [activeCard, setActiveCard] = useState(0);

  const backgroundColors = ["#000", "#1E2444", "#335AA6"];

  const Icon = services[activeCard].icon;

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="flex gap-16 justify-center relative space-x-10 rounded-md pt-20 md:p-36"
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
      <div className="my-40">
        <motion.div className="hidden lg:block h-60 grow max-w-[40rem] min-w-[24rem] rounded-md sticky top-[50%] translate-y-[-50%]  overflow-hidden">
          <div className="relative h-96 w-full rounded-xl bg-slate-800 shadow-xl">
            <div className="flex w-full gap-1.5 rounded-t-xl bg-slate-900 p-3">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div className="p-2 relative z-10">
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
      </div>
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 1 });

  useEffect(() => {
    if (isInView) {
      setActiveCard(index);
    }
  }, [isInView, index, setActiveCard]);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: isInView ? 1 : 0.8,
      }}
      ref={ref}
      key={item.title}
      className="max-h-[100vh]"
    >
      <ServiceCard
        title={item.title}
        description={item.description}
        imageSrc={item.imageSrc}
      />
    </motion.div>
  );
};
