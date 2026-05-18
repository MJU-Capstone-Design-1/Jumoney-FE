'use client';

import React, { useState } from 'react';
import { HelpIcon } from '@/components/icons/helpIcon';
import {
  SurveyListBottomSheet,
  BottomSheetDetailItem,
} from './surveyListBottomSheet';

interface HelpButtonProps {
  color?: 'secondary1' | 'secondary2';
  items: BottomSheetDetailItem[];
}

export const HelpButton = ({ color, items }: HelpButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className='cursor-pointer'
      >
        <HelpIcon color={color} />
      </div>
      <SurveyListBottomSheet
        isOpen={isOpen}
        onClose={setIsOpen}
        items={items}
      />
    </>
  );
};
