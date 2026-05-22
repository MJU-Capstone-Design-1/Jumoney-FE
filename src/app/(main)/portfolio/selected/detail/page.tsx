'use client';

import BackButtonField from '@/components/backButtonField';
import { CustomToggle } from '@/components/customToggle';
import { StockListSelectIcon } from '@/components/icons/stockListSelectIcon';
import { WheelSection } from '@/features/portfolio/detail/wheelSection';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Page = () => {
  const [toggleValue, setToggleValue] = useState<'left' | 'right'>('left');
  const [isPrimaryMode, setIsPrimaryMode] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

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
                  코카콜라
                </p>
                <div className='bg-secondary1 flex h-[10rem] w-[10rem] items-center justify-center text-center'>
                  기업 로고
                </div>

                <Image
                  src='/images/portfolioSuccessStoryBubble.svg'
                  alt='투자 성공 사례 말풍선'
                  width={302}
                  height={166}
                  className='absolute inset-0 mx-auto shrink-0 pt-[24.625rem]'
                />

                <p className='text-body-xl relative z-10 mt-[2.125rem] text-center leading-[120%] font-semibold'>
                  1987년 블랙 먼데이 대폭락 이후 <br />
                  시장에 공포가 가득했던 시기였으나 <br /> 버핏은 강력한 브랜드
                  파워와
                  <br />
                  변하지 않는 소비 패턴에 주목하여 <br />
                  과감하게 집중 투자를 단행했어요
                </p>

                <div className='flex flex-col gap-[0.5rem] pt-[2.25rem]'>
                  <div className='flex gap-[0.5rem]'>
                    <div className='border-secondary2 body-md rounded-[6.25rem] border px-[1rem] py-[0.75rem] leading-[120%] font-semibold'>
                      1988년
                    </div>
                    <div className='body-md bg-main3 rounded-[6.25rem] px-[1rem] py-[0.75rem] leading-[120%] font-semibold'>
                      보유 10년 만에 약 10배 상승
                    </div>
                  </div>
                  <div className='flex gap-[0.5rem]'>
                    <div className='body-md bg-main1 rounded-[6.25rem] px-[1rem] py-[0.75rem] leading-[120%] font-semibold'>
                      가치 투자 및 장기 보유의 정석
                    </div>
                    <div className='body-md bg-primary text-secondary1 rounded-[6.25rem] px-[1rem] py-[0.75rem] leading-[120%] font-semibold'>
                      필수 소비재
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-col items-center gap-[1.5rem] pt-[1rem]'>
                <p className='text-heading-sm leading-[120%] font-extrabold'>
                  애플
                </p>
                <div className='bg-default text-body-md flex h-[8.25rem] w-[8.25rem] items-center justify-center text-center'>
                  로고
                </div>
                <div className='flex items-center justify-center gap-[1rem]'>
                  <div className='bg-field-it text-secondary1 text-body-lg rounded-[6.25rem] px-[1rem] py-[0.5rem] leading-[120%] font-bold'>
                    #정보기술
                  </div>
                  <div className='bg-primary text-secondary1 text-body-lg rounded-[6.25rem] px-[1rem] py-[0.5rem] leading-[120%] font-bold'>
                    #41.5%
                  </div>
                </div>
                <div className='relative z-20 mt-[1rem] flex flex-col items-center'>
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
                2025년
              </div>
              <div className='bg-default'>분야별 차트 영역</div>
            </div>
          ) : (
            <div className='bg-secondary1 shadow-card-shadow flex h-[33.625rem] flex-col gap-[1rem] rounded-[1.5rem] p-[1rem]'>
              <div className='bg-default text-body-md flex h-[2rem] w-[3.625rem] items-center justify-center self-end rounded-[77.125rem] text-center font-semibold'>
                2025년
              </div>
              <div className='bg-default'>투자 기업 비율 영역</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
