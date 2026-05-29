'use client';

import { MASTER_RANK_DATA, RankData } from '@/constants/rankData';
import { motion } from 'framer-motion';

interface RankProfileProps {
  selectedId: string;
  masterFilter: string;
}

export const RankProfile = ({ selectedId, masterFilter }: RankProfileProps) => {
  const masterData = MASTER_RANK_DATA[masterFilter] || MASTER_RANK_DATA['all'];
  const data: RankData = masterData[selectedId] || masterData['1'];

  return (
    <motion.div
      key={`${masterFilter}-${selectedId}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='bg-secondary1 shadow-card-shadow flex h-[12.25rem] w-full items-start justify-between rounded-[1.5rem] p-[1rem]'
    >
      <div className='flex flex-col gap-[0.25rem]'>
        <div className='bg-default h-[4.5rem] w-[4.5rem] rounded-full p-[0.375rem]' />
        <div className='text-body-xl text-secondary2 ml-[0.375rem] w-[7rem] truncate pt-[0.9375rem] leading-[120%] font-extrabold'>
          {data.name}
        </div>
        <div className='text-body-md text-text-main ml-[0.375rem] leading-[120%] font-bold'>
          {data.asset}
        </div>
        <div className='text-body-md text-text-up ml-[0.375rem] leading-[120%] font-bold'>
          {data.profit}
        </div>
      </div>

      <div className='flex flex-col gap-[0.4375rem]'>
        {data.portfolios.map((item, index) => (
          <div
            key={index}
            className='bg-sub3 flex h-[3.125rem] w-[11.0625rem] flex-col justify-center rounded-[1.5rem] px-[1.1875rem] py-[0.5rem]'
          >
            <div className='text-body-md text-secondary2 mt-[0.125rem] text-left leading-[120%] font-bold'>
              {item.name}
            </div>
            <div className='flex w-full items-center justify-between pt-[0.25rem]'>
              <div className='text-body-sm text-secondary2 leading-[120%] font-semibold'>
                {item.price}
              </div>
              <div className='text-body-sm text-text-up leading-[120%] font-semibold'>
                {item.rate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
