'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';
import RecommendResultCard from '@/components/recommendResultCard';
import { LoadingNewsCard } from '@/features/recommend/survey/loadingNewsCard';

export const Step2Card = (props: HTMLMotionProps<'div'>) => {
  return (
    <motion.div
      {...props}
      className='mx-auto flex h-[22rem] w-[20.5rem] flex-col items-center gap-[1.25rem]'
    >
      <p className='text-label-md leading-[120%] font-extrabold'>
        당신의 투자 목적은 무엇인가요?
      </p>

      <div className='flex flex-col gap-[1.5rem]'>
        <div className='flex gap-[1rem]'>
          <div className='text-body-md leading bg-background flex h-[2.5rem] items-center justify-center rounded-[6.25rem] border px-[1rem] font-semibold'>
            ROE 15% 이상
          </div>
          <div className='text-body-md leading bg-background flex h-[2.5rem] items-center justify-center rounded-[6.25rem] border px-[1rem] font-semibold'>
            영업이익률 20% 이상
          </div>
        </div>
      </div>
      <LoadingNewsCard
        title='기사 제목 기사 제목  기사 ...'
        subtitle='호가 예상 금융 뉴스 인사이트 '
        tag='가치투자'
      />
      <RecommendResultCard
        data={{
          stockName: '삼성전자',
          stockCode: 'AAPL',
          currentPrice: 200000,
          changeRate: 2.5,
          sortMetricKey: 'ROE',
          sortMetricValue: 150,
          tags: ['안전성', '수익성'],
        }}
      />
    </motion.div>
  );
};
