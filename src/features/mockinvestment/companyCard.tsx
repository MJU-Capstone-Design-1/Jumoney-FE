'use client';

import {
  BackendIndustryTag,
  INDUSTRY_LABEL_MAP,
} from '@/constants/industryMapper';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CompanyCardProps {
  showBadge?: boolean;
  stockId?: number;
  stockCode?: string;
  stockName?: string;
  currentPrice?: number;
  changeRate?: number;
  tags?: string[];
  quantity?: number;
}

export const CompanyCard = ({
  showBadge = true,
  stockId,
  stockCode,
  stockName = '기업명',
  currentPrice = 0,
  changeRate = 0,
  tags = [],
  quantity,
}: CompanyCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (stockCode) {
      router.push(`/mockinvestment/companyinfo/${stockCode}`);
    } else {
      router.push('/mockinvestment/companyinfo');
    }
  };

  const formattedPrice = currentPrice.toLocaleString();
  const isPositive = changeRate > 0;
  const isNegative = changeRate < 0;

  const formattedChangeRate = isPositive
    ? `+${changeRate.toFixed(2)}%`
    : `${changeRate.toFixed(2)}%`;

  const changeRateColorClass = isPositive
    ? 'text-text-up'
    : isNegative
      ? 'text-text-down'
      : 'text-text-main';

  const rawTag = tags[0];
  const displayTag =
    rawTag && rawTag in INDUSTRY_LABEL_MAP
      ? INDUSTRY_LABEL_MAP[rawTag as BackendIndustryTag]
      : rawTag || '기타';

  return (
    <div
      role='button'
      onClick={handleClick}
      className='bg-secondary1 text-secondary2 shadow-card-shadow flex w-full cursor-pointer flex-col gap-[1rem] rounded-[1.5rem] p-[1rem] text-left'
    >
      <div className='flex w-full min-w-0 items-center gap-[1rem]'>
        <div className='bg-background flex h-[4rem] w-[4rem] flex-shrink-0 items-center justify-center overflow-hidden rounded-full'>
          {stockCode && (
            <Image
              src={`/logos/${stockCode}.png`}
              alt={`${stockName} 로고`}
              width={64}
              height={64}
              className='object-cover'
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
        </div>
        <div className='flex min-w-0 flex-col gap-[0.125rem]'>
          <div className='flex w-full items-center gap-[0.75rem]'>
            <div className='flex items-center gap-[0.25rem]'>
              <div className='text-label-sm truncate font-bold'>
                {stockName}
              </div>
              {quantity !== undefined && (
                <div className='text-label-sm font-bold'>
                  • {quantity.toLocaleString()}주
                </div>
              )}
            </div>
            {showBadge && tags.length > 0 && (
              <div className='text-main2 bg-default text-body-sm mb-[0.25rem] flex h-[1.625rem] shrink-0 items-center justify-center rounded-[6.25rem] px-[0.625rem] font-bold whitespace-nowrap'>
                #{displayTag}
              </div>
            )}
          </div>
          <div className='flex items-center gap-[0.5rem]'>
            <div className='text-body-lg gap-[0.25rem] font-bold'>
              ₩ {formattedPrice}
            </div>
            <div className='bg-secondary2 h-[0.75rem] w-[0.0625rem]' />
            <div className={`text-body-lg ${changeRateColorClass} font-bold`}>
              {formattedChangeRate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
