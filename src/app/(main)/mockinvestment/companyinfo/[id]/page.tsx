'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import BackButtonField from '@/components/backButtonField';
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
  useGetDashboard,
  useGetPortfolios,
  useGetStockDetail,
  useSell,
} from '@/api/generated/endpoints/모의투자/모의투자';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import IndicatorModal from '@/features/mockinvestment/companyinfo/indicatorModal';
import { useStockStream } from '@/hooks/useStockStream';
import QuantityButton from '@/features/mockinvestment/companyinfo/quantityButton';

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
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const stockCode = typeof params.id === 'string' ? params.id : '005930';
  const queryClient = useQueryClient();

  const { data: detailResponse, isLoading } = useGetStockDetail(stockCode);

  const { data: portfolioResponse } = useGetPortfolios();

  const { data: dashboardResponse } = useGetDashboard();
  const availableCash = dashboardResponse?.data?.cashBalance || 0;

  const portfolios = portfolioResponse?.data?.portfolios || [];
  const ownedStock = portfolios.find((p) => p.stockCode === stockCode);
  const isOwned = !!ownedStock;
  const ownedQuantity = ownedStock?.quantity || 0;

  const buyMutation = useBuy();
  const sellMutation = useSell();

  const stockData = detailResponse?.data;
  const stockName = stockData?.stockName || '기업명 불러오는 중...';
  const initialPrice = stockData?.price?.currentPrice || 0;
  const initialChangeRate = stockData?.price?.changeRate || 0;
  const descriptions = stockData?.description || [];

  const { currentPrice, changeRate, latestCandle } = useStockStream(
    stockCode,
    initialPrice,
    initialChangeRate,
  );

  const maxBuyQuantity =
    currentPrice > 0 ? Math.floor(availableCash / currentPrice) : 0;
  const maxLimit = Math.max(maxBuyQuantity, ownedQuantity);
  const isMaxReached = quantity >= maxLimit;

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

  const handleIncrease = () => {
    setQuantity((prev) => (prev < maxLimit ? prev + 1 : prev));
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleSellClick = () => {
    if (quantity > ownedQuantity) {
      alert(`보유 주식 수(${ownedQuantity}주)를 초과하여 매도할 수 없습니다.`);
      return;
    }
    sellMutation.mutate(
      { data: { stockCode, quantity } },
      {
        onSuccess: () => {
          alert('시장가 매도 주문이 체결되었습니다.');
          queryClient.invalidateQueries({
            queryKey: ['/api/mock-investments/portfolios'],
          });
          queryClient.invalidateQueries({
            queryKey: ['/api/mock-investments/dashboards'],
          });
        },
        onError: () => alert('매도 주문에 실패했습니다.'),
      },
    );
  };

  const handleBuyClick = () => {
    if (quantity > maxBuyQuantity) {
      alert(
        `가용 자산(${availableCash.toLocaleString()}원)이 부족합니다. (최대 ${maxBuyQuantity}주 매수 가능)`,
      );
      return;
    }
    buyMutation.mutate(
      { data: { stockCode, quantity } },
      {
        onSuccess: () => {
          alert('시장가 매수 주문이 체결되었습니다.');
          queryClient.invalidateQueries({
            queryKey: ['/api/mock-investments/portfolios'],
          });
          queryClient.invalidateQueries({
            queryKey: ['/api/mock-investments/dashboards'],
          });
        },
        onError: () => alert('매수 주문에 실패했습니다.'),
      },
    );
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
          <div className='text-secondary2 text-label-xl text-center leading-[120%] font-semibold break-keep'>
            <span className='font-extrabold'>{stockName}</span>의
            {stockName.length >= 7 ? <br /> : ' '}
            현재 가격은
            <br />
            <span className={changeRateColor}>{formattedPrice}원</span> 이에요
          </div>

          <div
            className={`text-body-xl pt-[0.5rem] text-center font-semibold ${changeRateColor}`}
          >
            어제보다 {changeRateText}
          </div>

          <div className='flex w-full flex-col items-center gap-[0.5rem] pt-[1.5rem]'>
            <div className='flex w-[21.4375rem] items-center justify-between'>
              <button
                type='button'
                onClick={() => setIsIndicatorModalOpen(true)}
                className='bg-sub4 flex h-[2.25rem] items-center justify-center rounded-full px-[1.5rem]'
              >
                <span className='text-body-md font-semibold'>
                  지표 확인하기
                </span>
              </button>
              <SwitchChartButton isChart={isChart} setIsChart={setIsChart} />
            </div>

            <div className='flex w-full items-center justify-center'>
              <PeriodToggle
                value={selectedPeriod}
                onValueChange={(val: PeriodValue) => {
                  setSelectedPeriod(val);
                  setIsAllSelected(false);
                }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className='pt-[1rem]'>
          {isChart ? (
            <CompanyCandleChart
              stockCode={stockCode}
              period={selectedPeriod}
              latestCandle={latestCandle}
            />
          ) : (
            <CompanyLineChart
              stockCode={stockCode}
              period={selectedPeriod}
              latestCandle={latestCandle}
            />
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

        {!isIndicatorModalOpen && (
          <div className='fixed bottom-[2.125rem] left-1/2 z-50 flex w-full max-w-[23.4375rem] -translate-x-1/2 flex-col items-center gap-[0.625rem]'>
            <QuantityButton
              quantity={quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              isMaxReached={isMaxReached}
            />

            <div className='flex w-full items-center justify-between gap-4 px-4'>
              <button
                type='button'
                onClick={handleSellClick}
                disabled={!isOwned}
                className={`flex h-[4rem] w-full items-center justify-center rounded-[1000px] transition-colors ${
                  !isOwned
                    ? 'bg-default cursor-not-allowed'
                    : 'bg-secondary2 hover:opacity-90'
                }`}
              >
                <span className='text-secondary1 text-body-xl font-extrabold'>
                  매도하기
                </span>
              </button>

              <button
                type='button'
                onClick={handleBuyClick}
                className='bg-secondary2 flex h-[4rem] w-full items-center justify-center rounded-[1000px] transition-colors hover:opacity-90'
              >
                <span className='text-secondary1 text-body-xl font-extrabold'>
                  매수하기
                </span>
              </button>
            </div>
          </div>
        )}
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
