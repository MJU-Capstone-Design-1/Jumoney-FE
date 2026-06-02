'use client';

import { useEffect, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';

import BackButtonField from '@/components/backButtonField';
import type { MasterChoiceRequest } from '@/api/generated/model';
import { useBacktestMaster } from '@/api/generated/endpoints/거장의-선택/거장의-선택';
import CompanyLineChart from '@/features/mockinvestment/companyinfo/companyLineChart';
import { masterCodeLabels } from '@/constants/labelMappings';

const MASTER_ID_MAP: Record<string, number> = {
  buffett: 1,
  warren_buffett: 1,
  lynch: 2,
  peter_lynch: 2,
  dalio: 3,
  ray_dalio: 3,
  oneil: 4,
  william_oneil: 4,
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

interface VerifyBacktestClientProps {
  masterId: string;
  stockCode: string;
  stockName?: string;
  optionIds?: string;
  sectors?: string;
}

const parseNumberList = (value?: string) => {
  if (!value) return [];

  return value
    .split(',')
    .map((item) => Number(item))
    .filter((item) => Number.isFinite(item));
};

const parseStringList = (value?: string) => {
  if (!value) return [];

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const getMasterIdNumber = (masterId: string) => {
  const normalizedMasterId = decodeURIComponent(masterId)
    .trim()
    .toLowerCase()
    .replaceAll('-', '_')
    .replaceAll(' ', '_');
  const numericMasterId = Number(normalizedMasterId);

  if (Number.isFinite(numericMasterId) && numericMasterId > 0) {
    return numericMasterId;
  }

  return MASTER_ID_MAP[normalizedMasterId] ?? null;
};

export default function VerifyBacktestClient({
  masterId,
  stockCode,
  stockName,
  optionIds,
  sectors,
}: VerifyBacktestClientProps) {
  const masterIdNumber = getMasterIdNumber(masterId);
  const selectedOptionIds = useMemo(
    () => parseNumberList(optionIds),
    [optionIds],
  );
  const selectedSectorTypes = useMemo(
    () => parseStringList(sectors),
    [sectors],
  );
  const requestBody = useMemo<MasterChoiceRequest>(
    () => ({
      selectedOptionIds,
      ...(selectedSectorTypes.length > 0
        ? {
            sectorTypes:
              selectedSectorTypes as MasterChoiceRequest['sectorTypes'],
          }
        : {}),
    }),
    [selectedOptionIds, selectedSectorTypes],
  );
  const backtestRequestKey = useMemo(() => {
    if (masterIdNumber === null || !stockCode) return null;

    return JSON.stringify({
      masterId: masterIdNumber,
      stockCode,
      requestBody,
    });
  }, [masterIdNumber, requestBody, stockCode]);

  const {
    mutate: backtestMaster,
    data: backtestResponse,
    isPending: isBacktestLoading,
    isError: isBacktestError,
    status: backtestStatus,
  } = useBacktestMaster();

  useEffect(() => {
    if (masterIdNumber === null || !stockCode || !backtestRequestKey) return;

    backtestMaster({
      masterId: masterIdNumber,
      stockCode,
      data: requestBody,
    });
  }, [
    backtestMaster,
    backtestRequestKey,
    masterIdNumber,
    requestBody,
    stockCode,
  ]);

  const backtestData = backtestResponse?.data;
  const isBacktestRequestReady = masterIdNumber !== null && Boolean(stockCode);
  const isBacktestIdle = backtestStatus === 'idle';
  const displayStockName =
    stockName || backtestData?.stockCode || '선택한 기업';
  const displayMasterName = backtestData?.masterCode
    ? masterCodeLabels[backtestData.masterCode]
    : '선택한 거장';

  return (
    <motion.div
      className='flex w-full flex-col px-4 pt-4'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <BackButtonField color='secondary2' label='과거 지표 검증하기' />

      <motion.div
        variants={itemVariants}
        className='flex flex-col items-center justify-center pt-[1.75rem]'
      >
        <div className='text-secondary2 text-label-xl text-center leading-[120%] font-semibold break-keep'>
          <span className='font-extrabold'>{displayStockName}</span>의 작년 한
          해
          <br />
          데이터를 분석했어요
        </div>

        <div className='text-body-xl text-text-main pt-[0.5rem] text-center font-semibold break-keep'>
          주머니의 알고리즘이 포착한
          <br />
          <span className='font-extrabold'>최적의 투자 타이밍</span>을 한눈에
          보여드려요.
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className='pt-[2rem]'>
        {!isBacktestRequestReady ? (
          <div className='text-body-lg text-text-sub flex h-[228px] items-center justify-center text-center font-bold'>
            검증에 필요한 정보를 찾지 못했어요.
          </div>
        ) : isBacktestIdle || isBacktestLoading ? (
          <div className='text-body-lg text-secondary2 flex h-[228px] items-center justify-center font-bold'>
            데이터를 분석하고 있어요...
          </div>
        ) : isBacktestError || !backtestData?.toDate ? (
          <div className='text-body-lg text-text-sub flex h-[228px] items-center justify-center text-center font-bold'>
            검증 데이터를 불러오지 못했어요.
          </div>
        ) : (
          <CompanyLineChart
            stockCode={stockCode}
            period='1y'
            date={backtestData.toDate}
            verificationResults={backtestData.dailyResults}
            enabled={Boolean(backtestData.toDate)}
          />
        )}

        <div className='text-body-md text-text-main pt-[0.75rem] text-center leading-[140%] font-semibold break-keep'>
          <span className='font-extrabold'>{displayMasterName}</span>의 투자
          조건을 해당 일에 만족했는지로 색을 나눠요
          <br />
          조건에 맞은 날은{' '}
          <span className='text-text-up font-extrabold'>빨간색</span>, 맞지 않는
          날은 <span className='text-text-down font-extrabold'>파란색</span>
          으로 보여드릴게요.
        </div>
      </motion.div>
    </motion.div>
  );
}
