'use client';

import RecommendHeader from '@/features/recommend/recommendHeader';
import RecommendSelectionIntro from '@/features/recommend/recommendSelectionIntro';
import RecommendSurveyIntro from '@/features/recommend/recommendSurveyIntro';
import React, { useState } from 'react';

const Page = () => {
  const [toggleValue, setToggleValue] = useState<'left' | 'right'>('left');

  return (
    <div className='w-full px-[1rem] pt-[1rem] pb-[10rem]'>
      <RecommendHeader value={toggleValue} onValueChange={setToggleValue} />

      {toggleValue === 'left' ? (
        <RecommendSurveyIntro />
      ) : (
        <RecommendSelectionIntro />
      )}
    </div>
  );
};

export default Page;
