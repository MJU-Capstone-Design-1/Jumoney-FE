'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { IntroStockTrendIcon } from '@/components/icons/introStockTrendIcon';
import {
  FIELD_CONFIGS,
  FieldType,
} from '@/features/mockinvestment/fieldButton';

const SAMPLE_STOCKS = [{ code: '005930', name: '삼성전자' }];

const FIELD_ITEMS: FieldType[] = ['it', 'mobility', 'finance', 'bio', 'steel'];

export const Step3Card = (props: HTMLMotionProps<'div'>) => {
  return (
    <motion.div
      {...props}
      className='mx-auto flex h-[22rem] w-[20.5rem] flex-col justify-center gap-[1.5rem]'
    >
      <div className='h-[8.625rem] overflow-hidden rounded-[1.5rem]'>
        <div className='bg-secondary1 relative h-full w-full overflow-hidden px-[0.875rem] pt-[0.75rem] pb-[0.625rem] text-left shadow-sm'>
          <div className='flex items-start justify-between'>
            <div className='flex flex-col gap-[0.125rem]'>
              <span className='text-label-sm text-secondary2 font-extrabold'>
                삼성전자
              </span>
              <span className='text-body-sm text-text-up font-bold'>
                +10.0%
              </span>
            </div>
            <span className='text-body-sm text-text-main font-bold'>1주일</span>
          </div>
          <IntroStockTrendIcon
            className='absolute right-[0.625rem] bottom-[0.625rem] left-[0.625rem] h-[5.5rem] w-[calc(100%-1.25rem)]'
            aria-hidden='true'
          />
        </div>
      </div>
      <div className='flex h-[4.375rem] items-start justify-between overflow-hidden'>
        {FIELD_ITEMS.map((fieldType) => {
          const field = FIELD_CONFIGS[fieldType];
          return (
            <div
              key={fieldType}
              className='flex w-[3.55rem] shrink-0 flex-col items-center gap-[0.25rem]'
            >
              <div
                className={`${field.bgColor} shadow-card-shadow flex h-[2.375rem] w-[2.375rem] items-center justify-center rounded-full`}
              >
                <span className={`scale-[0.78] ${field.iconOffset || ''}`}>
                  {field.icon}
                </span>
              </div>
              <div className='text-body-sm text-background text-center leading-[105%] font-bold'>
                {field.label.split('/').map((text, index, array) => (
                  <React.Fragment key={text}>
                    {text}
                    {index < array.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className='h-[6rem] overflow-hidden rounded-[1.5rem]'>
        {SAMPLE_STOCKS.map((stock) => (
          <div
            key={stock.code}
            className='bg-secondary1 flex h-full w-full items-center gap-[0.75rem] px-[0.875rem] text-left shadow-sm'
          >
            <div className='bg-background h-[3.75rem] w-[3.75rem] shrink-0 overflow-hidden rounded-full'>
              <Image
                src={`/logos/${stock.code}.png`}
                alt={`${stock.name} 로고`}
                width={60}
                height={60}
                className='h-full w-full object-cover'
              />
            </div>
            <div className='flex min-w-0 flex-1 flex-col gap-[0.125rem]'>
              <div className='flex min-w-0 items-center justify-between gap-[0.5rem]'>
                <div className='flex min-w-0 items-center gap-[0.25rem]'>
                  <span className='text-label-sm text-secondary2 truncate font-bold'>
                    {stock.name}
                  </span>
                  <span className='text-label-sm text-secondary2 shrink-0 font-bold'>
                    • 3주
                  </span>
                </div>
                <span className='text-label-sm text-text-up shrink-0 font-bold'>
                  10.0%
                </span>
              </div>
              <div className='flex items-center gap-[0.375rem]'>
                <span className='text-body-md text-secondary2 font-bold'>
                  ₩ 1,155,000
                </span>
                <span className='text-body-md text-text-up font-bold'>
                  (+ ₩ 105,000)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
