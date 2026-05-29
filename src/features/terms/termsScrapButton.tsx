'use client';

import React, { useState } from 'react';
import { ScrapIcon } from '@/components/icons/scrapIcon';
import { Button } from '@/components/ui/button';
import { useToggleScrap } from '@/api/generated/endpoints/주식-용어/주식-용어';

interface TermsScrapButtonProps {
  termId?: number;
  initialScrapped?: boolean;
}

export const TermsScrapButton = ({
  termId,
  initialScrapped = false,
}: TermsScrapButtonProps) => {
  const [prevInitialScrapped, setPrevInitialScrapped] =
    useState(initialScrapped);
  const [isScrapped, setIsScrapped] = useState(initialScrapped);
  const toggleScrapMutation = useToggleScrap();

  // Props가 변경되었을 때 렌더링 중에 상태를 동기화하여 cascading render와 useEffect 경고를 피합니다.
  if (initialScrapped !== prevInitialScrapped) {
    setPrevInitialScrapped(initialScrapped);
    setIsScrapped(initialScrapped);
  }

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setIsScrapped((prev) => !prev);

    if (termId !== undefined) {
      try {
        await toggleScrapMutation.mutateAsync({ termId });
      } catch (error) {
        console.error('Failed to toggle scrap:', error);

        setIsScrapped((prev) => !prev);
      }
    }
  };

  return (
    <Button
      onClick={handleToggle}
      variant='ghost'
      className='h-7 w-7 cursor-pointer border-none bg-transparent p-0 transition-transform hover:bg-transparent focus:outline-none active:scale-95'
      aria-label='Scrap term'
    >
      <ScrapIcon isFilled={isScrapped} className='size-7' />
    </Button>
  );
};
