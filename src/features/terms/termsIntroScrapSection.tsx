'use client';

import { CommonButton } from '@/components/commonButton';
import { RightArrowIcon } from '@/components/icons/rightArrowIcon';
import { TermsIntroScrapCard } from './termsIntroScrapCard';
import { motion } from 'framer-motion';

export const TermsIntroScrapSection = () => {
  return (
    <div className='flex flex-col gap-[1rem]'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.8,
          duration: 0.5,
          ease: 'easeOut',
        }}
        className='flex items-center justify-between'
      >
        <p className='text-label-md font-extrabold'>스크랩한 용어</p>
        <CommonButton
          href='/terms/scrap'
          icon={<RightArrowIcon />}
          iconPosition='right'
        >
          전체보기
        </CommonButton>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 1.2,
          duration: 0.5,
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
        className='grid grid-cols-2 gap-[1rem]'
      >
        <TermsIntroScrapCard />
        <TermsIntroScrapCard />
      </motion.div>
    </div>
  );
};
