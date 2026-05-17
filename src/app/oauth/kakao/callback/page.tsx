'use client';

import React, { Suspense } from 'react';
import KakaoCallbackContent from './callback-content';

export default function KakaoCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-screen flex-col items-center justify-center px-6 text-white'>
          <div className='w-full max-w-md space-y-6 text-center'>
            <div className='relative flex items-center justify-center'>
              <div className='h-16 w-16 animate-spin rounded-full border-4 border-t-yellow-400 border-r-transparent border-b-transparent border-l-transparent'></div>
              <div className='absolute flex h-12 w-12 items-center justify-center rounded-full'>
                <span className='font-bold text-yellow-400'>J</span>
              </div>
            </div>
            <h2 className='text-2xl font-bold tracking-tight'>로딩 중...</h2>
          </div>
        </div>
      }
    >
      <KakaoCallbackContent />
    </Suspense>
  );
}
