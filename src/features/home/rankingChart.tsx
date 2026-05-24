import { ChartHappyIcon } from '@/components/icons/chartHappyIcon';
import { ChartNeturalIcon } from '@/components/icons/chartNeturalIcon';
import { ChartSadIcon } from '@/components/icons/chartSadIcon';
import { ChartSmileIcon } from '@/components/icons/chartSmileIcon';

export const RankingChart = () => {
  const getFaceIcon = (id: string) => {
    switch (id) {
      case '1':
        return <ChartSadIcon />;
      case '2':
        return <ChartSmileIcon />;
      case '3':
        return <ChartHappyIcon />;
      case '4':
        return <ChartNeturalIcon />;
      case '5':
        return <ChartSadIcon />;
      default:
        return null;
    }
  };

  const DATA = [
    { id: '1', height: 'h-[35.5%]', color: 'bg-default' },
    { id: '2', height: 'h-[69.6%]', color: 'bg-main3' },
    { id: '3', height: 'h-[86.5%]', color: 'bg-primary' },
    { id: '4', height: 'h-[52.5%]', color: 'bg-main1' },
    { id: '5', height: 'h-[18%]', color: 'bg-default' },
  ];

  return (
    <div className='relative mx-auto h-[16.5rem] w-full max-w-[20.4375rem]'>
      <div className='absolute inset-0 z-0 flex flex-col justify-center gap-[2.75rem]'>
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className='border-default w-[20.4375rem] rounded-[6.25rem] border-[2px] border-dashed'
          />
        ))}
      </div>

      <div className='absolute inset-0 -bottom-[0.625rem] z-10 flex items-end justify-center gap-[0.25rem]'>
        {DATA.map((item) => (
          <div
            key={item.id}
            className='flex h-full w-[3.75rem] flex-col items-center justify-end'
          >
            <span className='text-body-sm text-secondary2 mb-[0.5rem] text-center font-semibold'>
              이름이름이름
            </span>

            <div
              className={`${item.height} w-full ${item.color} flex justify-center rounded-t-[6.25rem] pt-[0.75rem]`}
            >
              {getFaceIcon(item.id)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
