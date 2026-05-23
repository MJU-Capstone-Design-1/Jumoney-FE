'use client';

import { Button } from '@/components/ui/button';
import { KakaoLoginIcon } from '@/components/icons/kakaoLoginIcon';
import React from 'react';

interface KakaoLoginButtonProps {
  onClick: () => void;
}

export const KakaoLoginButton = ({ onClick }: KakaoLoginButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className='flex h-auto w-full items-center justify-center gap-[1rem] rounded-[62.5rem] bg-[#fee500] py-[1rem] text-[#191919] hover:bg-[#FDE200]'
    >
      <KakaoLoginIcon />
      <span className='text-label-sm leading-[120%] font-extrabold'>
        카카오로 로그인하기
      </span>
    </Button>
  );
};
