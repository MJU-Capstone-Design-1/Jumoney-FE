"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SurveyDetailButtonProps {
  children: React.ReactNode;
}

export const SurveyDetailButton = ({ children }: SurveyDetailButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex justify-center w-full">
      <motion.div
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        animate={{
          scale: isExpanded ? [1, 1.05, 1] : 1,
        }}
        className={cn(
          "relative cursor-pointer flex items-center justify-center overflow-hidden bg-sub4 rounded-[6.25rem] transition-colors shadow-card-shadow font-semibold",
          isExpanded
            ? "w-[18.375rem] h-auto py-[0.625rem]"
            : "w-[4.5rem] h-[1.875rem]",
        )}
        whileTap={{ scale: 0.95 }}
        transition={{
          layout: {
            type: "spring",
            stiffness: 400,
            damping: 30,
          },
        }}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.span
              key="label"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-text-main text-body-sm font-semibold whitespace-nowrap"
            >
              자세히 보기
            </motion.span>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 5 }}
              className="w-full text-text-main text-body-sm text-center flex flex-col items-center justify-center"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
