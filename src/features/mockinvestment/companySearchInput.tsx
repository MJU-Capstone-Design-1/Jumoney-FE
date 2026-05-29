import { SearchIcon } from '@/components/icons/searchIcon';
import React, { useRef } from 'react';

export interface CompanySearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: () => void;
}

export const CompanySearchInput = ({
  className,
  onSearch,
  ...props
}: CompanySearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onSearch) {
      onSearch();
    }

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-secondary1 shadow-card-shadow flex h-[3rem] w-full flex-shrink-0 items-center justify-between rounded-[2rem] px-[1rem] py-[0.75rem]'
    >
      <input
        ref={inputRef}
        type='search'
        placeholder='기업을 검색해보세요'
        className='text-body-md text-text-main placeholder:text-text-sub flex-1 border-none bg-transparent pr-[1rem] font-semibold outline-none placeholder:font-semibold'
        {...props}
      />
      <button
        type='submit'
        aria-label='검색'
        className='flex cursor-pointer items-center justify-center'
      >
        <SearchIcon />
      </button>
    </form>
  );
};
