'use client';

import { motion } from 'framer-motion';
import CompanyLineChart from '../mockinvestment/companyinfo/companyLineChart';
import { useState } from 'react';
import { PeriodValue } from '../mockinvestment/companyinfo/periodToggle';
import { useGetMockInvestmentSummary } from '@/api/generated/endpoints/홈/홈';
import { HomeMockInvestmentSummaryResponse } from '@/api/generated/model';

const itemMotion = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.5,
    type: 'spring' as const,
    stiffness: 260,
    damping: 20,
  },
};

export const MockInvestment = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodValue | undefined>(
    '1d',
  );

  const { data: response, isLoading, isError } = useGetMockInvestmentSummary();

  const summaryData = (response?.data ?? response) as
    | HomeMockInvestmentSummaryResponse
    | undefined;

  if (isLoading) {
    return (
      <div className='flex w-full justify-center py-[2rem]'>로딩 중...</div>
    );
  }
  if (isError) {
    return (
      <div className='flex w-full justify-center py-[2rem]'>
        데이터를 불러오지 못했습니다.
      </div>
    );
  }

  if (!summaryData || summaryData.hasAccount === false) {
    return (
      <div className='text-text-sub flex w-full justify-center py-[2rem] font-bold'>
        모의투자 계좌 정보가 없습니다.
      </div>
    );
  }

  const {
    totalPurchaseAmount = 0,
    totalProfitAmount = 0,
    totalProfitRate = 0,
    topHolding,
  } = summaryData;

  const totalAsset = totalPurchaseAmount + totalProfitAmount;
  const topHoldingAsset = topHolding
    ? (topHolding.purchaseAmount ?? 0) + (topHolding.profitAmount ?? 0)
    : 0;

  const formatCurrency = (amount: number) => `₩ ${amount.toLocaleString()}`;
  const formatRate = (rate: number) => {
    if (rate > 0) return `+${rate.toFixed(2)}%`;
    if (rate < 0) return `${rate.toFixed(2)}%`;
    return `0.0%`;
  };

  const getRateColorClass = (rate: number) => {
    if (rate > 0) return 'text-text-up';
    if (rate < 0) return 'text-blue-500';
    return '';
  };

  return (
    <div className='flex w-full flex-col px-[0.5rem]'>
      <div className='flex w-full justify-center'>
        <motion.div
          {...itemMotion}
          transition={{ ...itemMotion.transition, delay: 0.1 }}
          className='flex flex-col items-center justify-center pt-[0.25rem]'
        >
          <div className='text-body-lg text-text-sub font-bold'>내 투자</div>
          <div className='text-label-md font-extrabold'>
            {formatCurrency(totalPurchaseAmount)}
          </div>
        </motion.div>

        <div className='bg-secondary2 mr-[2.625rem] ml-[1.5rem] h-[3.75rem] w-[1px]' />

        <motion.div
          {...itemMotion}
          transition={{ ...itemMotion.transition, delay: 0.2 }}
          className='flex flex-col items-center justify-center'
        >
          <div className='text-body-lg text-text-sub font-bold'>수익률</div>
          <div className='text-label-md text-text-up font-extrabold'>
            {formatRate(totalProfitRate)}
          </div>
        </motion.div>
      </div>

      {topHolding && (
        <div className='flex flex-col pt-[1.25rem]'>
          <motion.div
            {...itemMotion}
            transition={{ ...itemMotion.transition, delay: 0.3 }}
            className='text-label-sm flex justify-center font-extrabold'
          >
            {topHolding.stockName}
          </motion.div>

          <div className='flex justify-center gap-[9rem]'>
            <motion.div
              {...itemMotion}
              transition={{ ...itemMotion.transition, delay: 0.4 }}
              className='text-body-lg font-extrabold'
            >
              {formatCurrency(topHoldingAsset)}
            </motion.div>
            <motion.div
              {...itemMotion}
              transition={{ ...itemMotion.transition, delay: 0.5 }}
              className={`text-body-lg font-extrabold ${getRateColorClass(topHolding.profitRate ?? 0)}`}
            >
              {formatRate(topHolding.profitRate ?? 0)}
            </motion.div>
          </div>

          <motion.div
            {...itemMotion}
            transition={{ ...itemMotion.transition, delay: 0.6 }}
            className='mt-[1rem] flex items-center justify-center'
          >
            <CompanyLineChart
              stockCode={topHolding.stockCode ?? ''}
              period={selectedPeriod}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};
