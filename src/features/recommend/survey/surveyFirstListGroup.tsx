'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HelpIcon } from '@/components/icons/helpIcon';
import { cn } from '@/lib/utils';

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
        ease: 'backOut',
      }}
      className={cn(
        'text-body-xl relative flex w-full items-center justify-between rounded-[1.5rem] border-none px-[1rem] py-[2rem] font-bold transition-colors duration-300 outline-none',
        isSelected
          ? 'bg-primary text-secondary1 shadow-select-green'
          : 'bg-secondary1 text-secondary2 shadow-card-shadow',
      )}
    >
      <p>{label}</p>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onHelpClick?.(e);
        }}
      >
        <HelpIcon color={isSelected ? 'secondary1' : 'secondary2'} />
      </div>
    </motion.button>
  );
};
