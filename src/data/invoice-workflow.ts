import { BookCheck, Landmark, Mail, ScanText, ShieldCheck, type LucideIcon } from "lucide-react";

export type WorkflowStepType = {
  icon: LucideIcon;
  title: string;
  detail: string; // what the step produced, shown once it finishes
  seconds: number; // how long the step takes when automated
  ai?: boolean; // steps where the AI reads or decides something
};

export const invoiceWorkflow = {
  trigger: "New supplier invoice",
  manualMinutes: 12,
  invoicesPerWeek: 550,
  hourlyCost: 30, // fully loaded cost of an hour of office staff time, in euros
  workingWeeks: 46, // after holidays
  steps: [
    {
      icon: Mail,
      title: "Invoice arrives by email",
      detail: "invoice-0412.pdf from a supplier",
      seconds: 0.4,
    },
    {
      icon: ScanText,
      title: "AI reads the invoice",
      detail: "Supplier, VAT ID, 3 line items, €1,284.50",
      seconds: 3.2,
      ai: true,
    },
    {
      icon: ShieldCheck,
      title: "Checked for mistakes",
      detail: "VAT adds up, not a duplicate",
      seconds: 1.1,
      ai: true,
    },
    {
      icon: BookCheck,
      title: "Posted to accounting software",
      detail: "Booked to the right account and cost centre",
      seconds: 1.8,
    },
    {
      icon: Landmark,
      title: "Matched to the bank statement",
      detail: "Payment found, invoice marked as paid",
      seconds: 1.5,
    },
  ] satisfies Array<WorkflowStepType>,
};

export const sumSeconds = (steps: Array<WorkflowStepType>) =>
  steps.reduce((total, step) => total + step.seconds, 0);

const { steps, manualMinutes, invoicesPerWeek, hourlyCost, workingWeeks } = invoiceWorkflow;
const automatedSeconds = sumSeconds(steps);
const savedSecondsPerInvoice = manualMinutes * 60 - automatedSeconds;
const weeklyHoursSaved = (invoicesPerWeek * savedSecondsPerInvoice) / 3600;

export const invoiceSavings = {
  automatedSeconds,
  weeklyHoursSaved,
  eurosPerInvoice: (savedSecondsPerInvoice / 3600) * hourlyCost,
  eurosPerYear: Math.round(weeklyHoursSaved * workingWeeks * hourlyCost),
};
