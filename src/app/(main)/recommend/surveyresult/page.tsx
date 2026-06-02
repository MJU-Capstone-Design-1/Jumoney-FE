'use client';

import React, { useMemo } from 'react';
import RecommendResultCard from '@/components/recommendResultCard';
import { motion } from 'framer-motion';
import { useSurveyStore } from '@/store/surveyStore';
import { getPersona } from '@/constants/surveyMappings';
import {
  labelMappings,
  recommendationTagLabels,
} from '@/constants/labelMappings';
import FloatingButton from '@/features/recommend/selection/floatingButton';
import { useRouter } from 'next/navigation';
import BottomButton from '@/components/bottomButton';
import BackButtonField from '@/components/backButtonField';

const Page = () => {
  const router = useRouter();

  const typingText = '분석 완료! 당신의 투자 타입은 · · ·';

  const { purpose, getRiskLabel, period, recommendationData } =
    useSurveyStore();
  const persona = useMemo(() => {
    return getPersona(purpose, getRiskLabel(), period);
  }, [purpose, getRiskLabel, period]);

  const displayName = recommendationData?.persona?.personaName || persona.name;
  const displayDescription =
    recommendationData?.persona?.personaDescription || persona.description;
  const recommendations = recommendationData?.recommendations || [];

  return (
    <div>
      <FloatingButton
        delay={4}
        onClick={() => router.push('/recommend/testaccount')}
      />
      <div className='bg-primary gap-full text-secondary1 flex h-auto flex-col gap-[1rem] rounded-[2.5rem] p-[1.5rem]'>
        <BackButtonField
          color='secondary1'
          label='오늘의 호주머니'
          href='/recommend'
        />
        <p className='text-body-sm font-semibold'>
          {typingText.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.07, duration: 0.1 }}
            >
              {char}
            </motion.span>
          ))}
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className='text-label-md font-extrabold whitespace-pre-wrap'
        >
          {displayName}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className='text-body-md leading-[120%] font-semibold whitespace-pre-wrap'
        >
          {displayDescription}
        </motion.p>
      </div>

      <div className='flex flex-col gap-[1rem] px-[1.5rem] pt-[1.5rem] pb-[10rem]'>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.8 }}
          className='text-body-xl flex flex-col font-extrabold'
        >
          추천 종목
        </motion.p>

        <div className='flex flex-col gap-[1rem]'>
          {recommendations.length > 0 ? (
            recommendations.map((stock, i) => {
              // 1. 태그 매핑 처리 (투자 목적, 위험 성향, 섹터명)
              const mappedTags: string[] = [];
              if (stock.tags) {
                stock.tags.forEach((tag) => {
                  if (tag && tag in recommendationTagLabels) {
                    mappedTags.push(
                      recommendationTagLabels[
                        tag as keyof typeof recommendationTagLabels
                      ],
                    );
                  } else if (tag) {
                    mappedTags.push(tag);
                  }
                });
              }

              // 2. 정렬 지표 키 매핑 처리
              const mappedSortMetricKey =
                stock.sortMetricKey && stock.sortMetricKey in labelMappings
                  ? labelMappings[
                      stock.sortMetricKey as keyof typeof labelMappings
                    ]
                  : stock.sortMetricKey;

              const cardData = {
                ...stock,
                tags: mappedTags,
                sortMetricKey: mappedSortMetricKey,
                stockCode: stock.stockCode || '',
              };

              return (
                <motion.div
                  key={stock.stockId || i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 3.3 + i * 0.2,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <RecommendResultCard data={cardData} />
                </motion.div>
              );
            })
          ) : (
            <p className='py-8 text-center text-sm text-gray-400'>
              추천된 종목이 없습니다.
            </p>
          )}
        </div>
      </div>
      <BottomButton
        label='거장의 선택 알아보기'
        onClick={() => router.push('/recommend?tab=right')}
      />
    </div>
  );
};

export default Page;
