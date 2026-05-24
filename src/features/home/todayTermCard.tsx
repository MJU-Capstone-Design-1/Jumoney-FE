import Image from 'next/image';

export const TodayTermCard = () => {
  return (
    <div className='relative w-full'>
      <Image
        src='/images/todayTermBg.svg'
        alt='오늘의 추천 용어 배경'
        width={343}
        height={198}
        priority
        className='h-auto w-full'
      />
      <div className='absolute inset-0 flex flex-col pt-[1.25rem]'>
        <div className='text-secondary1 flex items-start justify-between px-[1.5rem]'>
          <div className='flex flex-col gap-[0.75rem]'>
            <div className='text-label-md font-extrabold'>타이틀타이틀</div>
            <div className='text-label-sm font-extrabold'>
              서브타이틀타이틀타이틀
            </div>
          </div>
          <div className='bg-default h-[5rem] w-[5rem] items-center justify-center rounded-full' />
        </div>
        <div className='text-secondary1 text-body-md mt-[0.75rem] ml-[1.5rem] leading-[120%] font-semibold'>
          설명설명설명설명설명설명설명설명설명설명설명설명설명설명 <br />
          설명설명설명설명설명설명설명설명설명설명설명설명설명설명 <br />
          설명설명설명설명설명설명설명설명설명설명설명설명설명설명 <br />
          설명설명설명설명설명설명설명설명설명설명설명설명설명설명
        </div>
      </div>
    </div>
  );
};
