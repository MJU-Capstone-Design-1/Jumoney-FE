'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButtonField from '@/components/backButtonField';
import { MyCompanyToggle } from './myCompanyToggle';
import { CompanyCard } from './companyCard';

interface MockInvestmentHeaderProps {
  isExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

const MockInvestmentHeader = ({
  isExpanded: controlledIsExpanded,
  onExpandedChange,
}: MockInvestmentHeaderProps) => {
  const [localIsExpanded, setLocalIsExpanded] = useState(false);
  const isExpanded = controlledIsExpanded ?? localIsExpanded;

  const handlePressedChange = (pressed: boolean) => {
    if (onExpandedChange) {
      onExpandedChange(pressed);
    } else {
      setLocalIsExpanded(pressed);
    }
  };

  return (
    <motion.div
      className='bg-secondary2 text-secondary1 flex flex-col gap-[0.5rem] rounded-[2.5rem] p-[1rem]'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BackButtonField color='secondary1' label='모의 투자' />

      <div className='flex flex-col px-[1rem] pt-[1.25rem]'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className='text-label-md font-extrabold'>내 투자</div>
          <div className='text-label-xl font-extrabold'>₩ nn,nnn,nnn</div>
        </motion.div>
      </div>

      <div className='flex px-[0.75rem] pt-[1rem]'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className='flex flex-col items-center justify-center'
        >
          <div className='text-label-sm font-extrabold'>총 자산</div>
          <div className='text-label-md font-extrabold'>₩ nn,nnn,nnn</div>
        </motion.div>
        <div className='bg-secondary1 mr-[2.625rem] ml-[1.5rem] h-[3.75rem] w-[1px]' />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className='flex flex-col items-center justify-center'
        >
          <div className='text-label-sm font-extrabold'>수익률</div>
          <div className='text-label-md text-text-up font-extrabold'>
            +nn.n%
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className='flex items-center justify-between px-[0.75rem] pt-[1.75rem] pb-[0.5rem]'
      >
        <div className='text-label-md font-extrabold'>내 기업</div>
        <motion.div whileTap={{ scale: 0.8 }}>
          <MyCompanyToggle
            isExpanded={isExpanded}
            onExpandedChange={handlePressedChange}
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className='flex w-full flex-col items-center justify-center gap-[0.75rem] overflow-hidden pb-[0.5rem]'
          >
            <CompanyCard showBadge={false} />
            <CompanyCard showBadge={false} />
            <CompanyCard showBadge={false} />
            <CompanyCard showBadge={false} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MockInvestmentHeader;
