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
    description: "We look at where your team's week goes.",
  },
  {
    icon: ClipboardList,
    title: "Clear plan",
    description: "You get a list of what to automate and the hours it saves.",
  },
  {
    icon: Wrench,
    title: "We build it",
    description: "Automations that work inside the tools you already use.",
  },
];
