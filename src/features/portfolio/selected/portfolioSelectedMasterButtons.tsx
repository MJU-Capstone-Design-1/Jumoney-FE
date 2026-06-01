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
        className='bg-primary hover:bg-primary flex h-[4rem] w-[4rem] items-center justify-center rounded-full p-0 shadow-none [&_svg]:!h-[24px] [&_svg]:!w-[24px]'
        onClick={() =>
          router.push(
            `/portfolio/selected/detail?mode=sub1&masterId=${masterId}`,
          )
        }
      >
        <PortfolioDefaultInformationIcon />
      </Button>
      <Button
        className='bg-primary hover:bg-primary flex h-[4rem] w-[4rem] items-center justify-center rounded-full p-0 shadow-none [&_svg]:!h-[24px] [&_svg]:!w-[24px]'
        onClick={() =>
          router.push(
            `/portfolio/selected/detail?mode=reverse&masterId=${masterId}`,
          )
        }
      >
        <PortfolioDetailInformationIcon />
      </Button>
    </motion.div>
  );
};
