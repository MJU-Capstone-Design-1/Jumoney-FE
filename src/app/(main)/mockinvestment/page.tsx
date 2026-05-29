'use client';

import { getInitializeAccountMutationOptions } from '@/api/generated/endpoints/모의투자/모의투자';
import { MockInvestmentAccountResponse } from '@/api/generated/model';
import { BottomTabBar } from '@/components/bottomTabBar';
import { CompanyCard } from '@/features/mockinvestment/companyCard';
import { CompanySearchInput } from '@/features/mockinvestment/companySearchInput';
import { FieldButton, FieldType } from '@/features/mockinvestment/fieldButton';
import MockInvestmentHeader from '@/features/mockinvestment/mockInvestmentHeader';
import { useMutation } from '@tanstack/react-query';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

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

  const x = useMotionValue(0);
  const buttonWidth = 48;
  const gap = 16;
  const totalWidth = displayFields.length * (buttonWidth + gap);
  const maxDrag = -(totalWidth - 350);

  const [account, setAccount] = useState<MockInvestmentAccountResponse | null>(
    null,
  );

  const initializeAccountMutation = useMutation(
    getInitializeAccountMutationOptions(),
  );

  useEffect(() => {
    initializeAccountMutation.mutate(undefined, {
      onSuccess: (res) => {
        const accountData = res.data;

        if (accountData === undefined || accountData === null) {
          return;
        }

        setAccount(accountData);

        if (accountData.created) {
          console.log(`계좌 생성 완료. 초기 자본금: ${accountData.seedMoney}`);
        } else {
          console.log(`기존 계좌 로드. 총 자산: ${accountData.totalAsset}`);
        }
      },
      onError: (error) => {
        console.error('모의투자 계좌 초기화에 실패했습니다.', error);
      },
    });
  }, []);

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      <motion.div
        className='flex h-screen w-full flex-col overflow-y-auto pb-[5.625rem]'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MockInvestmentHeader accountData={account} />

        <div className='flex flex-col px-[1rem] py-[1.5rem]'>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <CompanySearchInput />
          </motion.div>

          <div className='flex w-full gap-[1rem] overflow-hidden pt-[1.5rem] whitespace-nowrap'>
            <motion.div
              drag='x'
              dragConstraints={{ left: maxDrag, right: 0 }}
              dragElastic={0.1}
              style={{ x }}
              className='flex cursor-grab gap-[1rem] active:cursor-grabbing'
            >
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
            </motion.div>
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
