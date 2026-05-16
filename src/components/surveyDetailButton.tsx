'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SurveyDetailButtonProps {
  children: React.ReactNode;
}

export const SurveyDetailButton = ({ children }: SurveyDetailButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className='relative flex w-full justify-center'>
      <motion.div
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        animate={{
          scale: isExpanded ? [1, 1.05, 1] : 1,
        }}
        className={cn(
          'bg-sub4 shadow-card-shadow absolute top-0 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer items-center justify-center overflow-hidden rounded-[6.25rem] font-semibold transition-colors',
          isExpanded
            ? 'h-auto w-[18.375rem] -translate-y-[1rem] py-[0.625rem]'
            : 'h-[1.875rem] w-[4.5rem]',
        )}
        whileTap={{ scale: 0.95 }}
        transition={{
          layout: {
            type: 'spring',
            stiffness: 400,
            damping: 30,
          },
        }}
      >
        <AnimatePresence mode='wait'>
          {!isExpanded ? (
            <motion.span
              key='label'
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className='text-text-main text-body-sm font-semibold whitespace-nowrap'
            >
              자세히 보기
            </motion.span>
          ) : (
            <motion.div
              key='content'
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 5 }}
              className='text-text-main text-body-sm flex w-full flex-col items-center justify-center text-center'
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
