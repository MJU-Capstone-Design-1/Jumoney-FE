'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { RightArrowIconThin } from '@/components/icons/rightArrowIconThin';

interface IntroButtonProps {
  onClick: () => void;
}

export const IntroStepButton = ({ onClick }: IntroButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className='bg-secondary2 hover:!bg-secondary2 flex h-[5rem] w-[5rem] items-center justify-center rounded-full shadow-md transition-all duration-300'
    >
      <RightArrowIconThin color='secondary1' size={24} />
    </Button>
  );
};
