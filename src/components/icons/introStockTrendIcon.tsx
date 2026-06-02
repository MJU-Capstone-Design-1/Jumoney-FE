import React from 'react';

type IntroStockTrendIconProps = React.SVGProps<SVGSVGElement>;

export const IntroStockTrendIcon = (props: IntroStockTrendIconProps) => {
  return (
    <svg viewBox='0 0 300 86' fill='none' {...props}>
      <path
        d='M8 72H292'
        stroke='#D8CDC5'
        strokeWidth='1'
        strokeDasharray='4 4'
      />
      <path
        d='M8 48H292'
        stroke='#D8CDC5'
        strokeWidth='1'
        strokeDasharray='4 4'
      />
      <path
        d='M8 24H292'
        stroke='#D8CDC5'
        strokeWidth='1'
        strokeDasharray='4 4'
      />
      <path
        d='M8 62C34 58 45 40 70 44C96 48 106 68 132 57C156 47 163 25 189 29C216 33 225 52 249 40C268 31 278 21 292 17'
        stroke='#4B3425'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='4'
      />
      <circle cx='292' cy='17' r='4.5' fill='#DF4B01' />
    </svg>
  );
};
