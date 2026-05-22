import React from 'react';
import { Button } from '@/components/ui/button';

interface PortfolioSelectCloseButtonProps {
  onClick: () => void;
  bgColor: string;
}

const TEXT_COLOR_MAP: Record<string, string> = {
  'bg-main1': 'text-main1 hover:text-main1/90',
  'bg-main2': 'text-main2 hover:text-main2/90',
  'bg-main3': 'text-main3 hover:text-main3/90',
  'bg-main4': 'text-main4 hover:text-main4/90',
};

export const PortfolioSelectCloseButton = ({
  onClick,
  bgColor,
}: PortfolioSelectCloseButtonProps) => {
  const textColor = TEXT_COLOR_MAP[bgColor] || 'text-main1';

  return (
    <Button
      onClick={onClick}
      variant='ghost'
      className={`bg-secondary1 text-body-sm ${textColor} hover:bg-secondary1/90 mx-auto flex h-[1.875rem] w-[3.25rem] items-center justify-center rounded-[6.25rem] font-bold`}
    >
      닫기
    </Button>
  );
};
