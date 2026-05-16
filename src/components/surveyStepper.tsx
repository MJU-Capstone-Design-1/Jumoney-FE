import React from 'react';

interface SurveyStepperProps {
  currentStep: number;
  totalSteps: number;
}

export const SurveyStepper = ({
  currentStep,
  totalSteps,
}: SurveyStepperProps) => {
  return (
    <div className='letter-spacing-[1rem] text-main2 bg-default text-body-sm absolute top-[1.375rem] right-[1rem] z-10 flex h-[1.875rem] w-[4rem] items-center justify-center gap-[0.375rem] rounded-[6.25rem] text-center font-extrabold'>
      {currentStep} <p>OF</p> {totalSteps}
    </div>
  );
};
