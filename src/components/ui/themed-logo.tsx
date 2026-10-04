import Image, { type ImageProps } from "next/image";
import { cn } from "@/utils/cn";

type Props = Omit<ImageProps, "src" | "alt" | "loading" | "priority" | "fetchPriority"> & {
  alt?: string;
};

// Renders the light and dark logo variants; CSS shows the one matching the current theme.
// Both are lazy: browsers skip lazy images that are display: none, so only the visible variant
// is downloaded instead of both competing with the hero images.
export function ThemedLogo({ className, alt = "Alpha Code logo", ...props }: Props) {
  return (
    <>
      <Image
        src="/logo.png"
        alt={alt}
        className={cn("hidden dark:block", className)}
        loading="lazy"
        {...props}
      />
      <Image
        src="/logo-dark.png"
        alt={alt}
        className={cn("block dark:hidden", className)}
        loading="lazy"
        {...props}
      />
    </>
  );
}
