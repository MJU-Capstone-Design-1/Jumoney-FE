'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { AuthGuard } from '@/components/authGuard';

import { BottomTabBar } from '@/components/bottomTabBar';

// 하단 탭바를 숨길 페이지 경로 목록
const EXCLUDED_PATHS_FOR_BOTTOM_TAB = [
  '/',
  '/recommend',
  '/intro',
  '/oauth/kakao/callback',
  '/terms/*',
  '/portfolio/masterselect',
  '/portfolio/selected/detail',
  '/recommend/*',
  '/mockinvestment/*',
];

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard>
        {children}
        <BottomTabBar excludePaths={EXCLUDED_PATHS_FOR_BOTTOM_TAB} />
      </AuthGuard>
    </QueryClientProvider>
  );
}
