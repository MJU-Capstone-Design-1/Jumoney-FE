'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import React, { useMemo } from 'react';
import RecommendResultCard from '@/components/recommendResultCard';
import { LoadingNewsCard } from '@/features/recommend/survey/loadingNewsCard';
import { useTodayNews } from '@/types/useTodayNews';

export const Step2Card = (props: HTMLMotionProps<'div'>) => {
  const { data: newsData, isLoading: isNewsLoading } = useTodayNews();

  const newsCardData = useMemo(() => {
    const firstNews = newsData?.items?.[0];

    if (!firstNews) {
      return {
        title: isNewsLoading
          ? '뉴스를 불러오는 중...'
          : '오늘의 뉴스가 없습니다.',
        subtitle: '호가 예상 금융 뉴스 인사이트',
        tag: '시장',
      };
    }

    return {
      title: firstNews.title,
      subtitle: '호가 예상 금융 뉴스 인사이트',
      tag: firstNews.keyword || '시장',
    };
  }, [isNewsLoading, newsData?.items]);

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
        title={newsCardData.title}
        subtitle={newsCardData.subtitle}
        tag={newsCardData.tag}
      />
      <RecommendResultCard
        data={{
          stockName: 'SK하이닉스',
          stockCode: '000660',
          currentPrice: 2360000,
          changeRate: -1.7,
          sortMetricKey: 'ROE',
          sortMetricValue: 45.74,

          tags: ['자산의 꾸준한 성장', '시세 차익'],

          goodSectorTags: ['호재섹터'],
        }}
      />
    </motion.div>
  );
};
