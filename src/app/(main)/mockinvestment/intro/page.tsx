'use client';

import BackButtonField from '@/components/backButtonField';
import BottomButton from '@/components/bottomButton';
import { StepIndicator } from '@/features/mockinvestment/intro/stepIndicator';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FloatingLogoCircle } from '@/features/mockinvestment/intro/floatingLogoCircle';
import LeftChevronIcon from '@/components/icons/leftChevronIcon';
import RightChevronIcon from '@/components/icons/rightChevronIcon';
import Image from 'next/image';

const FIELDS = [
  { id: 'fieldIT', name: 'IT/반도체' },
  { id: 'fieldMobility', name: '자동차/운송' },
  { id: 'fieldFinance', name: '금융' },
  { id: 'fieldBio', name: '바이오/헬스케어' },
  { id: 'fieldSteel', name: '철강/소재' },
  { id: 'fieldEnergy', name: '에너지/화학' },
  { id: 'fieldCommunication', name: '커뮤니케이션' },
  { id: 'fieldStaples', name: '필수소비재' },
  { id: 'fieldMechanic', name: '조선/기계' },
  { id: 'fieldUtility', name: '건설/유틸리티' },
];

const MockInvestmentIntroPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const userName = '사용자';

  const bgColors: Record<number, string> = {
    1: 'bg-main1',
    2: 'bg-main2',
    3: 'bg-main3',
    4: 'bg-primary',
  };

  const handlePrevField = () => {
    setCurrentIndex((prev) => (prev === 0 ? FIELDS.length - 1 : prev - 1));
  };

  const handleNextField = () => {
    setCurrentIndex((prev) => (prev === FIELDS.length - 1 ? 0 : prev + 1));
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

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  return (
    <div
      className={`flex h-screen w-full flex-col px-4 pt-4 ${bgColors[step]}`}
    >
      <BackButtonField
        color='secondary1'
        label='모의 투자'
        onClick={handleBack}
      />

      <div className='text-secondary1 flex flex-grow flex-col items-center pt-[1rem] text-center'>
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
              className='text-label-md leading-[120%] font-semibold'
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
            <FloatingLogoCircle />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-body-lg mt-[2.375rem] font-semibold'
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
              className='text-label-xl text-secondary2 mb-[1rem] leading-[120%] font-extrabold'
            >
              {userName}님, 어떤 분야에
              <br />
              관심이 있나요?
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-label-md text-secondary2 mb-[2.75rem] leading-[120%] font-semibold'
            >
              관심있는 분야 하나만 선택해주세요.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='mb-[2.75rem] flex w-full items-center justify-center gap-[1rem]'
            >
              <button
                type='button'
                onClick={handlePrevField}
                aria-label='이전 분야'
              >
                <LeftChevronIcon />
              </button>
              <div className='flex h-[9.375rem] w-[9.375rem] items-center justify-center overflow-hidden'>
                <Image
                  src={`/images/${FIELDS[currentIndex].id}.svg`}
                  alt={FIELDS[currentIndex].name}
                  width={150}
                  height={150}
                  className='object-cover'
                />
              </div>
              <button
                type='button'
                onClick={handleNextField}
                aria-label='다음 분야'
              >
                <RightChevronIcon />
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-label-xl text-secondary2 font-extrabold'
            >
              {FIELDS[currentIndex].name}
            </motion.div>
          </>
        )}

        {step === 4 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-label-md mb-[1rem] leading-[120%] font-extrabold tracking-tight'
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
              className='text-body-lg font-semibold'
            >
              어제보다 +-OO.O% 올랐/내렸어요.
            </motion.div>
          </>
        )}
      </div>

      <div className='mt-auto flex flex-col items-center'>
        <motion.div
          key={`indicator-${step}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className='mb-[9.625rem]'
        >
          <StepIndicator step={step} />
        </motion.div>
        <BottomButton label={getButtonLabel()} onClick={handleNext} />
      </div>
    </div>
  );
};

export default MockInvestmentIntroPage;
