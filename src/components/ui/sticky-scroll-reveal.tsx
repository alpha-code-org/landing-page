"use client";

import { motion, useInView } from "framer-motion";
import ServiceCard from "../cards/ServiceCard";
import { ServiceType } from "../utils/services";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CardItem } from "./3d-card";

export const StickyScroll = ({ services }: { services: ServiceType[] }) => {
  const [activeCard, setActiveCard] = useState(0);

  const Icon = services[activeCard].icon;

  return (
    <motion.div className="mt-20 flex justify-center gap-4 md:px-20 xl:gap-16">
      <div className="relative flex items-start px-4">
        <div className="flex max-w-2xl flex-col gap-16">
          {services.map((item, index) => (
            <Card key={item.title} index={index} item={item} setActiveCard={setActiveCard} />
          ))}
        </div>
      </div>
      <motion.div className="sticky top-[32%] hidden h-max min-w-[30rem] max-w-[40rem] grow rounded-md lg:block">
        <div className="w-full rounded-xl bg-slate-800 pb-8 shadow-xl">
          <div className="flex w-full gap-1.5 rounded-t-xl bg-slate-900 p-3">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="p-2">
            <p className="font-mono text-lg text-slate-200">
              <span className="text-green-300">~</span> {services[activeCard].sideTitle}
            </p>
          </div>
          <Icon className="mx-auto h-20 w-20 text-slate-700" />
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
  const isInView = useInView(ref, {
    amount: 0.1,
    margin: "-45% 0px",
  });

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
      <Link href="https://calendly.com/alphacode/alpha-code" target="__blank">
        <ServiceCard
          title={item.title}
          description={item.description}
          imageSrc={item.imageSrc}
          width="w-[24rem] max-w-[90vw]"
          priority={index === 0}
        >
          <div className="mt-4 flex items-center justify-between md:mt-20">
            <CardItem
              translateZ={20}
              className="rounded-xl px-4 py-2 text-base font-normal text-white"
            >
              Try now →
            </CardItem>
          </div>
        </ServiceCard>
      </Link>
    </motion.div>
  );
};
