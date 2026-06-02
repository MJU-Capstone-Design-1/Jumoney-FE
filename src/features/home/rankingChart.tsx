import { motion } from 'framer-motion';
import { ChartHappyIcon } from '@/components/icons/chartHappyIcon';
import { ChartNeturalIcon } from '@/components/icons/chartNeturalIcon';
import { ChartSadIcon } from '@/components/icons/chartSadIcon';
import { ChartSmileIcon } from '@/components/icons/chartSmileIcon';
import { RankingUser } from '@/api/generated/model';

interface RankingChartProps {
  selectedId: string;
  onSelect: (id: string) => void;
  users: RankingUser[];
}

export const RankingChart = ({ onSelect, users }: RankingChartProps) => {
  const getFaceIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <ChartHappyIcon />;
      case 2:
        return <ChartSmileIcon />;
      case 3:
        return <ChartNeturalIcon />;
      case 4:
        return <ChartSadIcon />;
      case 5:
        return <ChartSadIcon />;
      default:
        return null;
    }
  };

  const DATA = [
    { rank: 4, height: '35.5%', color: 'bg-default' },
    { rank: 2, height: '69.6%', color: 'bg-main3' },
    { rank: 1, height: '86.5%', color: 'bg-primary' },
    { rank: 3, height: '52.5%', color: 'bg-main1' },
    { rank: 5, height: '18%', color: 'bg-default' },
  ];

  return (
    <div className='relative mx-auto h-[16.5rem] w-full max-w-[20.4375rem]'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='absolute inset-0 z-0 flex flex-col justify-center gap-[2.75rem]'
      >
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className='border-default w-[20.4375rem] rounded-[6.25rem] border-[2px] border-dashed'
          />
        ))}
      </motion.div>

      <div className='absolute inset-0 -bottom-[0.625rem] z-10 flex items-end justify-center gap-[0.25rem]'>
        {DATA.map((item, index) => {
          const matchedUser = users.find((u) => Number(u.rank) === item.rank);

          return (
            <div
              key={item.rank}
              onClick={() => onSelect(String(item.rank))}
              className='flex h-full w-[3.75rem] cursor-pointer flex-col items-center justify-end'
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className='text-body-sm text-secondary2 mb-[0.5rem] block w-[3.375rem] truncate text-center font-semibold'
              >
                {matchedUser?.nickname || '-'}
              </motion.span>

              <motion.div
                initial={{ height: 0 }}
                animate={{ height: item.height }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 12,
                  delay: index * 0.05,
                }}
                className={`${item.color} pointer-events-none flex w-full justify-center rounded-t-[6.25rem] pt-[0.75rem]`}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  {getFaceIcon(item.rank)}
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
