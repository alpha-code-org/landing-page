"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";
import { useMounted } from "@/hooks/useMounted";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const mounted = useMounted();

  if (!mounted) {
    return <>{children}</>; // Render children without ThemeProvider during SSR
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
