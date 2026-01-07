import { RefObject, useEffect, useState } from "react";

interface UseIntersectionObserverOptions {
  once?: boolean;
  amount?: number;
  margin?: string;
}

export function useIntersectionObserver<T extends Element = Element>(
  elementRef: RefObject<T | null>,
  options?: UseIntersectionObserverOptions
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options?.once) {
            observer.disconnect();
          }
        } else if (!options?.once) {
          setIsInView(false);
        }
      },
      {
        threshold: options?.amount ?? 0,
        rootMargin: options?.margin ?? "0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef, options?.once, options?.amount, options?.margin]);

  return isInView;
}
