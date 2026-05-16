'use client';

import BottomButton from '@/components/bottomButton';
import SelectionIntroCard from '@/features/recommend/selection/selectionIntroCard';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RecommendSelectionIntro = () => {
  const [selectedMaster, setSelectedMaster] = useState('');
  const router = useRouter();

  const handleStart = () => {
    if (selectedMaster) {
      router.push(`/recommend/${selectedMaster}`);
    }
  };

  return (
    <div>
      <div className='flex flex-col gap-[2rem] pt-[1.5rem]'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='flex flex-col items-center gap-[0.5rem] text-center'
        >
          <p className='text-label-md font-extrabold'>
            거장의 눈으로 시장을 바라보세요
          </p>
          <p className='text-body-md text-text-main font-semibold'>
            {/* TODO: 서버에서 유저 데이터 받아와서 적용 */}
            역사적으로 증명된 대가들의 원칙을 바탕으로
            <br />
            든든한 종목을 추천해드려요
          </p>
        </motion.div>

        <SelectionIntroCard
          value={selectedMaster}
          onValueChange={setSelectedMaster}
        />
      </div>
      <BottomButton
        label='시작하기'
        disabled={!selectedMaster}
        onClick={handleStart}
      />
    </div>
  );
};

export default RecommendSelectionIntro;
