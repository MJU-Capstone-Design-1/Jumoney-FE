'use client';

import {
  getInitializeAccountMutationOptions,
  useGetSectorStocks,
  useSearchStocks,
} from '@/api/generated/endpoints/모의투자/모의투자';
import {
  MockInvestmentAccountResponse,
  SearchStocksSort,
} from '@/api/generated/model';
import { BottomTabBar } from '@/components/bottomTabBar';
import { CompanyCard } from '@/features/mockinvestment/companyCard';
import { CompanySearchInput } from '@/features/mockinvestment/companySearchInput';
import {
  FIELD_CONFIGS,
  FieldButton,
  FieldType,
} from '@/features/mockinvestment/fieldButton';
import MockInvestmentHeader from '@/features/mockinvestment/mockInvestmentHeader';
import { SearchSortToggle } from '@/features/mockinvestment/SearchSortToggle';
import { keepPreviousData, useMutation } from '@tanstack/react-query';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

const SECTOR_ID_MAP: Record<FieldType, number> = {
  it: 1,
  mobility: 2,
  energy: 3,
  bio: 4,
  mechanic: 5,
  finance: 6,
  communication: 7,
  utility: 8,
  steel: 9,
  staples: 10,
};

const MOCK_INVESTMENT_VISITED_KEY = 'mockInvestmentVisited';

const MockInvestmentPage = () => {
  const displayFields: FieldType[] = [
    'it',
    'mobility',
    'finance',
    'bio',
    'steel',
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

  const [inputValue, setInputValue] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const [selectedSector, setSelectedSector] = useState<FieldType | null>('it');

  const [sortOption, setSortOption] = useState<SearchStocksSort>(
    'NAME_ASC' as SearchStocksSort,
  );

  const { mutate: initializeAccount } = useMutation(
    getInitializeAccountMutationOptions(),
  );

  const { data: searchResponse, isLoading: isSearchLoading } = useSearchStocks(
    {
      keyword: searchKeyword,
      sort: sortOption,
    },
    {
      query: {
        enabled: searchKeyword.trim().length > 0,
        placeholderData: keepPreviousData,
      },
    },
  );

  const selectedSectorLabel = FIELD_CONFIGS[selectedSector || 'it'].label;
  const selectedSectorId = SECTOR_ID_MAP[selectedSector || 'it'];

  const {
    data: sectorResponse,
    isLoading: isSectorLoading,
    isError: isSectorError,
  } = useGetSectorStocks(selectedSectorId, {
    query: {
      enabled: searchKeyword.trim().length === 0,
    },
  });

  const searchedStocks = searchResponse?.data?.stocks || [];
  const sectorStocks = sectorResponse?.data?.stocks || [];

  const handleSearch = () => {
    if (inputValue.trim() === '') {
      return;
    }
    setSearchKeyword(inputValue);
    setSelectedSector(null);
  };

  useEffect(() => {
    window.localStorage.setItem(MOCK_INVESTMENT_VISITED_KEY, 'true');

    initializeAccount(undefined, {
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
  }, [initializeAccount]);

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
            <CompanySearchInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onSearch={handleSearch}
            />
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
                  className={`transition-opacity duration-300 ${
                    selectedSector === null || selectedSector === field
                      ? 'opacity-100'
                      : 'opacity-40'
                  }`}
                >
                  <FieldButton
                    fieldType={field}
                    className={`transition-opacity duration-300 ${
                      selectedSector === null || selectedSector === field
                        ? 'opacity-100'
                        : 'opacity-40'
                    }`}
                    onClick={() => {
                      setSelectedSector((prev) =>
                        prev === field ? prev : field,
                      );
                      setInputValue('');
                      setSearchKeyword('');
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className='flex w-full flex-col items-center justify-center pt-[1.25rem] pb-[0.875rem]'>
            {searchKeyword && searchedStocks.length > 0 && !isSearchLoading && (
              <div className='mb-[1rem] flex w-full justify-start'>
                <SearchSortToggle value={sortOption} onChange={setSortOption} />
              </div>
            )}

            <div className='flex w-full flex-col gap-[0.75rem]'>
              {isSearchLoading ? (
                <div className='text-text-sub text-body-md py-4 text-center font-bold'>
                  검색 중입니다...
                </div>
              ) : searchKeyword && searchedStocks.length === 0 ? (
                <div className='text-text-sub text-body-md py-4 text-center font-bold'>
                  검색 결과가 없습니다.
                </div>
              ) : searchKeyword && searchedStocks.length > 0 ? (
                searchedStocks.map((stock, index) => (
                  <motion.div
                    key={stock.stockId}
                    className='w-full'
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 * index,
                    }}
                  >
                    <CompanyCard
                      stockId={stock.stockId}
                      stockCode={stock.stockCode}
                      stockName={stock.stockName}
                      currentPrice={stock.currentPrice}
                      changeRate={stock.changeRate}
                      tags={stock.tags}
                    />
                  </motion.div>
                ))
              ) : (
                <>
                  {isSectorLoading ? (
                    <div className='text-text-sub text-body-md py-4 text-center font-bold'>
                      {selectedSectorLabel} 섹터의 기업을 조회하고있어요
                    </div>
                  ) : isSectorError ? (
                    <div className='text-text-sub text-body-md py-4 text-center font-bold'>
                      섹터 기업을 불러오지 못했습니다.
                    </div>
                  ) : sectorStocks.length === 0 ? (
                    <div className='text-text-sub text-body-md py-4 text-center font-bold'>
                      표시할 종목이 없습니다.
                    </div>
                  ) : (
                    sectorStocks.map((stock, index) => (
                      <motion.div
                        key={`${selectedSector || 'default'}-${stock.stockId}`}
                        className='w-full'
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 260,
                          damping: 20,
                          delay: 0.1 * index,
                        }}
                      >
                        <CompanyCard
                          stockId={stock.stockId}
                          stockCode={stock.stockCode}
                          stockName={stock.stockName}
                          currentPrice={stock.currentPrice}
                          changeRate={stock.changeRate}
                          tags={stock.tags}
                        />
                      </motion.div>
                    ))
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      <BottomTabBar />
    </div>
  );
};

export default MockInvestmentPage;
