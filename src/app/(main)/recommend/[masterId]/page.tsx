'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import BackButtonField from '@/components/backButtonField';
import RecommendResultCard from '@/components/recommendResultCard';
import FloatingButton from '@/features/recommend/selection/floatingButton';
import CriteriaDescriptionModal from '@/features/recommend/selection/criteriaDescriptionModal';
import { motion, Variants } from 'framer-motion';
import {
  MASTERS_DATA,
  CRITERIA_DESCRIPTIONS,
  LOGIC_CODE_TO_KOREAN,
} from '@/constants/masters';
import BottomButton from '@/components/bottomButton';
import {
  useGetMaster,
  useRecommendMaster,
} from '@/api/generated/endpoints/거장의-선택/거장의-선택';
import { SectorSelectionBottomsheet } from '@/features/recommend/selection/sectorSelectionBottomsheet';

export default function MasterRecommendPage({
  params,
}: {
  params: Promise<{ masterId: string }>;
}) {
  const resolvedParams = React.use(params);
  const currentKey = resolvedParams.masterId;

  const masterIdMapping: Record<string, number> = {
    buffett: 1,
    lynch: 2,
    dalio: 3,
    oneil: 4,
  };

  const targetMasterId = masterIdMapping[currentKey] || 1;

  const { data: masterApiResponse, isLoading } = useGetMaster(targetMasterId);
  const masterData = masterApiResponse?.data;

  const recommendMutation = useRecommendMaster();

  const masterThemeInfo =
    MASTERS_DATA[currentKey as keyof typeof MASTERS_DATA] ||
    MASTERS_DATA.buffett;

  const [selectedOptionIds, setSelectedOptionIds] = useState<
    (string | number)[]
  >([]);
  const [submittedOptionIds, setSubmittedOptionIds] = useState<
    (string | number)[] | null
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimationTrigger, setIsAnimationTrigger] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  const [isSectorBottomSheetOpen, setIsSectorBottomSheetOpen] = useState(false);
  const [selectedSectorTypes, setSelectedSectorTypes] = useState<string[]>([]);
  const [activeSectorOptionId, setActiveSectorOptionId] = useState<
    number | null
  >(null);

  const modalData =
    CRITERIA_DESCRIPTIONS[currentKey as keyof typeof CRITERIA_DESCRIPTIONS] ||
    CRITERIA_DESCRIPTIONS.buffett;

  const toggleCriteria = (option: {
    optionId?: string | number;
    requiresSectorSelection?: boolean;
  }) => {
    const optionId = option.optionId ?? 0;

    if (option?.requiresSectorSelection) {
      if (selectedOptionIds.includes(optionId)) {
        setSelectedOptionIds((prev) => prev.filter((id) => id !== optionId));
        setSelectedSectorTypes([]);
        setActiveSectorOptionId(null);
      } else {
        setActiveSectorOptionId(optionId as number);
        setIsSectorBottomSheetOpen(true);
      }
      return;
    }

    setSelectedOptionIds((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId],
    );
  };

  const handleSectorToggle = (sectorType: string) => {
    const isMultiple = currentKey === 'dalio';

    if (isMultiple) {
      setSelectedSectorTypes((prev) =>
        prev.includes(sectorType)
          ? prev.filter((t) => t !== sectorType)
          : [...prev, sectorType],
      );
    } else {
      setSelectedSectorTypes([sectorType]);
    }
  };

  const handleSectorConfirm = () => {
    if (activeSectorOptionId !== null) {
      setSelectedOptionIds((prev) => [...prev, activeSectorOptionId]);
    }
    setIsSectorBottomSheetOpen(false);
  };

  const handleSectorClose = () => {
    setIsSectorBottomSheetOpen(false);
    if (
      activeSectorOptionId !== null &&
      !selectedOptionIds.includes(activeSectorOptionId)
    ) {
      setSelectedSectorTypes([]);
      setActiveSectorOptionId(null);
    }
  };

  const handleResultSubmit = () => {
    setIsAnimationTrigger(false);

    const validOptionIds = selectedOptionIds.filter(
      (id): id is number => typeof id === 'number',
    );

    const requestData: { selectedOptionIds: number[]; sectorTypes?: string[] } =
      {
        selectedOptionIds: validOptionIds,
      };

    if (selectedSectorTypes.length > 0) {
      requestData.sectorTypes = selectedSectorTypes;
    }

    recommendMutation.mutate(
      {
        masterId: targetMasterId,
        data: requestData as unknown as Parameters<
          typeof recommendMutation.mutate
        >[0]['data'],
      },
      {
        onSuccess: () => {
          setSubmittedOptionIds(selectedOptionIds);
          setHasSearched(true);
          setTimeout(() => {
            setIsAnimationTrigger(true);
          }, 40);
        },
        onError: (error) => {
          console.error('추천 종목 조회 실패:', error);
          setSubmittedOptionIds(selectedOptionIds);
          setHasSearched(true);
          setTimeout(() => {
            setIsAnimationTrigger(true);
          }, 40);
        },
      },
    );
  };

  const isButtonDisabled =
    selectedOptionIds.length === 0 ||
    (submittedOptionIds !== null &&
      selectedOptionIds.length === submittedOptionIds.length &&
      selectedOptionIds.every((id) => submittedOptionIds.includes(id)));

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', bounce: 0.4 },
    },
  };

  const recommendedStocks = recommendMutation.data?.data?.recommendations || [];

  return (
    <div className='bg-background relative flex min-h-screen w-full flex-col overflow-x-hidden'>
      <FloatingButton />

      {/* Background Curved Shape */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={cn(
          'absolute top-[-35rem] left-1/2 z-0 h-[45rem] w-[45rem] -translate-x-1/2 rounded-b-[100%] transition-colors duration-500',
          masterThemeInfo.theme,
        )}
      />

      <div className='relative z-10 w-full flex-col px-4 pt-4'>
        <BackButtonField color='secondary1' label='거장의 선택' />
      </div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='show'
        className='relative z-10 flex w-full flex-col'
      >
        {/* Profile Section */}
        <motion.div
          variants={itemVariants}
          className='mt-[1.625rem] flex flex-col items-center'
        >
          <motion.div
            whileTap={{ scale: 0.95 }}
            className={cn(
              'bg-secondary1 h-[8rem] w-[8rem] rounded-full',
              masterThemeInfo.shadow,
            )}
          />
          <h1 className='text-label-lg text-secondary2 mt-[0.75rem] font-extrabold'>
            {masterData?.masterName || masterThemeInfo.name}
          </h1>
          <div
            className={cn(
              'text-secondary1 text-body-md mt-[0.5rem] items-center rounded-full px-[0.875rem] py-[0.375rem] font-semibold transition-colors duration-500',
              masterThemeInfo.theme,
            )}
          >
            {masterThemeInfo.slogan}
          </div>
          <p className='text-text-sub text-body-md mt-[1.25rem] text-center leading-[120%] font-semibold whitespace-pre-line'>
            {masterThemeInfo.description}
          </p>
        </motion.div>

        {/* Criteria Tags */}
        <motion.div
          variants={itemVariants}
          className='mt-[1.25rem] flex flex-wrap justify-center gap-[0.5rem]'
        >
          {masterData?.options && masterData.options.length > 0
            ? masterData.options.map((option) => {
                const optionId = option.optionId ?? 0;
                const isSelected = selectedOptionIds.includes(optionId);

                const displayContent =
                  (option.content && LOGIC_CODE_TO_KOREAN[option.content]) ||
                  option.content ||
                  '';

                return (
                  <motion.button
                    whileTap={{ scale: 0.9, rotate: isSelected ? -2 : 2 }}
                    key={optionId}
                    onClick={() => toggleCriteria(option)}
                    className={cn(
                      'text-body-md rounded-full border px-[1.125rem] py-[0.5625rem] font-semibold transition-colors duration-200',
                      isSelected
                        ? cn(
                            masterThemeInfo.theme,
                            'text-secondary1 border-transparent',
                          )
                        : 'text-secondary2 border-secondary2 bg-transparent',
                    )}
                  >
                    {displayContent}
                  </motion.button>
                );
              })
            : masterThemeInfo.criteria.map((c) => {
                const isSelected = selectedOptionIds.includes(c);

                const displayContent = LOGIC_CODE_TO_KOREAN[c] || c;

                return (
                  <motion.button
                    whileTap={{ scale: 0.9, rotate: isSelected ? -2 : 2 }}
                    key={c}
                    onClick={() => toggleCriteria({ optionId: c })}
                    className={cn(
                      'text-body-md rounded-full border px-[1.125rem] py-[0.5625rem] font-semibold transition-colors duration-200',
                      isSelected
                        ? cn(
                            masterThemeInfo.theme,
                            'text-secondary1 border-transparent',
                          )
                        : 'text-secondary2 border-secondary2 bg-transparent',
                    )}
                  >
                    {displayContent}
                  </motion.button>
                );
              })}

          <motion.button
            whileTap={{ scale: 0.9, rotate: -2 }}
            onClick={() => setIsModalOpen(true)}
            className='text-body-md bg-sub4 text-secondary1 rounded-full px-[1.125rem] py-[0.5625rem] font-semibold'
          >
            조건 설명
          </motion.button>
        </motion.div>

        {/* Stock Cards */}
        {submittedOptionIds !== null && isAnimationTrigger && (
          <div className='mt-[1rem] flex w-full flex-col px-4'>
            <motion.div
              variants={itemVariants}
              initial='hidden'
              animate='show'
              key={submittedOptionIds.join(',')}
              className='flex h-[calc(100vh-29rem)] [scrollbar-width:none] flex-col gap-[1rem] overflow-y-auto overscroll-contain pb-[6rem] [&::-webkit-scrollbar]:hidden'
            >
              {recommendedStocks.map((stock, i) => (
                <RecommendResultCard key={stock.stockId || i} data={stock} />
              ))}

              {hasSearched && recommendedStocks.length === 0 && (
                <div className='text-body-lg text-text-sub py-8 text-center'>
                  선택하신 조건에 매칭되는 종목이 없어요.
                </div>
              )}
            </motion.div>
          </div>
        )}

        <BottomButton
          label={recommendMutation.isPending ? '조회 중...' : '결과 확인'}
          onClick={handleResultSubmit}
          disabled={isButtonDisabled}
        />
      </motion.div>

      <CriteriaDescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
      />

      <SectorSelectionBottomsheet
        isOpen={isSectorBottomSheetOpen}
        onClose={handleSectorClose}
        selectedSectorTypes={selectedSectorTypes}
        onSectorToggle={handleSectorToggle}
        isMultiple={currentKey === 'dalio'}
        onConfirm={handleSectorConfirm}
      />
    </div>
  );
}
