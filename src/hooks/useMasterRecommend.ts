// hooks/useMasterRecommend.ts
import React, { useState } from 'react';
import { MASTERS_DATA, CRITERIA_DESCRIPTIONS } from '@/constants/masters';
import {
  useGetMaster,
  useRecommendMaster,
} from '@/api/generated/endpoints/거장의-선택/거장의-선택';

export function useMasterRecommend(currentKey: string) {
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
  const modalData =
    CRITERIA_DESCRIPTIONS[currentKey as keyof typeof CRITERIA_DESCRIPTIONS] ||
    CRITERIA_DESCRIPTIONS.buffett;

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
    if (currentKey === 'dalio') {
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
          setTimeout(() => setIsAnimationTrigger(true), 40);
        },
        onError: (error) => {
          console.error('추천 종목 조회 실패:', error);
          setSubmittedOptionIds(selectedOptionIds);
          setHasSearched(true);
          setTimeout(() => setIsAnimationTrigger(true), 40);
        },
      },
    );
  };

  const isButtonDisabled =
    selectedOptionIds.length === 0 ||
    (submittedOptionIds !== null &&
      selectedOptionIds.length === submittedOptionIds.length &&
      selectedOptionIds.every((id) => submittedOptionIds.includes(id)));

  return {
    masterData,
    masterThemeInfo,
    modalData,
    isLoading,
    recommendMutation,
    selectedOptionIds,
    submittedOptionIds,
    isModalOpen,
    setIsModalOpen,
    isAnimationTrigger,
    hasSearched,
    isSectorBottomSheetOpen,
    selectedSectorTypes,
    toggleCriteria,
    handleSectorToggle,
    handleSectorConfirm,
    handleSectorClose,
    handleResultSubmit,
    isButtonDisabled,
  };
}
