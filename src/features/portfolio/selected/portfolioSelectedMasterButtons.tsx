'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioDefaultInformationIcon } from '@/components/icons/portfolioDefaultInformationIcon';
import { PortfolioDetailInformationIcon } from '@/components/icons/PortfolioDetailInformationIcon';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const PortfolioSelectedMasterButtons = ({
  masterId,
}: {
  masterId: number;
}) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.4,
        type: 'spring',
        stiffness: 150,
        damping: 20,
      }}
      className='relative flex justify-between px-[1.75rem] pt-[0.5rem]'
    >
      <Button
        className='bg-primary hover:bg-primary flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center gap-[0.25rem] rounded-full p-0 shadow-none [&_svg]:!h-[24px] [&_svg]:!w-[24px]'
        onClick={() =>
          router.push(
            `/portfolio/selected/detail?mode=sub1&masterId=${masterId}`,
          )
        }
      >
        <PortfolioDefaultInformationIcon />
        <span className='text-body-sm text-secondary1 font-semibold'>
          포트폴리오
        </span>
      </Button>
      <Button
        className='bg-primary hover:bg-primary flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center gap-[0.25rem] rounded-full p-0 shadow-none [&_svg]:!h-[24px] [&_svg]:!w-[24px]'
        onClick={() =>
          router.push(
            `/portfolio/selected/detail?mode=reverse&masterId=${masterId}`,
          )
        }
      >
        <PortfolioDetailInformationIcon />
        <span className='text-body-sm text-secondary1 font-semibold'>
          과거 사례
        </span>
      </Button>
    </motion.div>
  );
};
