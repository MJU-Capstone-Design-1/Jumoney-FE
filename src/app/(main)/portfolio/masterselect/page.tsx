'use client';

import BackButtonField from '@/components/backButtonField';
import { useState } from 'react';
import { MASTERS } from '@/features/portfolio/portfolioSelectInformations';
import { PortfolioMasterDetail } from '@/features/portfolio/portfolioSelectMasterDetail';
import { PortfolioMasterCarousel } from '@/features/portfolio/portfolioSelectMasterCarousel';
import { motion } from 'framer-motion';

const Page = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedMaster = MASTERS[selectedIndex];

  return (
    <div className='flex flex-col p-[1rem]'>
      <div className='pb-[2.125rem]'>
        <BackButtonField color='secondary2' label='거장 포트폴리오' />
      </div>

      <PortfolioMasterDetail master={selectedMaster} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
      >
        <PortfolioMasterCarousel
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </motion.div>
    </div>
  );
};

export default Page;
