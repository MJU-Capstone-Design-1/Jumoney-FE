'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useKakaoLogin } from '@/api/generated/endpoints/auth-controller/auth-controller';
import { setAccessToken } from '@/api/custom-instance';

export default function KakaoCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');

  // code가 존재할 때만 API를 호출하도록 enabled 설정
  const { data, isLoading, error, isSuccess } = useKakaoLogin(
    { code: code || '' },
    {
      query: {
        enabled: !!code,
        retry: false,
      },
    },
  );

  // 1. 에러 메시지 계산 (Derived State - React 공식 가이드 권장 방식)
  let errorMsg = '';
  if (!code) {
    errorMsg = '카카오 로그인 인증 코드가 올바르지 않습니다.';
  } else if (error) {
    errorMsg = '카카오 로그인 중 오류가 발생했습니다. 다시 시도해 주세요.';
  } else if (isSuccess && data && !data.accessToken) {
    errorMsg = '로그인 응답에 토큰이 누락되었습니다.';
  }

  // 2. 로그인 성공 시 처리 (Side Effect - 라우팅 및 외부 데이터 보관만 처리하여 setState 폭포 방지)
  useEffect(() => {
    if (isSuccess && data?.accessToken) {
      // access token 저장
      setAccessToken(data.accessToken);

      // 메인 추천 페이지(/recommend)로 이동
      router.replace('/recommend');
    }
  }, [isSuccess, data, router]);

  // 3. 에러 발생 시 콘솔 로그 출력 (부수 효과)
  useEffect(() => {
    if (error) {
      console.error('카카오 로그인 에러:', error);
    }
  }, [error]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-6 text-white'>
      <div className='w-full max-w-md space-y-6 text-center'>
        {isLoading && !errorMsg ? (
          <>
            {/* 로딩 스피너 및 고급 애니메이션 효과 */}
            <div className='relative flex items-center justify-center'>
              <div className='h-16 w-16 animate-spin rounded-full border-4 border-t-yellow-400 border-r-transparent border-b-transparent border-l-transparent'></div>
              <div className='absolute flex h-12 w-12 items-center justify-center rounded-full bg-[#1b1e23]'>
                <span className='font-bold text-yellow-400'>J</span>
              </div>
            </div>
            <h2 className='text-2xl font-bold tracking-tight'>
              카카오 로그인 중...
            </h2>
            <p className='text-sm leading-relaxed text-gray-400'>
              안전하게 로그인 처리를 진행하고 있습니다.
              <br />
              잠시만 기다려 주세요.
            </p>
          </>
        ) : errorMsg ? (
          <>
            <div className='flex items-center justify-center'>
              <div className='flex h-16 w-16 items-center justify-center rounded-full border border-red-500/30 bg-red-950/50 text-2xl font-bold text-red-400'>
                !
              </div>
            </div>
            <h2 className='text-2xl font-bold tracking-tight text-red-400'>
              로그인 실패
            </h2>
            <p className='text-sm leading-relaxed text-gray-400'>{errorMsg}</p>
            <button
              onClick={() => router.replace('/')}
              className='mt-4 cursor-pointer rounded-xl border px-6 py-3 text-sm font-medium text-gray-200 transition duration-300 hover:bg-gray-800'
            >
              로그인 화면으로 돌아가기
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
