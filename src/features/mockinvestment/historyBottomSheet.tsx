import { useGetOrderHistory } from '@/api/generated/endpoints/모의투자/모의투자';
import { Drawer as DrawerPrimitive } from 'vaul';
import HistoryCard from './historyCard';

interface HistoryBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HistoryBottomSheet({
  isOpen,
  onClose,
}: HistoryBottomSheetProps) {
  const { data: historyResponse, isLoading } = useGetOrderHistory({
    query: {
      enabled: isOpen,
    },
  });

  const orders = historyResponse?.data?.orders || [];

  return (
    <DrawerPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      shouldScaleBackground={false}
    >
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className='fixed inset-0 z-20 bg-black/60' />
        <DrawerPrimitive.Content className='bg-background fixed bottom-0 left-1/2 z-100 flex max-h-[calc(100dvh-8rem)] w-full max-w-[375px] -translate-x-1/2 flex-col overflow-hidden rounded-t-[2.5rem] outline-none focus:outline-none'>
          <DrawerPrimitive.Title className='sr-only'>
            모의투자 거래 내역
          </DrawerPrimitive.Title>
          <div className='bg-default absolute top-[0.75rem] left-1/2 h-[0.25rem] w-[6rem] -translate-x-1/2 rounded-[77.125rem]' />
          <div className='flex min-h-0 flex-1 flex-col gap-[1rem] overflow-y-auto overscroll-contain px-[1.25rem] pt-[2.5rem] pb-[3rem]'>
            {isLoading ? (
              <div className='text-text-sub py-10 text-center text-sm font-bold'>
                거래 내역을 불러오는 중입니다...
              </div>
            ) : orders.length === 0 ? (
              <div className='text-text-sub py-10 text-center text-sm font-bold'>
                거래 내역이 없습니다.
              </div>
            ) : (
              orders.map((order, index) => (
                <HistoryCard
                  key={order.orderId || `${order.executedAt}-${index}`}
                  data={order}
                />
              ))
            )}

            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
}
