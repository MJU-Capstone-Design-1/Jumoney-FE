'use client';

import React, { useEffect } from 'react';
import CheckIcon from '@/components/icons/checkIcon';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function FloatingButton({ onClick }: { onClick?: () => void }) {
  const { scrollY } = useScroll();
  const springY = useSpring(scrollY, {
    stiffness: 60,
    damping: 15,
    mass: 0.5,
  });

  return (
    <motion.button
      onClick={onClick}
      style={{ y: springY }}
      className='bg-secondary2 shadow-card-shadow fixed top-3 right-6 z-50 flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full'
    >
      <CheckIcon />
    </motion.button>
  );
}
