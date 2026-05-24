'use client';

import { motion } from 'framer-motion';

export const MockInvestment = () => {
  return (
    <>
      <div className='flex w-full'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className='flex flex-col items-center justify-center'
        >
          <div className='text-body-lg text-text-sub font-bold'>총 자산</div>
          <div className='text-label-md font-extrabold'>₩ nn,nnn,nnn</div>
        </motion.div>
        <div className='bg-secondary2 mr-[2.625rem] ml-[1.5rem] h-[3.75rem] w-[1px]' />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className='flex flex-col items-center justify-center'
        >
          <div className='text-body-lg text-text-sub font-bold'>수익률</div>
          <div className='text-label-md text-text-up font-extrabold'>
            +nn.n%
          </div>
        </motion.div>
      </div>
      <div className='flex flex-col pt-[0.5rem]'>
        <div className='text-label-sm font-extrabold'>기업명</div>
        <div className='flex items-start justify-between'>
          <div className='text-body-lg font-extrabold'>₩ nn,nnn,nnn</div>
          <div className='text-body-lg text-text-up font-extrabold'>
            + nn.n%
          </div>
        </div>
        <div className='mt-[1.875rem] flex w-full items-center justify-center'>
          <div className='bg-default h-[9rem] w-[19.375rem]'>
            <div className='text-body-lg text-center font-semibold'>
              차트 위치
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
