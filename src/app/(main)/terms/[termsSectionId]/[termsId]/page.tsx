'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BackButtonField from '@/components/backButtonField';
import BottomButton from '@/components/bottomButton';
import { TermsScrapButton } from '@/features/terms/termsScrapButton';
import { motion } from 'framer-motion';
import {
  useGetTermDetail,
  useGetTermsByCategory,
} from '@/api/generated/endpoints/주식-용어/주식-용어';

interface PageProps {
  params: Promise<{
    termsSectionId: string;
    termsId: string;
  }>;
}

const SECTION_TO_CATEGORY_ID: Record<string, number> = {
  basic: 1,
  diagnosis: 2,
  chart: 3,
  trading: 4,
};

const CATEGORY_CONFIGS: Record<
  string,
  { title: string; textColor: string; bgColor: string }
> = {
  basic: {
    title: '기초 개념',
    textColor: 'text-main1',
    bgColor: 'bg-main1',
  },
  diagnosis: {
    title: '기업 진단',
    textColor: 'text-main2',
    bgColor: 'bg-main2',
  },
  chart: {
    title: '차트 분석',
    textColor: 'text-main3',
    bgColor: 'bg-main3',
  },
  trading: {
    title: '거래 실무',
    textColor: 'text-main4',
    bgColor: 'bg-main4',
  },
};

const getTermImageName = (sectionId: string, termName: string) => {
  if (!termName) return '';
  const match = termName.match(/\((.*?)\)/);
  const eng = match ? match[1].trim().toUpperCase() : '';

  if (sectionId === 'diagnosis') {
    const engTerms = ['BPS', 'EPS', 'PBR', 'PER', 'ROE'];
    const found = engTerms.find((key) => termName.toUpperCase().includes(key));
    if (found) return found;
    if (
      termName.includes('매출액') ||
      termName.includes('영업이익') ||
      termName.includes('당기순이익')
    )
      return '매출액영업이익당기순이익 ';
    if (termName.includes('배당 수익률') || termName.includes('배당수익률'))
      return '배당 수익률';
    if (termName.includes('공시')) return '공시';
    if (termName.includes('재무제표')) return '재무제표';
    if (termName.includes('증자')) return '증자';
  }

  if (sectionId === 'basic') {
    if (termName.includes('상한가') && termName.includes('하한가'))
      return '상한가하한가';
    if (termName.includes('고가') && termName.includes('저가'))
      return '고가저가';
    if (termName.includes('거래량')) return '거래량';
    if (termName.includes('시가총액')) return '시가총액';
    if (termName.includes('시가')) return '시가';
    if (termName.includes('종가')) return '종가';
    if (termName.includes('코스닥')) return '코스닥';
    if (termName.includes('코스피')) return '코스피';
    if (termName.includes('매수')) return '매수';
    if (termName.includes('매도')) return '매도';
  }

  if (sectionId === 'chart') {
    if (termName.includes('골든크로스')) return '골든크로스';
    if (termName.includes('데드크로스')) return '데드크로스';
    if (termName.includes('정배열') && termName.includes('역배열'))
      return '정배열역배열';
    if (termName.includes('양봉') && termName.includes('음봉'))
      return '양봉음봉';
    if (termName.includes('거래량')) return '거래량';
    if (termName.includes('박스권')) return '박스권';
    if (termName.includes('보조지표')) return '보조지표';
    if (termName.includes('이동평균선')) return '이동평균선';
    if (termName.includes('캔들차트')) return '캔들차트';
    if (termName.includes('지지선') && termName.includes('저항선'))
      return '저항선지지선';
  }

  if (sectionId === 'trading') {
    if (
      termName.toUpperCase().includes('VI') ||
      termName.includes('변동성 완화장치')
    )
      return 'VI';
    if (termName.includes('물타기') && termName.includes('불타기'))
      return '물타기불타기';
    if (termName.includes('미수거래') && termName.includes('반대매매'))
      return '미수거래반대매매';
    if (termName.includes('배당락')) return '배당락';
    if (termName.includes('배당')) return '배당';
    if (termName.includes('보통주') && termName.includes('우선주'))
      return '보통주우선주';
    if (termName.includes('손절매') && termName.includes('익절매'))
      return '손절매익절매';
    if (termName.includes('예수금') && termName.includes('증거금'))
      return '예수금증거금';
    if (termName.includes('지정가') && termName.includes('시장가'))
      return '지정가시장가';
    if (termName.includes('호가')) return '호가';
  }

  return termName.replace(/\s+/g, '').replace(/,/g, '');
};

