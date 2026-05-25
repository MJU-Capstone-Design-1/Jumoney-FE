'use client';

import { motion } from 'framer-motion';
import { RightArrowIconSmall } from '@/components/icons/rightArrowIconSmall';

interface NavigateButtonProps {
  label: string;
  onClick?: () => void;
}

export const NavigateButton = ({ label, onClick }: NavigateButtonProps) => {
  return (
    <motion.button
      type='button'
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: 0.4,
        type: 'spring',
        stiffness: 300,
        damping: 18,
      }}
      className='bg-secondary2 flex h-[2rem] w-[5.25rem] items-center justify-center gap-[0.125rem] rounded-full px-[1rem] py-[0.625rem]'
    >
      <div className='text-body-sm text-secondary1 mt-[0.0625rem] text-center font-bold'>
        {label}
      </div>
      <RightArrowIconSmall />
    </motion.button>
  );
};
