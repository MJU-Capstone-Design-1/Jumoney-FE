// @/components/sectorSelectionBottomsheet.tsx
'use client';

import React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import BottomButton from '@/components/bottomButton';

export const SECTORS = [
  { id: 1, name: 'IT/반도체', bgClass: 'bg-[var(--field-it)]' },
  { id: 2, name: '자동차/운송', bgClass: 'bg-[var(--field-mobility)]' },
  { id: 3, name: '금융', bgClass: 'bg-[var(--field-finance)]' },
  { id: 4, name: '바이오/헬스케어', bgClass: 'bg-[var(--field-bio)]' },
  { id: 5, name: '철강/소재', bgClass: 'bg-[var(--field-steal)]' },
  { id: 6, name: '에너지/화학', bgClass: 'bg-[var(--field-energy)]' },
  { id: 7, name: '커뮤니케이션', bgClass: 'bg-[var(--field-communication)]' },
  { id: 8, name: '필수소비재', bgClass: 'bg-[var(--field-staples)]' },
  { id: 9, name: '조선/기계', bgClass: 'bg-[var(--field-mechanic)]' },
  { id: 10, name: '건설/유틸리티', bgClass: 'bg-[var(--field-utility)]' },
];

interface SectorSelectionBottomsheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSectorIds: number[];
  onSectorToggle: (id: number) => void;
  isMultiple: boolean;
  themeClass: string;
  onConfirm: () => void;
}

export const SectorSelectionBottomsheet = ({
  isOpen,
  onClose,
  selectedSectorIds,
  onSectorToggle,
  isMultiple,
  themeClass,
  onConfirm,
}: SectorSelectionBottomsheetProps) => {
  return (
    <DrawerPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      shouldScaleBackground={false}
    >
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className='fixed inset-0 z-50 bg-black/60' />
        <DrawerPrimitive.Content className='bg-background fixed bottom-0 left-1/2 z-50 flex w-full max-w-[375px] -translate-x-1/2 flex-col overflow-hidden rounded-t-[2.5rem] outline-none focus:outline-none'>
          <DrawerPrimitive.Title className='sr-only'>
            섹터 선택
          </DrawerPrimitive.Title>

          {/* Handle */}
          <div className='bg-default absolute top-[0.75rem] left-1/2 h-[0.25rem] w-[6rem] -translate-x-1/2 rounded-[77.125rem]' />

          {/* Content Area */}
          <div className='flex flex-col gap-[2rem] px-[1.5rem] py-[3rem]'>
            <div className='text-center'>
              <h3 className='text-body-lg text-foreground leading-[120%] font-extrabold'>
                섹터 선택 ({isMultiple ? '중복 가능' : '1개 선택'})
              </h3>
            </div>

            {/* Sector Tags */}
            <div className='flex max-h-[240px] flex-wrap justify-center gap-[0.5rem] overflow-y-auto py-1'>
              {SECTORS.map((sector) => {
                const isSelected = selectedSectorIds.includes(sector.id);
                return (
                  <motion.button
                    whileTap={{ scale: 0.92, rotate: isSelected ? -1 : 1 }}
                    animate={{ scale: isSelected ? 1.03 : 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    key={sector.id}
                    onClick={() => onSectorToggle(sector.id)}
                    className={cn(
                      'text-body-md rounded-full border px-[1.125rem] py-[0.5625rem] font-semibold transition-all duration-200',
                      isSelected
                        ? cn(
                            sector.bgClass,
                            'text-secondary1 border-transparent shadow-sm',
                          )
                        : 'text-secondary2 border-secondary2 bg-transparent',
                    )}
                  >
                    {sector.name}
                  </motion.button>
                );
              })}
            </div>

            {/* Confirm Button */}
            <div className='mt-[2.5rem] w-full'>
              <BottomButton
                label='선택 완료'
                onClick={onConfirm}
                disabled={selectedSectorIds.length === 0}
              />
            </div>
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
};
