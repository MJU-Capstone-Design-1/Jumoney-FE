'use client';

import BackButtonField from '@/components/backButtonField';
import { motion } from 'framer-motion';
import { useGetMasterChoiceAccount } from '@/api/generated/endpoints/검증용-모의-운용/검증용-모의-운용';
import Image from 'next/image';
import { VerifiedOperationHoldingResponse } from '@/api/generated/model';
import React from 'react';

export type MasterCode =
  | 'WARREN_BUFFETT'
  | 'PETER_LYNCH'
  | 'RAY_DALIO'
  | 'WILLIAM_ONEIL';

const MASTER_THEME: Record<MasterCode, { bg: string; name: string }> = {
  WARREN_BUFFETT: { bg: 'bg-main1', name: '워런 버핏' },
  PETER_LYNCH: { bg: 'bg-main2', name: '피터 린치' },
  RAY_DALIO: { bg: 'bg-main3', name: '레이 달리오' },
  WILLIAM_ONEIL: { bg: 'bg-main4', name: '윌리엄 오닐' },
};

const MASTER_CODE_MAP: Record<string, MasterCode> = {
  buffett: 'WARREN_BUFFETT',
  lynch: 'PETER_LYNCH',
  dalio: 'RAY_DALIO',
  oneil: 'WILLIAM_ONEIL',
};

interface ConditionType {
  code?: string;
  label?: string;
}

const formatMoney = (amount?: number) => {
  if (amount === undefined || amount === null) return '0';
  return Math.round(amount).toLocaleString();
};

const formatProfit = (amount?: number) => {
  if (!amount) return { text: '₩ 0', color: 'text-text-main', sign: '' };

  const isPositive = amount > 0;
  const isNegative = amount < 0;
  const signStr = isPositive ? '+ ' : isNegative ? '- ' : '';
  const color = isPositive
    ? 'text-text-up'
    : isNegative
      ? 'text-text-down'
      : 'text-text-main';

  return {
    text: `${signStr}₩ ${Math.round(Math.abs(amount)).toLocaleString()}`,
    color,
    sign: isPositive ? '+' : isNegative ? '-' : '',
  };
};

const formatRate = (rate?: number) => {
  if (rate === undefined || rate === null)
    return { text: '0.00%', color: 'text-text-main', sign: '' };

  const isPositive = rate > 0;
  const isNegative = rate < 0;
  const signStr = isPositive ? '+' : isNegative ? '-' : '';
  const color = isPositive
    ? 'text-text-up'
    : isNegative
      ? 'text-text-down'
      : 'text-text-main';

  return {
    text: `${signStr}${Math.abs(rate).toFixed(2)}%`,
    color,
    sign: isPositive ? '+' : isNegative ? '-' : '',
  };
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '-';
  return dateStr.substring(0, 10).replace(/-/g, '.');
};

