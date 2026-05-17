'use client';

import React from 'react';
/* import VerificationButton from './verificationButton'; */
import type { RecommendedStockResponse } from '@/api/generated/model';
import { LOGIC_CODE_TO_KOREAN } from '@/constants/masters';
import { masterSortMetricLabels } from '@/constants/masterLabels';
import Image from 'next/image';

interface RecommendResultCardProps {
  data: Omit<RecommendedStockResponse, 'tags'> & {
    tags?: string[];
    stockCode?: string;
  };
}

const RecommendResultCard = ({ data }: RecommendResultCardProps) => {
  const formatChangeRate = (rate?: number) => {
    if (rate === undefined) return '';
    return rate > 0 ? `+${rate.toFixed(1)}% ▲` : `${rate.toFixed(1)}% ▼`;
  };

  const formatPrice = (price?: number) => {
    if (price === undefined) return '0';
    return price.toLocaleString();
  };

  const stockTags = data.tags || [];

  return (
    <div
      role='button'
      className='bg-secondary1 shadow-card-shadow flex w-full cursor-pointer flex-col gap-[1rem] rounded-[2rem] px-[1.5rem] py-[1rem] text-left'
    >
      <div className='flex w-full items-center justify-between gap-[1rem]'>
        <div className='flex min-w-0 items-center gap-[0.5rem]'>
          {data.stockCode ? (
            <Image
              src={`/logos/${data.stockCode}.png`}
              alt={`${data.stockName || '종목'} 로고`}
              className='bg-secondary1 h-[3rem] w-[3rem] flex-shrink-0 rounded-full object-contain'
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget
                  .nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'block';
              }}
            />
          ) : null}

          <div
            className='bg-primary h-[3rem] w-[3rem] flex-shrink-0 rounded-full'
            style={{ display: data.stockCode ? 'none' : 'block' }}
          />

          <div className='flex min-w-0 flex-col gap-[0.25rem]'>
            <div className='text-body-xl truncate font-extrabold'>
              {data.stockName || '추천 종목'}
            </div>

            <div className='text-text-sub text-body-sm flex flex-wrap gap-x-[0.5rem] font-bold'>
              {stockTags.length > 0 ? (
                stockTags.map((code, index) => {
                  const displayTag =
                    masterSortMetricLabels[code.toUpperCase()] ||
                    LOGIC_CODE_TO_KOREAN[
                      code as keyof typeof LOGIC_CODE_TO_KOREAN
                    ] ||
                    code;
                  return (
                    <div key={index} className='whitespace-nowrap'>
                      # {displayTag}
                    </div>
                  );
                })
              ) : (
                <div className='text-text-sub'>#종목 태그</div>
              )}
            </div>
          </div>
        </div>
        {/*  <div className='flex-shrink-0'>
          <VerificationButton />
        </div> */}
      </div>

      <div className='flex items-center gap-[0.5rem]'>
        <p className='text-body-md font-semibold'>
          {formatPrice(data.currentPrice)} ({formatChangeRate(data.changeRate)})
        </p>

        {data.sortMetricKey && data.sortMetricValue !== undefined && (
          <>
            <div className='bg-secondary2 flex h-[0.75rem] w-[0.0625rem]' />
            <p className='text-body-md font-semibold'>
              {masterSortMetricLabels[data.sortMetricKey.toUpperCase()] ||
                data.sortMetricKey}{' '}
              {data.sortMetricValue}%
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default RecommendResultCard;
