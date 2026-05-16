import React from "react";
import { motion } from "framer-motion";

export const FloatingCircle = ({
  color,
  delay = 0,
  opacity = 1,
  style = {},
  radius = 30,
  duration = 8,
}: {
  color: string;
  delay?: number;
  opacity?: number;
  style?: React.CSSProperties;
  radius?: number;
  duration?: number;
}) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: "180px",
      height: "180px",
      backgroundColor: color,
      opacity: opacity,
      ...style,
    }}
    animate={{
      x: [0, radius, 0, -radius, 0],
      y: [-radius, 0, radius, 0, -radius],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: "linear",
      delay: delay,
    }}
  />
);
