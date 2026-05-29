'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButtonField from '@/components/backButtonField';
import { MyCompanyToggle } from './myCompanyToggle';
import { CompanyCard } from './companyCard';
import { MockInvestmentAccountResponse } from '@/api/generated/model';
import { useGetPortfolios } from '@/api/generated/endpoints/모의투자/모의투자';

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

  const { data: portfolioResponse, isLoading: isPortfolioLoading } =
    useGetPortfolios();
  const portfolios = portfolioResponse?.data?.portfolios || [];

  const handlePressedChange = (pressed: boolean) => {
    if (onExpandedChange) {
      onExpandedChange(pressed);
    } else {
      setLocalIsExpanded(pressed);
    }
  };

  const totalPurchaseAmount = accountData?.totalPurchaseAmount ?? 0;
  const totalAsset = accountData?.totalAsset ?? 0;
  const totalProfitRate = accountData?.totalProfitRate ?? 0;

  const formattedTotalPurchaseAmount = totalPurchaseAmount.toLocaleString();
  const formattedTotalAsset = totalAsset.toLocaleString();

  const isPositive = totalProfitRate > 0;
  const isNegative = totalProfitRate < 0;
  const formattedProfitRate = isPositive
    ? `+${totalProfitRate.toFixed(1)}%`
    : `${totalProfitRate.toFixed(1)}%`;

  const profitRateColorClass = isPositive
    ? 'text-text-up'
    : isNegative
      ? 'text-text-down'
      : '';

  return (
    <motion.div
      className='bg-secondary2 text-secondary1 flex flex-col gap-[0.5rem] rounded-[2.5rem] p-[1rem]'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BackButtonField color='secondary1' label='모의 투자' />

      <div className='flex flex-col px-[1rem] pt-[1.25rem]'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className='text-label-md font-extrabold'>내 투자</div>
          <div className='text-label-xl font-extrabold'>
            ₩ {formattedTotalPurchaseAmount}
          </div>
        </motion.div>
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
                <CompanyCard
                  key={portfolio.stockId}
                  showBadge={false}
                  stockId={portfolio.stockId}
                  stockCode={portfolio.stockCode}
                  stockName={portfolio.stockName}
                  currentPrice={portfolio.currentPrice}
                  changeRate={portfolio.changeRate}
                />
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MockInvestmentHeader;
