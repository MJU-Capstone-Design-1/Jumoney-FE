'use client';

import BackButtonField from '@/components/backButtonField';
import { SurveyDetailButton } from '@/components/surveyDetailButton';
import BottomButton from '@/components/bottomButton';
import { SurveyStepper } from '@/components/surveyStepper';
import { motion } from 'framer-motion';
import { SurveyThirdToggleGroup } from '@/features/recommend/survey/surveyThirdToggleGroup';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSurveyStore, SurveyPeriod } from '@/store/surveyStore';
import { getAllowedPeriods } from '@/constants/surveyConstraints';

const SUBTITLES: Record<string, string> = {
  초단기: '(1분/10분)',
  단기: '(5일 이동평균선 돌파)',
  중기: '(6개월~1년)',
  장기: '(3년 이상)',
};

const Page = () => {
  const [selectedValue, setSelectedValue] = useState<string>('장기');
  const [isEntered, setIsEntered] = useState(false);
  const { purpose, getRiskLabel } = useSurveyStore();
  const risk = getRiskLabel();
  const allowedPeriods = useMemo(
    () => getAllowedPeriods(purpose, risk),
    [purpose, risk],
  );
  const selectedPeriod = allowedPeriods.includes(selectedValue as SurveyPeriod)
    ? selectedValue
    : (allowedPeriods[0] ?? selectedValue);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntered(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='flex w-full flex-col px-4 pt-4 pb-[10rem]'>
      <BackButtonField color='secondary2' label='오늘의 호주머니' />
      <SurveyStepper currentStep={3} totalSteps={3} />

      <div className='flex flex-col items-center gap-[7.25rem] pt-[2rem]'>
        <div className='flex flex-col gap-[1rem]'>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='text-label-lg flex text-center leading-[120%] font-extrabold'
          >
            선호하는 투자 호흡(기간)은
            <br />
            어떻게 되나요?
          </motion.p>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.6,
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          >
            <SurveyDetailButton>
              <p className='text-center leading-[120%]'>
                투자 기간에 따라
                <br />
                주가를 움직이는 결정적인 요인이 달라져요.
                <br />
                선택하신 기간에 맞춰 가장 적합한 실시간 수급 흐름이나
                <br />
                재무 지표를 적용하여 우선순위를 결정할게요.
              </p>
            </SurveyDetailButton>
          </motion.div>
        </div>

        {/* Dynamic Text Section */}
        <div className='flex flex-col items-center'>
          <div className='flex flex-col items-center'>
            <motion.h2
              key={`title-${selectedPeriod}`}
              initial={{ opacity: 0, y: 20, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 17,
                delay: isEntered ? 0 : 1.0,
              }}
              className='text-heading-lg text-secondary2 font-extrabold'
            >
              {selectedPeriod}
            </motion.h2>
            <motion.p
              key={`sub-${selectedPeriod}`}
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 20,
                delay: isEntered ? 0.1 : 1.1,
              }}
              className='text-label-xl text-secondary2 -mt-[0.0625rem] text-center font-extrabold'
            >
              {SUBTITLES[selectedPeriod]}
            </motion.p>
          </div>

          <div className='mt-[4.625rem]'>
            <SurveyThirdToggleGroup
              value={selectedPeriod}
              onChange={setSelectedValue}
              allowedValues={allowedPeriods}
            />
          </div>
        </div>
      </div>

      <Link
        href={`/recommend/surveyloading`}
        className={allowedPeriods.length === 0 ? 'pointer-events-none' : ''}
        onClick={() => {
          useSurveyStore.getState().setPeriod(selectedPeriod as SurveyPeriod);
        }}
      >
        <BottomButton label='결과확인' disabled={allowedPeriods.length === 0} />
      </Link>
    </div>
  );
};

export default Page;
