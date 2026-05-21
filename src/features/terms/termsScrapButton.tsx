'use client';

import React, { useState } from 'react';
import { ScrapIcon } from '@/components/icons/scrapIcon';
import { Button } from '@/components/ui/button';

export const TermsScrapButton = () => {
  const [isScrapped, setIsScrapped] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsScrapped((prev) => !prev);
  };

  return (
    <Button
      onClick={handleToggle}
      variant='ghost'
      className='h-[1.75rem] w-[1.75rem] cursor-pointer border-none bg-transparent p-0 transition-transform hover:bg-transparent focus:outline-none active:scale-95'
      aria-label='Scrap term'
    >
      <ScrapIcon isFilled={isScrapped} className='size-7' />
    </Button>
  );
};
