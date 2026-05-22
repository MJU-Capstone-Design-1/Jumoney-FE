'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MASTERS } from '@/features/portfolio/masterselect/portfolioSelectInformations';
import { PortfolioSelectedMasterChangeButton } from '@/features/portfolio/selected/portfolioSelectedMasterChangeButton';
import { PortfolioSelectedMasterHeader } from '@/features/portfolio/selected/portfolioSelectedMasterHeader';

import { PortfolioSelectedMasterPhilosophy } from '@/features/portfolio/selected/portfolioSelectedMasterPhilosophy';
import { PortfolioSelectedMasterPrinciples } from '@/features/portfolio/selected/portfolioSelectedMasterPrinciples';
import { PortfolioSelectedMasterButtons } from '@/features/portfolio/selected/portfolioSelectedMasterButtons';

const PageContent = () => {
  const searchParams = useSearchParams();
  const masterId = searchParams.get('master') || '0';
  const selectedIndex = parseInt(masterId, 10) || 0;
  const master = MASTERS[selectedIndex] || MASTERS[0];

  return (
    <div className='relative min-h-screen'>
      {/* 거장별 테마 컬러 배경 */}
      <div
        className={`${master.bgColor} absolute h-[60rem] w-[60rem] translate-x-[-18.28125rem] translate-y-[-37.6875rem] rounded-[77.125rem]`}
      />

      {/* 우측 상단 플로팅 변경 버튼 */}
      <div className='pointer-events-none fixed top-[1.5rem] left-1/2 z-20 flex w-full max-w-[375px] -translate-x-1/2 justify-end px-[1.5rem]'>
        <PortfolioSelectedMasterChangeButton />
      </div>

      {/* 거장 프로필 영역 */}
      <PortfolioSelectedMasterHeader
        name={master.name}
        image={master.image}
        quote={master.quote}
        tags={master.tags}
      />

      {/* 정보 포트폴리오 버튼 영역 */}
      <PortfolioSelectedMasterButtons />

      {/* 핵심 투자 철학 영역 */}
      <PortfolioSelectedMasterPhilosophy
        title={master.investment_philosophy.title}
        description={master.investment_philosophy.description}
      />

      {/* 투자 원칙 리스트 영역 */}
      <PortfolioSelectedMasterPrinciples
        principles={master.investment_principles}
      />
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
