'use client';

import Image from 'next/image';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useGetStockDetail } from '@/api/generated/endpoints/모의투자/모의투자';

interface IndicatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockCode: string;
}

const formatCurrency = (value?: number) => {
  if (value === undefined || value === null) return '-';
  if (value === 0) return '0원';

  const isNegative = value < 0;
  const absValue = Math.abs(value);

  let result = '';
  const trillion = Math.floor(absValue / 1000000000000);
  const hundredMillion = Math.floor((absValue % 1000000000000) / 100000000);
  const tenThousand = Math.floor((absValue % 100000000) / 10000);
  const remainder = absValue % 10000;

  if (trillion > 0) result += `${trillion.toLocaleString()}조 `;
  if (hundredMillion > 0) result += `${hundredMillion.toLocaleString()}억 `;
  if (tenThousand > 0) result += `${tenThousand.toLocaleString()}만 `;
  if (remainder > 0) result += `${remainder.toLocaleString()}`;

  return (isNegative ? '-' : '') + result.trim() + '원';
};

const formatCurrencyFromHundredMillion = (value?: number) => {
  if (value === undefined || value === null) return '-';
  return formatCurrency(value * 100000000);
};

const formatPercent = (value?: number) =>
  value !== undefined && value !== null
    ? `${value.toLocaleString('ko-KR', { maximumFractionDigits: 10 })}%`
    : '-';

const formatNumber = (value?: number) =>
  value !== undefined && value !== null
    ? value.toLocaleString('ko-KR', { maximumFractionDigits: 10 })
    : '-';

export default function IndicatorModal({
  isOpen,
  onClose,
  stockCode,
}: IndicatorModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const { data: response } = useGetStockDetail(stockCode, {
    query: {
      enabled: isOpen && Boolean(stockCode),
    },
  });

  const stockData = response?.data;
  const { price, investmentMetrics, financialMetrics } = stockData || {};

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-20 flex items-center justify-center bg-black/60 px-[1.375rem]'
          onClick={onClose}
          style={{ height: '100dvh' }}
        >
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 20,
            }}
            className='relative flex h-[80vh] max-h-[640px] w-full max-w-[20.625rem] flex-col items-center'
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src='/images/modal.svg'
              alt='조건 설명 배경'
              fill
              priority
              className='object-contain'
            />

            <div className='relative flex h-full w-full flex-col px-[1.75rem] pt-[3.75rem] pb-[3.75rem]'>
              <div className='min-h-0 flex-1 overflow-y-auto'>
                <div className='flex w-full flex-col gap-[1rem]'>
                  <div className='flex items-center gap-[0.5rem]'>
                    <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                    <span className='text-body-lg text-secondary2 font-bold'>
                      시가총액:{' '}
                      {formatCurrencyFromHundredMillion(price?.marketCap)}
                    </span>
                  </div>
                  <div className='flex items-center gap-[0.5rem]'>
                    <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                    <span className='text-body-lg text-secondary2 font-bold'>
                      거래대금: {formatCurrency(price?.accumulatedTradeAmount)}
                    </span>
                  </div>
                  <div className='flex items-center gap-[0.5rem]'>
                    <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                    <span className='text-body-lg text-secondary2 font-bold'>
                      PBR: {formatNumber(investmentMetrics?.pbr)}
                    </span>
                  </div>
                  <div className='flex items-center gap-[0.5rem]'>
                    <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                    <span className='text-body-lg text-secondary2 font-bold'>
                      PER: {formatNumber(investmentMetrics?.per)}
                    </span>
                  </div>
                  <div className='flex items-center gap-[0.5rem]'>
                    <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                    <span className='text-body-lg text-secondary2 font-bold'>
                      ROE: {formatNumber(investmentMetrics?.roe)}
                    </span>
                  </div>
                  <div className='flex items-center gap-[0.5rem]'>
                    <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                    <span className='text-body-lg text-secondary2 font-bold'>
                      배당수익률:{' '}
                      {formatPercent(investmentMetrics?.dividendYield)}
                    </span>
                  </div>
                  <div className='flex items-center gap-[0.5rem]'>
                    <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                    <span className='text-body-lg text-secondary2 font-bold'>
                      배당성향: {formatPercent(investmentMetrics?.payoutRatio)}
                    </span>
                  </div>
                  <div className='flex items-center gap-[0.5rem]'>
                    <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                    <span className='text-body-lg text-secondary2 font-bold'>
                      체결강도:{' '}
                      {formatNumber(investmentMetrics?.executionStrength)}
                    </span>
                  </div>
                  <div className='flex items-center gap-[0.5rem]'>
                    <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                    <span className='text-body-lg text-secondary2 font-bold'>
                      기관 순매수:{' '}
                      {formatNumber(investmentMetrics?.instNetBuy20Days)}주
                    </span>
                  </div>
                  <div className='flex items-center gap-[0.5rem]'>
                    <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                    <span className='text-body-lg text-secondary2 font-bold'>
                      매출:{' '}
                      {formatCurrencyFromHundredMillion(
                        financialMetrics?.sales,
                      )}
                    </span>
                  </div>
                  <div className='flex items-center gap-[0.5rem]'>
                    <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                    <span className='text-body-lg text-secondary2 font-bold'>
                      영업이익:{' '}
                      {formatCurrencyFromHundredMillion(
                        financialMetrics?.operatingProfit,
                      )}
                    </span>
                  </div>
                  <div className='flex items-center gap-[0.5rem]'>
                    <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                    <span className='text-body-lg text-secondary2 font-bold'>
                      부채비율: {formatPercent(financialMetrics?.debtRatio)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
