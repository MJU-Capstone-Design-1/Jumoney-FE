"use client";

import React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

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
        <DrawerPrimitive.Overlay className="fixed inset-0 bg-black/60 z-50" />
        <DrawerPrimitive.Content className="bg-background flex flex-col rounded-t-[2.5rem] fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] z-50 focus:outline-none outline-none overflow-hidden">
          <DrawerPrimitive.Title className="sr-only">
            상세 설명
          </DrawerPrimitive.Title>
          {/* Handle */}
          <div className="absolute top-[0.75rem] left-1/2 -translate-x-1/2 w-[6rem] h-[0.25rem] bg-default rounded-[77.125rem]" />

          {/* Content Area */}
          <div className="py-[4rem] px-[2.5rem] flex flex-col gap-[2.25rem]">
            {items.map((detail, index) => (
              <div
                key={index}
                className="flex flex-col gap-[0.25rem] font-semibold"
              >
                <div className="flex items-center gap-[0.5rem]">
                  <div className="w-[0.5rem] h-[0.5rem] rounded-full bg-secondary2 shrink-0" />
                  <h3 className="text-body-lg font-extrabold text-foreground leading-[120%]">
                    {detail.title}
                  </h3>
                </div>
                <p className="text-body-md text-foreground pl-[1rem] leading-[120%]">
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
