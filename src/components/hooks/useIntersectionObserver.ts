import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = () => {
  // Ref to the container element
  const containerRef = useRef<HTMLDivElement>(null);

  // State to manage the overflow property
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Intersection Observer callback
    const callback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      // Check if the container is fully visible
      if (entry.isIntersecting) {
        setInView(true);
      } else {
        setInView(false);
      }
    };

    // Options for the Intersection Observer
    // Set threshold to 1.0 to ensure the callback runs when 100% of the target is visible
    const options = {
      root: null,
      threshold: 0.8,
    };

    // Create the observer
    const observer = new IntersectionObserver(callback, options);

    // Observe the container
    observer.observe(container);

    // Cleanup the observer on component unmount
    return () => observer.disconnect();
  }, [containerRef]);

  return { containerRef, inView };
};

export default useIntersectionObserver;
