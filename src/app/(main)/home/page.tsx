import { ProfileIcon } from '@/components/icons/profileIcon';
import { RankProfile } from '@/features/home/rankProfile';
import { TodayNewsCard } from '@/features/home/todayNewsCard';

export const HomePage = () => {
  return (
    <div className='flex h-full flex-col px-[1rem] pt-[1.25rem]'>
      {/* Header */}
      <header className='flex items-center justify-between'>
        <div className='bg-default ml-[0.25rem] h-[4rem] w-[4rem] rounded-full' />
        <div className='mr-[0.75rem]'>
          <ProfileIcon />
        </div>
      </header>
      <main className='flex flex-col gap-[0.75rem] pt-[4rem]'>
        <section>
          <div className='text-label-md text-secondary2 font-extrabold'>
            오늘의 뉴스
          </div>
          <div>
            <TodayNewsCard />
          </div>
        </section>
        <section className='flex flex-col gap-[0.75rem] pt-[1.25rem]'>
          <div className='text-label-md text-secondary2 font-extrabold'>
            모의 투자 랭킹
          </div>
          <RankProfile />
        </section>
      </main>
    </div>
  );
};
export default HomePage;
