'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MASTERS = [
  { id: 'all', name: '전체', color: 'var(--primary)' },
  {
    id: 'buffett',
    name: '워런 버핏',
    image: '/images/warrenBuffetImage.svg',
    color: 'var(--main1)',
  },
  {
    id: 'lynch',
    name: '피터 린치',
    image: '/images/peterLynchImage.svg',
    color: 'var(--main2)',
  },
  {
    id: 'dalio',
    name: '레이 달리오',
    image: '/images/rayDalioImage.svg',
    color: 'var(--main3)',
  },
  {
    id: 'oneil',
    name: '윌리엄 오닐',
    image: '/images/williamOneilImage.svg',
    color: 'var(--main4)',
  },
];

const iconVariants = {
  initial: { scale: 1 },
  active: { scale: 1.15 },
  tap: { scale: 0.9 },
};

export const MasterToggle = () => {
  const [selectedMaster, setSelectedMaster] = useState<string>('all');

  const currentMaster = MASTERS.find((m) => m.id === selectedMaster);

  return (
    <div className='flex flex-col items-center justify-center'>
      <ToggleGroup
        type='single'
        value={selectedMaster}
        onValueChange={(value) => {
          if (value) setSelectedMaster(value);
        }}
        className='flex items-center gap-[1.25rem]'
      >
        {MASTERS.map((master) => (
          <ToggleGroupItem
            key={master.id}
            value={master.id}
            aria-label={master.name}
            className={`bg-default data-[state=on]:shadow-card-shadow flex h-[3.25rem] w-[3.25rem] flex-col items-center justify-center !rounded-full p-0 transition-all data-[state=on]:text-white`}
            style={{
              backgroundColor:
                selectedMaster === master.id ? master.color : undefined,
            }}
          >
            <motion.div
              variants={iconVariants}
              initial='initial'
              animate={selectedMaster === master.id ? 'active' : 'initial'}
              whileTap='tap'
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className='flex flex-col items-center justify-center'
            >
              {master.image ? (
                <Image
                  src={master.image}
                  alt={master.name}
                  width={28}
                  height={28}
                  className={`object-contain transition-all ${selectedMaster === master.id ? 'opacity-100' : 'opacity-80'}`}
                  style={{
                    clipPath: 'inset(1px 1px 1px 1px round 50% 50% 0 0)',
                  }}
                />
              ) : (
                <span className='text-body-md font-bold'>전체</span>
              )}
            </motion.div>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
