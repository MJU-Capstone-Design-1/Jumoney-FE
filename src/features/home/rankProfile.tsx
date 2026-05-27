'use client';

import { motion } from 'framer-motion';

interface RankProfileProps {
  selectedId: string;
}

const RANK_DATA: Record<
  string,
  {
    name: string;
    asset: string;
    profit: string;
    portfolios: { name: string; price: string; rate: string }[];
  }
> = {
  '1': {
    name: '이름',
    asset: '₩120,000,000',
    profit: '+12.5%',
    portfolios: [
      { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
      { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
      { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
    ],
  },
  '2': {
    name: '이름이름',
    asset: '₩95,000,000',
    profit: '+8.3%',
    portfolios: [
      { name: '카카오', price: '₩25,000,000', rate: '+10.1%' },
      { name: '네이버', price: '₩35,000,000', rate: '+8.8%' },
      { name: '현대자동차', price: '₩15,000,000', rate: '+4.2%' },
    ],
  },
  '3': {
    name: '이름이름이름',
    asset: '₩80,000,000',
    profit: '+15.1%',
    portfolios: [
      { name: 'LG화학', price: '₩40,000,000', rate: '+12.3%' },
      { name: '셀트리온', price: '₩25,000,000', rate: '+9.8%' },
      { name: 'SK하이닉스', price: '₩20,000,000', rate: '+7.1%' },
    ],
  },
  '4': {
    name: '이름이름이름이름',
    asset: '₩75,000,000',
    profit: '+10.5%',
    portfolios: [
      { name: '카카오', price: '₩30,000,000', rate: '+11.2%' },
      { name: '네이버', price: '₩25,000,000', rate: '+8.9%' },
      { name: '삼성전자', price: '₩20,000,000', rate: '+7.3%' },
    ],
  },
  '5': {
    name: '이름이름이름이름이름',
    asset: '₩60,000,000',
    profit: '+6.8%',
    portfolios: [
      { name: '삼성전자', price: '₩30,000,000', rate: '+6.2%' },
      { name: '현대자동차', price: '₩20,000,000', rate: '+4.5%' },
      { name: 'LG화학', price: '₩10,000,000', rate: '+3.1%' },
    ],
  },
};

export const RankProfile = ({ selectedId }: RankProfileProps) => {
  const data = RANK_DATA[selectedId] || RANK_DATA['1'];

  return (
    <motion.div
      key={selectedId}
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
