"use client";

import React from "react";
import { motion } from "framer-motion";
import { RiskSlider } from "./riskSlider";
import HappyFaceIcon from "./icons/happyFaceIcon";
import SmileFaceIcon from "./icons/smileFaceIcon";
import NeturalFaceIcon from "./icons/neturalFaceIcon";
import SadFaceIcon from "./icons/sadFaceIcon";

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
  return (
    <div className="relative flex h-[21rem] w-full items-center justify-center px-[1.25rem]">
      {/* Left Labels */}
      <div className="absolute left-[1.25rem] flex h-full flex-col justify-between py-0">
        {RISK_LEVELS.map((level) => {
          const isActive = value === level.val;
          return (
            <motion.div
              key={level.val}
              animate={{
                scale: isActive ? 1.15 : 1,
                color: isActive ? "var(--secondary2)" : "var(--text-sub)",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="flex h-[3rem] flex-col justify-center"
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
      <RiskSlider value={value} onChange={onChange} />

      {/* Right Emojis */}
      <div className="absolute right-[1.25rem] flex h-full flex-col justify-between py-0">
        {RISK_LEVELS.map((level) => {
          const isActive = value === level.val;
          return (
            <motion.div
              key={level.val}
              animate={{
                scale: isActive ? 1.15 : 1,
                filter: isActive ? "grayscale(0)" : "grayscale(1)",
                opacity: isActive ? 1 : 0.4,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex h-[3rem] items-center justify-center"
            >
              <level.Icon className="transition-all duration-300" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
