'use client';

import React from 'react';

export default function LoginPage() {
  const handleKakaoLogin = () => {
    const KAKAO_CLIENT_ID = 'e2f4eba4a68c8ff2f5b4e804b7f97e11';
    const origin =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost:3000';

    // 카카오 개발자 콘솔에 등록되어 있는 프론트엔드 리다이렉트 주소로 설정합니다.
    // 5173과 3000 포트 모두 동적으로 대응하기 위해 window.location.origin을 기반으로 처리합니다.
    const redirectUri = `${origin}/oauth/kakao/callback`;

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-6 select-none'>
      <div className='z-10 flex w-full max-w-[390px] flex-col items-center'>
        {/* 카카오 로그인 버튼 */}
        <button
          onClick={handleKakaoLogin}
          className='relative flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-[#FEE500] px-6 py-4 text-[15px] font-bold text-[#191919] shadow-lg shadow-yellow-500/5 transition duration-300 hover:scale-[1.02] hover:bg-[#FDE200] active:scale-[0.98]'
        >
          {/* 카카오 말풍선 SVG 아이콘 */}
          <svg
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='text-[#191919]'
          >
            <path d='M12 3C6.477 3 2 6.48 2 10.75c0 2.76 1.87 5.18 4.67 6.47-.18.66-.66 2.4-0.75 2.76-.12.44.15.43.31.33.13-.08 2.05-1.4 2.87-1.96C10.02 18.47 11 18.5 12 18.5c5.523 0 10-3.48 10-7.75S17.523 3 12 3z' />
          </svg>
          카카오로 3초 만에 시작하기
        </button>
      </div>
    </div>
  );
}
