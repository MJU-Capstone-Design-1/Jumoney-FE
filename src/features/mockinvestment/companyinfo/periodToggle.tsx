import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

export const PERIODS = [
  {
    value: '1d',
    label: '1일',
    subLabel: '최근 1일간의 흐름을 1분 단위(1분봉)로 보여드려요.',
  },
  {
    value: '1w',
    label: '1주일',
    subLabel: '최근 1주간의 흐름을 30분 단위(30분봉)로 보여드려요.',
  },
  {
    value: '3m',
    label: '3개월',
    subLabel: '최근 3개월간의 추세를 1일 단위(일봉)로 보여드려요.',
  },
  {
    value: '1y',
    label: '1년',
    subLabel: '최근 1년간의 추세를 1일 단위(일봉)로 보여드려요.',
  },
  {
    value: '5y',
    label: '5년',
    subLabel: '최근 5년간의 장기 추세를 1주일 단위(주봉)로 보여드려요.',
  },
] as const;

export type PeriodValue = (typeof PERIODS)[number]['value'];

interface PeriodToggleProps {
  className?: string;
  value?: PeriodValue;
  onValueChange?: (value: PeriodValue) => void;
}

export function PeriodToggle({
  className,
  value,
  onValueChange,
}: PeriodToggleProps) {
  return (
    <div
      className={cn(
        'border-text-main relative flex h-[2.25rem] w-fit overflow-hidden rounded-[6.25rem] border bg-transparent',
        className,
      )}
    >
      {PERIODS.map((period) => {
        const isSelected = value !== undefined && value === period.value;

        return (
          <button
            key={period.value}
            type='button'
            onClick={() => onValueChange?.(period.value)}
            className={cn(
              'text-body-md relative flex h-full w-[4.2875rem] shrink-0 cursor-pointer items-center justify-center font-semibold transition-colors duration-300',
              isSelected ? 'text-secondary1' : 'text-text-main',
            )}
          >
            {isSelected && (
              <motion.div
                layoutId='activeTab'
                className='bg-secondary2 absolute inset-0 rounded-[6.25rem]'
                style={{ scale: 1.02 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 35,
                }}
              />
            )}
            <span className='relative z-10'>{period.label}</span>
          </button>
        );
      })}
    </div>
  );
}
