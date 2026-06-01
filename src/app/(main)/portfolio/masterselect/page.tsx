'use client';

import BackButtonField from '@/components/backButtonField';
import { useState } from 'react';
import { MASTERS } from '@/features/portfolio/masterselect/portfolioSelectInformations';
import { PortfolioMasterDetail } from '@/features/portfolio/masterselect/portfolioSelectMasterDetail';
import { PortfolioMasterCarousel } from '@/features/portfolio/masterselect/portfolioSelectMasterCarousel';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioSelectInvestmentPhilosophy } from '@/features/portfolio/masterselect/portfolioSelectInvestmentPhilosophy';
import { useRouter } from 'next/navigation';
import BottomButton from '@/components/bottomButton';
import { useSelectMaster } from '@/api/generated/endpoints/거장-정보/거장-정보';

const Page = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPhilosophyOpen, setIsPhilosophyOpen] = useState(false);
  const selectedMaster = MASTERS[selectedIndex];

  const { mutate: selectMaster } = useSelectMaster();

  const handleSelect = () => {
    selectMaster(
      { masterId: selectedIndex + 1 },
      {
        onSuccess: () => {
          localStorage.setItem('selectedMasterIndex', String(selectedIndex));
          router.push(`/portfolio/selected?master=${selectedIndex}`);
        },
        onError: (err) => {
          console.error('Select master error:', err);
          localStorage.setItem('selectedMasterIndex', String(selectedIndex));
          router.push(`/portfolio/selected?master=${selectedIndex}`);
        },
      },
    );
  };

  return (
    <div className='flex flex-col px-[1rem] pt-[1rem] pb-[8rem]'>
      <div className='pb-[2.125rem]'>
        <BackButtonField color='secondary2' label='거장 포트폴리오' />
      </div>

      <div className='relative w-full'>
        <AnimatePresence mode='popLayout'>
          {!isPhilosophyOpen ? (
            <motion.div
              key='master-view'
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className='w-full'
            >
              <PortfolioMasterDetail
                master={selectedMaster}
                onOpenPhilosophy={() => setIsPhilosophyOpen(true)}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
              >
                <PortfolioMasterCarousel
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key='philosophy-view'
              className='flex w-full flex-col items-center gap-[1.5rem]'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                layoutId='masterName'
                className='text-label-xl z-10 font-extrabold'
              >
                {selectedMaster.name}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className='flex w-full justify-center'
              >
                <PortfolioSelectInvestmentPhilosophy
                  master={selectedMaster}
                  onClose={() => setIsPhilosophyOpen(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomButton label='선택하기' onClick={handleSelect} />
    </div>
  );
};

export default Page;
