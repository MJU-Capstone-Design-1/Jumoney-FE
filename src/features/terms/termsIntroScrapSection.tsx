import { CommonButton } from '@/components/commonButton';
import { RightArrowIcon } from '@/components/icons/rightArrowIcon';
import { TermsIntroScrapCard } from './termsIntroScrapCard';

export const TermsIntroScrapSection = () => {
  return (
    <div className='flex flex-col gap-[1rem]'>
      <div className='flex justify-between'>
        <p className='text-label-md font-extrabold'>스크랩한 용어</p>
        <CommonButton
          href='/terms/scrap'
          icon={<RightArrowIcon />}
          iconPosition='right'
        >
          전체보기
        </CommonButton>
      </div>

      <div className='grid grid-cols-2 gap-[1rem]'>
        <TermsIntroScrapCard />
        <TermsIntroScrapCard />
      </div>
    </div>
  );
};
