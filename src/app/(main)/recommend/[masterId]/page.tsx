'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import BackButtonField from '@/components/backButtonField';
import RecommendResultCard from '@/components/recommendResultCard';
import FloatingButton from '@/features/recommend/selection/floatingButton';
import CriteriaDescriptionModal from '@/features/recommend/selection/criteriaDescriptionModal';
import { motion, Variants } from 'framer-motion';
import {
  MASTERS_DATA,
  MOCK_STOCKS,
  CRITERIA_DESCRIPTIONS,
} from '@/constants/masters';

export default function MasterRecommendPage({
  params,
}: {
  params: Promise<{ masterId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const master =
    MASTERS_DATA[resolvedParams.masterId as keyof typeof MASTERS_DATA] ||
    MASTERS_DATA.buffett;

  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalData =
    CRITERIA_DESCRIPTIONS[
      resolvedParams.masterId as keyof typeof CRITERIA_DESCRIPTIONS
    ] || CRITERIA_DESCRIPTIONS.buffett;

  const toggleCriteria = (c: string) => {
    setSelectedCriteria((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c],
    );
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', bounce: 0.4 },
    },
  };

  return (
    <div className='bg-background relative flex min-h-screen w-full flex-col overflow-x-hidden'>
      {/* Floating Check Button */}
      <FloatingButton />

      {/* Background Curved Shape */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={cn(
          'absolute top-[-35rem] left-1/2 z-0 h-[45rem] w-[45rem] -translate-x-1/2 rounded-b-[100%] transition-colors duration-500',
          master.theme,
        )}
      />

      {/* Top Header */}
      <div className='relative z-10 w-full flex-col px-4 pt-4'>
        <BackButtonField color='secondary1' label='거장의 선택' />
      </div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='show'
        className='relative z-10 flex w-full flex-col'
      >
        {/* Profile Section */}
        <motion.div
          variants={itemVariants}
          className='mt-[1.625rem] flex flex-col items-center'
        >
          {/* Profile Image Placeholder */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            className={cn(
              'bg-secondary1 h-[8rem] w-[8rem] rounded-full',
              master.shadow,
            )}
          />

          <h1 className='text-label-lg text-secondary2 mt-[0.75rem] font-extrabold'>
            {master.name}
          </h1>

          <div
            className={cn(
              'text-secondary1 text-body-md mt-[0.5rem] items-center rounded-full px-[0.875rem] py-[0.375rem] font-semibold transition-colors duration-500',
              master.theme,
            )}
          >
            {master.slogan}
          </div>

          <p className='text-text-sub text-body-md mt-[1.25rem] text-center leading-[120%] font-semibold whitespace-pre-line'>
            {master.description}
          </p>
        </motion.div>

        {/* Criteria Tags */}
        <motion.div
          variants={itemVariants}
          className='mt-[1.25rem] flex flex-wrap justify-center gap-[0.5rem]'
        >
          {master.criteria.map((c) => {
            const isSelected = selectedCriteria.includes(c);
            return (
              <motion.button
                whileTap={{ scale: 0.9, rotate: isSelected ? -2 : 2 }}
                key={c}
                onClick={() => toggleCriteria(c)}
                className={cn(
                  'text-body-md rounded-full border px-[1.125rem] py-[0.5625rem] font-semibold transition-colors duration-200',
                  isSelected
                    ? cn(master.theme, 'text-secondary1 border-transparent')
                    : 'text-secondary2 border-secondary2 bg-transparent',
                )}
              >
                {c}
              </motion.button>
            );
          })}
          <motion.button
            whileTap={{ scale: 0.9, rotate: -2 }}
            onClick={() => setIsModalOpen(true)}
            className='text-body-md bg-sub4 text-secondary1 rounded-full px-[1.125rem] py-[0.5625rem] font-semibold'
          >
            조건 설명
          </motion.button>
        </motion.div>

        {/* Stock Cards */}
        <motion.div
          variants={itemVariants}
          className='mt-[1rem] flex flex-col gap-[1rem] pb-[1.875rem]'
        >
          {MOCK_STOCKS.map((_, i) => (
            <RecommendResultCard key={i} />
          ))}
        </motion.div>
      </motion.div>

      {/* Modal */}
      <CriteriaDescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
      />
    </div>
  );
}
