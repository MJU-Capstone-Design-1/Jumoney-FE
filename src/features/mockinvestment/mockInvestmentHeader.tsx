'use client';

import { useState } from 'react';
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
    <div className='bg-secondary2 text-secondary1 flex flex-col gap-[0.5rem] rounded-[2.5rem] p-[1rem]'>
      <BackButtonField color='secondary1' label='모의 투자' />
      <div className='flex flex-col px-[1rem] pt-[1.25rem]'>
        <div className='text-label-md font-extrabold'>내 투자</div>
        <div className='text-label-xl font-extrabold'>₩ nn,nnn,nnn</div>
      </div>
      <div className='flex px-[0.75rem] pt-[1rem]'>
        <div className='flex flex-col items-center justify-center'>
          <div className='text-label-sm font-extrabold'>총 자산</div>
          <div className='text-label-md font-extrabold'>₩ nn,nnn,nnn</div>
        </div>
        <div className='bg-secondary1 mr-[2.625rem] ml-[1.5rem] h-[3.75rem] w-[1px]' />
        <div className='flex flex-col items-center justify-center'>
          <div className='text-label-sm font-extrabold'>수익률</div>
          <div className='text-label-md text-text-up font-extrabold'>
            +nn.n%
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between px-[0.75rem] pt-[1.75rem] pb-[0.5rem]'>
        <div className='text-label-md font-extrabold'>내 기업</div>
        <MyCompanyToggle
          isExpanded={isExpanded}
          onExpandedChange={handlePressedChange}
        />
      </div>
      {isExpanded && (
        <div className='flex w-full flex-col items-center justify-center gap-[0.75rem] pb-[0.5rem]'>
          <CompanyCard showBadge={false} />
          <CompanyCard showBadge={false} />
          <CompanyCard showBadge={false} />
          <CompanyCard showBadge={false} />
        </div>
      )}
    </div>
  );
};

export default MockInvestmentHeader;
