'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TERMS = [
  {
    id: 'basic',
    name: '기초 개념',
    activeBg: 'bg-main1',
    activeShadow: 'shadow-select-orange',
    image: '/terms/basicImage.svg',
  },
  {
    id: 'diagnosis',
    name: '기업 진단',
    activeBg: 'bg-main2',
    activeShadow: 'shadow-select-brown',
    image: '/terms/diagnosisImage.svg',
  },
  {
    id: 'chart',
    name: '차트 분석',
    activeBg: 'bg-main3',
    activeShadow: 'shadow-select-yellow',
    image: '/terms/chartImage.svg',
  },
  {
    id: 'trading',
    name: '거래 실무',
    activeBg: 'bg-main4',
    activeShadow: 'shadow-select-gray',
    image: '/terms/tradingImage.svg',
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
            'text-body-xl relative flex h-[10.25rem] w-full items-end justify-start overflow-visible rounded-[2rem] p-[1rem] text-end font-bold font-extrabold',
            term.activeBg,
            term.activeShadow,
          )}
        >
          <span className='relative z-10'>{term.name}</span>
          <Image
            src={term.image}
            alt={term.name}
            width={164}
            height={164}
            className='pointer-events-none absolute bottom-[1rem] left-1/2 z-0 -translate-x-1/2'
            priority
          />
        </Link>
      ))}
    </motion.div>
  );
};
