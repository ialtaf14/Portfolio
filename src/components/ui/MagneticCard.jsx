import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * MagneticCard — subtle 3D tilt and elevation on hover for desktop.
 * Gracefully acts as normal container on touch devices.
 */
const MagneticCard = ({ children, className = "", style = {}, maxTilt = 8 }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -maxTilt;
    const rY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MagneticCard;
