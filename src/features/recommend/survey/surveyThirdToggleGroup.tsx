'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { HelpButton } from './helpButton';

const OPTIONS = [
  {
    id: '초단기',
    helpItems: [
      {
        title: '체결강도 상위순 정렬',
        description:
          '현재 시장에서 매도세보다 매수세가 강한 순으로 정렬하여 가격을 위로 밀어 올리는 탄력적인 종목을 선별해요.',
      },
    ],
  },
  {
    id: '단기',
    helpItems: [
      {
        title: '거래대금 상위순 정렬',
        description:
          '실제 시장의 자금이 집중되는 순으로 정렬하여 거래가 활발하고 시장을 주도하는 종목을 선별해요.',
      },
    ],
  },
  {
    id: '중기',
    helpItems: [
      {
        title: 'EPS 성장률 상위순 정렬',
        description:
          '한 분기 사이클 동안 기업의 주당순이익 창출 능력이 뛰어난 순으로 정렬하여 실제 실적 성장을 보여주는 종목을 선별해요.',
      },
    ],
  },
  {
    id: '장기',
    helpItems: [
      {
        title: 'ROE 상위순 정렬',
        description:
          '기업이 가진 자본을 효율적으로 활용하여 이익을 내는 순으로 정렬하여 장기적으로 우상향할 수 있는 탄탄한 종목을 선별해요.',
      },
    ],
  },
];

interface SurveyThirdToggleGroupProps {
  value?: string;
  onChange?: (value: string) => void;
  allowedValues?: string[];
}

export const SurveyThirdToggleGroup = ({
  value,
  onChange,
  allowedValues = OPTIONS.map((option) => option.id),
}: SurveyThirdToggleGroupProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 1.4,
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className='bg-secondary1 shadow-card-shadow mx-auto flex h-[10rem] w-[18.375rem] items-center justify-center rounded-[2.5rem]'
    >
      <ToggleGroup
        type='single'
        value={value}
        onValueChange={(val) => {
          if (val) onChange?.(val);
        }}
        className='grid grid-cols-2 gap-[1rem]'
      >
        {OPTIONS.map((option) => {
          const isDisabled = !allowedValues.includes(option.id);
          return (
            <motion.div
              key={option.id}
              whileTap={isDisabled ? undefined : { scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <ToggleGroupItem
                value={option.id}
                disabled={isDisabled}
                className='text-label-md border-secondary2 text-secondary2 data-[state=on]:bg-main1 data-[state=on]:text-secondary1 data-[state=on]:shadow-select-orange disabled:bg-default disabled:text-text-sub flex h-[3.5rem] w-[7.6875rem] items-center justify-center gap-[0.5rem] rounded-[77.125rem] rounded-full border font-extrabold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none data-[state=on]:border-transparent'
              >
                <span>{option.id}</span>

                <HelpButton
                  color={value === option.id ? 'secondary1' : 'secondary2'}
                  items={option.helpItems}
                />
              </ToggleGroupItem>
            </motion.div>
          );
        })}
      </ToggleGroup>
    </motion.div>
  );
};
