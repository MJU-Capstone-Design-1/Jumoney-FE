import React from 'react';

export interface StepItem {
  badgeBg: string;
  stepLabel: string;
  description: React.ReactNode;
}

export const STEPS: StepItem[] = [
  {
    badgeBg: 'bg-primaryMuted',
    stepLabel: 'STEP 1',
    description: (
      <>
        처음이라 막막한 주식 공부,
        <br />
        <div className='flex gap-[0.25rem]'>
          주머니가 <p className='text-primary'>가장 쉽게</p> 알려드려요
        </div>
      </>
    ),
  },
  {
    badgeBg: 'bg-sub1',
    stepLabel: 'STEP 2',
    description: (
      <>
        세계 최고 거장들의 위대한 철학,
        <br />
        <div className='flex justify-center gap-[0.25rem]'>
          주머니에 <p className='text-main1'>든든하게</p> 채워드려요
        </div>
      </>
    ),
  },
  {
    badgeBg: 'bg-sub3',
    stepLabel: 'STEP 3',
    description: (
      <>
        많은 종목 속에서 헤매지 않도록,
        <br />
        <div className='flex justify-center gap-[0.25rem]'>
          <p className='text-main3'>확실한 기준으로</p> 찾아드려요
        </div>
      </>
    ),
  },
  {
    badgeBg: 'bg-sub2',
    stepLabel: 'STEP 4',
    description: (
      <>
        내 소중한 돈을 잃지 않게,
        <br />
        <div className='flex justify-center gap-[0.25rem]'>
          <p className='text-main2'>안전한 주머니에서</p> 투자하세요
        </div>
      </>
    ),
  },
];
