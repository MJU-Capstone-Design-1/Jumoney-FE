'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BackButtonField from '@/components/backButtonField';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomSpinner } from '@/features/recommend/survey/customSpinner';
import { FloatingCircle } from '@/features/recommend/survey/floatingCircle';
import { LoadingNewsCard } from '@/features/recommend/survey/loadingNewsCard';
import { useSurveyStore } from '@/store/surveyStore';
import {
  recommend,
  getHojumoneySurvey,
} from '@/api/generated/endpoints/오늘의-호주머니/오늘의-호주머니';
import { useTodayNews } from '@/types/useTodayNews';

const NEWS_FALLBACKS = [
  {
    subtitle: '호가 예상 금융 뉴스 인사이트',
    title: '주목받는 AI 반도체 관련주',
    tag: '반도체/IT',
  },
  {
    subtitle: '오늘의 주요 경제 지표',
    title: '미 연준 금리 인하 가능성 시사',
    tag: '거시경제',
  },
  {
    subtitle: '글로벌 마켓 트렌드',
    title: '전기차 수요 회복 조짐 보인다',
    tag: '모빌리티',
  },
];

// 설문 선택 텍스트와 백엔드 logicCode 매핑
const PURPOSE_TO_LOGIC: Record<string, string> = {
  '안정적인 자산 보호': 'CAPITAL_PROTECTION',
  '배당 수익': 'DIVIDEND_INCOME',
  '자산의 꾸준한 성장': 'STEADY_GROWTH',
  '시세 차익': 'CAPITAL_GAIN',
};

const RISK_TO_LOGIC: Record<string, string> = {
  '매우 낮음': 'STABILITY',
  낮음: 'SAFE_PURSUIT',
  높음: 'PROFIT_PURSUIT',
  '매우 높음': 'AGGRESSIVE',
};

const PERIOD_TO_LOGIC: Record<string, string> = {
  초단기: 'ULTRA_SHORT',
  단기: 'SHORT',
  중기: 'MID',
  장기: 'LONG',
};

