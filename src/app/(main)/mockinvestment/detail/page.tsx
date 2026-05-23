'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import BackButtonField from '@/components/backButtonField';
import BottomButton from '@/components/bottomButton';
import { BulbIcon } from '@/components/icons/bulbIcon';
import { KeyIcon } from '@/components/icons/keyIcon';
import { PencilIcon } from '@/components/icons/pencilIcon';
import { CompanyInformationCard } from '@/features/mockinvestment/detail/companyInformationCard';
import {
  PeriodToggle,
  PeriodValue,
} from '@/features/mockinvestment/detail/periodToggle';
import { SwitchChartButton } from '@/features/mockinvestment/detail/switchChartButton';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const DetailPage = () => {
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodValue | undefined>(
    '1d',
  );

  const handleAllClick = () => {
    setIsAllSelected((prev) => {
      const next = !prev;
      if (next) setSelectedPeriod(undefined);
      return next;
    });
  };

  return (
    <motion.div
      className='flex w-full flex-col px-4 pt-4'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <BackButtonField color='secondary2' label='기업명' />

      <motion.div
        variants={itemVariants}
        className='flex flex-col items-center justify-center pt-[1.75rem]'
      >
        <div className='text-secondary2 text-label-xl text-center leading-[120%] font-semibold'>
          <span className='font-extrabold'>
            {'{'}기업명{'}'}
          </span>
          의 현재 가격은
          <br />
          nn,nnn,nnn원 이에요
        </div>

        <div className='text-text-main text-body-xl pt-[0.5rem] text-center font-semibold'>
          어제보다 +-OO.O% 올랐/내렸어요
        </div>

        <div className='flex h-auto w-full items-center justify-between pt-[1.5rem]'>
          <motion.button
            type='button'
            onClick={handleAllClick}
            whileTap={{ scale: 0.9 }}
            className={`flex w-[4.2875rem] cursor-pointer items-center justify-center rounded-[6.25rem] py-[0.5rem] text-center transition-colors duration-200 outline-none ${
              isAllSelected
                ? 'bg-secondary2 border-secondary2 border text-white'
                : 'text-secondary2 border-secondary2 border bg-transparent'
            }`}
          >
            <span className='text-body-md font-semibold'>전체</span>
          </motion.button>
          <SwitchChartButton />
        </div>

        <div className='pt-[0.5rem]'>
          <PeriodToggle
            value={selectedPeriod}
            onValueChange={(val: PeriodValue) => {
              setSelectedPeriod(val);
              setIsAllSelected(false);
            }}
          />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className='bg-secondary2 text-secondary1 mt-[2.5rem] h-[14.25rem] w-full text-center'
      >
        차트 위치
      </motion.div>

      <motion.div
        variants={itemVariants}
        className='text-text-main text-label-sm pt-[2.5rem] text-center leading-[120%] font-bold'
      >
        <span>
          {'{'}기업명{'}'}이 어떤 회사냐면요
        </span>{' '}
        ...
      </motion.div>

      <div className='flex flex-col gap-[0.75rem] pt-[1.75rem] pb-[7.75rem]'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CompanyInformationCard
            icon={<BulbIcon />}
            text={
              <>
                아이폰, 아이패드, 맥 등 스마트폰과 노트북을 만들어요
                <br />
                아이폰으로 버는 돈이 절반 이상이에요
              </>
            }
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CompanyInformationCard
            icon={<PencilIcon />}
            text={
              <>
                전 세계 기업가치 1위 회사예요.
                <br />
                이 말은 전 세계 회사 중에 실적과 미래 성장 가능성이
                <br />
                가장 높다고 평가된다는 뜻이에요
              </>
            }
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CompanyInformationCard
            icon={<KeyIcon />}
            text={
              <>
                사업 모델이 탄탄하고, 현금을 많이 가지고 있어요.
                <br />
                사람들은 주식 투자할 때 현금을 많이 가지고 있으면
                <br />
                비교적 안전하다고 생각해요
              </>
            }
          />
        </motion.div>
      </div>

      <BottomButton label='선택하기' />
    </motion.div>
  );
};

export default DetailPage;
