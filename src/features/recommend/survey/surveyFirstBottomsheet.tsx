'use client';

import React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

interface DetailItem {
  title: string;
  description: string;
}

interface SurveyFirstBottomsheetProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  items: DetailItem[];
}

export const SurveyFirstBottomsheet = ({
  isOpen,
  onClose,
  items,
}: SurveyFirstBottomsheetProps) => {
  return (
    <DrawerPrimitive.Root
      open={isOpen}
      onOpenChange={onClose}
      shouldScaleBackground={false}
    >
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className='fixed inset-0 z-50 bg-black/60' />
        <DrawerPrimitive.Content className='bg-background fixed bottom-0 left-1/2 z-50 flex w-full max-w-[375px] -translate-x-1/2 flex-col overflow-hidden rounded-t-[2.5rem] outline-none focus:outline-none'>
          <DrawerPrimitive.Title className='sr-only'>
            상세 설명
          </DrawerPrimitive.Title>
          {/* Handle */}
          <div className='bg-default absolute top-[0.75rem] left-1/2 h-[0.25rem] w-[6rem] -translate-x-1/2 rounded-[77.125rem]' />

          {/* Content Area */}
          <div className='flex flex-col gap-[2.25rem] px-[2.5rem] py-[4rem]'>
            {items.map((detail, index) => (
              <div
                key={index}
                className='flex flex-col gap-[0.25rem] font-semibold'
              >
                <div className='flex items-center gap-[0.5rem]'>
                  <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] shrink-0 rounded-full' />
                  <h3 className='text-body-lg text-foreground leading-[120%] font-extrabold'>
                    {detail.title}
                  </h3>
                </div>
                <p className='text-body-md text-foreground pl-[1rem] leading-[120%]'>
                  {detail.description}
                </p>
              </div>
            ))}
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
};
