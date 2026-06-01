'use client';

import RecommendHeader from '@/features/recommend/recommendHeader';
import RecommendSelectionIntro from '@/features/recommend/recommendSelectionIntro';
import RecommendSurveyIntro from '@/features/recommend/recommendSurveyIntro';
import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const RecommendPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentTab = (searchParams.get('tab') as 'left' | 'right') || 'left';

  const handleToggle = (value: 'left' | 'right') => {
    router.replace(`/recommend?tab=${value}`);
  };

  return (
    <div className='w-full px-[1rem] pt-[1rem] pb-[10rem]'>
      <RecommendHeader value={currentTab} onValueChange={handleToggle} />

      {currentTab === 'left' ? (
        <RecommendSurveyIntro />
      ) : (
        <RecommendSelectionIntro />
      )}
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecommendPageContent />
    </Suspense>
  );
};

export default Page;
