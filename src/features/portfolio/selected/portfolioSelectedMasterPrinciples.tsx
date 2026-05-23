'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Principle {
  title: string;
  description: string;
  details?: string[];
}

interface MasterPrinciplesProps {
  principles: Principle[];
}

export const PortfolioSelectedMasterPrinciples = ({
  principles,
}: MasterPrinciplesProps) => {
  return (
    <div className='flex flex-col gap-[0.5rem] px-[1rem] pt-[1.5rem] pb-[3rem]'>
      {principles.map((principle, index) => (
        <motion.div
          key={principle.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
            delay: 1.2 + index * 0.2,
          }}
          className='bg-secondary1 shadow-card-shadow flex flex-col gap-[0.5rem] rounded-[1.5rem] px-[1.5rem] py-[1rem]'
        >
          <div className='flex items-center gap-[0.5rem]'>
            <div className='bg-secondary2 h-[0.625rem] w-[0.625rem] shrink-0 rounded-full' />
            <h2 className='text-body-md leading-[120%] font-extrabold break-keep whitespace-pre-wrap'>
              {principle.title}
            </h2>
          </div>

          <div className='text-body-sm ml-[0.25rem] leading-[120%] font-bold break-keep whitespace-pre-wrap'>
            <ul className='flex list-disc flex-col gap-[0.25rem] pl-[1rem]'>
              {principle.description}
              {principle.details && (
                <div className='text-text-sub mt-[0.25rem] flex flex-col gap-[0.125rem] pl-[0.5rem] font-semibold'>
                  {principle.details.map((detail) => (
                    <li key={detail} className='list-none'>
                      • {detail}
                    </li>
                  ))}
                </div>
              )}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
