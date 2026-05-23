import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

const PERIODS = [
  { value: '1d', label: '1일' },
  { value: '1w', label: '1주일' },
  { value: '1m', label: '1개월' },
  { value: '1y', label: '1년' },
  { value: '5y', label: '5년' },
] as const;

type PeriodValue = (typeof PERIODS)[number]['value'];

interface PeriodToggleProps {
  className?: string;
  value?: PeriodValue;
  onValueChange?: (value: PeriodValue) => void;
}

export function PeriodToggle({
  className,
  value = '1d',
  onValueChange,
}: PeriodToggleProps) {
  const [selected, setSelected] = React.useState<PeriodValue>(value);

  const handleSelect = (val: PeriodValue) => {
    setSelected(val);
    onValueChange?.(val);
  };

  return (
    <div
      className={cn(
        'border-text-main relative flex h-[2.25rem] w-fit overflow-hidden rounded-[6.25rem] border bg-transparent',
        className,
      )}
    >
      {PERIODS.map((period) => {
        const isSelected = selected === period.value;

        return (
          <button
            key={period.value}
            type='button'
            onClick={() => handleSelect(period.value)}
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
