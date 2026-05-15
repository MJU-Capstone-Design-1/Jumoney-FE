"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Progress } from "@/components/ui/progress";
import SliderThumbIcon from "@/components/icons/sliderThumbIcon";

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

  const TRACK_HEIGHT_REM = 17.5;

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

  const currentProgress = useTransform(currentValue, (v) => {
    const offset = (28 / (TRACK_HEIGHT_REM * basePx)) * 100;
    return v * (1 - offset / 50) + offset;
  });

  const currentColorValue = useTransform(currentValue, (v) => {
    if (v < 16.5) return 0;
    if (v < 49.5) return 33;
    if (v < 82.5) return 66;
    return 100;
  });

  const getTrackColor = (val: number) => {
    if (val === 0) return "[&>div]:bg-primary";
    if (val === 33) return "[&>div]:bg-main3";
    if (val === 66) return "[&>div]:bg-main2";
    return "[&>div]:bg-main1";
  };

  const getThumbColor = (val: number) => {
    if (val === 0) return "bg-primaryMuted";
    if (val === 33) return "bg-sub3";
    if (val === 66) return "bg-sub2";
    return "bg-sub1";
  };

  const getThemeShadow = (val: number) => {
    if (val === 0) return "shadow-select-green";
    if (val === 33) return "shadow-select-yellow";
    if (val === 66) return "shadow-select-brown";
    return "shadow-select-orange";
  };

  const [themeValue, setThemeValue] = useState(0);
  const [realtimeProgress, setRealtimeProgress] = useState(0);

  useEffect(() => {
    return currentColorValue.on("change", (latest) => {
      setThemeValue(latest);
    });
  }, [currentColorValue]);

  useEffect(() => {
    return currentProgress.on("change", (latest) => {
      setRealtimeProgress(latest);
    });
  }, [currentProgress]);

  const handleDrag = (_: unknown, info: PanInfo) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const activeBottom = containerRect.bottom - 1.75 * basePx;

    const currentY = info.point.y;
    const distancePx = activeBottom - currentY;
    const rawValue = (distancePx / trackHeightPx) * 100;
    const clampedValue = Math.min(100, Math.max(0, rawValue));
    const newY = -(clampedValue / 100) * trackHeightPx;
    dragY.set(newY);
  };

  const handleDragEnd = () => {
    const rawValue = (-dragY.get() / trackHeightPx) * 100;
    let normalizedValue = 0;
    if (rawValue < 16.5) normalizedValue = 0;
    else if (rawValue < 49.5) normalizedValue = 33;
    else if (rawValue < 82.5) normalizedValue = 66;
    else normalizedValue = 100;

    const snappedY = -(normalizedValue / 100) * trackHeightPx;
    animate(dragY, snappedY, {
      type: "spring",
      stiffness: 400,
      damping: 40,
    });
    onChange(normalizedValue);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-[21rem] w-[1rem] flex-col items-center justify-end rounded-full bg-default"
    >
      {/* Active Bar using shadcn Progress */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Progress
          value={realtimeProgress}
          className={`h-[1rem] w-[21rem] shrink-0 -rotate-90 bg-transparent [&>div]:transition-colors [&>div]:duration-300 ${getTrackColor(
            themeValue,
          )}`}
        />
      </div>

      {/* Thumb */}
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
          bottom: "1.75rem",
          translateY: "50%",
        }}
        className={`absolute z-20 flex h-[4rem] w-[4rem] cursor-grab items-center justify-center rounded-full p-[1.25rem] transition-colors transition-shadow duration-300 active:cursor-grabbing ${getThumbColor(
          themeValue,
        )} ${getThemeShadow(themeValue)}`}
      >
        <SliderThumbIcon />
      </motion.div>
    </div>
  );
};
