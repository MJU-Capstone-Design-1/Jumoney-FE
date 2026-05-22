'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BackButtonField from '@/components/backButtonField';

interface MasterHeaderProps {
  name: string;
  image: string;
  quote: React.ReactNode;
  tags: string[];
}

export const PortfolioSelectedMasterHeader = ({
  name,
  image,
  quote,
  tags,
}: MasterHeaderProps) => {
  return (
    <div className='relative pt-[1rem]'>
      <div className='flex justify-between'>
        <BackButtonField color='secondary1' label='거장 포트폴리오' />
      </div>
      <Image
        src={image}
        alt='거장 이미지'
        width={250}
        height={250}
        className='absolute top-[4.875rem] right-0 left-0 mx-auto opacity-30'
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='relative flex flex-col pt-[3.25rem] text-center'
      >
        <h1 className='text-heading-md text-secondary1 font-extrabold'>
          {name}
        </h1>
        <p className='text-body-lg text-secondary1 font-bold'>{quote}</p>
        <div className='mx-auto mt-[1rem] flex gap-[1rem]'>
          {tags.map((tag) => (
            <div
              key={tag}
              className='bg-default text-text-main text-body-sm rounded-[6.25rem] px-[0.625rem] py-[0.375rem] font-bold'
            >
              #{tag}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
