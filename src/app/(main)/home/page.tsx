'use client';

import { ProfileIcon } from '@/components/icons/profileIcon';
import { MasterPortfolio } from '@/features/home/masterPortfolio';
import { MasterToggle } from '@/features/home/masterToggle';
import { MockInvestment } from '@/features/home/mockInvestment';
import { NavigateButton } from '@/features/home/navigateButton';
import { PortfolioPagination } from '@/features/home/portfolioPagination';
import { ProfileModal } from '@/features/home/profileModal';
import { RankingChart } from '@/features/home/rankingChart';
import { RankProfile } from '@/features/home/rankProfile';
import { TodayNewsCard } from '@/features/home/todayNewsCard';
import { TodayTermCard } from '@/features/home/todayTermCard';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollRef.current;
      if (!container) return;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const children = Array.from(container.children) as HTMLElement[];
      if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 5) {
        setActiveIndex(children.length - 1);
        return;
      }
      let closestIndex = 0;
      let minDistance = Infinity;
      children.forEach((child, i) => {
        const rect = child.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const childCenter = rect.left + rect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;
        const distance = Math.abs(childCenter - containerCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      });
      setActiveIndex(closestIndex);
    };
    const element = scrollRef.current;
    element?.addEventListener('scroll', handleScroll);
    return () => element?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='relative flex h-screen flex-col overflow-x-hidden'>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className='bg-background sticky top-0 z-15 rounded-b-[2.5rem] px-[1rem]'
      >
        <div className='flex h-[6.5rem] items-center justify-between py-[1.25rem]'>
          <div className='bg-default ml-[0.25rem] h-[4rem] w-[4rem] rounded-full' />
          <div className='mr-[0.75rem]'>
            <button
              type='button'
              onClick={() => setIsProfileModalOpen(true)}
              className='flex items-center justify-center'
            >
              <ProfileIcon />
            </button>
          </div>
        </div>
      </motion.header>

      <main className='flex flex-col gap-[0.75rem] px-[1rem]'>
        <section className='flex flex-col gap-[0.5rem] pt-[2.625rem]'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className='text-label-md text-secondary2 font-extrabold'
          >
            오늘의 뉴스
          </motion.div>
          <TodayNewsCard />
        </section>

        <section className='flex flex-col gap-[0.75rem] pt-[1.5rem]'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className='text-label-md text-secondary2 font-extrabold'
          >
            모의 투자 랭킹
          </motion.div>
          <RankProfile />
          <div className='flex w-full justify-center pt-[0.625rem]'>
            <MasterToggle />
          </div>
          <div className='flex w-full justify-center pt-[1.5rem]'>
            <RankingChart />
          </div>
        </section>

        <section className='flex flex-col gap-[0.875rem] pt-[1.75rem]'>
          <div className='flex items-center justify-between'>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' as const }}
              className='text-label-md text-secondary2 font-extrabold'
            >
              오늘의 추천 용어
            </motion.div>
            <NavigateButton label='학습하기' />
          </div>
          <TodayTermCard />
        </section>

        <section className='flex flex-col gap-[0.75rem] pt-[1.25rem]'>
          <div className='flex items-center justify-between'>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' as const }}
              className='text-label-md text-secondary2 font-extrabold'
            >
              모의 투자
            </motion.div>
            <NavigateButton label='전체보기' />
          </div>
          <MockInvestment />
        </section>

        <section className='flex flex-col gap-[0.5rem] pt-[1.5rem]'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className='text-label-md text-secondary2 font-extrabold'
          >
            거장 포트폴리오
          </motion.div>
          <div className='flex w-full flex-col gap-[1rem]'>
            <div
              ref={scrollRef}
              className='scrollbar-hide flex gap-[0.625rem] overflow-x-auto whitespace-nowrap'
              style={{ scrollSnapType: 'x mandatory' }}
            >
              <MasterPortfolio />
              <MasterPortfolio />
              <MasterPortfolio />
              <MasterPortfolio />
            </div>
            <div className='mb-[8.3125rem] flex items-center justify-center'>
              <PortfolioPagination activeIndex={activeIndex} />
            </div>
          </div>
        </section>
      </main>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onRecommendClick={() => router.push('portfolio/masterselect')}
      />
    </div>
  );
};

export default HomePage;
