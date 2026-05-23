'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';

export const Step3Card = (props: HTMLMotionProps<'div'>) => {
  return (
    <motion.div
      {...props}
      className='mx-auto flex h-[22rem] w-[20.5rem] flex-col justify-center gap-[1.5rem]'
    >
      <div className='bg-default h-[8.625rem]'>차트 영역</div>
      <div className='bg-default h-[4.375rem]'>종목 영역</div>
      <div className='bg-default h-[6rem]'>모의투자 리스트 영역</div>
    </motion.div>
  );
};
