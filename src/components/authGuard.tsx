'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getAccessToken } from '@/api/custom-instance';

const publicPaths = ['/', '/intro', '/oauth/kakao/callback', '/quiz'];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const token = getAccessToken();
    const isPublicPath = publicPaths.includes(pathname);

    if (token) {
      if (pathname === '/' || pathname === '/intro') {
        router.replace('/home');
      }
    } else {
      if (!isPublicPath) {
        router.replace('/');
      }
    }
  }, [mounted, pathname, router]);

  if (!mounted) {
    return null;
  }

  const token = getAccessToken();
  const isPublicPath = publicPaths.includes(pathname);

  // 리다이렉트 조건에 해당하면 화면을 렌더링하지 않음
  if (token && (pathname === '/' || pathname === '/intro')) {
    return null;
  }

  if (!token && !isPublicPath) {
    return null;
  }

  return <>{children}</>;
}
