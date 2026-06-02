'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButtonField from '@/components/backButtonField';
import { MyCompanyToggle } from './myCompanyToggle';
import { MockInvestmentAccountResponse } from '@/api/generated/model';
import { useGetPortfolios } from '@/api/generated/endpoints/모의투자/모의투자';
import { ClockIcon } from '@/components/icons/clockIcon';
import HistoryBottomSheet from './historyBottomSheet';
import { RealtimeCandle } from '@/hooks/useStockStream';
import { MyCompanyCard } from './myCompanyCard';

interface MockInvestmentHeaderProps {
  isExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  accountData?: MockInvestmentAccountResponse | null;
}

const MockInvestmentHeader = ({
  isExpanded: controlledIsExpanded,
  onExpandedChange,
  accountData,
}: MockInvestmentHeaderProps) => {
  const [localIsExpanded, setLocalIsExpanded] = useState(false);
  const isExpanded = controlledIsExpanded ?? localIsExpanded;

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const { data: portfolioResponse, isLoading: isPortfolioLoading } =
    useGetPortfolios();
  const portfolios = useMemo(
    () => portfolioResponse?.data?.portfolios || [],
    [portfolioResponse?.data?.portfolios],
  );
  const portfolioStockCodes = useMemo(
    () =>
      Array.from(
        new Set(
          portfolios
            .map((portfolio) => portfolio.stockCode)
            .filter((stockCode): stockCode is string => Boolean(stockCode)),
        ),
      ),
    [portfolios],
  );
  const portfolioStockCodesKey = portfolioStockCodes.join(',');
  const [realtimePrices, setRealtimePrices] = useState<Record<string, number>>(
    {},
  );

  useEffect(() => {
    const stockCodes = portfolioStockCodesKey
      ? portfolioStockCodesKey.split(',')
      : [];

    if (stockCodes.length === 0) return;

    const eventSources = stockCodes.map((stockCode) => {
      const eventSource = new EventSource(
        `/api/stream/${encodeURIComponent(stockCode)}`,
      );

      eventSource.onmessage = (event) => {
        try {
          const candle: RealtimeCandle = JSON.parse(event.data);

          if (candle.code !== stockCode) return;

          setRealtimePrices((prev) => {
            if (prev[stockCode] === candle.close) return prev;
            return {
              ...prev,
              [stockCode]: candle.close,
            };
          });
        } catch (err) {
          console.error('내 투자 SSE 데이터 파싱 에러', err);
        }
      };

      eventSource.onerror = () => {
        console.error(`내 투자 SSE 연결이 끊어졌습니다. (${stockCode})`);
      };

      return eventSource;
    });

    return () => {
      eventSources.forEach((eventSource) => eventSource.close());
    };
  }, [portfolioStockCodesKey]);

  const handlePressedChange = (pressed: boolean) => {
    if (onExpandedChange) {
      onExpandedChange(pressed);
    } else {
      setLocalIsExpanded(pressed);
    }
  };

  const totalPurchaseAmount = accountData?.totalPurchaseAmount ?? 0;
  const realtimePortfolioValue = portfolios.reduce((sum, portfolio) => {
    const stockCode = portfolio.stockCode ?? '';
    const price = realtimePrices[stockCode] ?? portfolio.currentPrice ?? 0;
    const quantity = portfolio.quantity ?? 0;

    return sum + price * quantity;
  }, 0);
  const hasRealtimePortfolioValue = portfolios.length > 0;
  const totalAsset = hasRealtimePortfolioValue
    ? (accountData?.cashBalance ?? 0) + realtimePortfolioValue
    : (accountData?.totalAsset ?? 0);
  const totalProfitRate =
    totalPurchaseAmount > 0
      ? ((realtimePortfolioValue - totalPurchaseAmount) / totalPurchaseAmount) *
        100
      : (accountData?.totalProfitRate ?? 0);

  const formattedTotalPurchaseAmount = totalPurchaseAmount.toLocaleString();
  const formattedTotalAsset = totalAsset.toLocaleString();

  const isPositive = totalProfitRate > 0;
  const isNegative = totalProfitRate < 0;
  const formattedProfitRate = isPositive
    ? `+${totalProfitRate.toFixed(2)}%`
    : `${totalProfitRate.toFixed(2)}%`;

  const profitRateColorClass = isPositive
    ? 'text-text-up'
    : isNegative
      ? 'text-text-down'
      : '';

  return (
    <>
      <motion.div
        className='bg-secondary2 text-secondary1 flex flex-col gap-[0.5rem] rounded-[2.5rem] p-[1rem]'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BackButtonField color='secondary1' label='모의 투자' />

        <div className='flex items-start justify-between px-[1rem] pt-[1.25rem]'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='flex flex-col'
          >
            <div className='text-label-md font-extrabold'>내 투자</div>
            <div className='text-label-xl font-extrabold'>
              ₩ {formattedTotalPurchaseAmount}
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsHistoryOpen(true)}
            className='text-secondary1 mt-[0.25rem] flex items-center justify-center opacity-90 transition-opacity hover:opacity-100'
            aria-label='주문 내역 보기'
          >
            <ClockIcon />
          </motion.button>
        </div>

        <div className='flex px-[0.75rem] pt-[1rem]'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className='flex flex-col items-center justify-center'
          >
            <div className='text-label-sm font-extrabold'>총 자산</div>
            <div className='text-label-md font-extrabold'>
              ₩ {formattedTotalAsset}
            </div>
          </motion.div>
          <div className='bg-secondary1 mr-[3rem] ml-[1.75rem] h-[3.75rem] w-[1px]' />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className='flex flex-col items-center justify-center'
          >
            <div className='text-label-sm font-extrabold'>수익률</div>
            <div
              className={`text-label-md ${profitRateColorClass} font-extrabold`}
            >
              {formattedProfitRate}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='flex items-center justify-between px-[0.75rem] pt-[1.75rem] pb-[0.5rem]'
        >
          <div className='text-label-md font-extrabold'>내 기업</div>
          <motion.div whileTap={{ scale: 0.8 }}>
            <MyCompanyToggle
              isExpanded={isExpanded}
              onExpandedChange={handlePressedChange}
            />
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className='flex w-full flex-col items-center justify-center gap-[0.75rem] overflow-hidden pb-[0.5rem]'
            >
              {isPortfolioLoading ? (
                <div className='text-body-lg py-2 font-bold opacity-70'>
                  보유 종목을 불러오는 중입니다...
                </div>
              ) : portfolios.length === 0 ? (
                <div className='text-body-lg py-2 font-bold opacity-70'>
                  보유한 기업이 없습니다.
                </div>
              ) : (
                portfolios.map((portfolio) => (
                  <MyCompanyCard
                    key={portfolio.stockId}
                    stockId={portfolio.stockId}
                    stockCode={portfolio.stockCode}
                    stockName={portfolio.stockName}
                    quantity={portfolio.quantity}
                    totalEvaluationAmount={portfolio.evaluationAmount}
                    totalProfitAmount={portfolio.profitAmount}
                    totalProfitRate={portfolio.profitRate}
                  />
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <HistoryBottomSheet
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </>
  );
};

export default MockInvestmentHeader;
