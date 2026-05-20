import React from 'react';
import { ScrapIcon } from '@/components/icons/scrapIcon';
import Link from 'next/link';

interface TermsListCardProps {
  name: string;
  termsSectionId: string;
  termsId: string;
}

export const TermsListCard = ({
  name,
  termsSectionId,
  termsId,
}: TermsListCardProps) => {
  return (
    <Link
      href={`/terms/${termsSectionId}/${termsId}`}
      className='w-full flex-shrink-0'
    >
      <div className='bg-secondary1 shadow-card-shadow relative flex h-[3.3125rem] w-full cursor-pointer items-center justify-center rounded-[62.5rem] py-[0.75rem]'>
        <div className='absolute left-[1.5rem] flex items-center justify-center'>
          <ScrapIcon />
        </div>
        <p className='text-body-lg text-center font-extrabold'>{name}</p>
      </div>
    </Link>
  );
};
