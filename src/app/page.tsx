'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { KakaoLoginButton } from '@/components/kakaoLoginButton';
import { StartButton } from '@/components/startButton';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();

  const handleKakaoLogin = () => {
    const KAKAO_CLIENT_ID = 'e2f4eba4a68c8ff2f5b4e804b7f97e11';
    const origin =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost:3000';

    const redirectUri = `${origin}/oauth/kakao/callback`;

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className='flex flex-col gap-[2.75rem] px-[1.5rem]'>
      <div className='flex flex-col items-center gap-[2.125rem] pt-[2.5rem]'>
        <Image src='/mainLogo.svg' alt='mainLogo' width={280} height={45} />

        <div className='flex flex-col gap-[2.5rem]'>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='text-label-lg text-center leading-[120%] font-extrabold'
          >
            기초부터 실전까지,
            <br />
            당신의 든든한 투자 가이드
          </motion.p>

          <div className='text-body-xl text-text-main flex flex-col gap-[2rem] leading-[120%] font-semibold'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
              className='flex flex-col gap-[0.5rem]'
            >
              <div className='flex justify-center gap-[0.25rem]'>
                <div className='flex'>
                  <p className='text-secondary2 text-label-sm font-bold'>
                    기초 용어 설명
                  </p>
                  부터
                </div>
                <div className='flex'>
                  <p className='text-secondary2 text-label-sm font-bold'>
                    실시간 모의투자
                  </p>
                  까지
                </div>
              </div>

              <div className='flex justify-center'>
                당신만의 투자 원칙을 완성하세요
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 1.0 }}
              className='flex flex-col gap-[0.5rem]'
            >
              <div className='flex justify-center gap-[0.25rem]'>
                <p>검증된 </p>
                <div className='flex'>
                  <p className='text-secondary2 text-label-sm font-bold'>
                    거장의 포트폴리오
                  </p>
                  를 엿보고,
                </div>
              </div>

              <div className='flex justify-center'>
                <div className='flex gap-[0.25rem]'>
                  최적의
                  <div className='flex'>
                    <p className='text-secondary2 text-label-sm font-bold'>
                      맞춤 종목을 추천
                    </p>
                    해 드려요
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-[1rem]'>
        <StartButton onClick={() => router.push('/intro')} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 1.8 }}
        >
          <KakaoLoginButton onClick={handleKakaoLogin} />
        </motion.div>
      </div>
    </div>
  );
}
