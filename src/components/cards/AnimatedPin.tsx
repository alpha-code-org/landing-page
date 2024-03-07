"use client";
import React from "react";
import { PinContainer } from "../ui/3d-pin";
import Image from "next/image";

export function AnimatedPinDemo() {
  return (
    <div className="h-[60rem] w-full px-[2.5%] mx-auto overflow-hidden flex items-center justify-center bg-black">
      <PinContainer title="Open Post Pilot" href="https://www.post-pilot.pro/">
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 max-w-[100%] w-[30rem] h-[30rem] ">
          <h3 className="pb-2 m-0 font-bold  text-3xl text-slate-100">
            Post Pilot
          </h3>
          <div className="text-base m-0 p-0 font-normal">
            <p className="text-slate-500 text-lg font-bold mb-1">
              Social media post scheduler
            </p>
            <p className="text-slate-500 mb-4">
              Enabling users to schedule and publish posts effortlessly on
              LinkedIn and Twitter.
            </p>
          </div>
          <div className="relative h-full">
            <Image
              src="/post-pilot.png"
              alt="Post Pilot"
              fill
              objectFit="cover"
              className="max-w-full"
            />
          </div>
        </div>
      </PinContainer>
    </div>
  );
}
