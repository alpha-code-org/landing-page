"use client";

import { motion, useInView } from "framer-motion";
import ServiceCard from "../cards/ServiceCard";
import { ServiceType } from "../utils/services";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export const StickyScroll = ({ services }: { services: ServiceType[] }) => {
  const [activeCard, setActiveCard] = useState(0);

  const Icon = services[activeCard].icon;

  return (
    <motion.div className="flex gap-4 xl:gap-16 justify-center md:px-20 mt-20">
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl flex flex-col gap-16">
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
      <motion.div className="hidden lg:block h-max grow max-w-[40rem] min-w-[30rem] rounded-md sticky top-[32%]">
        <div className="w-full rounded-xl bg-slate-800 shadow-xl pb-8">
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
          <Icon className="w-20 h-20 text-slate-700 mx-auto" />
        </div>
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

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
