'use client';

import BackButtonField from '@/components/backButtonField';
import BottomButton from '@/components/bottomButton';
import LeftArrowIcon from '@/components/icons/leftArrowIcon';
import { StepIndicator } from '@/features/mockinvestment/intro/stepIndicator';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { RightArrowIcon } from '@/components/icons/rightArrowIcon';

const MockInvestmentIntroPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [interest, setInterest] = useState('');
  const userName = '사용자';

  const bgColors: Record<number, string> = {
    1: 'bg-main1',
    2: 'bg-main2',
    3: 'bg-main3',
    4: 'bg-primary',
  };

  const getButtonLabel = () => {
    if (step === 3) return '선택하기';
    if (step === 4) return '시작하기';
    return '다음으로';
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      router.push('/mockinvestment');
    }
  };

  return (
    <div
      className={`flex h-screen w-full flex-col px-4 pt-4 ${bgColors[step]}`}
    >
      <BackButtonField color='secondary1' label='모의 투자' />

      <div className='text-secondary1 flex flex-col items-center pt-[1rem] text-center'>
        {step === 1 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-label-xl mb-[3rem] pt-[0.5rem] leading-[120%] font-extrabold'
            >
              {userName}님<br />
              환영합니다!
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className='bg-sub1 mx-auto mb-[3rem] flex h-[10rem] w-[10rem] items-center rounded-full' />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-label-md mb-[1.75rem] leading-[120%] font-semibold'
            >
              설명설명설명설명설명설명설명설명
              <br />
              설명설명설명설명설명설명설명
            </motion.div>
          </>
        )}

        {step === 2 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-label-xl mb-[1rem] leading-[120%] font-extrabold tracking-tight'
            >
              10,000,000 ₩ 지급 완료!
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-label-md mb-[1.5rem] leading-[120%] font-semibold'
            >
              주머니가 {userName}님께 드리는
              <br />
              가상의 돈으로 주식을 경험해보세요
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='bg-sub2 mx-auto mb-[3rem] flex h-[10rem] w-[10rem] items-center'
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-body-lg mb-[0.75rem] font-semibold'
            >
              실제 돈이 아닌 가상 모의투자를 위한 돈이에요.
            </motion.div>
          </>
        )}

        {step === 3 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-label-xl mb-[1rem] leading-[120%] font-extrabold'
            >
              {userName}님, 어떤 분야에
              <br />
              관심이 있나요?
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-label-md mb-[2.75rem] leading-[120%] font-semibold'
            >
              관심있는 분야 하나만 선택해주세요.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='mb-[2.75rem] flex w-full items-center justify-center gap-[1rem]'
            >
              <button type='button' aria-label='이전 분야'>
                <LeftArrowIcon />
              </button>
              <div className='bg-main4 flex h-[9.375rem] w-[9.375rem] items-center justify-center rounded-full' />
              <button type='button' aria-label='다음 분야'>
                <RightArrowIcon />
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-label-xl mb-[1.4375rem] font-extrabold'
            >
              IT/반도체
            </motion.div>
          </>
        )}

        {step === 4 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-label-md mb-[1rem] leading-[120%] font-extrabold'
            >
              OO(분야)에 관심이 있는 {userName}님,
              <br />
              OO(기업)에 투자해보는 것은 어떨까요?
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-body-xl mb-[2rem] leading-[120%] font-semibold'
            >
              주머니가 지급한 모의투자금으로
              <br />
              가상의 주식을 구매해보세요.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='bg-primaryMuted mx-auto mb-[2.25rem] flex h-[10rem] w-[10rem] items-center rounded-full'
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-label-xl mb-[0.5rem] font-extrabold'
            >
              기업명기업명
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-body-lg mb-[0.4375rem] font-semibold'
            >
              어제보다 +-OO.O% 올랐/내렸어요.
            </motion.div>
          </>
        )}

        <motion.div
          key={`indicator-${step}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <StepIndicator step={step} />
        </motion.div>
      </div>

      <BottomButton
        label={getButtonLabel()}
        onClick={handleNext}
        //disabled={step === 3 && !interest}
      />
    </div>
  );
};

export default MockInvestmentIntroPage;
