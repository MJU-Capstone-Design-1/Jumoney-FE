'use client';

import { ChartIcon } from '@/components/icons/chartIcon';
import { GraphIcon } from '@/components/icons/graphIcon';
import { motion } from 'framer-motion';

interface SwitchChartButtonProps {
  isChart: boolean;
  setIsChart: (value: React.SetStateAction<boolean>) => void;
}

export const SwitchChartButton = ({
  isChart,
  setIsChart,
}: SwitchChartButtonProps) => {
  const handleToggle = () => {
    setIsChart((prev) => !prev);
  };
  return (
    <motion.button
      type='button'
      onClick={handleToggle}
      whileTap={{ scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`border-secondary2 flex h-10 min-h-10 w-10 min-w-10 shrink-0 items-center justify-center rounded-full border outline-none ${
        isChart ? 'bg-secondary2' : 'bg-secondary1'
      }`}
    >
      {isChart ? <ChartIcon /> : <GraphIcon />}
    </motion.button>
  );
};
