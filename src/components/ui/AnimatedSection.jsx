import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * AnimatedSection — wraps children with staggered fade-up + blur dissolve
 * Like Linear.app / Framer.com section entrances.
 */
export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  stagger = 0.1,
  once = true,
  threshold = 0.12,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: threshold });

  const variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    React.createElement(motion.div, {
      ref,
      variants,
      initial: "hidden",
      animate: inView ? "visible" : "hidden",
      className,
    }, children)
  );
};

/**
 * AnimatedItem — direct child of AnimatedSection
 */
export const AnimatedItem = ({ children, className = "", delay = 0 }) =>
  React.createElement(motion.div, {
    variants: {
      hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
      },
    },
    className,
  }, children);

export default AnimatedSection;
