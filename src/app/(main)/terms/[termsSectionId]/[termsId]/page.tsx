'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import BackButtonField from '@/components/backButtonField';
import BottomButton from '@/components/bottomButton';
import { TermsScrapButton } from '@/features/terms/termsScrapButton';
import { motion } from 'framer-motion';
import {
  useGetTermDetail,
  useGetTermsByCategory,
} from '@/api/generated/endpoints/주식-용어/주식-용어';

interface PageProps {
  params: Promise<{
    termsSectionId: string;
    termsId: string;
  }>;
}

const SECTION_TO_CATEGORY_ID: Record<string, number> = {
  basic: 1,
  diagnosis: 2,
  chart: 3,
  trading: 4,
};

const CATEGORY_CONFIGS: Record<
  string,
  { title: string; textColor: string; bgColor: string }
> = {
  basic: {
    title: '기초 개념',
    textColor: 'text-main1',
    bgColor: 'bg-main1',
  },
  diagnosis: {
    title: '기업 진단',
    textColor: 'text-main2',
    bgColor: 'bg-main2',
  },
  chart: {
    title: '차트 분석',
    textColor: 'text-main3',
    bgColor: 'bg-main3',
  },
  trading: {
    title: '거래 실무',
    textColor: 'text-main4',
    bgColor: 'bg-main4',
  },
};

const Page = ({ params }: PageProps) => {
  const { termsSectionId, termsId } = React.use(params);
  const router = useRouter();

  const { data, isLoading } = useGetTermDetail(Number(termsId));
  const term = data?.data;

  const categoryId = SECTION_TO_CATEGORY_ID[termsSectionId] || 1;
  const { data: listData } = useGetTermsByCategory(categoryId);
  const termsList = listData?.data?.terms || [];

  const config = CATEGORY_CONFIGS[termsSectionId] || CATEGORY_CONFIGS.basic;

  if (isLoading) {
    return (
      <div className='bg-background flex h-[100vh] w-[100vw] items-center justify-center'>
        <p className='text-body-lg animate-pulse font-extrabold text-gray-400'>
          학습 자료를 불러오는 중...
        </p>
      </div>
    );
  }

  if (!term) {
    return (
      <div className='bg-background flex h-[100vh] w-[100vw] flex-col items-center justify-center gap-4 p-[2rem]'>
        <p className='text-body-lg font-extrabold text-gray-400'>
          학습 자료를 찾을 수 없습니다.
        </p>
        <BottomButton
          bgColor={config.bgColor}
          label='목록으로 돌아가기'
          onClick={() => router.push(`/terms/${termsSectionId}`)}
        />
      </div>
    );
  }

  const currentIndex = termsList.findIndex((t) => t.termId === term.termId);
  const nextTerm =
    currentIndex !== -1 && currentIndex < termsList.length - 1
      ? termsList[currentIndex + 1]
      : null;

  const handleNext = () => {
    if (nextTerm) {
      router.push(`/terms/${termsSectionId}/${nextTerm.termId}`);
    } else {
      router.push(`/terms/${termsSectionId}`);
    }
  };

  const description = term.description || '';
  const lines = description.split('\n');
  const shortDesc = lines[0] || '';
  const detailedDesc = lines.slice(1).join('\n') || description;

  return (
    <div>
      <div className='flex flex-col gap-[2rem] p-[1rem]'>
        <div className='flex items-center justify-between'>
          <BackButtonField
            color='secondary2'
            label={term.categoryName || config.title}
            href={`/terms/${termsSectionId}`}
          />
          <div className='right-0 px-[0.375rem]'>
            <TermsScrapButton
              termId={term.termId}
              initialScrapped={term.isScrapped}
            />
          </div>
        </div>

        {/* 용어 이미지 자리 */}
        <div className='bg-default mx-auto h-[18.75rem] w-[18.75rem]' />
      </div>

      <div className='bg-secondary1 shadow-card-shadow relative left-1/2 flex h-[60rem] w-[60rem] -translate-x-1/2 flex-col items-center gap-[1rem] rounded-[77.125rem] pt-[2.25rem]'>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className={`text-heading-md text-center ${config.textColor} leading-[100%] font-extrabold`}
        >
          {term.termName?.split(/(?=\()/).map((part: string, index: number) => {
            const trimmedPart = part.trim();
            return (
              <React.Fragment key={index}>
                {index > 0 ? (
                  <span className='text-label-lg mt-[0.25rem] block leading-[100%]'>
                    {trimmedPart}
                  </span>
                ) : (
                  trimmedPart
                )}
              </React.Fragment>
            );
          })}
        </motion.h1>
        <div className='flex flex-col gap-[0.5rem] px-[20rem] text-center'>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            className='text-label-md text-text-main leading-[120%] font-extrabold'
          >
            {shortDesc}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
            className='text-body-lg text-text-main leading-[120%] font-semibold'
          >
            {detailedDesc.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx !== detailedDesc.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </motion.p>
        </div>
      </div>

      <BottomButton
        bgColor={config.bgColor}
        label={nextTerm ? '다음으로' : '학습 완료'}
        onClick={handleNext}
      />
    </div>
  );
};

export default Page;
