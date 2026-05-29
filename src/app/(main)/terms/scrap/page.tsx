'use client';

import React from 'react';
import BackButtonField from '@/components/backButtonField';
import { TermsListCard } from '@/features/terms/termsListCard';
import { motion } from 'framer-motion';
import { useGetScraps } from '@/api/generated/endpoints/주식-용어/주식-용어';

const CATEGORY_NAME_TO_SECTION_ID: Record<string, string> = {
  '기초 개념': 'basic',
  '기업 진단': 'diagnosis',
  '차트 분석': 'chart',
  '거래 실무': 'trading',
};

export default function ScrapTermsPage() {
  const { data, isLoading } = useGetScraps();
  const scraps = React.useMemo(() => data?.data || [], [data]);

  const [prevScraps, setPrevScraps] = React.useState<typeof scraps>(scraps);
  const [localScraps, setLocalScraps] = React.useState<typeof scraps>(scraps);

  // API 데이터가 로드되거나 변경되었을 때 렌더링 도중 상태 동기화
  if (scraps !== prevScraps) {
    setPrevScraps(scraps);
    setLocalScraps(scraps);
  }

  // 스크랩이 해제되었을 때 UI에서 즉시 필터링
  const handleUnscrap = (termId: number) => {
    setLocalScraps((prev) => prev.filter((item) => item.termId !== termId));
  };

  return (
    <div className='bg-primary flex h-dvh w-full flex-col overflow-hidden'>
      <div className='shrink-0 px-4 pt-4'>
        <BackButtonField
          color='secondary1'
          label='스크랩한 용어'
          href='/terms'
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 250 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.65,
          ease: [0.5, 1, 0.5, 1],
        }}
        className='bg-background shadow-card-shadow mt-16.5 flex flex-1 flex-col gap-4 overflow-hidden rounded-t-4xl px-6 py-8'
      >
        <h1 className='text-label-lg shrink-0 text-center leading-[120%] font-extrabold'>
          스크랩한 용어
        </h1>
        <div className='flex flex-1 flex-col gap-4 overflow-y-auto'>
          {isLoading ? (
            <div className='text-body-lg flex flex-1 items-center justify-center py-16 font-bold text-gray-400'>
              로딩 중...
            </div>
          ) : scraps.length === 0 || localScraps.length === 0 ? (
            <div className='text-body-lg flex flex-1 items-center justify-center py-16 font-bold text-gray-400'>
              스크랩한 용어가 없습니다.
            </div>
          ) : (
            localScraps.map((scrap) => {
              const sectionId =
                CATEGORY_NAME_TO_SECTION_ID[
                  scrap.categoryName || '기초 개념'
                ] || 'basic';

              return (
                <TermsListCard
                  key={scrap.termId}
                  name={scrap.termName || ''}
                  termsSectionId={sectionId}
                  termsId={String(scrap.termId)}
                  isScrapped={true}
                  onToggleScrap={(scrapped) => {
                    if (!scrapped && scrap.termId !== undefined) {
                      handleUnscrap(scrap.termId);
                    }
                  }}
                />
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
}
