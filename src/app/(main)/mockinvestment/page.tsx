'use client';

import BackButtonField from '@/components/backButtonField';
import { CompanyCard } from '@/features/mockinvestment/companyCard';
import { CompanySearchInput } from '@/features/mockinvestment/companySearchInput';
import { FieldButton, FieldType } from '@/features/mockinvestment/fieldButton';
import MockInvestmentHeader from '@/features/mockinvestment/mockInvestmentHeader';

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
    <div className='flex h-screen w-full flex-col'>
      <MockInvestmentHeader />
      <div className='flex flex-col px-[1rem] py-[1.5rem]'>
        <CompanySearchInput />
        <div className='flex w-full gap-[1rem] overflow-x-auto pt-[1.5rem] whitespace-nowrap'>
          {displayFields.map((field) => (
            <FieldButton key={field} fieldType={field} />
          ))}
        </div>
        <div className='flex w-full flex-col items-center justify-center gap-[0.75rem] pt-[1.25rem] pb-[0.875rem]'>
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
        </div>
      </div>
    </div>
  );
};

export default MockInvestmentPage;
