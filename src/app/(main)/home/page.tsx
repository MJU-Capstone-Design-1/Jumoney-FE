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
import { useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MASTERS_PORTFOLIO } from '@/constants/mastersPortfolio';

export const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedRankId, setSelectedRankId] = useState('3');
  const [selectedMaster, setSelectedMaster] = useState('all');
  const router = useRouter();

  const x = useMotionValue(0);
  const itemCount = 4;
  const itemWidth = 224;
  const gap = 10;
  const maxDrag = -(itemCount * (itemWidth + gap) - 350);

  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      const containerCenter = 350 / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      for (let i = 0; i < itemCount; i++) {
        const childCenter = (itemWidth + gap) * i + itemWidth / 2 + latest;
        const distance = Math.abs(childCenter - containerCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      }
      setActiveIndex(closestIndex);
    });
    return () => unsubscribe();
  }, [x]);

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
            transition={{ duration: 0.5, ease: 'easeOut' }}
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
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='text-label-md text-secondary2 font-extrabold'
          >
            모의 투자 랭킹
          </motion.div>
          <RankProfile
            key={`${selectedMaster}-${selectedRankId}`}
            selectedId={selectedRankId}
            masterFilter={selectedMaster}
          />
          <div className='flex w-full justify-center pt-[1.5rem]'>
            <MasterToggle
              selectedMaster={selectedMaster}
              onToggle={(masterId) => {
                setSelectedMaster(masterId);
                setSelectedRankId('3');
              }}
            />
          </div>
          <div className='flex w-full justify-center pt-[1.5rem]'>
            <RankingChart
              key={selectedMaster}
              selectedId={selectedRankId}
              onSelect={setSelectedRankId}
              masterFilter={selectedMaster}
            />
          </div>
        </section>

        <section className='flex flex-col gap-[0.875rem] pt-[1.75rem]'>
          <div className='flex items-center justify-between'>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
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
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='text-label-md text-secondary2 font-extrabold'
            >
              모의 투자
            </motion.div>
            <NavigateButton label='전체보기' />
          </div>
          <MockInvestment />
        </section>

        <section className='flex flex-col gap-[0.5rem] pt-[0.125rem]'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='text-label-md text-secondary2 font-extrabold'
          >
            거장 포트폴리오
          </motion.div>
          <div className='flex w-full flex-col gap-[1rem]'>
            <div className='w-full overflow-hidden'>
              <motion.div
                style={{ x }}
                className='flex cursor-grab gap-[0.625rem] active:cursor-grabbing'
                drag='x'
                dragConstraints={{ left: maxDrag, right: 0 }}
                dragElastic={0.1}
              >
                {MASTERS_PORTFOLIO.map((master) => (
                  <MasterPortfolio
                    key={master.id}
                    name={master.name}
                    path={`/portfolio/selected?master=${master.id}`}
                    tags={master.tags}
                    image={master.image}
                    companies={master.companies}
                  />
                ))}
              </motion.div>
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
        onRecommendClick={() => router.push('/portfolio/masterselect')}
      />
    </div>
  );
};

export default HomePage;
