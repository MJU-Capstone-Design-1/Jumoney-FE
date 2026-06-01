'use client';

import { SpeechBubble } from '@/components/icons/speechBubble';
import Image from 'next/image';
import { NavigateButton } from './navigateButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useTodayNews } from '../../types/useTodayNews';
import { useState, useEffect } from 'react';

export const TodayNewsCard = () => {
  const { data: newsData, isLoading, error } = useTodayNews();
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = newsData?.items || [];
  const hasNews = items.length > 0;

  useEffect(() => {
    if (!hasNews) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [hasNews, items.length]);

  const currentNews = hasNews ? items[currentIndex] : null;

  let newsText = '오늘의 호재 종목 뉴스를 알려드려요.';
  if (isLoading) {
    newsText = '오늘의 뉴스를 불러오는 중입니다...';
  } else if (error?.message === 'NEWS404_NO_ANALYSIS') {
    newsText = '아직 오늘 분석 결과가 없습니다.';
  } else if (error) {
    newsText = '오늘 뉴스 로드에 실패했습니다.';
  } else if (currentNews) {
    newsText = currentNews.title;
  }

  // 줄바꿈 문자(\n)를 <br />로 변환
  const formattedText = newsText.split('\n').map((line, idx) => (
    <span key={idx}>
      {line}
      <br />
    </span>
  ));

  const handleNavigate = () => {
    if (currentNews?.newUrl) {
      window.open(currentNews.newUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='relative w-full overflow-hidden rounded-2xl'
    >
      <AnimatePresence mode='popLayout'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className='relative w-full'
        >
          <Image
            src='/images/todayNewsBackground.svg'
            alt='오늘의 뉴스 배경'
            width={343}
            height={134}
            priority
            className='h-auto w-full'
          />
          <div className='absolute inset-0 flex items-start gap-[1.8125rem] p-[1.5rem]'>
            <SpeechBubble />
            <div className='flex h-full flex-1 flex-col justify-between overflow-hidden'>
              <span className='text-body-xl text-secondary2 line-clamp-3 leading-[120%] font-extrabold'>
                {formattedText}
              </span>
              <div className='self-end'>
                <NavigateButton
                  label='바로가기'
                  onClick={hasNews ? handleNavigate : undefined}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