const Page = ({ params }: PageProps) => {
  const { termsSectionId, termsId } = React.use(params);
  const router = useRouter();

  const { data, isLoading } = useGetTermDetail(Number(termsId));
  const term = data?.data;

  const categoryId = SECTION_TO_CATEGORY_ID[termsSectionId] || 1;
  const { data: listData } = useGetTermsByCategory(categoryId);
  const termsList = listData?.data?.terms || [];

  const config = CATEGORY_CONFIGS[termsSectionId] || CATEGORY_CONFIGS.basic;

  if (isLoading) {
    return (
      <div className='bg-background flex h-[100vh] w-[100vw] items-center justify-center'>
        <p className='text-body-lg animate-pulse font-extrabold text-gray-400'>
          학습 자료를 불러오는 중...
        </p>
      </div>
    );
  }

  if (!term) {
    return (
      <div className='bg-background flex h-[100vh] w-[100vw] flex-col items-center justify-center gap-4 p-[2rem]'>
        <p className='text-body-lg font-extrabold text-gray-400'>
          학습 자료를 찾을 수 없습니다.
        </p>
        <BottomButton
          bgColor={config.bgColor}
          label='목록으로 돌아가기'
          onClick={() => router.push(`/terms/${termsSectionId}`)}
        />
      </div>
    );
  }

  const currentIndex = termsList.findIndex((t) => t.termId === term.termId);
  const nextTerm =
    currentIndex !== -1 && currentIndex < termsList.length - 1
      ? termsList[currentIndex + 1]
      : null;

  const handleNext = () => {
    if (nextTerm) {
      router.push(`/terms/${termsSectionId}/${nextTerm.termId}`);
    } else {
      router.push(`/terms/${termsSectionId}`);
    }
  };

  const description = term.description || '';
  const lines = description.split('\n');
  const shortDesc = lines[0] || '';
  const detailedDesc = lines.slice(1).join('\n') || description;

  return (
    <div>
      <div className='flex flex-col gap-[2rem] p-[1rem]'>
        <div className='flex items-center justify-between'>
          <BackButtonField
            color='secondary2'
            label={term.categoryName || config.title}
            href={`/terms/${termsSectionId}`}
          />
          <div className='right-0 px-[0.375rem]'>
            <TermsScrapButton
              termId={term.termId}
              initialScrapped={term.isScrapped}
            />
          </div>
        </div>

        {/* 용어 이미지 자리 */}
        <div className='mx-auto flex h-[18.75rem] w-[18.75rem] items-center justify-center'>
          <Image
            src={`/terms/${termsSectionId}/${getTermImageName(termsSectionId, term.termName || '')}.svg`}
            alt={term.termName || ''}
            width={300}
            height={300}
            className='h-auto w-full object-contain'
            priority
          />
        </div>
      </div>

      <div className='bg-secondary1 shadow-card-shadow relative left-1/2 flex h-[60rem] w-[60rem] -translate-x-1/2 flex-col items-center gap-[1rem] rounded-[77.125rem] pt-[2.25rem]'>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className={`text-heading-sm text-center ${config.textColor} leading-[100%] font-extrabold`}
        >
          {term.termName
            ?.split(/(?=\()/)
            .map((parenPart: string, pIndex: number) => {
              const isParen = pIndex > 0;
              const ampParts = parenPart.split('&').map((s) => s.trim());
              return (
                <React.Fragment key={pIndex}>
                  {ampParts.map((ampPart, aIndex) => {
                    const isAmpLineBreak = aIndex > 0;
                    if (isParen) {
                      return (
                        <span
                          key={aIndex}
                          className='text-label-lg mt-[0.25rem] block leading-[100%]'
                        >
                          {ampPart}
                        </span>
                      );
                    }
                    return (
                      <React.Fragment key={aIndex}>
                        {isAmpLineBreak ? (
                          <span className='mt-[0.25rem] block leading-[100%]'>
                            {ampPart}
                          </span>
                        ) : (
                          ampPart
                        )}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })}
        </motion.h1>
        <div className='flex flex-col gap-[0.5rem] px-[20rem] text-center'>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            className='text-label-md text-text-main leading-[120%] font-extrabold'
          >
            {shortDesc}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
            className='text-body-lg text-text-main w-[18rem] self-center leading-[120%] font-semibold'
          >
            {detailedDesc.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx !== detailedDesc.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </motion.p>
        </div>
      </div>

      <BottomButton
        bgColor={config.bgColor}
        label={nextTerm ? '다음으로' : '학습 완료'}
        onClick={handleNext}
      />
    </div>
  );
};

export default Page;
