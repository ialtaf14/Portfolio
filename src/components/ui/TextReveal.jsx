import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * TextReveal — word-by-word entrance animation for headings.
 * Each word fades up with a stagger, like Vercel/Framer.com marketing pages.
 *
 * Props:
 *  text      — the heading text string
 *  as        — HTML element to render ("h1", "h2", "p", etc.) default "h2"
 *  className — className for the container element
 *  delay     — initial delay in seconds (default 0)
 *  stagger   — per-word stagger in seconds (default 0.06)
 *  once      — fire once only (default true)
 */
const TextReveal = ({
  text = "",
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.06,
  once = true,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.4 });
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return React.createElement(
    Tag,
    { ref, className },
    React.createElement(
      motion.span,
      {
        variants: containerVariants,
        initial: "hidden",
        animate: inView ? "visible" : "hidden",
        style: { display: "inline-block" },
      },
      words.map((word, i) =>
        React.createElement(
          motion.span,
          {
            key: i,
            variants: wordVariants,
            style: { display: "inline-block", marginRight: "0.28em" },
          },
          word
        )
      )
    )
  );
};

export default TextReveal;
