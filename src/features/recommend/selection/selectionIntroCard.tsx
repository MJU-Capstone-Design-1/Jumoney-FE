'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';

const MASTERS = [
  {
    id: 'buffett',
    name: '워런 버핏',
    activeBg: 'data-[state=on]:bg-main1',
    activeShadow: 'data-[state=on]:shadow-select-orange',
    image: '/images/warrenBuffetImage.svg',
  },
  {
    id: 'lynch',
    name: '피터 린치',
    activeBg: 'data-[state=on]:bg-main2',
    activeShadow: 'data-[state=on]:shadow-select-brown',
    image: '/images/peterLynchImage.svg',
  },
  {
    id: 'dalio',
    name: '레이 달리오',
    activeBg: 'data-[state=on]:bg-main3',
    activeShadow: 'data-[state=on]:shadow-select-yellow',
    image: '/images/rayDalioImage.svg',
  },
  {
    id: 'oneil',
    name: '윌리엄 오닐',
    activeBg: 'data-[state=on]:bg-main4',
    activeShadow: 'data-[state=on]:shadow-select-gray',
    image: '/images/williamOneilImage.svg',
  },
];

interface SelectionIntroCardProps {
  value: string;
  onValueChange: (value: string) => void;
}

const SelectionIntroCard = ({
  value,
  onValueChange,
}: SelectionIntroCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.4,
        duration: 0.5,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
    >
      <ToggleGroup
        type='single'
        value={value}
        onValueChange={(val) => val && onValueChange(val)}
        spacing={4}
        className='!grid w-full grid-cols-2'
      >
        {MASTERS.map((master) => {
          const isSelected = value === master.id;
          return (
            <ToggleGroupItem
              key={master.id}
              value={master.id}
              asChild
              className={cn(
                'bg-default shadow-card-shadow text-body-lg relative flex aspect-square !h-auto w-full items-end justify-start overflow-visible !rounded-[2rem] p-[1rem] text-end font-bold transition-[background-color,box-shadow] duration-300',
                master.activeBg,
                master.activeShadow,
              )}
            >
              <motion.button
                whileTap={{ scale: 0.93, y: 4 }}
                animate={isSelected ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <span className='text-secondary1 relative z-10'>
                  {master.name}
                </span>
                <Image
                  src={master.image}
                  alt={master.name}
                  width={164}
                  height={164}
                  className={cn(
                    'pointer-events-none absolute bottom-[1rem] left-1/2 z-0 h-auto w-[85%] -translate-x-1/2 transition-opacity duration-300',
                    isSelected ? 'opacity-100' : 'opacity-50',
                  )}
                  priority
                />
              </motion.button>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </motion.div>
  );
};

export default SelectionIntroCard;
