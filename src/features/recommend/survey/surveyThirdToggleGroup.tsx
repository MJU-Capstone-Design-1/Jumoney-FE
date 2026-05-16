'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const OPTIONS = ['초단기', '단기', '중기', '장기'];

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
        delay: 1.4,
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className='bg-secondary1 shadow-card-shadow mx-auto flex w-fit items-center justify-center rounded-[6.25rem] px-[1rem] py-[0.75rem]'
    >
      <ToggleGroup
        type='single'
        value={value}
        onValueChange={(val) => {
          if (val) onChange?.(val);
        }}
        spacing={2}
        className='flex'
      >
        {OPTIONS.map((option) => (
          <motion.div
            key={option}
            whileTap={{ scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <ToggleGroupItem
              value={option}
              className='text-label-md border-secondary2 text-secondary2 data-[state=on]:bg-main1 data-[state=on]:text-secondary1 data-[state=on]:shadow-select-orange flex h-[3.5rem] w-[4.5rem] items-center justify-center rounded-full border font-extrabold transition-all duration-300 data-[state=on]:border-transparent'
            >
              <span className='mt-[0.125rem]'>{option}</span>
            </ToggleGroupItem>
          </motion.div>
        ))}
      </ToggleGroup>
    </motion.div>
  );
};
