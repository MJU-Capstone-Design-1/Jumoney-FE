'use client';

import BackButtonField from '@/components/backButtonField';
import BottomButton from '@/components/bottomButton';
import { RiskSelector } from '@/features/recommend/survey/riskSelector';
import { SurveyDetailButton } from '@/components/surveyDetailButton';
import { SurveyStepper } from '@/components/surveyStepper';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SurveySecondPage = () => {
  const router = useRouter();
  const [value, setValue] = useState<number>(0);
  return (
    <div className='flex w-full flex-col px-4 pt-4'>
      <BackButtonField
        color='secondary2'
        label='오늘의 호주머니'
        onClick={() => router.back()}
      />
      <SurveyStepper currentStep={2} totalSteps={3} />

      <div className='flex flex-col items-center gap-[4.875rem] pt-[2rem]'>
        <div className='flex flex-col gap-[1rem]'>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='text-label-lg flex text-center leading-[120%] font-extrabold'
          >
            어느 정도의 위험을
            <br />
            감수할 수 있나요?
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
                베타, 볼린저 밴드, 상대강도 등<br />
                주가의 성격 및 변동성과 관련된 지표로 구성했어요.
                <br />
                주가가 시장 변화에 얼마나 민감하게 반응하는지 결정해요.
              </p>
            </SurveyDetailButton>
          </motion.div>
        </div>

        <div className='flex w-full items-center justify-center'>
          <RiskSelector value={value} onChange={setValue} />
        </div>
      </div>

      <BottomButton label='다음으로' disabled={false} />
    </div>
  );
};

export default SurveySecondPage;
