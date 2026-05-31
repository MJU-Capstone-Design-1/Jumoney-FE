'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import BackButtonField from '@/components/backButtonField';
import BottomButton from '@/components/bottomButton';
import { BulbIcon } from '@/components/icons/bulbIcon';
import { KeyIcon } from '@/components/icons/keyIcon';
import { PencilIcon } from '@/components/icons/pencilIcon';
import { CompanyInformationCard } from '@/features/mockinvestment/companyinfo/companyInformationCard';
import {
  PeriodToggle,
  PeriodValue,
} from '@/features/mockinvestment/companyinfo/periodToggle';
import { SwitchChartButton } from '@/features/mockinvestment/companyinfo/switchChartButton';
import CompanyLineChart from '@/features/mockinvestment/companyinfo/companyLineChart';
import CompanyCandleChart from '@/features/mockinvestment/companyinfo/companyCandleChart';
import {
  useBuy,
  useGetPortfolios,
  useGetStockDetail,
  useSell,
} from '@/api/generated/endpoints/모의투자/모의투자';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import IndicatorModal from '@/features/mockinvestment/companyinfo/indicatorModal';

const getSubjectParticle = (word: string) => {
  if (!word) return '이';

  const lastChar = word.charCodeAt(word.length - 1);
  if (lastChar >= 0xac00 && lastChar <= 0xd7a3) {
    const hasJongseong = (lastChar - 0xac00) % 28 > 0;
    return hasJongseong ? '이' : '가';
  }
  return '이';
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const DetailPage = () => {
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodValue | undefined>(
    '1d',
  );
  const [isChart, setIsChart] = useState(false);
  const [isIndicatorModalOpen, setIsIndicatorModalOpen] = useState(false);

  const params = useParams();
  const stockCode = typeof params.id === 'string' ? params.id : '005930';
  const queryClient = useQueryClient();

  const { data: detailResponse, isLoading } = useGetStockDetail(stockCode);

  const { data: portfolioResponse } = useGetPortfolios();
  const portfolios = portfolioResponse?.data?.portfolios || [];

  const isOwned = portfolios.some((p) => p.stockCode === stockCode);

  const buyMutation = useBuy();
  const sellMutation = useSell();

  const stockData = detailResponse?.data;
  const stockName = stockData?.stockName || '기업명 불러오는 중...';
  const currentPrice = stockData?.price?.currentPrice || 0;
  const changeRate = stockData?.price?.changeRate || 0;
  const descriptions = stockData?.description || [];

  const formattedPrice = currentPrice.toLocaleString();
  const isPositive = changeRate > 0;
  const isNegative = changeRate < 0;

  const changeRateText = isPositive
    ? `+${changeRate.toFixed(2)}% 올랐어요`
    : isNegative
      ? `${changeRate.toFixed(2)}% 내렸어요`
      : `0.00% 변동 없어요`;

  const changeRateColor = isPositive
    ? 'text-text-up'
    : isNegative
      ? 'text-text-down'
      : 'text-text-main';

  const formatDescription = (text?: string) => {
    if (!text) return null;
    return (
      <>
        {text.split('\n').map((line, i, arr) => (
          <React.Fragment key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </>
    );
  };

  const handleAllClick = () => {
    setIsAllSelected((prev) => {
      if (prev) return prev;
      setSelectedPeriod(undefined);
      return true;
    });
  };

  const handleOrderClick = () => {
    const quantity = 1;

    if (isOwned) {
      sellMutation.mutate(
        { data: { stockCode, quantity } },
        {
          onSuccess: () => {
            alert('시장가 매도 주문이 체결되었습니다.');
            queryClient.invalidateQueries({
              queryKey: ['/api/mock-investments/portfolios'],
            });
          },
          onError: () => alert('매도 주문에 실패했습니다.'),
        },
      );
    } else {
      buyMutation.mutate(
        { data: { stockCode, quantity } },
        {
          onSuccess: () => {
            alert('시장가 매수 주문이 체결되었습니다.');
            queryClient.invalidateQueries({
              queryKey: ['/api/mock-investments/portfolios'],
            });
          },
          onError: () => alert('매수 주문에 실패했습니다.'),
        },
      );
    }
  };

  return (
    <>
      <motion.div
        className='flex w-full flex-col px-4 pt-4'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <BackButtonField color='secondary2' label={stockName} />

        <motion.div
          variants={itemVariants}
          className='flex flex-col items-center justify-center pt-[1.75rem]'
        >
          <div className='text-secondary2 text-label-xl text-center leading-[120%] font-semibold'>
            <span className='font-extrabold'>{stockName}</span>
            의 현재 가격은
            <br />
            {formattedPrice}원 이에요
          </div>

          <div
            className={`text-body-xl pt-[0.5rem] text-center font-semibold ${changeRateColor}`}
          >
            어제보다 {changeRateText}
          </div>

          <div className='flex h-auto w-full items-center justify-between pt-[1.5rem]'>
            <button
              type='button'
              onClick={() => setIsIndicatorModalOpen(true)}
              className='bg-sub4 flex h-[2.25rem] items-center justify-center rounded-full px-[1.5rem]'
            >
              <span className='text-body-md font-semibold'>지표 확인하기</span>
            </button>
            <SwitchChartButton isChart={isChart} setIsChart={setIsChart} />
          </div>

          <div className='pt-[0.5rem]'>
            <PeriodToggle
              value={selectedPeriod}
              onValueChange={(val: PeriodValue) => {
                setSelectedPeriod(val);
                setIsAllSelected(false);
              }}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className='pt-[1rem]'>
          {isChart ? (
            <CompanyCandleChart stockCode={stockCode} period={selectedPeriod} />
          ) : (
            <CompanyLineChart stockCode={stockCode} period={selectedPeriod} />
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className='text-text-main text-label-sm pt-[1.5rem] text-center leading-[120%] font-bold'
        >
          <span>
            {stockName}
            {getSubjectParticle(stockName)} 어떤 회사냐면요
          </span>{' '}
          ...
        </motion.div>

        <div className='flex flex-col gap-[0.75rem] pt-[1.75rem] pb-[7.75rem]'>
          {isLoading ? (
            <div className='text-body-md text-text-sub py-10 text-center font-bold'>
              기업 정보를 불러오는 중입니다...
            </div>
          ) : (
            <>
              {descriptions[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <CompanyInformationCard
                    icon={<BulbIcon />}
                    text={formatDescription(descriptions[0])}
                  />
                </motion.div>
              )}

              {descriptions[1] && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <CompanyInformationCard
                    icon={<PencilIcon />}
                    text={formatDescription(descriptions[1])}
                  />
                </motion.div>
              )}

              {descriptions[2] && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <CompanyInformationCard
                    icon={<KeyIcon />}
                    text={formatDescription(descriptions[2])}
                  />
                </motion.div>
              )}
            </>
          )}
        </div>

        <BottomButton
          label={isOwned ? '매도하기' : '매수하기'}
          onClick={handleOrderClick}
        />
      </motion.div>

      <IndicatorModal
        isOpen={isIndicatorModalOpen}
        onClose={() => setIsIndicatorModalOpen(false)}
        stockCode={stockCode}
      />
    </>
  );
};

export default DetailPage;
