'use client';

import { BottomTabBar } from '@/components/bottomTabBar';
import { CompanyCard } from '@/features/mockinvestment/companyCard';
import { CompanySearchInput } from '@/features/mockinvestment/companySearchInput';
import { FieldButton, FieldType } from '@/features/mockinvestment/fieldButton';
import MockInvestmentHeader from '@/features/mockinvestment/mockInvestmentHeader';
import { motion } from 'framer-motion';

const MockInvestmentPage = () => {
  const displayFields: FieldType[] = [
    'it',
    'mobility',
    'finance',
    'bio',
    'steal',
    'energy',
    'communication',
    'staples',
    'mechanic',
    'utility',
  ];

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      <motion.div
        className='flex h-screen w-full flex-col overflow-y-auto pb-[5.625rem]'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MockInvestmentHeader />

        <div className='flex flex-col px-[1rem] py-[1.5rem]'>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <CompanySearchInput />
          </motion.div>

          <div className='flex w-full gap-[1rem] overflow-x-auto pt-[1.5rem] whitespace-nowrap'>
            {displayFields.map((field, index) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: 0.3 + index * 0.05,
                }}
              >
                <FieldButton fieldType={field} />
              </motion.div>
            ))}
          </div>

          <div className='flex w-full flex-col items-center justify-center gap-[0.75rem] pt-[1.25rem] pb-[0.875rem]'>
            <motion.div
              className='w-full'
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.8,
              }}
            >
              <CompanyCard />
            </motion.div>

            <motion.div
              className='w-full'
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.9,
              }}
            >
              <CompanyCard />
            </motion.div>

            <motion.div
              className='w-full'
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 1.0,
              }}
            >
              <CompanyCard />
            </motion.div>

            <motion.div
              className='w-full'
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 1.1,
              }}
            >
              <CompanyCard />
            </motion.div>
          </div>
        </div>
      </motion.div>
      <BottomTabBar />
    </div>
  );
};

export default MockInvestmentPage;
