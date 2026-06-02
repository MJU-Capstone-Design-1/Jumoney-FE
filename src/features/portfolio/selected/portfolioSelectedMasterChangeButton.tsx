'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { MasterChangeIcon } from '@/components/icons/masterChangeIcon';

export const PortfolioSelectedMasterChangeButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push('/portfolio/masterselect')}
      variant='ghost'
      className='bg-secondary2 shadow-card-shadow pointer-events-auto flex h-[3.5rem] items-center justify-center gap-[0.25rem] rounded-full px-[1rem]'
    >
      <MasterChangeIcon />
      <span className='text-body-lg text-secondary1 font-semibold'>
        거장 변경
      </span>
    </Button>
  );
};
