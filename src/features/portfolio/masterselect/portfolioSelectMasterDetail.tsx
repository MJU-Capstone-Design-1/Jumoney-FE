import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface PortfolioMasterDetailProps {
  master: {
    name: string;
    image: string;
    bgColor: string;
    tags: string[];
    quote: React.ReactNode;
  };
  onOpenPhilosophy?: () => void;
}

export const PortfolioMasterDetail = ({
  master,
  onOpenPhilosophy,
}: PortfolioMasterDetailProps) => {
  return (
    <div className='flex flex-col items-center gap-[1rem]'>
      <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
        <Image
          src={master.image}
          alt={master.name}
          width={228}
          height={228}
          className='mx-auto'
        />
      </motion.div>
      <motion.div
        className='flex flex-col items-center gap-[1rem]'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.h1
          key={master.name}
          layoutId='masterName'
          className='text-label-xl font-extrabold'
        >
          {master.name}
        </motion.h1>
        <motion.div
          className='flex gap-[1rem]'
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {master.tags.map((tag) => (
            <div
              key={tag}
              className='bg-default text-text-main text-body-sm rounded-[6.25rem] px-[0.625rem] py-[0.375rem] font-bold'
            >
              #{tag}
            </div>
          ))}
        </motion.div>
        <motion.div
          className='text-body-lg text-text-main flex items-start justify-center text-center font-bold'
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>{master.quote}</div>
        </motion.div>
        <motion.div
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeIn' }}
        >
          <Button
            onClick={onOpenPhilosophy}
            variant='ghost'
            className={`text-body-lg text-secondary1 hover:text-secondary1 flex h-[2rem] w-[10.125rem] items-center justify-center rounded-[6.25rem] text-center leading-[120%] font-bold hover:opacity-80 ${master.bgColor}`}
          >
            핵심 투자 철학 확인하기
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