export default function Page() {
  const router = useRouter();
  const { purpose, getRiskLabel, period, setRecommendationData } =
    useSurveyStore();

  const { data: newsData } = useTodayNews();
  const fetchedItems = newsData?.items || [];
  const newsItems =
    fetchedItems.length > 0
      ? fetchedItems.map((item) => ({
          subtitle: '오늘의 주요 뉴스',
          title: item.title,
          tag: item.keyword,
        }))
      : NEWS_FALLBACKS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dotCount, setDotCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  // 실시간 카드 변경 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [newsItems.length]);

  // 분석 중 말줄임표 타이머
  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(dotTimer);
  }, []);

  // 백엔드 추천 요청 및 설문 정보 통합 흐름 실행
  useEffect(() => {
    const minTimer = new Promise((resolve) => setTimeout(resolve, 5000)); // 최소 5초 대기시간

    const fetchRecommendation = async () => {
      if (!purpose || !period) {
        throw new Error(
          '설문 선택 내용이 누락되었습니다. 설문을 처음부터 다시 완료해주세요.',
        );
      }

      const risk = getRiskLabel();

      // API에서 설문 데이터 가져와 적절한 optionId 추출
      const response = await getHojumoneySurvey();
      const questions = response.data?.questions || [];

      const targetLogicCodes = [
        PURPOSE_TO_LOGIC[purpose],
        RISK_TO_LOGIC[risk],
        PERIOD_TO_LOGIC[period],
      ].filter(Boolean);

      const selectedOptionIds: number[] = [];

      // logicCode와 매칭되는 선택지 ID 추출
      questions.forEach((q) => {
        q.options?.forEach((opt) => {
          if (
            opt.logicCode &&
            targetLogicCodes.includes(opt.logicCode) &&
            opt.optionId !== undefined
          ) {
            selectedOptionIds.push(opt.optionId);
          }
        });
      });

      // 만약 예외 사항으로 3개가 다 매핑되지 않은 경우 대체 선택지 추출
      if (selectedOptionIds.length < 3) {
        questions.forEach((q) => {
          const firstOpt = q.options?.[0];
          if (
            firstOpt?.optionId !== undefined &&
            !selectedOptionIds.includes(firstOpt.optionId)
          ) {
            selectedOptionIds.push(firstOpt.optionId);
          }
        });
      }

      if (selectedOptionIds.length < 3) {
        throw new Error(
          '선택한 설문에 대한 옵션 매핑 정보가 올바르지 않습니다.',
        );
      }

      // 2) 추출한 optionIds를 바디에 실어 추천 생성 요청
      const recommendRes = await recommend({
        selectedOptionIds: selectedOptionIds.slice(0, 3),
      });
      if (!recommendRes.success || !recommendRes.data) {
        throw new Error(
          recommendRes.message || '추천 결과를 받아오지 못했습니다.',
        );
      }

      return recommendRes.data;
    };

    Promise.all([fetchRecommendation(), minTimer])
      .then(([recData]) => {
        // Zustand 스토어에 데이터 반영
        setRecommendationData(recData);
        // 결과 확인 페이지로 이동
        router.replace('/recommend/surveyresult');
      })
      .catch((err) => {
        console.error('추천 데이터 획득 실패:', err);
        setErrorMsg(err.message || '추천 종목 생성 중 오류가 발생했습니다.');
      });
  }, [purpose, getRiskLabel, period, setRecommendationData, router]);

  return (
    <div className='bg-primary relative flex min-h-screen w-full flex-col overflow-hidden px-4 pt-4'>
      {/* 백그라운드 디자인 요소 */}
      <div className='pointer-events-none absolute inset-0'>
        <FloatingCircle
          color='#b4c48d'
          opacity={0.64}
          style={{ top: '-40px', left: '40%' }}
          radius={35}
          duration={7}
        />
        <FloatingCircle
          color='#E5EAD7'
          style={{ top: '25%', left: '-90px' }}
          radius={30}
          duration={9}
          delay={1}
        />
        <FloatingCircle
          color='var(--primary-muted)'
          opacity={0.64}
          style={{ bottom: '-50px', left: '-40px' }}
          radius={40}
          duration={8}
          delay={2}
        />
        <FloatingCircle
          color='var(--primary-muted)'
          style={{ bottom: '10%', right: '-100px' }}
          radius={35}
          duration={10}
          delay={3}
        />
      </div>

      <div className='relative z-10 flex w-full flex-1 flex-col items-center'>
        <div className='w-full'>
          <BackButtonField color='secondary1' label='오늘의 호주머니' />
        </div>

        {errorMsg ? (
          <div className='flex flex-col items-center gap-[2rem] px-4 pt-[8rem] text-center'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full border border-red-500/30 bg-red-950/50 text-2xl font-bold text-red-400'>
              !
            </div>
            <h2 className='text-2xl font-bold tracking-tight text-red-400'>
              분석 실패
            </h2>
            <p className='max-w-xs text-sm leading-relaxed text-gray-400'>
              {errorMsg}
            </p>
            <button
              onClick={() => router.replace('/recommend/surveyfirst')}
              className='mt-4 cursor-pointer rounded-xl border border-gray-800 bg-[#1b1e23] px-6 py-3 text-sm font-medium text-gray-200 transition duration-300 hover:bg-gray-800'
            >
              처음부터 다시 시도하기
            </button>
          </div>
        ) : (
          <>
            <div className='flex flex-col items-center gap-[3.625rem] pt-[6rem]'>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className='text-label-xl text-secondary1 text-center font-extrabold'
              >
                분석 중{' '}
                <span className={dotCount >= 1 ? 'opacity-100' : 'opacity-0'}>
                  ·
                </span>
                <span className={dotCount >= 2 ? 'opacity-100' : 'opacity-0'}>
                  ·
                </span>
                <span className={dotCount >= 3 ? 'opacity-100' : 'opacity-0'}>
                  ·
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <CustomSpinner className='h-[11.25rem] w-[11.25rem]' />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className='text-body-xl text-secondary1 text-center leading-[120%] font-semibold'
              >
                실시간 뉴스 데이터를 기반으로
                <br />
                분석하고 있어요
              </motion.p>
            </div>

            <div className='relative mt-auto mb-[1.875rem] min-h-[6.5rem] w-full max-w-[21.4375rem]'>
              <AnimatePresence mode='popLayout'>
                <LoadingNewsCard
                  key={`${currentIndex}-${newsItems[currentIndex]?.subtitle}`}
                  subtitle={newsItems[currentIndex]?.subtitle || ''}
                  title={newsItems[currentIndex]?.title || ''}
                  tag={newsItems[currentIndex]?.tag || ''}
                  className='absolute mt-0 mb-0 w-full'
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
