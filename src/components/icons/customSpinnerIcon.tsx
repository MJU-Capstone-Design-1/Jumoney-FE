import { cn } from '@/lib/utils';

export const CustomSpinnerIcon = ({ className }: { className?: string }) => {
  return (
    <>
      <svg
        className={cn('absolute h-full w-full', className)}
        viewBox='0 0 180 181'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='90'
          cy='91'
          r='82'
          stroke='#B4C48D'
          strokeWidth='16'
          opacity='0.4'
        />
      </svg>
      <svg
        className={cn('h-full w-full animate-spin', className)}
        style={{ animationDuration: '1.2s' }}
        viewBox='0 0 180 181'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M 90 8 A 82 82 0 0 1 172 90'
          stroke='#FFF'
          strokeWidth='16'
          strokeLinecap='round'
        />
      </svg>
    </>
  );
};
