'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioDefaultInformationIcon } from '@/components/icons/portfolioDefaultInformationIcon';
import { PortfolioDetailInformationIcon } from '@/components/icons/PortfolioDetailInformationIcon';

export const PortfolioSelectedMasterButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.4,
        type: 'spring',
        stiffness: 150,
        damping: 20,
      }}
      className='relative flex justify-between px-[1.75rem] pt-[0.5rem]'
    >
      <div className='bg-primary flex h-[4rem] w-[4rem] items-center justify-center rounded-full'>
        <PortfolioDefaultInformationIcon />
      </div>
      <div className='bg-primary flex h-[4rem] w-[4rem] items-center justify-center rounded-full'>
        <PortfolioDetailInformationIcon />
      </div>
    </motion.div>
  );
};
