'use client';

import Image from 'next/image';
import { MockInvestmentOrderHistoryItemResponse } from '@/api/generated/model';

interface HistoryCardProps {
  data: MockInvestmentOrderHistoryItemResponse;
}

const ORDER_TYPE_MAP: Record<string, string> = {
  BUY: '매수',
  SELL: '매도',
  DEPOSIT: '입금',
};

const formatDateTime = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return dateString;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export default function HistoryCard({ data }: HistoryCardProps) {
  const isDeposit = data.orderType === 'DEPOSIT';

  const displayType = ORDER_TYPE_MAP[data.orderType || ''] || data.orderType;

  return (
    <div className='bg-secondary1 shadow-card-shadow flex w-full flex-col gap-[1rem] rounded-[2rem] px-[1.5rem] py-[1rem] text-left'>
      <div className='flex w-full items-start justify-between gap-[0.5rem]'>
        <div className='flex min-w-0 items-center gap-[0.75rem]'>
          {data.stockCode && !isDeposit ? (
            <div className='h-[3rem] w-[3rem] flex-shrink-0 overflow-hidden rounded-full'>
              <Image
                src={`/logos/${data.stockCode}.png`}
                alt={`${data.stockName} 로고`}
                width={48}
                height={48}
                className='h-full w-full object-cover'
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className='bg-background h-[3rem] w-[3rem] flex-shrink-0 rounded-full' />
          )}

          <div className='flex min-w-0 flex-col gap-[0.125rem]'>
            <div className='text-secondary2 text-body-xl truncate font-extrabold'>
              {isDeposit ? '초기 자본금' : data.stockName}
            </div>
            {!isDeposit && (
              <div className='text-text-main text-body-md font-bold'>
                {displayType} · {data.quantity}주
              </div>
            )}
          </div>
        </div>

        <div className='text-text-sub text-body-sm shrink-0 font-semibold'>
          {formatDateTime(data.executedAt)}
        </div>
      </div>

      <div className='text-secondary2 text-body-md font-semibold'>
        {isDeposit
          ? `입금액: ₩ ${(data.totalExecutionAmount || 0).toLocaleString()}`
          : `체결가: ₩ ${(data.executionPrice || 0).toLocaleString()} | 총금액: ₩ ${(
              data.totalExecutionAmount || 0
            ).toLocaleString()}`}
      </div>
    </div>
  );
}
