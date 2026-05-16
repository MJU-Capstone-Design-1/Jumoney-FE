"use client";

import React, { useEffect } from "react";
import CheckIcon from "@/components/icons/checkIcon";
import { motion, useScroll, useSpring } from "framer-motion";

export default function FloatingButton({ onClick }: { onClick?: () => void }) {
  const { scrollY } = useScroll();
  const springY = useSpring(scrollY, {
    stiffness: 60,
    damping: 15,
    mass: 0.5,
  });

  return (
    <motion.button
      onClick={onClick}
      style={{ y: springY }}
      className="fixed top-3 right-6 z-50 w-[3.5rem] h-[3.5rem] bg-secondary2 rounded-full flex items-center justify-center shadow-card-shadow"
    >
      <CheckIcon />
    </motion.button>
  );
}
