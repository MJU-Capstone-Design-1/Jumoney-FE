import { useEffect, useState } from 'react';
import { StepIcon, StepColor } from '@/components/icons/stepIcon';
import { motion } from 'framer-motion';
import Image from 'next/image';

const STEP_CURVES_MAP: Record<number, React.ReactNode> = {
  1: <Image src='/images/step1.svg' alt='step 1' width={359} height={102} />,
  2: <Image src='/images/step2.svg' alt='step 2' width={359} height={102} />,
  3: <Image src='/images/step3.svg' alt='step 3' width={359} height={102} />,
  4: <Image src='/images/step4.svg' alt='step 4' width={359} height={102} />,
};

const STEP_COLORS_MAP: Record<number, StepColor[]> = {
  1: [
    { fillColor: 'var(--secondary1)', strokeColor: 'var(--main1)' },
    { fillColor: '#DF4B01', strokeColor: 'var(--main1)' },
    { fillColor: '#DF4B01', strokeColor: 'var(--main1)' },
    { fillColor: '#DF4B01', strokeColor: 'var(--main1)' },
  ],
  2: [
    { fillColor: 'var(--secondary1)', strokeColor: 'var(--main2)' },
    { fillColor: 'var(--secondary1)', strokeColor: 'var(--main2)' },
    { fillColor: 'var(--secondary2)', strokeColor: 'var(--main2)' },
    { fillColor: 'var(--secondary2)', strokeColor: 'var(--main2)' },
  ],
  3: [
    { fillColor: 'var(--secondary1)', strokeColor: 'var(--main3)' },
    { fillColor: 'var(--secondary1)', strokeColor: 'var(--main3)' },
    { fillColor: 'var(--secondary1)', strokeColor: 'var(--main3)' },
    { fillColor: '#E0A500', strokeColor: 'var(--main3)' },
  ],
  4: [
    { fillColor: 'var(--secondary1)', strokeColor: 'var(--primary)' },
    { fillColor: 'var(--secondary1)', strokeColor: 'var(--primary)' },
    { fillColor: 'var(--secondary1)', strokeColor: 'var(--primary)' },
    { fillColor: 'var(--secondary1)', strokeColor: 'var(--primary)' },
  ],
};

const CIRCLE_COORDS = [
  { x: 4, y: 4, cx: 26, cy: 26 },
  { x: 94, y: 54, cx: 116, cy: 76 },
  { x: 214, y: 54, cx: 236, cy: 76 },
  { x: 311, y: 4, cx: 333, cy: 26 },
];

interface StepIndicatorProps {
  step: number;
}

export const StepIndicator = ({ step }: StepIndicatorProps) => {
  const [delayedStep, setDelayedStep] = useState(step);

  useEffect(() => {
    const delay = step > 1 ? 1200 : 0;
    const timer = setTimeout(() => setDelayedStep(step), delay);
    return () => clearTimeout(timer);
  }, [step]);

  const currentPercent = (step - 1) * 33.33;
  const prevPercent = Math.max(0, step - 2) * 33.33;
  const currentCurve = STEP_CURVES_MAP[step] || STEP_CURVES_MAP[1];

  const getBaseColor = (currentStep: number) => {
    if (currentStep === 2) return 'var(--main2)';
    if (currentStep === 3) return 'var(--main3)';
    if (currentStep === 4) return 'var(--primary)';
    return 'transparent';
  };

  const baseColors = [...(STEP_COLORS_MAP[step] || STEP_COLORS_MAP[1])];
  const isAnimating = delayedStep !== step && step > 1;
  const targetIndex = step - 1;

  if (isAnimating) {
    const inactiveColors: Record<number, StepColor> = {
      2: { fillColor: 'var(--secondary2)', strokeColor: 'var(--main2)' },
      3: { fillColor: '#E0A500', strokeColor: 'var(--main3)' },
      4: { fillColor: 'var(--primary)', strokeColor: 'var(--primary)' },
    };
    baseColors[targetIndex] = inactiveColors[step] || baseColors[targetIndex];
  }

  const targetColor = step > 1 ? STEP_COLORS_MAP[step][targetIndex] : null;

  return (
    <div className='relative flex items-center justify-center'>
      <div className='absolute flex h-[56.15px] w-[305.44px] translate-y-[4px] items-center justify-center'>
        {step === 1 ? (
          <div className='absolute flex items-center justify-center'>
            {currentCurve}
          </div>
        ) : (
          <>
            <div
              className='absolute flex items-center justify-center'
              style={{ clipPath: `inset(0 0 0 ${currentPercent}%)` }}
            >
              {currentCurve}
            </div>
            <motion.div
              key={`mask-motion-${step}`}
              className='absolute h-full w-full'
              initial={{
                clipPath: `inset(0 ${100 - currentPercent}% 0 ${prevPercent}%)`,
              }}
              animate={{
                clipPath: `inset(0 ${100 - currentPercent}% 0 ${currentPercent}%)`,
              }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <div
                className='absolute h-full w-full'
                style={{
                  backgroundColor: getBaseColor(step),
                  maskImage: `url('/images/step4.svg')`,
                  WebkitMaskImage: `url('/images/step4.svg')`,
                  maskSize: '100% 100%',
                  WebkitMaskSize: '100% 100%',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                }}
              />
            </motion.div>
            <motion.div
              key={`motion-${step}`}
              className='absolute flex items-center justify-center'
              initial={{ clipPath: `inset(0 ${100 - prevPercent}% 0 0)` }}
              animate={{ clipPath: `inset(0 ${100 - currentPercent}% 0 0)` }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              {currentCurve}
            </motion.div>
          </>
        )}
      </div>

      <div className='relative z-10'>
        <StepIcon stepColors={baseColors} />
        {isAnimating && targetColor && (
          <svg
            className='pointer-events-none absolute top-0 left-0'
            width='359'
            height='102'
            viewBox='0 0 359 102'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <rect
                x={CIRCLE_COORDS[targetIndex].x}
                y={CIRCLE_COORDS[targetIndex].y}
                width='44'
                height='44'
                rx='22'
                fill={targetColor.fillColor}
                stroke={targetColor.strokeColor}
                strokeWidth='8'
              />
              <circle
                cx={CIRCLE_COORDS[targetIndex].cx}
                cy={CIRCLE_COORDS[targetIndex].cy}
                r='4'
                fill={targetColor.strokeColor}
              />
            </motion.g>
          </svg>
        )}
      </div>
    </div>
  );
};
