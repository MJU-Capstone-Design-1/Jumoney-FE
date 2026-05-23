'use client';

import BackButtonField from '@/components/backButtonField';
import { SwitchChartButton } from '@/features/mockinvestment/detail/switchChartButton';
import { motion } from 'framer-motion';
import { useState } from 'react';

const DetailPage = () => {
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleAllClick = () => {
    setIsAllSelected((prev) => !prev);
  };
  return (
    <div className='flex w-full flex-col px-4 pt-4'>
      <BackButtonField color='secondary2' label='기업명' />
      <div className='flex flex-col items-center justify-center pt-[1.75rem]'>
        <div className='text-secondary2 text-label-xl text-center leading-[120%] font-semibold'>
          <span className='font-extrabold'>
            {'{'}기업명{'}'}
          </span>
          의 현재 가격은
          <br />
          nn,nnn,nnn원 이에요
        </div>
        <div className='text-text-main text-body-xl pt-[0.5rem] text-center font-semibold'>
          어제보다 +-OO.O% 올랐/내렸어요
        </div>
        <div className='flex h-auto w-full items-center justify-between pt-[1.5rem]'>
          <motion.button
            type='button'
            onClick={handleAllClick}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className={`flex w-[4.2875rem] cursor-pointer items-center justify-center rounded-[6.25rem] py-[0.5rem] text-center transition-colors duration-200 outline-none ${
              isAllSelected
                ? 'bg-secondary2 border-secondary2 border text-white'
                : 'text-secondary2 border-secondary2 border bg-transparent'
            }`}
          >
            <span className='text-body-md font-semibold'>전체</span>
          </motion.button>
          <SwitchChartButton />
        </div>
      </div>
    </div>
  );
};
export default DetailPage;
