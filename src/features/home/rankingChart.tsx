import { motion } from 'framer-motion';
import { ChartHappyIcon } from '@/components/icons/chartHappyIcon';
import { ChartNeturalIcon } from '@/components/icons/chartNeturalIcon';
import { ChartSadIcon } from '@/components/icons/chartSadIcon';
import { ChartSmileIcon } from '@/components/icons/chartSmileIcon';

interface RankingChartProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export const RankingChart = ({ selectedId, onSelect }: RankingChartProps) => {
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
    { id: '1', height: '35.5%', color: 'bg-default' },
    { id: '2', height: '69.6%', color: 'bg-main3' },
    { id: '3', height: '86.5%', color: 'bg-primary' },
    { id: '4', height: '52.5%', color: 'bg-main1' },
    { id: '5', height: '18%', color: 'bg-default' },
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
        {DATA.map((item, index) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.id)}
            className='flex h-full w-[3.75rem] flex-col items-center justify-end'
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className='text-body-sm text-secondary2 mb-[0.5rem] text-center font-semibold'
            >
              이름이름이름
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
                {getFaceIcon(item.id)}
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};
