import { TermsIntroCardSelect } from '@/features/terms/termsIntroCardSelect';
import { TermsIntroHeader } from '@/features/terms/termsIntroHeader';
import { TermsIntroScrapSection } from '@/features/terms/termsIntroScrapSection';
import React from 'react';

const Page = () => {
  return (
    <div className='flex flex-col'>
      <TermsIntroHeader />

      <div className='flex flex-col gap-[2rem] px-[1rem] pt-[2.5rem]'>
        <TermsIntroCardSelect />

        <TermsIntroScrapSection />
      </div>
    </div>
  );
};

export default Page;
