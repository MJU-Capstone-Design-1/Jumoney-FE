import Link from 'next/link';
import { TermsScrapButton } from './termsScrapButton';

const CATEGORY_NAME_TO_SECTION_ID: Record<string, string> = {
  '기초 개념': 'basic',
  '기업 진단': 'diagnosis',
  '차트 분석': 'chart',
  '거래 실무': 'trading',
};

interface TermsIntroScrapCardProps {
  termId: number;
  termName: string;
  categoryName?: string;
}

export const TermsIntroScrapCard = ({
  termId,
  termName,
  categoryName = '기초 개념',
}: TermsIntroScrapCardProps) => {
  const sectionId = CATEGORY_NAME_TO_SECTION_ID[categoryName] || 'basic';
  const displayName =
    termName.length >= 5 ? `${termName.slice(0, 4)}...` : termName;

  return (
    <Link href={`/terms/${sectionId}/${termId}`} className='w-full'>
      <div className='bg-secondary1 shadow-card-shadow flex cursor-pointer items-center gap-[0.5rem] rounded-[1.5rem] p-[1rem]'>
        <div className='bg-background flex h-[3rem] w-[3rem] items-center justify-center rounded-[1rem]'>
          <TermsScrapButton termId={termId} initialScrapped={true} />
        </div>
        <p className='text-label-sm font-extrabold'>{displayName}</p>
      </div>
    </Link>
  );
};
