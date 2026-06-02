'use client';

import { RankingUser } from '@/api/generated/model';
import { motion } from 'framer-motion';
import Image from 'next/image';

const MASTER_STATIC_INFO: Record<number, { image: string; bgColor: string }> = {
  1: { image: '/images/warrenBuffetImage.svg', bgColor: 'bg-main1' },
  2: { image: '/images/peterLynchImage.svg', bgColor: 'bg-main2' },
  3: { image: '/images/rayDalioImage.svg', bgColor: 'bg-main3' },
  4: { image: '/images/williamOneilImage.svg', bgColor: 'bg-main4' },
};

interface RankProfileProps {
  user?: RankingUser;
  selectedId: string;
  masterFilter: string;
}

export const RankProfile = ({
  user,
  selectedId,
  masterFilter,
}: RankProfileProps) => {
  const name = user?.nickname || '데이터 없음';
  const asset = user?.totalAsset
    ? `${user.totalAsset.toLocaleString()}원`
    : '-원';

  const profitRate = user?.totalProfitRate || 0;
  const formattedProfit =
    profitRate > 0 ? `+${profitRate.toFixed(2)}%` : `${profitRate.toFixed(2)}%`;

  const profitColor =
    profitRate > 0
      ? 'text-text-up'
      : profitRate < 0
        ? 'text-text-down'
        : 'text-text-main';

  const stocks = user?.representativeStocks || [];

  const masterId = user?.masterId;
  const masterData = masterId ? MASTER_STATIC_INFO[masterId] : null;

  return (
    <motion.div
      key={`${masterFilter}-${selectedId}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='bg-secondary1 shadow-card-shadow flex h-[12.25rem] w-full items-start justify-between rounded-[1.5rem] p-[1rem]'
    >
      <div className='flex flex-col gap-[0.25rem]'>
        {masterData?.image ? (
          <div
            className={`flex h-[4.5rem] w-[4.5rem] flex-shrink-0 items-center justify-center overflow-hidden rounded-full ${masterData.bgColor}`}
          >
            <Image
              src={masterData.image}
              alt={name}
              width={72}
              height={72}
              className='h-full w-full object-cover'
            />
          </div>
        ) : (
          <div className='bg-default h-[4.5rem] w-[4.5rem] rounded-full p-[0.375rem]' />
        )}
        <div className='text-body-xl text-secondary2 ml-[0.375rem] w-[7rem] truncate pt-[0.9375rem] leading-[120%] font-extrabold'>
          {name}
        </div>
        <div className='text-body-md text-text-main ml-[0.375rem] leading-[120%] font-bold'>
          {asset}
        </div>
        <div
          className={`text-body-md ml-[0.375rem] leading-[120%] font-bold ${profitColor}`}
        >
          {formattedProfit}
        </div>
      </div>

      <div className='flex flex-col gap-[0.4375rem] overflow-hidden'>
        {stocks.length > 0 ? (
          stocks.slice(0, 3).map((item, index) => {
            const stockRate = item.profitRate || 0;
            const formattedStockRate =
              stockRate > 0
                ? `+${stockRate.toFixed(2)}%`
                : `${stockRate.toFixed(2)}%`;
            const stockColor =
              stockRate > 0
                ? 'text-text-up'
                : stockRate < 0
                  ? 'text-text-down'
                  : 'text-text-main';

            return (
              <div
                key={index}
                className='bg-sub3 flex h-[3.125rem] w-[11.0625rem] flex-col justify-center rounded-[1.5rem] px-[1.1875rem] py-[0.5rem]'
              >
                <div className='text-body-md text-secondary2 mt-[0.125rem] truncate text-left leading-[120%] font-bold'>
                  {item.stockName || '-'}
                </div>
                <div className='flex w-full items-center justify-between pt-[0.25rem]'>
                  <div className='text-body-sm text-secondary2 leading-[120%] font-semibold'>
                    {item.purchaseAmount
                      ? `${item.purchaseAmount.toLocaleString()}원`
                      : '-원'}
                  </div>
                  <div
                    className={`text-body-sm leading-[120%] font-semibold ${stockColor}`}
                  >
                    {formattedStockRate}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className='text-body-md text-text-main mt-[4rem] text-center font-semibold'>
            보유 종목이 없습니다.
          </div>
        )}
      </div>
    </motion.div>
  );
};
