"use client";

import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { cn } from "@/utils/cn";

interface Props {
  title: string;
  description: string;
  imageSrc: string;
  children: React.ReactNode;
  width: string;
}

function ServiceCard({ title, description, imageSrc, children, width }: Props) {
  return (
    <CardContainer className={cn(`inter-var ${width} `)} containerClassName="flex-1">
      <CardBody className="group/card relative flex h-auto w-full flex-1 flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-neutral-200/50 dark:border-neutral-800 dark:bg-black dark:shadow-none dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
        <CardItem
          translateZ="50"
          className="mb-auto text-xl font-bold text-neutral-900 dark:text-white md:text-2xl"
        >
          {title}
        </CardItem>
        <CardItem
          translateZ="60"
          className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-400 md:text-lg"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="mt-4 w-full">
          <Image
            src={imageSrc}
            height="1000"
            width="1000"
            className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
            alt={title}
            loading="lazy"
          />
        </CardItem>

        {children}
      </CardBody>
    </CardContainer>
  );
}

export default ServiceCard;
