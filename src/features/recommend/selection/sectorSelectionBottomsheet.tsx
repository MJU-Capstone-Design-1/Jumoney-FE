'use client';

import React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import BottomButton from '@/components/bottomButton';
import { SECTORS } from '@/constants/sectors';

interface SectorSelectionBottomsheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSectorTypes: string[];
  onSectorToggle: (type: string) => void;
  isMultiple: boolean;
  onConfirm: () => void;
}

export const SectorSelectionBottomsheet = ({
  isOpen,
  onClose,
  selectedSectorTypes,
  onSectorToggle,
  isMultiple,
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
        <DrawerPrimitive.Overlay className='fixed inset-0 z-1000 bg-black/60' />
        <DrawerPrimitive.Content className='bg-background fixed bottom-0 left-1/2 z-10000 flex w-full max-w-[375px] -translate-x-1/2 flex-col overflow-hidden rounded-t-[2.5rem] outline-none focus:outline-none'>
          <DrawerPrimitive.Title className='sr-only'>
            섹터 선택
          </DrawerPrimitive.Title>

          {/* Handle */}
          <div className='bg-default absolute top-[0.75rem] left-1/2 h-[0.25rem] w-[6rem] -translate-x-1/2 rounded-[77.125rem]' />

          {/* Content Area */}
          <div className='flex flex-col gap-[1rem] px-[1.5rem] py-[3rem]'>
            <div className='text-center'>
              <h3 className='text-body-xl text-secondary2 leading-[120%] font-extrabold'>
                섹터 선택 ({isMultiple ? '중복 가능' : '1개 선택'})
              </h3>
            </div>

            {/* Sector Tags */}
            <div className='flex max-h-[240px] flex-wrap justify-center gap-[0.5rem] overflow-y-auto py-1'>
              {SECTORS.map((sector) => {
                const isSelected = selectedSectorTypes.includes(
                  sector.sectorType,
                );
                return (
                  <motion.button
                    whileTap={{ scale: 0.92, rotate: isSelected ? -1 : 1 }}
                    animate={{ scale: isSelected ? 1.03 : 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    key={sector.sectorType}
                    onClick={() => onSectorToggle(sector.sectorType)}
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
            <div className='mt-[3.2rem] w-full'>
              <BottomButton
                label='선택 완료'
                onClick={onConfirm}
                disabled={selectedSectorTypes.length === 0}
              />
            </div>
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
};
