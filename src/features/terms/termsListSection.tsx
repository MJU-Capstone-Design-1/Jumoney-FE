'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TermsListCard } from './termsListCard';

interface TermsListSectionProps {
  title: string;
  termsSectionId: string;
}

export const TermsListSection = ({
  title,
  termsSectionId,
}: TermsListSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 250 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.65,
        ease: [0.5, 1, 0.5, 1],
      }}
      className='bg-background shadow-card-shadow mt-[4.125rem] flex flex-1 flex-col gap-[1rem] overflow-hidden rounded-t-[2rem] px-[1.5rem] py-[2rem]'
    >
      <h1 className='text-label-lg flex-shrink-0 text-center leading-[120%] font-extrabold'>
        {title}
      </h1>
      <div className='flex flex-1 flex-col gap-[1rem] overflow-y-auto'>
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='1'
        />
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='2'
        />
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='3'
        />
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='4'
        />
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='5'
        />
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='6'
        />
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='7'
        />
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='8'
        />
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='9'
        />
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='10'
        />
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='11'
        />
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='12'
        />
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='13'
        />
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='14'
        />
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='15'
        />
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='16'
        />
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='17'
        />
        <TermsListCard
          name='용어이름용어이름용어이름'
          termsSectionId={termsSectionId}
          termsId='18'
        />
      </div>
    </motion.div>
  );
};
