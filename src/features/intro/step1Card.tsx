'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { MasterSectorChart } from '@/features/portfolio/detail/masterSectorChart';

export const Step1Card = (props: HTMLMotionProps<'div'>) => {
  return (
    <motion.div
      {...props}
      className='mx-auto flex h-[22rem] w-[20.5rem] flex-col'
    >
      <Image
        src='/images/warrenBuffetImage.svg'
        alt='워런 버핏'
        width={328}
        height={328}
        className='absolute opacity-70'
      />
      <div className='absolute z-10 h-[15rem] w-[15rem] overflow-hidden rounded-[1rem]'>
        <div className='h-[30rem] w-[30rem] origin-top-left scale-50'>
          <MasterSectorChart masterId={1} />
        </div>
      </div>
      <Image
        src='/logos/cocaColaLogo.svg'
        alt='코카콜라'
        width={182}
        height={182}
        className='z-20 mt-[3.625rem] self-end'
      />
      <div className='bg-secondary1 shadow-card-shadow z-30 mt-[1.5rem] flex h-[5.5rem] w-full flex-col justify-center gap-[0.5rem] rounded-[1.5rem] px-[1.5rem]'>
        <div className='flex items-center gap-[0.5rem]'>
          <div className='bg-secondary2 h-[0.625rem] w-[0.625rem] rounded-full leading-[120%]' />
          <p className='text-body-lg font-extrabold'>
            좋은 회사를 합리적인 가격에 오래 보유하기
          </p>
        </div>
        <div className='text-body-md ml-[1.125rem] flex leading-[120%] font-semibold'>
          회사의 실제 가치보다 낮은 가격에 매수하고,
          <br />
          가격이 제자리를 찾을 때까지 기다려요
        </div>
      </div>
    </motion.div>
  );
};
