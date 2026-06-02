'use client';

import { Drawer as DrawerPrimitive } from 'vaul';

interface PortfolioMasterChangeConfirmBottomSheetProps {
  isOpen: boolean;
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const PortfolioMasterChangeConfirmBottomSheet = ({
  isOpen,
  isLoading = false,
  onCancel,
  onConfirm,
}: PortfolioMasterChangeConfirmBottomSheetProps) => {
  return (
    <DrawerPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isLoading) onCancel();
      }}
      shouldScaleBackground={false}
    >
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className='fixed inset-0 z-20 bg-black/60' />
        <DrawerPrimitive.Content className='bg-background fixed bottom-0 left-1/2 z-100 flex w-full max-w-[375px] -translate-x-1/2 flex-col overflow-hidden rounded-t-[2.5rem] outline-none focus:outline-none'>
          <DrawerPrimitive.Title className='sr-only'>
            거장 변경 확인
          </DrawerPrimitive.Title>
          <div className='bg-default absolute top-[0.75rem] left-1/2 h-[0.25rem] w-[6rem] -translate-x-1/2 rounded-[77.125rem]' />

          <div className='flex flex-col gap-[1.5rem] px-[1.5rem] pt-[3rem] pb-[2rem] text-center'>
            <div className='flex flex-col gap-[0.75rem]'>
              <h2 className='text-label-md text-secondary2 leading-[120%] font-extrabold'>
                거장을 변경하시겠어요?
              </h2>
              <p className='text-body-lg text-text-main leading-[140%] font-bold break-keep'>
                거장을 변경하면{' '}
                <span className='text-text-up font-extrabold'>
                  모의투자 내역이 초기화됩니다
                </span>
                .
              </p>
            </div>

            <div className='flex gap-[0.75rem]'>
              <button
                type='button'
                onClick={onCancel}
                disabled={isLoading}
                className='bg-default text-body-lg text-text-main flex h-[3.5rem] flex-1 items-center justify-center rounded-[6.25rem] font-extrabold disabled:opacity-60'
              >
                아니오
              </button>
              <button
                type='button'
                onClick={onConfirm}
                disabled={isLoading}
                className='bg-secondary2 text-body-lg text-secondary1 flex h-[3.5rem] flex-1 items-center justify-center rounded-[6.25rem] font-extrabold disabled:opacity-60'
              >
                예
              </button>
            </div>
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
};
