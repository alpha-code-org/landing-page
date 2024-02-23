import { useEffect, useRef, useState } from "react";

interface Props {
  containerRef: React.RefObject<HTMLDivElement>;
}

const useIntersectionObserver = ({ containerRef }: Props) => {
  // State to manage the overflow property
  const [overflowY, setOverflowY] = useState("");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Intersection Observer callback
    const callback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      // Check if the container is fully visible
      if (entry.isIntersecting) {
        setOverflowY("overflow-y-auto");
      } else {
        setOverflowY("");
      }
    };

    // Options for the Intersection Observer
    // Set threshold to 1.0 to ensure the callback runs when 100% of the target is visible
    const options = {
      root: null, // Using the viewport as the root
      rootMargin: "0px",
      threshold: 0.9,
    };

    // Create the observer
    const observer = new IntersectionObserver(callback, options);

    // Observe the container
    observer.observe(container);

    // Cleanup the observer on component unmount
    return () => observer.disconnect();
  }, [containerRef]);

  return { overflowY };
};

export default useIntersectionObserver;
