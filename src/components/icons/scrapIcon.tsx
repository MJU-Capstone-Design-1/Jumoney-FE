import React from 'react';

interface ScrapIconProps extends React.SVGProps<SVGSVGElement> {
  isFilled?: boolean;
}

export const ScrapIcon = ({ isFilled = false, ...props }: ScrapIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
      {...props}
    >
      <path
        d='M19.7744 5.89196C21.3059 7.42351 22.1663 9.50073 22.1663 11.6667V20.9614C22.1663 22.6365 20.4536 23.7659 18.9139 23.1061L14.9188 21.3939C14.3319 21.1424 13.6675 21.1424 13.0805 21.3939L9.08549 23.1061C7.54579 23.766 5.83301 22.6365 5.83301 20.9614V11.6667C5.83301 9.50073 6.69342 7.42351 8.22497 5.89196C9.75652 4.36041 11.8337 3.5 13.9997 3.5C16.1656 3.5 18.2428 4.36041 19.7744 5.89196Z'
        fill={isFilled ? '#9BB068' : 'none'}
        stroke='#9BB068'
        strokeWidth='2'
        strokeLinejoin='round'
      />
    </svg>
  );
};
