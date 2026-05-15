"use client";

import BackButtonField from "@/components/backButtonField";
import { motion } from "framer-motion";

const FloatingCircle = ({
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

const Page = () => {
  return (
    <div className="relative flex flex-col w-full px-4 pt-4 bg-primary min-h-screen overflow-hidden">
      {/* Background Circular Wandering Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 1. Top Center/Right: #b4c48d (0.64 Opacity) */}
        <FloatingCircle
          color="#b4c48d"
          opacity={0.64}
          style={{ top: "-40px", left: "40%" }}
          radius={35}
          duration={7}
        />

        {/* 2. Middle Left: #E5EAD7 (Solid) */}
        <FloatingCircle
          color="#E5EAD7"
          style={{ top: "25%", left: "-90px" }}
          radius={30}
          duration={9}
          delay={1}
        />

        {/* 3. Bottom Left: primaryMuted (0.64 Opacity) */}
        <FloatingCircle
          color="var(--primary-muted)"
          opacity={0.64}
          style={{ bottom: "-50px", left: "-40px" }}
          radius={40}
          duration={8}
          delay={2}
        />

        {/* 4. Bottom Right: primaryMuted (Solid) */}
        <FloatingCircle
          color="var(--primary-muted)"
          style={{ bottom: "10%", right: "-100px" }}
          radius={35}
          duration={10}
          delay={3}
        />
      </div>

      <div className="relative z-10">
        <BackButtonField color="secondary1" label="오늘의 호주머니" />
      </div>
    </div>
  );
};

export default Page;
