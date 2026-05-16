'use client';

import React from 'react';
import CheckIcon from '@/components/icons/checkIcon';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function FloatingButton({ onClick }: { onClick?: () => void }) {
  const { scrollY } = useScroll();

  const springY = useSpring(scrollY, {
    stiffness: 60,
    damping: 15,
    mass: 0.5,
  });

  const transformY = useTransform(springY, (value) => value);

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.5 }}
      style={{ y: transformY }}
      className='bg-secondary2 shadow-card-shadow fixed top-3 right-6 z-[90] flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full'
    >
      <CheckIcon />
    </motion.button>
  );
}
