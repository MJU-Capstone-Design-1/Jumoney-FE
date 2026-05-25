'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { TODAY_TERM } from '@/constants/todayTerm';

export const TodayTermCard = () => {
  const getDailyIndex = () => {
    const today = new Date().toISOString().split('T')[0];
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = today.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % TODAY_TERM.length;
  };

  const dailyTerm = TODAY_TERM[getDailyIndex()];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='relative w-full'
    >
      <Image
        src='/images/todayTermBg.svg'
        alt='오늘의 추천 용어 배경'
        width={343}
        height={198}
        priority
        className='h-auto w-full'
      />
      <div className='absolute inset-0 flex flex-col pt-[1.25rem]'>
        <div className='text-secondary1 flex items-start justify-between px-[1.5rem]'>
          <div className='flex flex-col gap-[0.75rem]'>
            <div className='text-label-md font-extrabold'>
              {dailyTerm.title}
            </div>
            <div className='text-label-sm font-extrabold'>
              {dailyTerm.subtitle}
            </div>
          </div>
          <div className='bg-default h-[5rem] w-[5rem] flex-shrink-0 items-center justify-center rounded-full' />
        </div>

        <div className='text-secondary1 text-body-md mt-[0.75rem] ml-[1.5rem] line-clamp-4 h-[4.125rem] w-[18.5rem] overflow-hidden leading-[120%] font-semibold'>
          {dailyTerm.description}
        </div>
      </div>
    </motion.div>
  );
};
