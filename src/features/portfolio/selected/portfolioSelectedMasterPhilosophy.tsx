'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MasterPhilosophyProps {
  title: string;
  description: string;
}

export const PortfolioSelectedMasterPhilosophy = ({
  title,
  description,
}: MasterPhilosophyProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
      className='flex flex-col items-center gap-[0.75rem] pt-[2rem]'
    >
      <p className='text-label-md leading-[120%] font-extrabold'>{title}</p>
      <p className='text-body-sm text-center leading-[120%] font-bold'>
        {description.split(',').map((part, index, array) => (
          <React.Fragment key={index}>
            {part.trim()}
            {index < array.length - 1 && ','}
            {index < array.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    </motion.div>
  );
};
