import { SearchIcon } from '@/components/icons/searchIcon';
import React from 'react';

type CompanySearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const CompanySearchInput = ({
  className,
  ...props
}: CompanySearchInputProps) => {
  return (
    <div className='bg-secondary1 shadow-card-shadow flex h-[3rem] w-full flex-shrink-0 items-center justify-between rounded-[2rem] px-[1rem] py-[0.75rem]'>
      <input
        type='text'
        placeholder='기업을 검색해보세요'
        className='text-body-md text-text-main placeholder:text-text-sub flex-1 border-none bg-transparent pr-[1rem] font-semibold outline-none placeholder:font-semibold'
        {...props}
      />
      <button
        type='button'
        aria-label='검색'
        className='flex cursor-pointer items-center justify-center'
      >
        <SearchIcon />
      </button>
    </div>
  );
};
