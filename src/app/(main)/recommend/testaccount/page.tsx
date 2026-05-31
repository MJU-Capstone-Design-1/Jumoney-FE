'use client';

import BackButtonField from '@/components/backButtonField';
import { motion } from 'framer-motion';

const TestAccountPage = () => {
  return (
    <div className='bg-primary flex h-[100dvh] w-full flex-col overflow-hidden pt-[2.75rem]'>
      <div className='relative z-0 mb-[-1.25rem] flex shrink-0 items-center justify-center gap-[0.3125rem] px-[1rem]'>
        <button className='bg-background shadow-card-shadow text-body-md flex h-[3.625rem] flex-1 items-center justify-center rounded-[1.125rem] font-extrabold'>
          <span className='mt-[-1rem]'>안정형</span>
        </button>
        <button className='bg-primaryMuted shadow-card-shadow text-body-md flex h-[3.625rem] flex-1 items-center justify-center rounded-[1.125rem] font-extrabold'>
          <span className='mt-[-1rem]'>배당형</span>
        </button>
        <button className='bg-primaryMuted shadow-card-shadow text-body-md flex h-[3.625rem] flex-1 items-center justify-center rounded-[1.125rem] font-extrabold'>
          <span className='mt-[-1rem]'>성장형</span>
        </button>
        <button className='bg-primaryMuted shadow-card-shadow text-body-md flex h-[3.625rem] flex-1 items-center justify-center rounded-[1.125rem] font-extrabold'>
          <span className='mt-[-1rem]'>공격형</span>
        </button>
      </div>

      <div className='bg-background shadow-card-shadow relative z-10 flex w-full flex-1 flex-col overflow-hidden rounded-t-[2rem] px-[1.5rem] py-[1.5rem]'>
        <div className='mb-[1.25rem] shrink-0'>
          <BackButtonField color='secondary2' label='모의 운용 계정' />
        </div>
        <div className='flex-1 overflow-y-auto'>
          <p className='text-body-md text-text-main text-center leading-[120%] font-semibold'>
            2026년 5월 27일부터 매일 추천 종목 1종목을 1주 매수하는
            <br />
            모의 운용 계정이에요. 추천 로직의 신뢰성을 확인해볼 수 있어요.
          </p>
          <div className='mt-[2rem] text-center'>
            <div className='text-label-xl mt-[1.25rem] mb-[1.25rem] font-extrabold'>
              철벽 수비형 자산가
            </div>
            <div className='text-body-md flex justify-center gap-[0.4375rem] font-semibold'>
              <span className='bg-primary text-secondary1 rounded-full px-[0.8125rem] py-[0.75rem]'>
                안정적인 자산 보호
              </span>
              <span className='bg-main3 rounded-full px-[0.8125rem] py-[0.75rem]'>
                위험 감수 매우 낮음
              </span>
              <span className='bg-main1 rounded-full px-[0.8125rem] py-[0.75rem]'>
                장기(1년)
              </span>
            </div>
          </div>

          <div className='mt-[1.75rem] flex flex-col px-[0.5rem]'>
            <div className='bg-primary my-[1rem] h-[0.375rem] w-full rounded-full' />
            <div className='text-label-sm flex flex-col gap-1 font-bold'>
              <div className='flex justify-between'>
                <span>총 매수 금액</span>
                <span>₩ nn,nnn,nnn</span>
              </div>
              <div className='flex justify-between'>
                <span>총 평가 금액</span>
                <span>₩ nn,nnn,nnn</span>
              </div>
              <div className='bg-primary my-[1rem] h-[0.375rem] w-full rounded-full' />
              <div className='flex justify-between'>
                <span>운용 손익</span>
                <span className='text-text-up'>+ ₩ nn,nnn</span>
              </div>
              <div className='flex justify-between'>
                <span>운용 수익률</span>
                <span className='text-text-up'>+ nn.n%</span>
              </div>
              <div className='bg-primary my-[1rem] h-[0.375rem] w-full rounded-full' />
              <div className='flex justify-between'>
                <span>최근 거래일</span>
                <span>2026.05.29</span>
              </div>
              <div className='mb-[1.25rem] flex px-[0.5rem] pt-[1.25rem]'>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className='flex flex-col items-center justify-center'
                >
                  <div className='text-label-sm font-extrabold'>총 자산</div>
                  <div className='text-label-md font-extrabold'>
                    ₩ nn,nnn,nnn
                  </div>
                </motion.div>
                <div className='bg-secondary2 mr-[2.625rem] ml-[1.5rem] h-[3.75rem] w-[1px]' />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className='flex flex-col items-center justify-center'
                >
                  <div className='text-label-sm font-extrabold'>총 수익률</div>
                  <div className='text-label-md text-text-up font-extrabold'>
                    +nn.n%
                  </div>
                </motion.div>
              </div>

              <div className='bg-secondary1 shadow-card-shadow flex w-full flex-col gap-[1rem] rounded-[2rem] px-[1.5rem] py-[1rem] text-left'>
                <div className='flex w-full items-start justify-between'>
                  <div className='flex min-w-0 items-center gap-[0.5rem]'>
                    <div className='bg-background h-[3rem] w-[3rem] flex-shrink-0 rounded-full' />

                    <div className='flex flex-col gap-[0.375rem]'>
                      <div className='flex gap-[0.25rem]'>
                        <div className='text-secondary2 text-body-xl truncate font-extrabold'>
                          삼성전자
                        </div>
                        <div className='text-text-main text-body-md mt-[0.1875rem] font-bold'>
                          ·3주
                        </div>
                        <div className='text-main2 bg-default text-body-sm mb-[0.125rem] ml-[0.5rem] flex h-[1.625rem] w-[5.25rem] items-center justify-center rounded-[6.25rem] font-bold'>
                          #투자방식방식
                        </div>
                      </div>
                      <div className='flex gap-[0.5rem]'>
                        <div className='text-body-sm text-text-main font-semibold'>
                          현재가: ₩ 19,560{' '}
                        </div>
                        <div className='text-body-sm text-text-main font-semibold'>
                          평균 매수가: ₩ 19,733
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-[0.5rem]'>
                  <div className='text-body-md flex items-center gap-[0.25rem] font-extrabold'>
                    <span>₩ 210,000 (-0.88% ▲)</span>
                  </div>
                  <div className='bg-secondary2 flex h-[0.75rem] w-[0.0625rem]' />
                  <p className='text-body-md font-semibold'>- ₩ 520</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAccountPage;
