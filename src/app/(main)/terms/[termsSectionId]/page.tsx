import React from 'react';
import { notFound } from 'next/navigation';
import BackButtonField from '@/components/backButtonField';
import { TermsListSection } from '@/features/terms/termsListSection';

interface PageProps {
  params: Promise<{
    termsSectionId: string;
  }>;
}

const BACKGROUND_CONFIGS: Record<
  string,
  { title: string; bgColor: string; bgImage: string }
> = {
  basic: {
    title: '기초 개념',
    bgColor: 'bg-main1',
    bgImage: '/images/termsListBg1.svg',
  },
  diagnosis: {
    title: '기업 진단',
    bgColor: 'bg-main2',
    bgImage: '/images/termsListBg2.svg',
  },
  chart: {
    title: '차트 분석',
    bgColor: 'bg-main3',
    bgImage: '/images/termsListBg3.svg',
  },
  trading: {
    title: '거래 실무',
    bgColor: 'bg-main4',
    bgImage: '/images/termsListBg4.svg',
  },
};

export default async function TermsListPage({ params }: PageProps) {
  const { termsSectionId } = await params;

  const config = BACKGROUND_CONFIGS[termsSectionId];

  if (!config) {
    notFound();
  }

  return (
    <div
      className={`h-[100dvh] w-full overflow-hidden ${config.bgColor} flex flex-col`}
      style={{
        backgroundImage: `url(${config.bgImage})`,
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='flex-shrink-0 px-[1rem] pt-[1rem]'>
        <BackButtonField color='secondary1' label='주식 용어 학습' />
      </div>
      <TermsListSection title={config.title} termsSectionId={termsSectionId} />
    </div>
  );
}
