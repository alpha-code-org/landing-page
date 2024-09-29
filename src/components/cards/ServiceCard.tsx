"use client";

import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

interface Props {
  title: string;
  description: string;
  imageSrc: string;
  children: React.ReactNode;
}

function ServiceCard({ title, description, imageSrc, children }: Props) {
  return (
    <CardContainer className="inter-var max-w-[28rem]">
      <CardBody className="group/card relative h-auto w-auto rounded-xl border border-white/[0.2] bg-black p-6 hover:shadow-2xl hover:shadow-emerald-500/[0.1] sm:w-[30rem]">
        <CardItem translateZ="50" className="text-xl font-bold text-white md:text-3xl">
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="mt-2 max-w-sm text-sm text-neutral-500 md:text-lg"
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
          />
        </CardItem>

        {children}
      </CardBody>
    </CardContainer>
  );
}

export default ServiceCard;
