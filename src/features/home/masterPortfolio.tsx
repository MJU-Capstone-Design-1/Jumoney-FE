'use client';

import { motion } from 'framer-motion';

const popUpMotion = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    delay: 0.4,
    duration: 0.5,
    type: 'spring' as const,
    stiffness: 260,
    damping: 20,
  },
};

export const MasterPortfolio = () => {
  return (
    <motion.div
      {...popUpMotion}
      className='bg-secondary1 shadow-card-shadow flex h-[12.75rem] w-[14rem] flex-col rounded-[1.5rem] p-[1rem]'
    >
      <div className='flex items-center gap-[1rem]'>
        <div className='bg-default h-[4rem] w-[4rem] rounded-full' />
        <div className='text-label-md font-extrabold'>워런 버핏</div>
      </div>
      <div className='flex items-center gap-[0.5rem] pt-[0.75rem]'>
        <div className='bg-background text-main2 text-body-sm flex items-center justify-center rounded-[6.25rem] px-[0.625rem] py-[0.25rem] font-bold'>
          # 투자방식방식
        </div>
        <div className='bg-background text-main2 text-body-sm flex items-center justify-center rounded-[6.25rem] px-[0.625rem] py-[0.25rem] font-bold'>
          # 투자방식방식
        </div>
      </div>
      <div className='text-body-md flex pt-[0.625rem] font-extrabold'>
        투자 기업
      </div>
      <div className='flex items-center gap-[0.5rem] pt-[0.375rem]'>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className='bg-default flex h-[2rem] w-[2rem] rounded-[6.25rem]'
          />
        ))}
      </div>
    </motion.div>
  );
};
