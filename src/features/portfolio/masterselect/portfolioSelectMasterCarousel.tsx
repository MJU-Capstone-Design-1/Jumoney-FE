'use client';

import { MasterSelectionCursorIcon } from '@/components/icons/masterSelectionCursorIcon';
import Image from 'next/image';
import React, { useRef } from 'react';
import { MASTERS } from './portfolioSelectInformations';

interface PortfolioMasterCarouselProps {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

export const PortfolioMasterCarousel = ({
  selectedIndex,
  setSelectedIndex,
}: PortfolioMasterCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const items = container.children[0].children;
    const item = items[selectedIndex] as HTMLElement;

    if (item) {
      const offset =
        item.offsetLeft - container.clientWidth / 2 + item.clientWidth / 2;
      container.scrollTo({ left: offset, behavior: 'instant' });
    }
    // 오류 제거 주석
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    if (isScrolling.current) {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 100);
      return;
    }

    const container = scrollContainerRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    const items = container.children[0].children;
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLElement;

      const itemCenter = item.offsetLeft + item.clientWidth / 2;
      const distance = Math.abs(itemCenter - containerCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    if (closestIndex !== selectedIndex) {
      setSelectedIndex(closestIndex);
    }
  };

  const scrollTo = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const items = container.children[0].children;
    const item = items[index] as HTMLElement;

    if (item) {
      isScrolling.current = true;
      setSelectedIndex(index);

      const offset =
        item.offsetLeft - container.clientWidth / 2 + item.clientWidth / 2;
      container.scrollTo({
        left: offset,
        behavior: 'smooth',
      });

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    }
  };

  return (
    <div className='relative mt-[1.5rem] flex w-full flex-col items-center'>
      <div className='pointer-events-none absolute top-0 left-1/2 z-10 -translate-x-1/2'>
        <MasterSelectionCursorIcon />
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className='scrollbar-hide w-full snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto pt-[3.375rem] pb-[1rem] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
      >
        <div className='flex w-max gap-[1.5rem] px-[calc(50%-2rem)]'>
          {MASTERS.map((master, index) => (
            <div
              key={master.name}
              className='shrink-0 cursor-pointer snap-center'
              onClick={() => scrollTo(index)}
            >
              <div
                className={`shadow-card-shadow flex h-[4rem] w-[4rem] items-center justify-center overflow-hidden rounded-full ${
                  master.bgColor
                } transition-all duration-300 ${
                  selectedIndex === index
                    ? 'scale-110 opacity-100'
                    : 'scale-100 opacity-50'
                }`}
              >
                <Image
                  src={master.image}
                  alt={master.name}
                  width={64}
                  height={64}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
