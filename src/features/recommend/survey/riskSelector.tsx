'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RiskSlider } from './riskSlider';
import HappyFaceIcon from '../../../components/icons/happyFaceIcon';
import SmileFaceIcon from '../../../components/icons/smileFaceIcon';
import NeturalFaceIcon from '../../../components/icons/neturalFaceIcon';
import SadFaceIcon from '../../../components/icons/sadFaceIcon';
import { HelpButton } from './helpButton';

interface RiskSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const RISK_LEVELS = [
  {
    val: 100,
    title: '매우 높음',
    sub: '(실시간 급등주)',
    Icon: SadFaceIcon,
    helpItems: [
      {
        title: '베타(β) 1.1 이상',
        description:
          '시장 흐름에 민감하게 반응하는 고탄력 종목을 선별하여 큰 수익을 노려요.',
      },
      {
        title: '상대강도(RSI) 60~100',
        description:
          '주가 상승 에너지가 폭발하여 강력한 매수세가 나타나는 종목을 선별해요.',
      },
    ],
  },
  {
    val: 66,
    title: '높음',
    sub: '(수익 추구)',
    Icon: NeturalFaceIcon,
    helpItems: [
      {
        title: '베타(β) 1.0~1.2',
        description:
          '시장 지수보다 탄력적으로 움직여 상승장에서 지수 이상의 수익을 노려요.',
      },
      {
        title: '상대강도(RSI) 50~65',
        description:
          '주가 상승 에너지가 응축되어 본격적인 우상향 궤도에 진입한 종목을 선별해요.',
      },
    ],
  },
  {
    val: 33,
    title: '낮음',
    sub: '(안전 지향)',
    Icon: SmileFaceIcon,
    helpItems: [
      {
        title: '베타(β) 1.0 이하',
        description:
          '시장 지수보다 과하게 움직이지 않아 하락장이 오더라도 시장보다 더 크게 떨어지는 않는 종목을 선별해요.',
      },
      {
        title: '볼린저 밴드 등락폭 범위 25%',
        description:
          '볼린저 밴드 내에서 주가가 완만하게 움직여 급격한 이탈 없이 일관된 흐름을 유지하는 종목을 선별해요.',
      },
    ],
  },
  {
    val: 0,
    title: '매우 낮음',
    sub: '(철벽 방어)',
    Icon: HappyFaceIcon,
    helpItems: [
      {
        title: '베타(β) 0.7 이하',
        description:
          '시장 지수보다 둔하게 반응하여 하락장이 오더라도 주가가 크게 떨어지지 않는 종목을 선별해요.',
      },
      {
        title: '볼린저 밴드 등락폭 범위 15%',
        description:
          '볼린저 밴드의 폭을 좁게 유지하여 주가가 흔들림 없이 일관된 흐름을 유지하는 종목을 선별해요.',
      },
    ],
  },
];

export const RiskSelector = ({ value, onChange }: RiskSelectorProps) => {
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntered(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const BASE_DELAY = 1.0;
  const STAGGER = 0.1;

  return (
    <div className='relative flex h-[21rem] w-full items-center justify-center px-[1.25rem]'>
      {/* Left Labels */}
      <div className='absolute left-[1.25rem] flex h-full flex-col justify-between py-0'>
        {RISK_LEVELS.map((level, index) => {
          const isActive = value === level.val;
          return (
            <motion.div
              key={level.val}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isActive ? 1.15 : 1,
                opacity: 1,
                color: isActive ? 'var(--secondary2)' : 'var(--text-sub)',
              }}
              transition={
                isEntered
                  ? {
                      type: 'spring',
                      stiffness: 500,
                      damping: 15,
                    }
                  : {
                      delay: BASE_DELAY + index * STAGGER,
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                    }
              }
              className='flex h-[3rem] origin-left cursor-pointer flex-col justify-center'
              onClick={() => onChange(level.val)}
            >
              <div className='flex items-center gap-[0.25rem]'>
                <span className='text-body-xl font-extrabold'>
                  {level.title}
                </span>
                <HelpButton color='secondary2' items={level.helpItems} />
              </div>
              <span className='text-body-md mt-[0.125rem] font-bold'>
                {level.sub}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Center Slider */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: BASE_DELAY + RISK_LEVELS.length * STAGGER + 0.1,
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        className='flex h-full items-center justify-center'
      >
        <RiskSlider value={value} onChange={onChange} />
      </motion.div>

      {/* Right Emojis */}
      <div className='absolute right-[1.25rem] flex h-full flex-col justify-between py-0'>
        {RISK_LEVELS.map((level, index) => {
          const isActive = value === level.val;
          return (
            <motion.div
              key={level.val}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isActive ? 1.15 : 1,
                opacity: isActive ? 1 : 0.4,
                filter: isActive ? 'grayscale(0)' : 'grayscale(1)',
              }}
              transition={
                isEntered
                  ? {
                      type: 'spring',
                      stiffness: 500,
                      damping: 15,
                    }
                  : {
                      delay: BASE_DELAY + index * STAGGER,
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                    }
              }
              className='flex h-[3rem] origin-right cursor-pointer items-center justify-center'
              onClick={() => onChange(level.val)}
            >
              <level.Icon className='transition-all duration-300' />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
