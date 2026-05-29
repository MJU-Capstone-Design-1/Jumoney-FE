'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TermsListCard } from './termsListCard';
import { useGetTermsByCategory } from '@/api/generated/endpoints/주식-용어/주식-용어';

interface TermsListSectionProps {
  title: string;
  termsSectionId: string;
}

const SECTION_TO_CATEGORY_ID: Record<string, number> = {
  basic: 1,
  diagnosis: 2,
  chart: 3,
  trading: 4,
};

export const TermsListSection = ({
  title,
  termsSectionId,
}: TermsListSectionProps) => {
  const categoryId = SECTION_TO_CATEGORY_ID[termsSectionId] || 1;
  const { data, isLoading } = useGetTermsByCategory(categoryId);
  const termsList = data?.data?.terms || [];

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
        {isLoading ? (
          <div className='text-body-lg flex flex-1 items-center justify-center py-[4rem] font-bold text-gray-400'>
            로딩 중...
          </div>
        ) : termsList.length === 0 ? (
          <div className='text-body-lg flex flex-1 items-center justify-center py-[4rem] font-bold text-gray-400'>
            등록된 용어가 없습니다.
          </div>
        ) : (
          termsList.map((term) => (
            <TermsListCard
              key={term.termId}
              name={term.termName || ''}
              termsSectionId={termsSectionId}
              termsId={String(term.termId)}
              isScrapped={term.isScrapped}
              isLearned={term.isLearned}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};
