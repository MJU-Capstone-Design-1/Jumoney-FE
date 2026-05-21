'use client';

import BackButtonField from '@/components/backButtonField';
import BottomButton from '@/components/bottomButton';
import { TermsScrapButton } from '@/features/terms/termsScrapButton';
import { motion } from 'framer-motion';
import React from 'react';

const page = () => {
  return (
    <div>
      <div className='flex flex-col gap-[2rem] p-[1rem]'>
        <div className='flex items-center justify-between'>
          <BackButtonField color='secondary2' label='기초 개념' />
          <div className='right-0 px-[0.375rem]'>
            <TermsScrapButton />
          </div>
        </div>

        <div className='bg-default mx-auto h-[18.75rem] w-[18.75rem]' />
      </div>

      <div className='bg-secondary1 shadow-card-shadow flex h-[60rem] w-[60rem] translate-x-[-18.28125rem] flex-col items-center gap-[1rem] rounded-[77.125rem] pt-[2.25rem]'>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className='text-heading-md text-main2 leading-[120%] font-extrabold'
        >
          매수
        </motion.h1>
        <div className='flex flex-col gap-[0.5rem] text-center'>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            className='text-label-md leading-[120%] font-extrabold'
          >
            주식을 사는 행위
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
            className='text-body-lg text-text-main leading-[120%] font-semibold'
          >
            매수란 주식을 사는 것을 말해요.
            <br />
            회사의 주식을 판매하는 사람을 매도자라고 하는데, <br />
            매도자에게 주식을 구매하는 행위에요.
          </motion.p>
        </div>
      </div>

      <BottomButton bgColor='bg-main2 ' label='다음으로' />
    </div>
  );
};

export default page;
