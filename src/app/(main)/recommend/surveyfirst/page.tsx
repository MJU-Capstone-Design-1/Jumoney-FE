'use client';

import BackButtonField from '@/components/backButtonField';
import { SurveyDetailButton } from '@/components/surveyDetailButton';
import React, { useState } from 'react';
import { SurveyOption } from '@/features/recommend/survey/surveyFirstListGroup';
import BottomButton from '@/components/bottomButton';
import { SurveyStepper } from '@/components/surveyStepper';
import { motion } from 'framer-motion';
import { bottomSheetItems } from '@/constants/surveyFirstBottomsheetItems';
import Link from 'next/link';
import { useSurveyStore, SurveyPurpose } from '@/store/surveyStore';

const Page = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    '안정적인 자산 보호',
    '배당 수익',
    '자산의 꾸준한 성장',
    '시세 차익',
  ];

  return (
    <div className='flex w-full flex-col px-4 pt-4 pb-[10rem]'>
      <BackButtonField color='secondary2' label='오늘의 호주머니' />
      <SurveyStepper currentStep={1} totalSteps={3} />

      <div className='flex flex-col items-center gap-[4.125rem] pt-[2rem]'>
        <div className='flex flex-col gap-[1rem]'>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='text-label-lg flex text-center leading-[120%] font-extrabold'
          >
            당신의 투자 목적은
            <br />
            무엇인가요?
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
                시가총액, 배당률, EPS 등<br />
                기업의 펀더멘탈과 관련된 지표로 구성했어요.
                <br />
                투자자가 어떤 방식으로 수익을 창출하고 싶은지에 따라
                <br />
                재무제표 상의 본질적인 가치를 필터링해요.
              </p>
            </SurveyDetailButton>
          </motion.div>
        </div>

        <div className='flex w-full flex-col gap-[0.5rem]'>
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 1.0 + index * 0.1,
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              <SurveyOption
                label={option}
                isSelected={selectedOption === option}
                onClick={() =>
                  setSelectedOption(selectedOption === option ? null : option)
                }
                helpItems={bottomSheetItems[option]}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <Link
        href='/recommend/surveysecond'
        className={!selectedOption ? 'pointer-events-none' : ''}
        onClick={() => {
          if (selectedOption) {
            useSurveyStore
              .getState()
              .setPurpose(selectedOption as SurveyPurpose);
          }
        }}
      >
        <BottomButton label='다음으로' disabled={!selectedOption} />
      </Link>
    </div>
  );
};

export default Page;
