'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RightArrowIcon } from '@/components/icons/rightArrowIcon';
import { cn } from '@/lib/utils';

const MotionButton = motion.button;

interface StartButtonProps extends React.ComponentProps<typeof MotionButton> {
  onClick?: () => void;
}

export function StartButton({
  className,
  onClick,
  ...props
}: StartButtonProps) {
  return (
    <MotionButton
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        opacity: { duration: 0.4, delay: 1.5 },
        scale: {
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 1.5,
        },
      }}
      className={cn(
        'bg-secondary2 shadow-card-shadow flex h-auto w-full cursor-pointer items-center justify-center gap-[0.5rem] rounded-[62.5rem] border-none py-[1rem]',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <span className='text-secondary1 text-label-sm font-extrabold'>
        시작하기
      </span>
      <RightArrowIcon color='secondary1' size={16} />
    </MotionButton>
  );
}
