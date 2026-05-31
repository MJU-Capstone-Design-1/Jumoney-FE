import { SearchStocksSort } from '@/api/generated/model';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useRef } from 'react';

interface SearchSortToggleProps {
  value: SearchStocksSort;
  onChange: (value: SearchStocksSort) => void;
  className?: string;
}

const SORT_OPTIONS: { value: SearchStocksSort; label: string }[] = [
  { value: 'NAME_ASC', label: '이름 순' },
  { value: 'PRICE_DESC', label: '주가 높은 순' },
  { value: 'PRICE_ASC', label: '주가 낮은 순' },
  { value: 'MARKET_CAP_DESC', label: '시가총액 순' },
  { value: 'TRADE_AMOUNT_DESC', label: '거래대금 순' },
];

export const SearchSortToggle = ({
  value,
  onChange,
  className,
}: SearchSortToggleProps) => {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={constraintsRef}
      className={cn('w-full overflow-hidden', className)}
    >
      <motion.div
        drag='x'
        dragConstraints={constraintsRef}
        dragElastic={0.15}
        className='flex w-max cursor-grab active:cursor-grabbing'
      >
        <ToggleGroup
          type='single'
          value={value}
          onValueChange={(val) => {
            if (val) {
              onChange(val as SearchStocksSort);
            }
          }}
          className='flex w-max justify-start gap-[0.5rem]'
        >
          {SORT_OPTIONS.map((option) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              className={cn(
                'text-body-sm relative flex items-center justify-center overflow-hidden font-bold',
                '!rounded-full !px-[0.75rem] !py-[0.5625rem]',
                'border-secondary2 text-secondary2 border bg-transparent',
                'data-[state=on]:bg-secondary2 data-[state=on]:text-secondary1',
                'transition-colors duration-300',
              )}
            >
              {value === option.value && (
                <motion.div
                  className='bg-secondary2 absolute inset-0 z-0'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                />
              )}
              <span className='relative z-10'>{option.label}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </motion.div>
    </div>
  );
};
