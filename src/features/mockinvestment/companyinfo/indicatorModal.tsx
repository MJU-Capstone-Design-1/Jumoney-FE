'use client';

import Image from 'next/image';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface IndicatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IndicatorModal({
  isOpen,
  onClose,
}: IndicatorModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-20 flex items-center justify-center bg-black/60 px-[1.375rem]'
          onClick={onClose}
          style={{ height: '100dvh' }}
        >
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 20,
            }}
            className='relative flex h-[80vh] max-h-[640px] w-full max-w-[20.625rem] flex-col items-center'
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src='/images/modal.svg'
              alt='조건 설명 배경'
              fill
              priority
              className='object-fill'
            />

            <div className='relative flex h-full w-full flex-col px-[1.5rem] pt-[2.625rem] pb-[2.625rem]'>
              <div className='min-h-0 flex-1 overflow-y-auto'>
                <div className='flex w-full flex-col gap-[0.75rem]'>
                  <div className='flex items-center gap-[0.5rem]'>
                    <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                    <span className='text-body-lg text-secondary2 font-bold'>
                      시가총액: 1,853조 2,703억원
                    </span>
                  </div>

                  <div className='flex flex-col gap-[0.25rem]'>
                    <div className='flex items-center gap-[0.5rem]'>
                      <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                      <span className='text-body-lg text-secondary2 font-bold'>
                        배당수익률: 0.5284%
                      </span>
                    </div>
                    <p className='text-body-md text-secondary2 ml-[1rem] leading-[120%] font-semibold whitespace-pre-line'>
                      배당수익률은 현재 주가 대비 1년간 지급되는
                      <br />
                      배당금의 비율을 뜻해요. 만약 주가가 5만 원일 때<br />
                      1주당 2,000원의 배당금을 지급한다면 배당수익률은
                      <br />
                      4%가 돼요. 일반적으로 이 수치가 높을수록 투자금
                      <br />
                      대비 돌려받는 현금이 많아 매력적이라고 평가받아요.
                      <br />
                      다만, 배당수익률은 주가와 반비례하기 때문에 주가
                      <br />
                      급락 시 수치만 일시적으로 치솟을 수 있어 단순
                      <br />
                      수치만으로 판단해서는 안되며, 기업의 재무 상태와
                      <br />
                      배당 지속 가능성을 함께 고려해야 해요.
                    </p>
                  </div>
                  <div className='flex flex-col gap-[0.25rem]'>
                    <div className='flex items-center gap-[0.5rem]'>
                      <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                      <span className='text-body-lg text-secondary2 font-bold'>
                        배당성향: 23.9525%
                      </span>
                    </div>
                    <p className='text-body-md text-secondary2 ml-[1rem] leading-[120%] font-semibold whitespace-pre-line'>
                      배당성향은 기업이 한 해동안 벌어들인 당기순이익
                      <br />
                      중에서 주주에게 배당금으로 지급하는 비율을
                      <br />
                      의미해요. 순수익이 100억 원이고 배당금이
                      <br />
                      40억 원이면 배당성향은 40%에요.
                      <br />
                      이 지표는 기업의 주주환원 정책과 이익 배분
                      <br />
                      의지를 판단하는 핵심 기준이에요.
                    </p>
                  </div>
                  <div className='flex flex-col gap-[0.25rem]'>
                    <div className='flex items-center gap-[0.5rem]'>
                      <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                      <span className='text-body-lg text-secondary2 font-bold'>
                        체결강도: 125.92
                      </span>
                    </div>
                    <p className='text-body-md text-secondary2 ml-[1rem] leading-[120%] font-semibold whitespace-pre-line'>
                      체결강도는 당일 매수 체결량을 매도 체결량으로 나눈
                      <br />
                      후 100으로 곱한 수치에요. 체결강도가 100%보다
                      <br />
                      낮으면 체결매도가 많다는 의미여서 매도 신호로
                      <br />
                      활용하고, 100%보다 높으면 체결매수가 많다는
                      <br />
                      의미이므로 매수 신호로 활용해요. 그러나, 주가가
                      <br />
                      하락하거나 조정을 받는 날에도 체결강도가 높게
                      <br />
                      유지된다면, 시장에서 눈에 띄지 않게 주식을 사들이는
                      <br />
                      매집이 일어나고 있을 가능성이 커요.
                    </p>
                  </div>
                  <div className='flex flex-col gap-[0.25rem]'>
                    <div className='flex items-center gap-[0.5rem]'>
                      <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                      <span className='text-body-lg text-secondary2 font-bold'>
                        기관 순매수: 22,999,299주
                      </span>
                    </div>
                    <p className='text-body-md text-secondary2 ml-[1rem] leading-[120%] font-semibold whitespace-pre-line'>
                      기관 순매수는 기관 투자자가 일정 기간동안 매수한
                      <br />
                      주식 수에서 매도한 주식 수를 뺀 값을 말해요.
                      <br />
                      순매수가 +라면 기관이 해당 종목을 더 많이 샀다는
                      <br />
                      뜻이고, -라면 해당 종목을 더 많이 팔았다는 뜻이에요.
                      <br />
                      기관은 개인 투자자보다 훨씬 더 큰 자금력을 가지고
                      <br />
                      있어, 매수·매도 규모가 주가에 직접적인 영향을 미쳐요.
                    </p>
                  </div>
                  <div className='flex items-center gap-[0.5rem]'>
                    <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                    <span className='text-body-lg text-secondary2 font-bold'>
                      매출: 133조 8,734억원
                    </span>
                  </div>
                  <div className='flex items-center gap-[0.5rem]'>
                    <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                    <span className='text-body-lg text-secondary2 font-bold'>
                      영업이익: 57조 2,328억원
                    </span>
                  </div>
                  <div className='flex flex-col gap-[0.25rem]'>
                    <div className='flex items-center gap-[0.5rem]'>
                      <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                      <span className='text-body-lg text-secondary2 font-bold'>
                        부채비율: 30.15%
                      </span>
                    </div>
                    <p className='text-body-md text-secondary2 ml-[1rem] leading-[120%] font-semibold whitespace-pre-line'>
                      부채비율은 기업이 가진 자본 대비 갚아야 할 빚이
                      <br />
                      얼마나 되는지를 나타내는 대표적인 재무 건전성
                      <br />
                      지표에요. 일반적으로 100% 이하면 매우 안전,
                      <br />
                      200% 이하이면 큰 문제는 없다고 간주돼요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
