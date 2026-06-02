'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CompanyCardProps {
  stockId?: number;
  stockCode?: string;
  stockName?: string;
  quantity?: number;
  totalEvaluationAmount?: number;
  totalProfitAmount?: number;
  totalProfitRate?: number;
}

export const MyCompanyCard = ({
  stockCode,
  stockName = '기업명',
  quantity = 0,
  totalEvaluationAmount = 0,
  totalProfitAmount = 0,
  totalProfitRate = 0,
}: CompanyCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(
      stockCode
        ? `/mockinvestment/companyinfo/${stockCode}`
        : '/mockinvestment/companyinfo',
    );
  };

  // 수익률에 따른 색상 클래스 결정
  const profitColorClass =
    totalProfitAmount > 0
      ? 'text-text-up'
      : totalProfitAmount < 0
        ? 'text-text-down'
        : 'text-text-main';
  const formattedProfitAmount =
    totalProfitAmount > 0
      ? `+ ₩ ${totalProfitAmount.toLocaleString()}`
      : totalProfitAmount < 0
        ? `- ₩ ${Math.abs(totalProfitAmount).toLocaleString()}`
        : '₩0';

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
        <div className='flex min-w-0 flex-1 flex-col gap-[0.125rem]'>
          <div className='flex w-full min-w-0 items-center justify-between gap-[0.5rem]'>
            <div className='flex min-w-0 items-center gap-[0.25rem]'>
              <div className='text-label-sm truncate font-bold'>
                {stockName}
              </div>
              <div className='text-label-sm shrink-0 font-bold'>
                • {quantity.toLocaleString()}주
              </div>
            </div>
            <div
              className={`text-label-sm ${profitColorClass} shrink-0 font-bold`}
            >
              {totalProfitRate.toFixed(2)}%
            </div>
          </div>
          <div className='flex items-center gap-[0.5rem]'>
            <div className='text-body-lg font-bold'>
              ₩ {totalEvaluationAmount.toLocaleString()}
            </div>
            <div className={`text-body-lg ${profitColorClass} font-bold`}>
              ({formattedProfitAmount})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
