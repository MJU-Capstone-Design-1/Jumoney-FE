"use client";

import React from "react";
import { motion } from "framer-motion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const OPTIONS = ["초단기", "단기", "중기", "장기"];

interface SurveyThirdToggleGroupProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const SurveyThirdToggleGroup = ({
  value,
  onChange,
}: SurveyThirdToggleGroupProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.8,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="bg-secondary1 rounded-[6.25rem] px-[1rem] py-[0.75rem] shadow-card-shadow flex items-center justify-center w-fit mx-auto"
    >
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(val) => {
          if (val) onChange?.(val);
        }}
        spacing={2}
        className="flex"
      >
        {OPTIONS.map((option) => (
          <ToggleGroupItem
            key={option}
            value={option}
            className="rounded-full w-[4.5rem] h-[3.5rem] flex items-center justify-center text-label-md font-extrabold transition-all duration-300
              border border-secondary2 text-secondary2
              data-[state=on]:bg-main1 data-[state=on]:text-secondary1 data-[state=on]:border-transparent
              data-[state=on]:shadow-select-orange"
          >
            <span className="mt-[0.0625rem]">{option}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </motion.div>
  );
};
