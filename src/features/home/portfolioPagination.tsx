'use client';

import { motion } from 'framer-motion';

export const PortfolioPagination = ({
  activeIndex,
}: {
  activeIndex: number;
}) => {
  const totalDots = 4;

  return (
    <div className='flex items-center justify-center gap-[0.5rem]'>
      {Array.from({ length: totalDots }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: 'easeOut' as const,
          }}
          className={`h-[0.5rem] w-[0.5rem] rounded-full transition-colors duration-300 ${
            index === activeIndex ? 'bg-secondary2' : 'bg-default'
          }`}
        />
      ))}
    </div>
  );
};
