'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STEPS } from '@/features/intro/introComment';
import { KakaoLoginButton } from '@/components/kakaoLoginButton';
import { IntroStepButton } from './introStepButton';

interface IntroFooterProps {
  step: number;
  handleNext: () => void;
}

const popContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.3,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
} as const;

const popChildVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 22,
    },
  },
  exit: {
    scale: 1.0,
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
} as const;

export const IntroFooter = ({ step, handleNext }: IntroFooterProps) => {
  const handleKakaoLogin = () => {
    const KAKAO_CLIENT_ID = 'e2f4eba4a68c8ff2f5b4e804b7f97e11';
    const origin =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost:3000';

    const redirectUri = `${origin}/oauth/kakao/callback`;

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className='bg-secondary1 shadow-card-shadow relative left-1/2 flex h-[60rem] w-[60rem] -translate-x-1/2 flex-col items-center gap-[1rem] rounded-[77.125rem] pt-[2.25rem]'>
      <div className='flex flex-col items-center justify-center gap-[1.5rem] pt-[1.875rem]'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={step}
            variants={popContainerVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='flex flex-col items-center gap-[1.5rem]'
          >
            <motion.div
              variants={popChildVariants}
              className={`${STEPS[step].badgeBg} text-body-md flex h-[2rem] w-[4.25rem] items-center justify-center rounded-[6.25rem] text-center leading-[120%] font-extrabold`}
            >
              {STEPS[step].stepLabel}
            </motion.div>
            <motion.div
              variants={popChildVariants}
              className='text-label-lg text-center leading-[120%] font-extrabold'
            >
              {STEPS[step].description}
            </motion.div>
          </motion.div>
        </AnimatePresence>
        {step === 3 ? (
          <motion.div
            className='w-[20.5rem]'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 22,
            }}
          >
            <KakaoLoginButton onClick={handleKakaoLogin} />
          </motion.div>
        ) : (
          <IntroStepButton onClick={handleNext} />
        )}
      </div>
    </div>
  );
};
