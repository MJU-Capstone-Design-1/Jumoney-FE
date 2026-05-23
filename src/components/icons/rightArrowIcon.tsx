import { cn } from '@/lib/utils';

interface RightArrowIconProps {
  className?: string;
  color?: 'secondary1' | 'secondary2';
  size?: number;
}

export const RightArrowIcon = ({
  className,
  color = 'secondary2',
  size,
}: RightArrowIconProps) => {
  const colorMap = {
    secondary1: 'text-secondary1',
    secondary2: 'text-secondary2',
  };

  const textColorClass = colorMap[color];

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size ?? 12}
      height={size ? (size * 13) / 12 : 13}
      viewBox='0 0 12 13'
      fill='none'
      className={cn(textColorClass, !size && 'size-3', className)}
    >
      <path
        d='M1 6.00781L10.5 6.00781'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinejoin='round'
      />
      <path
        d='M7.16469 10.3602C8.12154 10.1035 8.96705 9.53779 9.57009 8.75086C10.1731 7.96394 10.5 6.99975 10.5 6.00785C10.5 5.01595 10.1731 4.05176 9.57009 3.26483C8.96705 2.4779 8.12154 1.91221 7.16469 1.65549'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinejoin='round'
      />
    </svg>
  );
};
