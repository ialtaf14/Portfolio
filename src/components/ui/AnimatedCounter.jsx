import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * AnimatedCounter — smooth count-up animation for stats numbers.
 * Triggers once when the element enters the viewport.
 *
 * Props:
 *  value    — target number (string like "4+" or number like 10)
 *  duration — animation duration in ms (default 1800)
 *  suffix   — appended string after number e.g. "+" or "%"
 *  prefix   — prepended string e.g. "$"
 *  className — optional className
 */
const AnimatedCounter = ({
  value = "0",
  duration = 1800,
  suffix = "",
  prefix = "",
  className = "",
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [displayVal, setDisplayVal] = useState(0);

  // Parse the numeric part from value (handles "4+", "10+", "2026", "100%")
  const numericStr = String(value).replace(/[^0-9.]/g, "");
  const numericEnd = parseFloat(numericStr) || 0;
  const extractedSuffix = String(value).replace(/[0-9.]/g, "") || suffix;

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const startVal = 0;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayVal(Math.floor(startVal + (numericEnd - startVal) * eased));
      if (progress < 1) requestAnimationFrame(step);
      else setDisplayVal(numericEnd);
    };
    requestAnimationFrame(step);
  }, [inView, numericEnd, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayVal}{extractedSuffix}
    </span>
  );
};

export default AnimatedCounter;
