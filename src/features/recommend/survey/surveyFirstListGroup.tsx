"use client";

import React from "react";
import { motion } from "framer-motion";
import { HelpIcon } from "@/components/icons/helpIcon";
import { cn } from "@/lib/utils";

interface SurveyOptionProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  onHelpClick?: (e: React.MouseEvent) => void;
}

export const SurveyOption = ({
  label,
  isSelected,
  onClick,
  onHelpClick,
}: SurveyOptionProps) => {
  return (
    <motion.button
      onClick={onClick}
      initial={false}
      animate={
        isSelected
          ? {
              scale: [1, 1.06, 1],
            }
          : {
              scale: 1,
            }
      }
      whileTap={{ scale: 0.94 }}
      transition={{
        duration: 0.4,
        ease: "backOut",
      }}
      className={cn(
        "flex w-full px-[1rem] py-[2rem] rounded-[1.5rem] text-body-xl font-bold justify-between items-center transition-colors duration-300 border-none outline-none relative",
        isSelected
          ? "bg-primary text-secondary1 shadow-select-green"
          : "bg-secondary1 text-secondary2 shadow-card-shadow",
      )}
    >
      <p>{label}</p>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onHelpClick?.(e);
        }}
      >
        <HelpIcon color={isSelected ? "secondary1" : "secondary2"} />
      </div>
    </motion.button>
  );
};
