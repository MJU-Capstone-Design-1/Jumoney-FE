'use client';

import BackButtonField from '@/components/backButtonField';
import { CustomToggle } from '@/components/customToggle';
import { StockListSelectIcon } from '@/components/icons/stockListSelectIcon';
import { WheelSection } from '@/features/portfolio/detail/wheelSection';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MasterSectorChart } from '@/features/portfolio/detail/masterSectorChart';
import { MasterCompanyChart } from '@/features/portfolio/detail/masterCompanyChart';
import { useGetMasterPortfolioDescription } from '@/api/generated/endpoints/거장-정보/거장-정보';
import { MASTER_STOCK_LOGOS, getLogoSize } from '@/constants/portfolioLogos';
import { useSearchParams } from 'next/navigation';

interface PortfolioStock {
  stockName: string;
  sector: string;
  weight: number;
}

interface MasterPortfolioDescriptionResponse {
  data: {
    masterId: number;
    masterCode: string;
    masterName: string;
    basePeriod: string;
    representativeCase: {
      stockName: string;
      sector: string;
      investmentPeriod: string;
      investmentResult: string;
      title: string;
      description: string;
    };
    stocks: PortfolioStock[];
  };
}

const Page = () => {
  const [toggleValue, setToggleValue] = useState<'left' | 'right'>('left');
  const [isPrimaryMode, setIsPrimaryMode] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const searchParams = useSearchParams();
  const masterId = Number(searchParams.get('masterId')) || 1;

  const { data: descriptionResponse } =
    useGetMasterPortfolioDescription(masterId);
  const descriptionData = (
    descriptionResponse as unknown as MasterPortfolioDescriptionResponse
  )?.data;

  const representativeCase = descriptionData?.representativeCase;
  const stocks = descriptionData?.stocks || [];

  // 휠 위치에 따른 인덱스 계산 (-150도 ~ 120도, 30도 간격 = 10개)
  // 가장 가까운 인덱스로 매핑 (0 ~ stocks.length - 1)
  const snappedWheelRotation =
    Math.round((wheelRotation + dragOffset) / 30) * 30;
  const rawIndex = Math.round((snappedWheelRotation + 150) / 30);
  const selectedStockIndex = Math.min(
    Math.max(0, rawIndex),
    Math.max(0, stocks.length - 1),
  );
  const selectedStock = stocks[selectedStockIndex];

  useEffect(() => {
    Promise.resolve().then(() => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('mode') === 'reverse') {
          setIsPrimaryMode(true);
        }
      }
    });
  }, []);

  return (
    <div
      className={`${isPrimaryMode ? 'bg-primary' : 'bg-main1'} relative flex min-h-screen w-full flex-col items-center`}
    >
      <div
        onClick={() => setIsPrimaryMode(!isPrimaryMode)}
        className={`${isPrimaryMode ? 'bg-primaryMuted' : 'bg-sub1'} shadow-card-shadow mt-[2.75rem] h-[19.875rem] w-[21.5rem] cursor-pointer rounded-[2rem]`}
      />
      <div className='bg-background absolute inset-x-0 top-[4.25rem] z-10 flex h-full w-full flex-col gap-[2rem] rounded-[2rem] p-[1.5rem] text-center'>
        <div className='flex gap-[0.25rem]'>
          <BackButtonField />
          <CustomToggle
            size='normal'
            theme={isPrimaryMode ? 'reverse' : 'sub1'}
            leftTitle={isPrimaryMode ? '대표 투자 사례' : '분야별 차트'}
            rightTitle={isPrimaryMode ? '주식 리스트' : '투자 기업 비율'}
            value={toggleValue}
            onValueChange={setToggleValue}
          />
        </div>

        <div>
          {isPrimaryMode ? (
            toggleValue === 'left' ? (
              <div className='flex flex-col items-center gap-[1.5rem] pt-[1rem]'>
                <p className='text-heading-sm leading-[120%] font-extrabold'>
                  {representativeCase?.stockName || '종목명'}
                </p>
                <div className='bg-secondary1 flex h-[10rem] w-[10rem] items-center justify-center rounded-[2rem] text-center'>
                  {representativeCase?.stockName &&
                  MASTER_STOCK_LOGOS[representativeCase.stockName] ? (
                    <Image
                      src={MASTER_STOCK_LOGOS[representativeCase.stockName]}
                      alt={representativeCase.stockName}
                      width={120}
                      height={120}
                      className='h-[7.5rem] w-[7.5rem] object-contain'
                    />
                  ) : (
                    <span className='text-body-md font-bold'></span>
                  )}
                </div>

                <p className='text-body-xl relative z-10 text-center leading-[120%] font-semibold'>
                  {representativeCase?.description ||
                    '대표 투자 사례 설명이 없습니다.'}
                </p>

                <div className='flex flex-col gap-[0.5rem]'>
                  <div className='flex gap-[0.5rem]'>
                    <div className='border-secondary2 text-body-md rounded-[6.25rem] border px-[1rem] py-[0.75rem] leading-[120%] font-semibold'>
                      {representativeCase?.investmentPeriod || '기간'}
                    </div>
                    <div className='text-body-md bg-main3 rounded-[6.25rem] px-[1rem] py-[0.75rem] leading-[120%] font-semibold'>
                      {representativeCase?.investmentResult || '결과'}
                    </div>
                  </div>
                  <div className='flex gap-[0.5rem]'>
                    <div className='text-body-md bg-main1 rounded-[6.25rem] px-[1rem] py-[0.75rem] leading-[120%] font-semibold'>
                      {representativeCase?.title || '타이틀'}
                    </div>
                    <div className='text-body-md bg-primary text-secondary1 rounded-[6.25rem] px-[1rem] py-[0.75rem] leading-[120%] font-semibold'>
                      {representativeCase?.sector || '섹터'}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-col items-center gap-[1.5rem] pt-[1rem]'>
                <p className='text-heading-sm leading-[120%] font-extrabold'>
                  {selectedStock?.stockName || '종목 정보 없음'}
                </p>
                <div className='bg-default text-body-md flex h-[8.25rem] w-[8.25rem] items-center justify-center rounded-[2rem] text-center'>
                  {selectedStock?.stockName &&
                  MASTER_STOCK_LOGOS[selectedStock.stockName] ? (
                    <Image
                      src={MASTER_STOCK_LOGOS[selectedStock.stockName]}
                      alt={selectedStock.stockName}
                      width={getLogoSize(selectedStock.stockName).width}
                      height={getLogoSize(selectedStock.stockName).height}
                      className={getLogoSize(selectedStock.stockName).className}
                    />
                  ) : (
                    <span className='font-bold'></span>
                  )}
                </div>
                <div className='flex items-center justify-center gap-[1rem]'>
                  {selectedStock && (
                    <>
                      <div className='bg-field-it text-secondary1 text-body-lg rounded-[6.25rem] px-[1rem] py-[0.5rem] leading-[120%] font-bold'>
                        #{selectedStock.sector}
                      </div>
                      <div className='bg-primary text-secondary1 text-body-lg rounded-[6.25rem] px-[1rem] py-[0.5rem] leading-[120%] font-bold'>
                        #{selectedStock.weight}%
                      </div>
                    </>
                  )}
                </div>
                <div className='relative z-20 flex flex-col items-center'>
                  <StockListSelectIcon />
                </div>
                <motion.div
                  className='relative flex w-full touch-none justify-center select-none'
                  onPan={(e, info) => {
                    // 1px drag = 0.5도 회전
                    setDragOffset(info.offset.x * 0.5);
                  }}
                  onPanEnd={(e, info) => {
                    const finalRotation = wheelRotation + info.offset.x * 0.5;
                    // 30도 단위로 가장 가까운 곳으로 스냅
                    const snappedRotation = Math.round(finalRotation / 30) * 30;
                    // 왼쪽(-120도), 오른쪽(+150도) 제한 적용
                    const boundedRotation = Math.max(
                      -150,
                      Math.min(120, snappedRotation),
                    );
                    setWheelRotation(boundedRotation);
                    setDragOffset(0);
                  }}
                >
                  <div
                    className='absolute top-[4rem] left-[-1.5rem] z-40 h-[16rem] w-[5rem] cursor-pointer'
                    onClick={() =>
                      setWheelRotation((r) => Math.min(120, r + 30))
                    }
                  />
                  <div
                    className='absolute top-[4rem] right-[-1.5rem] z-40 h-[16rem] w-[5rem] cursor-pointer'
                    onClick={() =>
                      setWheelRotation((r) => Math.max(-150, r - 30))
                    }
                  />
                  <WheelSection
                    className='top-[-1rem] left-1/2 z-30 -translate-x-1/2'
                    rotation={wheelRotation + dragOffset}
                  />
                </motion.div>
              </div>
            )
          ) : toggleValue === 'left' ? (
            <div className='bg-secondary1 shadow-card-shadow flex h-[33.625rem] flex-col gap-[1rem] rounded-[1.5rem] p-[1rem]'>
              <div className='bg-default text-body-md flex h-[2rem] w-[3.625rem] items-center justify-center self-end rounded-[77.125rem] text-center font-semibold'>
                {descriptionData?.basePeriod?.split(' ')[0] || '2025년'}
              </div>
              <MasterSectorChart masterId={masterId} />
            </div>
          ) : (
            <div className='bg-secondary1 shadow-card-shadow flex h-[33.625rem] flex-col gap-[1rem] rounded-[1.5rem] p-[1rem]'>
              <div className='bg-default text-body-md flex h-[2rem] w-[3.625rem] items-center justify-center self-end rounded-[77.125rem] text-center font-semibold'>
                {descriptionData?.basePeriod?.split(' ')[0] || '2025년'}
              </div>
              <MasterCompanyChart masterId={masterId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
