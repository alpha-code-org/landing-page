import {
  Bell,
  BookCheck,
  CalendarCheck,
  CalendarClock,
  Database,
  Inbox,
  Landmark,
  Mail,
  MessageCircle,
  ScanText,
  Send,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type WorkflowStepType = {
  icon: LucideIcon;
  title: string;
  detail: string; // what the step produced, shown once it finishes
  seconds: number; // how long the step takes when automated
  ai?: boolean; // steps where the AI reads or decides something
};

export type WorkflowType = {
  name: string; // the tab label
  trigger: string; // the window title
  manualMinutes: number; // the same task done by hand
  volume: number; // how often it happens in a typical week
  unit: string;
  steps: Array<WorkflowStepType>;
};

export const workflows: Array<WorkflowType> = [
  {
    name: "Invoices",
    trigger: "New supplier invoice",
    manualMinutes: 12,
    volume: 60,
    unit: "invoices",
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
    ],
  },
  {
    name: "Enquiries",
    trigger: "New enquiry from a property portal",
    manualMinutes: 15,
    volume: 40,
    unit: "enquiries",
    steps: [
      {
        icon: Inbox,
        title: "Enquiry comes in",
        detail: "“Is the 2-bedroom flat still available?”",
        seconds: 0.3,
      },
      {
        icon: Sparkles,
        title: "AI understands the request",
        detail: "Wants a viewing this week, budget fits",
        seconds: 2.4,
        ai: true,
      },
      {
        icon: Send,
        title: "Instant reply sent",
        detail: "Property details and 3 free viewing slots",
        seconds: 1.6,
        ai: true,
      },
      {
        icon: CalendarCheck,
        title: "Viewing booked",
        detail: "Thursday 17:30, added to the agent's calendar",
        seconds: 0.9,
      },
      {
        icon: Database,
        title: "Lead logged in the CRM",
        detail: "Contact, property and notes saved",
        seconds: 0.7,
      },
    ],
  },
  {
    name: "Appointments",
    trigger: "Patient message on WhatsApp",
    manualMinutes: 8,
    volume: 80,
    unit: "messages",
    steps: [
      {
        icon: MessageCircle,
        title: "Patient asks to reschedule",
        detail: "“Can I move my Tuesday check-up?”",
        seconds: 0.3,
      },
      {
        icon: Sparkles,
        title: "AI finds the appointment",
        detail: "Tuesday 10:00, check-up with the dentist",
        seconds: 1.9,
        ai: true,
      },
      {
        icon: CalendarClock,
        title: "Moved to the next free slot",
        detail: "Wednesday 09:30, calendar updated",
        seconds: 1.2,
      },
      {
        icon: Send,
        title: "Confirmation sent",
        detail: "Patient replied “Perfect, thanks!”",
        seconds: 0.8,
        ai: true,
      },
      {
        icon: Bell,
        title: "Reminder scheduled",
        detail: "SMS goes out 24 hours before",
        seconds: 0.4,
      },
    ],
  },
];
