"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiskSlider } from "./riskSlider";
import HappyFaceIcon from "../../../components/icons/happyFaceIcon";
import SmileFaceIcon from "../../../components/icons/smileFaceIcon";
import NeturalFaceIcon from "../../../components/icons/neturalFaceIcon";
import SadFaceIcon from "../../../components/icons/sadFaceIcon";

interface RiskSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const RISK_LEVELS = [
  {
    val: 100,
    title: "매우 높음",
    sub: "(실시간 급등주)",
    Icon: SadFaceIcon,
  },
  {
    val: 66,
    title: "높음",
    sub: "(수익 추구)",
    Icon: NeturalFaceIcon,
  },
  {
    val: 33,
    title: "낮음",
    sub: "(안전 지향)",
    Icon: SmileFaceIcon,
  },
  {
    val: 0,
    title: "매우 낮음",
    sub: "(철벽 방어)",
    Icon: HappyFaceIcon,
  },
];

export const RiskSelector = ({ value, onChange }: RiskSelectorProps) => {
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntered(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const BASE_DELAY = 1.0;
  const STAGGER = 0.1;

  return (
    <div className="relative flex h-[21rem] w-full items-center justify-center px-[1.25rem]">
      {/* Left Labels */}
      <div className="absolute left-[1.25rem] flex h-full flex-col justify-between py-0">
        {RISK_LEVELS.map((level, index) => {
          const isActive = value === level.val;
          return (
            <motion.div
              key={level.val}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isActive ? 1.15 : 1,
                opacity: 1,
                color: isActive ? "var(--secondary2)" : "var(--text-sub)",
              }}
              transition={
                isEntered
                  ? {
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                    }
                  : {
                      delay: BASE_DELAY + index * STAGGER,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }
              }
              className="flex h-[3rem] flex-col justify-center origin-left"
            >
              <span className="text-body-xl font-extrabold">{level.title}</span>
              <span className="text-body-md font-bold mt-[0.125rem]">
                {level.sub}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Center Slider */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: BASE_DELAY + RISK_LEVELS.length * STAGGER + 0.1,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="h-full flex items-center justify-center"
      >
        <RiskSlider value={value} onChange={onChange} />
      </motion.div>

      {/* Right Emojis */}
      <div className="absolute right-[1.25rem] flex h-full flex-col justify-between py-0">
        {RISK_LEVELS.map((level, index) => {
          const isActive = value === level.val;
          return (
            <motion.div
              key={level.val}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isActive ? 1.15 : 1,
                opacity: isActive ? 1 : 0.4,
                filter: isActive ? "grayscale(0)" : "grayscale(1)",
              }}
              transition={
                isEntered
                  ? {
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                    }
                  : {
                      delay: BASE_DELAY + index * STAGGER,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }
              }
              className="flex h-[3rem] items-center justify-center origin-right"
            >
              <level.Icon className="transition-all duration-300" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
