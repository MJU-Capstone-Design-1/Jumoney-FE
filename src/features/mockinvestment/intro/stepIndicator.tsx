import { StepIcon, StepColor } from '@/components/icons/stepIcon';
import Image from 'next/image';

const STEP_CURVES_MAP: Record<number, React.ReactNode> = {
  1: (
    <Image
      src='/images/step1.svg'
      alt='step 1 curve'
      width={359}
      height={102}
    />
  ),
  2: (
    <Image
      src='/images/step2.svg'
      alt='step 2 curve'
      width={359}
      height={102}
    />
  ),
  3: (
    <Image
      src='/images/step3.svg'
      alt='step 3 curve'
      width={359}
      height={102}
    />
  ),
  4: (
    <Image
      src='/images/step4.svg'
      alt='step 4 curve'
      width={359}
      height={102}
    />
  ),
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

interface StepIndicatorProps {
  step: number;
}

export const StepIndicator = ({ step }: StepIndicatorProps) => {
  const currentStepColors = STEP_COLORS_MAP[step] || STEP_COLORS_MAP[1];
  const currentCurve = STEP_CURVES_MAP[step] || STEP_CURVES_MAP[1];

  return (
    <div className='relative flex items-center justify-center'>
      <div className='absolute flex h-[56.15px] w-[305.44px] translate-y-[4px] items-center justify-center'>
        {currentCurve}
      </div>
      <div className='z-10'>
        <StepIcon stepColors={currentStepColors} />
      </div>
    </div>
  );
};
