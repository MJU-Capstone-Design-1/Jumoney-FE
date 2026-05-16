import React from 'react';
import VerificationButton from './verificationButton';

const RecommendResultCard = () => {
  return (
    <div
      role='button'
      className='bg-secondary1 shadow-card-shadow flex w-full cursor-pointer flex-col gap-[1rem] rounded-[2rem] px-[1.5rem] py-[1rem] text-left'
    >
      <div className='flex w-full items-center justify-between'>
        <div className='flex items-center justify-center gap-[0.5rem]'>
          <div className='bg-primary h-[3rem] w-[3rem] rounded-full' />
          <div className='flex flex-col gap-[0.25rem]'>
            <div className='text-body-xl font-extrabold'>삼성전자</div>
            <div className='text-text-sub text-body-sm flex gap-[0.5rem] font-bold'>
              <div># 종목태그</div>
              <div># 종목태그</div>
            </div>
          </div>
        </div>

        <VerificationButton />
      </div>

      <div className='flex items-center gap-[0.5rem]'>
        <p className='text-body-md font-semibold'>210,000 (+2.4% ▲)</p>
        <div className='bg-secondary2 flex h-[0.75rem] w-[0.0625rem]' />
        <p className='text-body-md font-semibold'>ROE 12.5%</p>
      </div>
    </div>
  );
};

export default RecommendResultCard;
