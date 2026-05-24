import { SpeechBubble } from '@/components/icons/speechBubble';
import Image from 'next/image';
import { NavigateButton } from './navigateButton';

export const TodayNewsCard = () => {
  return (
    <div className='relative w-full'>
      <Image
        src='/images/todayNewsBackground.svg'
        alt='오늘의 뉴스 배경'
        width={343}
        height={134}
        priority
        className='h-auto w-full'
      />
      <div className='absolute inset-0 flex items-start gap-[1.8125rem] p-[1.5rem]'>
        <SpeechBubble />
        <div className='flex h-full flex-1 flex-col justify-between'>
          <span className='text-body-xl text-secondary2 leading-[120%] font-extrabold'>
            기사제목기사제목기사제목기사 <br />
            기사제목기사제목기사제목 ...
          </span>
          <div className='self-end'>
            <NavigateButton label='바로가기' />
          </div>
        </div>
      </div>
    </div>
  );
};
