'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export const Step0Card = (props: HTMLMotionProps<'div'>) => {
  return (
    <motion.div
      {...props}
      className='bg-secondary1 shadow-card-shadow mx-auto flex h-[22rem] flex-col items-center gap-[0.5rem] rounded-[2.5rem] px-[1.5rem] py-[1rem]'
    >
      <Image src='/terms/buy.svg' alt='매수' width={164} height={164} />

      <div className='flex flex-col gap-[1rem] text-center'>
        <p className='text-label-xl text-main2 leading-[120%] font-extrabold'>
          매수
        </p>
        <p className='text-label-sm leading-[120%] font-extrabold'>
          주식을 사는 행위
        </p>
        <p className='text-body-md text-text-main leading-[120%] font-semibold'>
          매수란 주식을 사는 것을 말해요
          <br />
          회사의 주식을 판매하는 사람을 매도자라고 하는데, <br />
          매도자에게 주식을 구매하는 행위에요
        </p>
      </div>
    </motion.div>
  );
};
