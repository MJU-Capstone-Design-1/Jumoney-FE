'use client';

import { motion } from 'framer-motion';
import CheckIcon from '@/components/icons/checkIcon';

export default function FloatingButton({ onClick }: { onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.5 }}
      style={{
        left: '50%',
        marginLeft: 'calc(187.5px - 3.5rem - 1.5rem)',
      }}
      className='bg-secondary2 shadow-card-shadow pointer-events-auto fixed top-3 z-15 flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full'
    >
      <CheckIcon />
    </motion.button>
  );
}
