'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BottomTabBarArea } from './icons/bottomTabBarArea';
import { BottomTabBarInvestmentIcon } from './icons/bottomTabBarInvestmentIcon';
import { BottomTabBarPortfolioIcon } from './icons/bottomTabBarPortfolioIcon';
import { BottomTabBarTermsIcon } from './icons/bottomTabBarTermsIcon';
import { BottomTabBarRecommendIcon } from './icons/bottomTabBarRecommendIcon';
import { BottomTabBarHomeIcon } from './icons/BottomTabBarHomeIcon';

export const BottomTabBar = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  return (
    <div className='pointer-events-none fixed bottom-0 left-1/2 z-50 h-[9rem] w-full max-w-[23.4375rem] -translate-x-1/2'>
      <div className='relative h-full w-full'>
        <BottomTabBarArea className='pointer-events-auto absolute bottom-[-1rem] left-1/2 h-[9rem] w-[27.4375rem] max-w-none -translate-x-1/2' />
        <div className='absolute bottom-[2.25rem] left-1/2 z-10 flex -translate-x-1/2 -translate-y-[2rem] items-center px-[1.75rem]'>
          <button
            type='button'
            onClick={() => {
              setSelectedTab('home');
              // router.push('/'); // TODO: 경로 추가
            }}
            className='pointer-events-auto relative flex h-6 w-6 items-center justify-center focus:outline-none'
          >
            <div className='bg-secondary1 shadow-card-shadow pointer-events-none absolute z-[-2] h-[4rem] w-[4rem] rounded-full' />
            {selectedTab === 'home' && (
              <div className='bg-primary shadow-card-shadow pointer-events-none absolute z-[-1] h-[4rem] w-[4rem] rounded-full' />
            )}
            <BottomTabBarHomeIcon
              color={selectedTab === 'home' ? 'secondary1' : 'secondary2'}
            />
          </button>
        </div>

        <div className='absolute right-0 bottom-[1.75rem] left-0 z-10 flex items-center justify-between px-[1.75rem]'>
          <div className='flex gap-[2.75rem]'>
            <button
              type='button'
              onClick={() => {
                setSelectedTab('terms');
                router.push('/terms');
              }}
              className='pointer-events-auto relative flex h-6 w-6 items-center justify-center focus:outline-none'
            >
              {selectedTab === 'terms' && (
                <div className='bg-primary pointer-events-none absolute z-[-1] h-[3rem] w-[3rem] rounded-full' />
              )}
              <BottomTabBarTermsIcon
                color={selectedTab === 'terms' ? 'secondary1' : 'secondary2'}
              />
            </button>

            <button
              type='button'
              onClick={() => {
                setSelectedTab('portfolio');
                router.push('/portfolio/selected');
              }}
              className='pointer-events-auto relative flex h-6 w-6 items-center justify-center focus:outline-none'
            >
              {selectedTab === 'portfolio' && (
                <div className='bg-primary pointer-events-none absolute z-[-1] h-[3rem] w-[3rem] rounded-full' />
              )}
              <BottomTabBarPortfolioIcon
                color={
                  selectedTab === 'portfolio' ? 'secondary1' : 'secondary2'
                }
              />
            </button>
          </div>

          <div className='flex gap-[2.75rem]'>
            <button
              type='button'
              onClick={() => {
                setSelectedTab('recommend');
                router.push('/recommend');
              }}
              className='pointer-events-auto relative flex h-6 w-6 items-center justify-center focus:outline-none'
            >
              {selectedTab === 'recommend' && (
                <div className='bg-primary pointer-events-none absolute z-[-1] h-[3rem] w-[3rem] rounded-full' />
              )}
              <BottomTabBarRecommendIcon
                color={
                  selectedTab === 'recommend' ? 'secondary1' : 'secondary2'
                }
              />
            </button>

            <button
              type='button'
              onClick={() => {
                setSelectedTab('investment');
                // router.push('/investment'); // TODO: 경로 추가
              }}
              className='pointer-events-auto relative flex h-6 w-6 items-center justify-center focus:outline-none'
            >
              {selectedTab === 'investment' && (
                <div className='bg-primary pointer-events-none absolute z-[-1] h-[3rem] w-[3rem] rounded-full' />
              )}
              <BottomTabBarInvestmentIcon
                color={
                  selectedTab === 'investment' ? 'secondary1' : 'secondary2'
                }
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
