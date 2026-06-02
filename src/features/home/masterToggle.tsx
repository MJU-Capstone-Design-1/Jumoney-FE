'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Image from 'next/image';
import { useState } from 'react';
import { motion, Variants } from 'framer-motion';

const MASTERS = [
  { id: 'all', name: '전체', bgColor: 'bg-primary' },
  {
    id: '1',
    name: '워런 버핏',
    image: '/images/warrenBuffetImage.svg',
    bgColor: 'bg-main1',
  },
  {
    id: '2',
    name: '피터 린치',
    image: '/images/peterLynchImage.svg',
    bgColor: 'bg-main2',
  },
  {
    id: '3',
    name: '레이 달리오',
    image: '/images/rayDalioImage.svg',
    bgColor: 'bg-main3',
  },
  {
    id: '4',
    name: '윌리엄 오닐',
    image: '/images/williamOneilImage.svg',
    bgColor: 'bg-main4',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  },
};

interface MasterToggleProps {
  selectedMaster: string;
  onToggle: (id: string) => void;
}

export const MasterToggle = ({
  selectedMaster,
  onToggle,
}: MasterToggleProps) => {
  return (
    <div className='flex w-full justify-center'>
      <ToggleGroup
        type='single'
        value={selectedMaster}
        onValueChange={(value) => {
          if (value) onToggle(value);
        }}
        asChild
      >
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='flex items-center gap-[1.25rem]'
        >
          {MASTERS.map((master) => (
            <motion.div key={master.id} variants={itemVariants}>
              <ToggleGroupItem
                value={master.id}
                aria-label={master.name}
                className='bg-transparent p-0'
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`shadow-card-shadow flex h-[3.25rem] w-[3.25rem] items-center justify-center overflow-hidden rounded-full transition-all duration-300 ${
                    master.bgColor || 'bg-default'
                  } ${
                    selectedMaster === master.id
                      ? 'scale-110 opacity-100'
                      : 'scale-100 opacity-50'
                  } ${master.id === 'all' ? '-translate-y-[0.4375rem]' : ''}`}
                >
                  {master.image ? (
                    <Image
                      src={master.image}
                      alt={master.name}
                      width={52}
                      height={52}
                      className='object-cover'
                    />
                  ) : (
                    <span className='text-body-md text-secondary1 flex items-center justify-center leading-none font-bold'>
                      전체
                    </span>
                  )}
                </motion.div>
              </ToggleGroupItem>
            </motion.div>
          ))}
        </motion.div>
      </ToggleGroup>
    </div>
  );
};
