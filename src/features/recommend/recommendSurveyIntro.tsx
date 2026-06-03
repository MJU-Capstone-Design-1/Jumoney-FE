import BottomButton from '@/components/bottomButton';
import { ChartIcon } from '@/components/icons/chartIcon';
import HeartIcon from '@/components/icons/heartIcon';
import { useProfileStore } from '@/store/useProfileStore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

const RecommendSurveyIntro = () => {
  const userName = useProfileStore((state) => state.name);

  return (
    <div>
      <div className='flex flex-col gap-[3.5rem] pt-[1.5rem]'>
        {/* 오늘의 호주머니 ~ 투자 기간 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='flex flex-col items-center gap-[3.25rem] text-center'
        >
          <div className='flex flex-col gap-[0.5rem]'>
            <p className='text-label-md font-extrabold'>오늘의 호주머니</p>
            <p className='text-body-md text-text-main text-center font-semibold'>
              {userName}님의 호주머니에 넣을 종목을 추천 받아보세요
              <br />
              실시간 시장 데이터와 투자 성향을 토대로 매칭해드려요
            </p>
          </div>

          <div className='flex w-full items-center justify-between px-[1.125rem]'>
            <div className='flex flex-col gap-[0.5rem]'>
              <p className='text-text-sub text-body-lg font-bold'>Purpose</p>
              <p className='text-label-md font-extrabold'>투자 목적</p>
            </div>

            <div className='bg-text-sub h-[5.25rem] w-[0.0625rem]' />

            <div className='flex flex-col gap-[0.5rem]'>
              <p className='text-text-sub text-body-lg font-bold'>Risk</p>
              <p className='text-label-md font-extrabold'>위험 감수</p>
            </div>

            <div className='bg-text-sub h-[5.25rem] w-[0.0625rem]' />

            <div className='flex flex-col gap-[0.5rem]'>
              <p className='text-text-sub text-body-lg font-bold'>Duration</p>
              <p className='text-label-md font-extrabold'>투자 기간</p>
            </div>
          </div>
        </motion.div>

        {/* 사용자 맞춤, 실시간 데이터 */}
        <div className='flex justify-between gap-[0.875rem]'>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.5,
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            className='bg-primary shadow-card-shadow flex w-full flex-col gap-[3.875rem] rounded-[2rem] p-[1rem]'
          >
            <div className='text-secondary1 text-body-lg flex items-center gap-[0.5rem] font-bold'>
              <HeartIcon />
              <p>Personalized</p>
            </div>
            <p className='text-label-sm text-secondary1 flex leading-[120%] font-semibold'>
              사용자
              <br />
              맞춤
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.5,
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            className='bg-main1 shadow-card-shadow flex w-full flex-col gap-[3.875rem] rounded-[2rem] p-[1rem]'
          >
            <div className='text-secondary1 text-body-lg flex items-center gap-[0.5rem] font-bold'>
              <ChartIcon />
              <p>Live Data</p>
            </div>
            <p className='text-label-sm text-secondary1 flex leading-[120%] font-semibold'>
              실시간
              <br />
              데이터
            </p>
          </motion.div>
        </div>
      </div>

      <Link href='/recommend/surveyfirst'>
        <BottomButton label='시작하기' />
      </Link>
    </div>
  );
};

export default RecommendSurveyIntro;
