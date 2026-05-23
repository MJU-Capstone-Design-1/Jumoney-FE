'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Step0Card } from '@/features/intro/step0Card';
import { Step1Card } from '@/features/intro/step1Card';
import { Step2Card } from '@/features/intro/step2Card';
import { Step3Card } from '@/features/intro/step3Card';
import { StepIndicator } from '@/features/intro/stepIndicator';
import { IntroFooter } from '@/features/intro/introFooter';

const backgrounds = ['bg-primary', 'bg-main1', 'bg-main3', 'bg-main2'];

const stepVariants = {
  initial: {
    x: 80,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: -80,
    opacity: 0,
  },
};

const step0Variants = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    x: -80,
    opacity: 0,
  },
};

const stepTransition = {
  duration: 0.35,
  ease: 'easeInOut',
} as const;

const IntroPage = () => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  return (
    <div
      className={`${backgrounds[step]} flex flex-col transition-colors duration-800 ease-in-out`}
    >
      <div className='flex flex-col justify-center gap-[2.5rem] pt-[2.75rem] pb-[1.5rem]'>
        <StepIndicator step={step} />

        <AnimatePresence mode='wait'>
          {step === 0 && (
            <Step0Card
              key='step-0'
              variants={step0Variants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={stepTransition}
            />
          )}
          {step === 1 && (
            <Step1Card
              key='step-1'
              variants={stepVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={stepTransition}
            />
          )}
          {step === 2 && (
            <Step2Card
              key='step-2'
              variants={stepVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={stepTransition}
            />
          )}
          {step === 3 && (
            <Step3Card
              key='step-3'
              variants={stepVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={stepTransition}
            />
          )}
        </AnimatePresence>
      </div>

      <IntroFooter step={step} handleNext={handleNext} />
    </div>
  );
};

export default IntroPage;
