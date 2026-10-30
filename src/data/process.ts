import { ClipboardList, Search, Wrench, type LucideIcon } from "lucide-react";

type ProcessStepType = {
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
    description: "We run the numbers on what you'll save.",
  },
  {
    icon: Wrench,
    title: "We build it",
    description: "It integrates with tools you already use.",
  },
];
