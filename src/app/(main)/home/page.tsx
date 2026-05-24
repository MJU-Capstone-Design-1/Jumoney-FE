'use client';

import { ProfileIcon } from '@/components/icons/profileIcon';
import { MasterPortfolio } from '@/features/home/masterPortfolio';
import { MasterToggle } from '@/features/home/masterToggle';
import { MockInvestment } from '@/features/home/mockInvestment';
import { NavigateButton } from '@/features/home/navigateButton';
import { PortfolioPagination } from '@/features/home/portfolioPagination';
import { RankingChart } from '@/features/home/rankingChart';
import { RankProfile } from '@/features/home/rankProfile';
import { TodayNewsCard } from '@/features/home/todayNewsCard';
import { TodayTermCard } from '@/features/home/todayTermCard';
import { useEffect, useRef, useState } from 'react';

export const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      <header className='bg-background sticky top-0 z-50 rounded-b-[2.5rem] px-[1rem]'>
        <div className='flex h-[6.5rem] items-center justify-between py-[1.25rem]'>
          <div className='bg-default ml-[0.25rem] h-[4rem] w-[4rem] rounded-full' />
          <div className='mr-[0.75rem]'>
            <ProfileIcon />
          </div>
        </div>
      </header>
      <main className='flex flex-col gap-[0.75rem] px-[1rem]'>
        <section className='flex flex-col gap-[0.5rem] pt-[2.625rem]'>
          <div className='text-label-md text-secondary2 font-extrabold'>
            오늘의 뉴스
          </div>
          <div>
            <TodayNewsCard />
          </div>
        </section>
        <section className='flex flex-col gap-[0.75rem] pt-[1.5rem]'>
          <div className='text-label-md text-secondary2 font-extrabold'>
            모의 투자 랭킹
          </div>
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
            <div className='text-label-md text-secondary2 font-extrabold'>
              오늘의 추천 용어
            </div>
            <div>
              <NavigateButton label='학습하기' />
            </div>
          </div>
          <TodayTermCard />
        </section>
        <section className='flex flex-col gap-[0.75rem] pt-[1.25rem]'>
          <div className='flex items-center justify-between'>
            <div className='text-label-md text-secondary2 font-extrabold'>
              모의 투자
            </div>
            <div>
              <NavigateButton label='전체보기' />
            </div>
          </div>
          <MockInvestment />
        </section>
        <section className='flex flex-col gap-[0.5rem] pt-[1.5rem]'>
          <div className='text-label-md text-secondary2 font-extrabold'>
            거장 포트폴리오
          </div>
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
    </div>
  );
};
export default HomePage;
