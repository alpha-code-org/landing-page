import { ClipboardList, Search, Wrench, type LucideIcon } from "lucide-react";

export type ProcessStepType = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const processSteps: Array<ProcessStepType> = [
  {
    icon: Search,
    title: "Free review",
    description: "We find where your team loses time.",
  },
  {
    icon: ClipboardList,
    title: "Clear plan",
    description: "You see what to automate and what it saves.",
  },
  {
    icon: Wrench,
    title: "We build it",
    description: "It runs inside the tools you already use.",
  },
];