export default function MasterTestAccountPage({
  params,
}: {
  params: Promise<{ masterId: string }>;
}) {
  const resolvedParams = React.use(params);
  const currentKey = resolvedParams.masterId;
  const masterCode =
    MASTER_CODE_MAP[currentKey.toLowerCase()] || 'WARREN_BUFFETT';

  const theme = MASTER_THEME[masterCode] || MASTER_THEME.WARREN_BUFFETT;

  const { data: responseData, isLoading } =
    useGetMasterChoiceAccount(masterCode);

  const account = responseData?.data?.account;
  const operationDescription =
    responseData?.data?.operationDescription || '데이터를 불러오는 중입니다.';

  return (
    <div
      className={`flex h-[100dvh] w-full flex-col overflow-hidden pt-[2.75rem] ${theme.bg}`}
    >
      <div className='bg-background shadow-card-shadow relative z-10 flex w-full flex-1 flex-col overflow-hidden rounded-t-[2rem] rounded-b-none px-[1.5rem] py-[1.5rem]'>
        <div className='mb-[1.25rem] shrink-0'>
          <BackButtonField color='secondary2' label='모의 운용 계정' />
        </div>

        {isLoading ? (
          <div className='text-body-md text-text-main flex flex-1 items-center justify-center font-semibold'>
            로딩 중...
          </div>
        ) : !account ? (
          <div className='text-body-md text-text-main flex flex-1 items-center justify-center font-semibold'>
            계정 정보가 없습니다.
          </div>
        ) : (
          <div className='flex-1 overflow-y-auto'>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className='text-body-md text-text-main text-center leading-[120%] font-semibold'
              dangerouslySetInnerHTML={{
                __html: operationDescription.replace(/\n/g, '<br />'),
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className='mt-[2rem] text-center'
            >
              <div className='text-label-xl mt-[1.25rem] mb-[1.25rem] font-extrabold'>
                {theme.name}
              </div>
              <div className='text-body-md flex flex-wrap justify-center gap-[0.4375rem] font-semibold'>
                {account.usedConditions?.map(
                  (condition: ConditionType, idx: number) => (
                    <span
                      key={condition.code || idx}
                      className={`text-secondary1 rounded-full px-[0.8125rem] py-[0.75rem] ${theme.bg}`}
                    >
                      {condition.label}
                    </span>
                  ),
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className='mt-[1.75rem] flex flex-col px-[0.5rem]'
            >
              <div
                className={`my-[1rem] h-[0.375rem] w-full rounded-full ${theme.bg}`}
              />
              <div className='text-label-sm flex flex-col gap-1 font-bold'>
                <div className='flex justify-between'>
                  <span>총 매수 금액</span>
                  <span>₩ {formatMoney(account.totalPurchaseAmount)}</span>
                </div>
                <div className='flex justify-between'>
                  <span>총 평가 금액</span>
                  <span>₩ {formatMoney(account.totalEvaluationAmount)}</span>
                </div>
                <div
                  className={`my-[1rem] h-[0.375rem] w-full rounded-full ${theme.bg}`}
                />
                <div className='flex justify-between'>
                  <span>운용 손익</span>
                  <span
                    className={formatProfit(account.totalProfitAmount).color}
                  >
                    {formatProfit(account.totalProfitAmount).text}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span>운용 수익률</span>
                  <span className={formatRate(account.totalProfitRate).color}>
                    {formatRate(account.totalProfitRate).text}
                  </span>
                </div>
                <div
                  className={`my-[1rem] h-[0.375rem] w-full rounded-full ${theme.bg}`}
                />
                <div className='flex justify-between'>
                  <span>최근 거래일</span>
                  <span>{formatDate(account.lastTradedAt)}</span>
                </div>

                <div className='mb-[1.25rem] flex items-center justify-center px-[0.5rem] pt-[1.25rem]'>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className='flex flex-col items-center justify-center'
                  >
                    <div className='text-label-sm font-extrabold'>총 자산</div>
                    <div className='text-label-md font-extrabold'>
                      ₩ {formatMoney(account.totalAsset)}
                    </div>
                  </motion.div>
                  <div className='bg-secondary2 mr-[2.625rem] ml-[1.5rem] h-[3.75rem] w-[1px]' />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className='flex flex-col items-center justify-center'
                  >
                    <div className='text-label-sm font-extrabold'>
                      총 수익률
                    </div>
                    <div
                      className={`text-label-md font-extrabold ${formatRate(account.totalProfitRate).color}`}
                    >
                      {formatRate(account.totalProfitRate).text}
                    </div>
                  </motion.div>
                </div>

                <div className='flex flex-col gap-[1rem] pb-[2rem]'>
                  {account.holdings?.map(
                    (
                      holding: VerifiedOperationHoldingResponse,
                      index: number,
                    ) => {
                      const holdingProfitInfo = formatProfit(
                        holding.profitAmount,
                      );
                      const holdingRateInfo = formatRate(holding.profitRate);

                      return (
                        <motion.div
                          key={`holding-${holding.stockId}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.6 + index * 0.1,
                            duration: 0.4,
                          }}
                          className='bg-secondary1 shadow-card-shadow flex w-full flex-col gap-[1rem] rounded-[2rem] px-[1.5rem] py-[1rem] text-left'
                        >
                          <div className='flex w-full items-start justify-between'>
                            <div className='flex min-w-0 items-center gap-[0.5rem]'>
                              <div className='bg-background flex h-[3rem] w-[3rem] flex-shrink-0 items-center justify-center overflow-hidden rounded-full'>
                                <Image
                                  src={`/logos/${holding.stockCode}.png`}
                                  alt={`${holding.stockName} 로고`}
                                  width={48}
                                  height={48}
                                  unoptimized={true}
                                  className='object-cover'
                                />
                              </div>
                              <div className='flex flex-col gap-[0.375rem]'>
                                <div className='flex gap-[0.25rem]'>
                                  <div className='text-secondary2 text-body-xl truncate font-extrabold'>
                                    {holding.stockName}
                                  </div>
                                  <div className='text-text-main text-body-md mt-[0.1875rem] font-bold'>
                                    ·{holding.quantity}주
                                  </div>
                                  <div className='text-main2 bg-default text-body-sm mb-[0.125rem] ml-[0.5rem] flex h-[1.625rem] items-center justify-center rounded-[6.25rem] px-[0.75rem] font-bold whitespace-nowrap'>
                                    #{holding.sectorName}
                                  </div>
                                </div>
                                <div className='flex gap-[0.5rem]'>
                                  <div className='text-body-sm text-text-main font-semibold'>
                                    현재가: ₩{' '}
                                    {formatMoney(holding.currentPrice)}{' '}
                                  </div>
                                  <div className='text-body-sm text-text-main font-semibold'>
                                    평균 매수가: ₩{' '}
                                    {formatMoney(holding.averagePurchasePrice)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='flex items-center gap-[0.5rem]'>
                            <div className='text-body-md flex items-center gap-[0.25rem] font-extrabold'>
                              <span className='text-secondary2'>
                                ₩ {formatMoney(holding.evaluationAmount)}
                              </span>
                              <span className={holdingRateInfo.color}>
                                ({holdingRateInfo.text}{' '}
                                {holdingRateInfo.sign === '+'
                                  ? '▲'
                                  : holdingRateInfo.sign === '-'
                                    ? '▼'
                                    : ''}
                                )
                              </span>
                            </div>
                            <div className='bg-secondary2 flex h-[0.75rem] w-[0.0625rem]' />
                            <p
                              className={`text-body-md font-semibold ${holdingProfitInfo.color}`}
                            >
                              {holdingProfitInfo.text}
                            </p>
                          </div>
                        </motion.div>
                      );
                    },
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
