import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

interface PortfolioMasterDetailProps {
  master: {
    name: string;
    image: string;
    bgColor: string;
    tags: string[];
    quote: React.ReactNode;
  };
}

export const PortfolioMasterDetail = ({
  master,
}: PortfolioMasterDetailProps) => {
  return (
    <div className='flex flex-col items-center gap-[1rem]'>
      <Image
        src={master.image}
        alt={master.name}
        width={228}
        height={228}
        className='mx-auto'
      />
      <motion.div
        className='flex flex-col items-center gap-[1rem]'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h1 className='text-label-xl font-extrabold'>{master.name}</h1>
        <div className='flex gap-[1rem]'>
          {master.tags.map((tag) => (
            <div
              key={tag}
              className='bg-default text-text-main text-body-sm rounded-[6.25rem] px-[0.625rem] py-[0.375rem] font-bold'
            >
              #{tag}
            </div>
          ))}
        </div>
        <div className='text-body-lg text-text-main flex items-start justify-center text-center font-bold'>
          <div>{master.quote}</div>
        </div>
        <div
          className={`text-body-lg text-secondary1 flex h-[2rem] w-[10.125rem] items-center justify-center rounded-[6.25rem] text-center leading-[120%] font-bold ${master.bgColor}`}
        >
          핵심 투자 철학 확인하기
        </div>
      </motion.div>
    </div>
  );
};
