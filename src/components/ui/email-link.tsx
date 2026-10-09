import { CONTACT_EMAIL } from "@/utils/links";

// A quieter alternative under the booking buttons, for visitors not ready to schedule a call
export const EmailLink = () => (
  <p className="text-sm text-neutral-600 dark:text-neutral-400">
    Prefer email?{" "}
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className="text-brand-code font-semibold underline-offset-4 hover:underline dark:text-blue-400"
    >
      {CONTACT_EMAIL}
    </a>
  </p>
);
