import { cn } from '@/lib/utils';

interface RightArrowIconThinProps {
  className?: string;
  color?: 'secondary1' | 'secondary2';
  size?: number;
}

export const RightArrowIconThin = ({
  className,
  color = 'secondary2',
  size,
}: RightArrowIconThinProps) => {
  const colorMap = {
    secondary1: 'text-secondary1',
    secondary2: 'text-secondary2',
  };

  const textColorClass = colorMap[color];

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size ?? 24}
      height={size ?? 24}
      viewBox='0 0 24 24'
      fill='none'
      className={cn(textColorClass, 'size-custom', className)}
    >
      <path
        d='M2 12L21 12'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinejoin='round'
      />
      <path
        d='M16.5529 17.7956C17.8287 17.4537 18.9561 16.7004 19.7601 15.6526C20.5642 14.6047 21 13.3208 21 12C21 10.6792 20.5642 9.3953 19.7601 8.34743C18.9561 7.29957 17.8287 6.54629 16.5529 6.20445'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinejoin='round'
      />
    </svg>
  );
};
