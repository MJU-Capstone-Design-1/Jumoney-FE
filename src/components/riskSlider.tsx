"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
} from "framer-motion";

interface RiskSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const RiskSlider = ({ value, onChange }: RiskSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [basePx] = useState(() => {
    if (typeof window !== "undefined") {
      return parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
    return 16;
  });

  const TRACK_HEIGHT_REM = 21;

  const dragY = useMotionValue(0);

  const trackHeightPx = TRACK_HEIGHT_REM * basePx;

  useEffect(() => {
    const targetY = -(value / 100) * trackHeightPx;

    animate(dragY, targetY, {
      type: "spring",
      stiffness: 350,
      damping: 40,
    });
  }, [value, trackHeightPx, dragY]);

  const currentValue = useTransform(dragY, [-trackHeightPx, 0], [100, 0]);

  const currentHeight = useTransform(currentValue, (v) => `${v}%`);

  const currentColorValue = useTransform(currentValue, (v) => {
    if (v <= 25) return 25;
    if (v <= 50) return 50;
    if (v <= 75) return 75;

    return 100;
  });

  const getThemeColor = (val: number) => {
    if (val <= 25) return "bg-primary";

    if (val <= 50) return "bg-main3";

    if (val <= 75) return "bg-main2";

    return "bg-main1";
  };

  const getThemeShadow = (val: number) => {
    if (val <= 25) return "shadow-select-green";

    if (val <= 50) return "shadow-select-yellow";

    if (val <= 75) return "shadow-select-brown";

    return "shadow-select-orange";
  };

  const [themeValue, setThemeValue] = useState(25);

  useEffect(() => {
    return currentColorValue.on("change", (latest) => {
      setThemeValue(latest);
    });
  }, [currentColorValue]);

  const handleDrag = (_: unknown, info: PanInfo) => {
    if (!containerRef.current) return;

    const containerBottom = containerRef.current.getBoundingClientRect().bottom;

    const currentY = info.point.y;

    const distancePx = containerBottom - currentY;

    const rawValue = (distancePx / trackHeightPx) * 100;

    const clampedValue = Math.min(100, Math.max(0, rawValue));

    const newY = -(clampedValue / 100) * trackHeightPx;

    dragY.set(newY);
  };

  const handleDragEnd = () => {
    const rawValue = (-dragY.get() / trackHeightPx) * 100;

    const snappedValue = Math.round(rawValue / 25) * 25;

    const finalValue = Math.min(100, Math.max(0, snappedValue));

    const snappedY = -(finalValue / 100) * trackHeightPx;

    animate(dragY, snappedY, {
      type: "spring",
      stiffness: 400,
      damping: 40,
    });

    onChange(finalValue);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-[21rem] w-[1rem] flex-col items-center justify-end rounded-full bg-default"
    >
      <motion.div
        style={{
          height: currentHeight,
        }}
        className={`absolute bottom-0 w-full rounded-full transition-colors duration-75 ${getThemeColor(
          themeValue,
        )}`}
      />

      <motion.div
        drag="y"
        dragConstraints={{
          top: -trackHeightPx,
          bottom: 0,
        }}
        dragElastic={0.03}
        dragMomentum={false}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{
          y: dragY,
          translateY: "50%",
        }}
        className={`absolute bottom-0 z-20 flex h-[4rem] w-[4rem] cursor-grab items-center justify-center rounded-full p-[1.25rem] transition-colors transition-shadow duration-75 active:cursor-grabbing ${getThemeColor(
          themeValue,
        )} ${getThemeShadow(themeValue)}`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.7612 9.18827C18.3624 7.69983 17.4836 6.38459 16.2611 5.44653C15.0386 4.50846 13.5407 4 11.9998 4C10.4588 4 8.96094 4.50846 7.73843 5.44653C6.51592 6.38459 5.63711 7.69983 5.23828 9.18827L7.17013 9.7059C7.45501 8.64274 8.08273 7.70328 8.95595 7.03323C9.82918 6.36319 10.8991 6 11.9998 6C13.1004 6 14.1703 6.36319 15.0436 7.03323C15.9168 7.70328 16.5445 8.64274 16.8294 9.70591L18.7612 9.18827Z"
            fill="white"
          />
          <path
            d="M18.7612 14.8117C18.3624 16.3002 17.4836 17.6154 16.2611 18.5535C15.0386 19.4915 13.5407 20 11.9998 20C10.4588 20 8.96094 19.4915 7.73843 18.5535C6.51592 17.6154 5.63711 16.3002 5.23828 14.8117L7.17013 14.2941C7.45501 15.3573 8.08273 16.2967 8.95595 16.9668C9.82918 17.6368 10.8991 18 11.9998 18C13.1004 18 14.1703 17.6368 15.0436 16.9668C15.9168 16.2967 16.5445 15.3573 16.8294 14.2941L18.7612 14.8117Z"
            fill="white"
          />
        </svg>
      </motion.div>
    </div>
  );
};
