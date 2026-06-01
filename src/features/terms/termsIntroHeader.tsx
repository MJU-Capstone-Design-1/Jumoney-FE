import BackButtonField from '@/components/backButtonField';
import Image from 'next/image';

export const TermsIntroHeader = () => {
  return (
    <div>
      <Image
        src='/images/termsIntroHeaderBg.svg'
        alt='Terms Intro Header'
        width={375}
        height={196}
        className='absolute top-0 left-0 w-full'
      />
      <div className='relative flex flex-col gap-[2rem] p-[1rem]'>
        <BackButtonField
          color='secondary1'
          label='주식 용어 학습'
          href='/home'
        />
        <h1 className='text-label-lg text-secondary1 text-center leading-[120%] font-extrabold'>
          원하시는 학습 카테고리를
          <br />
          선택해주세요
        </h1>
      </div>
    </div>
  );
};
