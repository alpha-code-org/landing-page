import Image, { type ImageProps } from "next/image";
import { cn } from "@/utils/cn";

type Props = Omit<ImageProps, "src" | "alt"> & { alt?: string };

// Renders the light and dark logo variants; CSS shows the one matching the current theme
export function ThemedLogo({ className, alt = "Alpha Code logo", ...props }: Props) {
  return (
    <>
      <Image src="/logo.png" alt={alt} className={cn("hidden dark:block", className)} {...props} />
      <Image
        src="/logo-dark.png"
        alt={alt}
        className={cn("block dark:hidden", className)}
        {...props}
      />
    </>
  );
}
