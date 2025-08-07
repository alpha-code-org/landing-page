"use client";

import { Code2, Container, HandHelping, LucideIcon } from "lucide-react";

export type ServiceType = {
  title: string;
  description: string;
  imageSrc: string;
  sideTitle: string;
  icon: LucideIcon;
};

export const services: Array<ServiceType> = [
  {
    title: "Software Development",
    description: "Crafting scalable software solutions for individuals and small businesses.",
    imageSrc: "/services/full-stack.webp",
    sideTitle:
      "From concept to deployment, we build complete digital solutions that bring your vision to life.",
    icon: Code2,
  },
  {
    title: "Codebase Audit",
    description: "Expert codebase analysis to improve performance and security.",
    imageSrc: "/services/consulting.webp",
    sideTitle:
      "Deep dive into your codebase to identify  security vulnerabilities and areas for improvement.",
    icon: HandHelping,
  },
  {
    title: "AI Development",
    description: "Automating tasks and improving efficiency with AI.",
    imageSrc: "/services/blockchain.webp",
    sideTitle:
      "Save time and resources with simple AI solutions. Let your people focus on what they do best.",
    icon: Container,
  },
];
