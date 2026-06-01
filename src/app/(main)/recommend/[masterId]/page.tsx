'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import BackButtonField from '@/components/backButtonField';
import RecommendResultCard from '@/components/recommendResultCard';
import FloatingButton from '@/features/recommend/selection/floatingButton';
import CriteriaDescriptionModal from '@/features/recommend/selection/criteriaDescriptionModal';
import { motion, Variants } from 'framer-motion';
import {
  CRITERIA_DESCRIPTIONS,
  LOGIC_CODE_TO_KOREAN,
  MASTERS_DATA,
} from '@/constants/masters';
import BottomButton from '@/components/bottomButton';
import { SectorSelectionBottomsheet } from '@/features/recommend/selection/sectorSelectionBottomsheet';
import { masterSortMetricLabels } from '@/constants/masterLabels';
import {
  useGetMaster,
  useRecommendMaster,
} from '@/api/generated/endpoints/거장의-선택/거장의-선택';
import type {
  MasterOptionResponse,
  MasterChoiceRequest,
  MasterChoiceRequestSectorTypesItem,
} from '@/api/generated/model';
import { useRouter } from 'next/navigation';

type MasterRecommendationSectorTypes = NonNullable<
  MasterChoiceRequest['sectorTypes']
>;

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

export default function MasterRecommendPage({
  params,
}: {
  params: Promise<{ masterId: string }>;
}) {
  const resolvedParams = React.use(params);
  const currentKey = resolvedParams.masterId;

  const router = useRouter();

  const masterIdMapping: Record<string, number> = {
    buffett: 1,
    lynch: 2,
    dalio: 3,
    oneil: 4,
  };
  const targetMasterId = masterIdMapping[currentKey] || 1;

  const { data: masterApiResponse } = useGetMaster(targetMasterId);
  const masterData = masterApiResponse?.data;
  const recommendMutation = useRecommendMaster();

  const masterThemeInfo =
    MASTERS_DATA[currentKey as keyof typeof MASTERS_DATA] ||
    MASTERS_DATA.buffett;
  const modalData =
    CRITERIA_DESCRIPTIONS[currentKey as keyof typeof CRITERIA_DESCRIPTIONS] ||
    CRITERIA_DESCRIPTIONS.buffett;

  const [selectedOptionIds, setSelectedOptionIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimationTrigger, setIsAnimationTrigger] = useState(true);
  const [isSectorBottomSheetOpen, setIsSectorBottomSheetOpen] = useState(false);
  const [selectedSectorTypes, setSelectedSectorTypes] =
    useState<MasterRecommendationSectorTypes>([]);
  const [activeSectorOptionId, setActiveSectorOptionId] = useState<
    number | null
  >(null);

  const submittedOptionIds =
    recommendMutation.variables?.data.selectedOptionIds;
  const submittedSectorTypes = recommendMutation.variables?.data.sectorTypes;
  const recommendedStocks = recommendMutation.data?.data?.recommendations || [];
  const hasSearched = recommendMutation.isSuccess || recommendMutation.isError;

  const toggleCriteria = (option: MasterOptionResponse) => {
    if (option.optionId === undefined) return;

    const optionId = option.optionId;
    if (option.requiresSectorSelection) {
      if (selectedOptionIds.includes(optionId)) {
        setSelectedOptionIds((prev) => prev.filter((id) => id !== optionId));
        setSelectedSectorTypes([]);
        setActiveSectorOptionId(null);
      } else {
        setActiveSectorOptionId(optionId);
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
    const typedSectorType =
      sectorType as MasterRecommendationSectorTypes[number];

    if (currentKey === 'dalio') {
      setSelectedSectorTypes((prev: MasterRecommendationSectorTypes) =>
        prev.includes(typedSectorType)
          ? prev.filter(
              (t: MasterChoiceRequestSectorTypesItem) => t !== typedSectorType,
            )
          : [...prev, typedSectorType],
      );
    } else {
      setSelectedSectorTypes([typedSectorType]);
    }
  };

  const handleSectorConfirm = () => {
    if (activeSectorOptionId !== null) {
      setSelectedOptionIds((prev) =>
        prev.includes(activeSectorOptionId)
          ? prev
          : [...prev, activeSectorOptionId],
      );
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

    const requestData: MasterChoiceRequest = {
      selectedOptionIds,
    };

    if (selectedSectorTypes.length > 0) {
      requestData.sectorTypes = selectedSectorTypes;
    }

    recommendMutation.mutate(
      {
        masterId: targetMasterId,
        data: requestData,
      },
      {
        onSuccess: () => {
          setTimeout(() => setIsAnimationTrigger(true), 40);
        },
        onError: (error) => {
          console.error('추천 종목 조회 실패:', error);
          setTimeout(() => setIsAnimationTrigger(true), 40);
        },
      },
    );
  };

  const isOptionIdsUnchanged =
    submittedOptionIds !== undefined &&
    selectedOptionIds.length === submittedOptionIds.length &&
    selectedOptionIds.every((id) => submittedOptionIds.includes(id));

  const isSectorTypesUnchanged =
    (!submittedSectorTypes && selectedSectorTypes.length === 0) ||
    (submittedSectorTypes !== undefined &&
      selectedSectorTypes.length === submittedSectorTypes.length &&
      selectedSectorTypes.every((type: MasterChoiceRequestSectorTypesItem) =>
        submittedSectorTypes.includes(type),
      ));

  const isButtonDisabled =
    recommendMutation.isPending ||
    selectedOptionIds.length === 0 ||
    (isOptionIdsUnchanged && isSectorTypesUnchanged);

  return (
    <div className='bg-background relative flex min-h-screen w-full flex-col overflow-x-hidden'>
      <FloatingButton
        onClick={() => router.push(`/recommend/${currentKey}/testaccount`)}
      />

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
              'bg-secondary1 relative flex h-[8rem] w-[8rem] items-center justify-center overflow-hidden rounded-full',
              masterThemeInfo.shadow,
            )}
          >
            {masterThemeInfo.image && (
              <Image
                src={masterThemeInfo.image}
                alt={masterThemeInfo.name}
                width={164}
                height={164}
                className='pointer-events-none absolute bottom-0 left-1/2 z-10 h-auto w-full -translate-x-1/2'
                priority
              />
            )}
          </motion.div>
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
          {masterData?.options?.map((option) => {
            const optionId = option.optionId ?? 0;
            const isSelected = selectedOptionIds.includes(optionId);

            const rawContent = option.content || '';
            const displayContent =
              masterSortMetricLabels[rawContent] ||
              LOGIC_CODE_TO_KOREAN[rawContent] ||
              rawContent;

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
        {submittedOptionIds !== undefined && isAnimationTrigger && (
          <div className='mt-[1rem] flex w-full flex-col px-4'>
            <motion.div
              variants={itemVariants}
              initial='hidden'
              animate='show'
              key={`${submittedOptionIds.join(',')}-${submittedSectorTypes?.join(',') ?? ''}`}
              className='flex h-[calc(100vh-29rem)] [scrollbar-width:none] flex-col gap-[1rem] overflow-y-auto overscroll-contain pb-[6rem] [&::-webkit-scrollbar]:hidden'
            >
              {recommendedStocks.map((stock, i) => (
                <RecommendResultCard key={stock.stockId || i} data={stock} />
              ))}

              {hasSearched && recommendedStocks.length === 0 && (
                <div className='text-body-lg text-text-sub py-8 text-center font-extrabold'>
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
