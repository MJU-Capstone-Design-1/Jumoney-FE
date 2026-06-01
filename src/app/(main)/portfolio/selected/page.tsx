'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetMasterDetail } from '@/api/generated/endpoints/거장-정보/거장-정보';
import { useGetUserInfo } from '@/api/generated/endpoints/사용자/사용자';
import { PortfolioSelectedMasterChangeButton } from '@/features/portfolio/selected/portfolioSelectedMasterChangeButton';
import { PortfolioSelectedMasterHeader } from '@/features/portfolio/selected/portfolioSelectedMasterHeader';

import { PortfolioSelectedMasterPhilosophy } from '@/features/portfolio/selected/portfolioSelectedMasterPhilosophy';
import { PortfolioSelectedMasterPrinciples } from '@/features/portfolio/selected/portfolioSelectedMasterPrinciples';
import { PortfolioSelectedMasterButtons } from '@/features/portfolio/selected/portfolioSelectedMasterButtons';
import { BottomTabBar } from '@/components/bottomTabBar';

const MASTER_STATIC_INFO: Record<string, { image: string; bgColor: string }> = {
  WARREN_BUFFETT: {
    image: '/images/warrenBuffetImage.svg',
    bgColor: 'bg-main1',
  },
  PETER_LYNCH: { image: '/images/peterLynchImage.svg', bgColor: 'bg-main2' },
  RAY_DALIO: { image: '/images/rayDalioImage.svg', bgColor: 'bg-main3' },
  WILLIAM_ONEIL: {
    image: '/images/williamOneilImage.svg',
    bgColor: 'bg-main4',
  },
};

interface ApiMasterDetailResponse {
  success?: boolean;
  code?: string;
  message?: string;
  data?: {
    masterId?: number;
    masterCode?: string;
    masterName?: string;
    tags?: string[];
    quote?: string;
    philosophy?: {
      title?: string;
      description?: string;
    };
    principles?: Array<{
      title?: string;
      description?: string;
      details?: string[];
    }>;
  };
}

interface LocalUserInfoResponse {
  data?: {
    selectedMasterId?: number;
  };
}

const codesByIndex = [
  'WARREN_BUFFETT',
  'PETER_LYNCH',
  'RAY_DALIO',
  'WILLIAM_ONEIL',
];

const PageContent = () => {
  const searchParams = useSearchParams();
  const masterIdParam = searchParams.get('master');

  const { data: userInfoData, isLoading: isUserInfoLoading } = useGetUserInfo();
  const apiSelectedMasterId = (
    userInfoData as LocalUserInfoResponse | undefined
  )?.data?.selectedMasterId;

  let selectedIndex = 0;
  if (masterIdParam !== null) {
    selectedIndex = parseInt(masterIdParam, 10) || 0;
  } else if (
    apiSelectedMasterId !== undefined &&
    apiSelectedMasterId !== null &&
    apiSelectedMasterId !== 0
  ) {
    selectedIndex = apiSelectedMasterId - 1;
  } else if (typeof window !== 'undefined') {
    const localIndexStr = localStorage.getItem('selectedMasterIndex');
    selectedIndex =
      localIndexStr !== null ? parseInt(localIndexStr, 10) || 0 : 0;
  }

  const masterId = selectedIndex + 1;

  const { data: detailData, isLoading: isDetailLoading } =
    useGetMasterDetail(masterId);
  const isLoading = isUserInfoLoading || isDetailLoading;

  const response = detailData as ApiMasterDetailResponse | undefined;
  const currentCode =
    response?.data?.masterCode ||
    codesByIndex[selectedIndex] ||
    'WARREN_BUFFETT';
  const staticInfo =
    MASTER_STATIC_INFO[currentCode] || MASTER_STATIC_INFO.WARREN_BUFFETT;

  if (isLoading) {
    return (
      <div className='relative min-h-screen overflow-hidden'>
        {/* 거장별 테마 컬러 배경 */}
        <div
          className={`${staticInfo.bgColor} absolute left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 translate-y-[-37.6875rem] rounded-[77.125rem]`}
        />
        <div className='text-secondary1 flex min-h-screen items-center justify-center font-bold'>
          로딩 중...
        </div>
      </div>
    );
  }

  const detail = response?.data;
  const name = detail?.masterName || '';
  const quote = detail?.quote || '';
  const tags = detail?.tags || [];

  const philosophy = detail?.philosophy || { title: '', description: '' };
  const principles = detail?.principles || [];

  return (
    <div className='relative min-h-screen overflow-hidden pb-[10rem]'>
      {/* 거장별 테마 컬러 배경 */}
      <div
        className={`${staticInfo.bgColor} absolute left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 translate-y-[-37.6875rem] rounded-[77.125rem]`}
      />

      {/* 우측 상단 플로팅 변경 버튼 */}
      <div className='pointer-events-none fixed top-[1.5rem] left-1/2 z-20 flex w-full max-w-[375px] -translate-x-1/2 justify-end px-[1.5rem]'>
        <PortfolioSelectedMasterChangeButton />
      </div>

      {/* 거장 프로필 영역 */}
      <PortfolioSelectedMasterHeader
        name={name}
        image={staticInfo.image}
        quote={quote}
        tags={tags}
        backHref='/home'
      />

      {/* 정보 포트폴리오 버튼 영역 */}
      <PortfolioSelectedMasterButtons masterId={masterId} />

      {/* 핵심 투자 철학 영역 */}
      <PortfolioSelectedMasterPhilosophy
        title={philosophy.title || ''}
        description={philosophy.description || ''}
      />

      {/* 투자 원칙 리스트 영역 */}
      <PortfolioSelectedMasterPrinciples
        principles={principles.map((p) => ({
          title: p.title || '',
          description: p.description || '',
          details: p.details || [],
        }))}
      />

      <BottomTabBar />
    </div>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-screen items-center justify-center font-bold'>
          로딩 중...
        </div>
      }
    >
      <PageContent />
    </Suspense>
  );
};

export default Page;
