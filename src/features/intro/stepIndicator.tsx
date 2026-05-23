'use client';

import React from 'react';

interface StepIndicatorProps {
  step: number;
}

export const StepIndicator = ({ step }: StepIndicatorProps) => {
  return (
    <div className='mx-auto flex items-center gap-[0.75rem]'>
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={`border-secondary2 flex h-[0.75rem] w-[0.75rem] rounded-full border-[0.0625rem] transition-colors duration-800 ease-in-out ${
            index === step ? 'bg-secondary2' : 'bg-transparent'
          }`}
        />
      ))}
    </div>
  );
};
