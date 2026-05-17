'use client';

import React, { useMemo } from 'react';
import RecommendResultCard from '@/components/recommendResultCard';
import { motion } from 'framer-motion';
import { useSurveyStore } from '@/store/surveyStore';
import { getPersona } from '@/constants/surveyMappings';

const Page = () => {
  const typingText = '분석 완료! 당신의 투자 타입은 · · ·';

  const { purpose, getRiskLabel, period } = useSurveyStore();
  const persona = useMemo(() => {
    return getPersona(purpose, getRiskLabel(), period);
  }, [purpose, getRiskLabel, period]);

  return (
    <div>
      <div className='bg-primary gap-full text-secondary1 flex h-auto flex-col gap-[1rem] rounded-[2.5rem] p-[1.5rem]'>
        <p className='text-body-sm font-semibold'>
          {typingText.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.07, duration: 0.1 }}
            >
              {char}
            </motion.span>
          ))}
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className='text-label-md font-extrabold whitespace-pre-wrap'
        >
          {persona.name}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className='text-body-md leading-[120%] font-semibold whitespace-pre-wrap'
        >
          {persona.description}
        </motion.p>
      </div>

      <div className='flex flex-col gap-[1rem] p-[1.5rem]'>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.8 }}
          className='text-body-xl flex flex-col font-extrabold'
        >
          추천 종목
        </motion.p>
        {/* TODO: 추천 종목 받아오기 */}
        <div className='flex flex-col gap-[1rem]'>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 3.3 + i * 0.2,
                duration: 0.5,
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              <RecommendResultCard />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
