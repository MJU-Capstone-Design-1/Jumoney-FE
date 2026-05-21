import { TermsScrapButton } from './termsScrapButton';

export const TermsIntroScrapCard = () => {
  return (
    <div className='bg-secondary1 shadow-card-shadow flex items-center gap-[0.5rem] rounded-[1.5rem] p-[1rem]'>
      <div className='bg-background flex h-[3rem] w-[3rem] items-center justify-center rounded-[1rem]'>
        <TermsScrapButton />
      </div>
      <p className='text-label-sm font-extrabold'>용어이름</p>
    </div>
  );
};
