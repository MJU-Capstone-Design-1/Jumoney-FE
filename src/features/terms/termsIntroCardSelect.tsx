'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link';

const TERMS = [
  {
    id: '1',
    name: '기초 개념',
    activeBg: 'bg-main1',
    activeShadow: 'shadow-select-orange',
  },
  {
    id: '2',
    name: '기업 진단',
    activeBg: 'bg-main2',
    activeShadow: 'shadow-select-brown',
  },
  {
    id: '3',
    name: '차트 분석',
    activeBg: 'bg-main3',
    activeShadow: 'shadow-select-yellow',
  },
  {
    id: '4',
    name: '거래 실무',
    activeBg: 'bg-main4',
    activeShadow: 'shadow-select-gray',
  },
];

export const TermsIntroCardSelect = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.4,
        duration: 0.5,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      className='grid w-full grid-cols-2 gap-4'
    >
      {TERMS.map((term) => (
        <Link
          key={term.id}
          href={`/terms/${term.id}`}
          className={cn(
            'text-body-xl flex h-[10.25rem] w-full items-end justify-start rounded-[2rem] p-[1rem] text-end font-bold font-extrabold',
            term.activeBg,
            term.activeShadow,
          )}
        >
          {term.name}
        </Link>
      ))}
    </motion.div>
  );
};
