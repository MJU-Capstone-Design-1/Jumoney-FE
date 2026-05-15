"use client";

import React from "react";
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
        {RISK_LEVELS.map((level) => (
          <div
            key={level.val}
            className={`flex h-[3rem] flex-col justify-center transition-colors duration-300 ${
              value === level.val ? "text-secondary2" : "text-text-sub"
            }`}
          >
            <span className="whitespace-nowrap text-body-xl font-extrabold leading-tight">
              {level.title}
            </span>
            <span className="whitespace-nowrap text-body-md font-bold mt-[0.25rem]">
              {level.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Center Slider */}
      <RiskSlider value={value} onChange={onChange} />

      {/* Right Emojis */}
      <div className="absolute right-[1.25rem] flex h-full flex-col justify-between py-0">
        {RISK_LEVELS.map((level) => (
          <div
            key={level.val}
            className="flex h-[3rem] items-center justify-center"
          >
            <level.Icon
              className={`transition-opacity duration-300 ${
                value === level.val
                  ? "opacity-100"
                  : "opacity-40 grayscale-[0.5]"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
