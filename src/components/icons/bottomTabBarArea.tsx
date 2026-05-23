import React from 'react';

export const BottomTabBarArea = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='439'
      height='144'
      viewBox='0 0 439 144'
      fill='none'
      {...props}
    >
      <g filter='url(#filter0_d_2644_9394)'>
        <path
          d='M367 48C389.091 48 407 65.9086 407 88C407 110.091 389.091 128 367 128H72C49.9086 128 32 110.091 32 88C32 65.9086 49.9086 48 72 48H148C165.673 48 179.454 64.3789 192.131 76.6934C199.334 83.6912 209.164 88 220 88C230.836 88 240.666 83.6912 247.869 76.6934C260.546 64.3789 274.327 48 292 48H367Z'
          fill='white'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_2644_9394'
          x='0'
          y='0'
          width='439'
          height='144'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='-16' />
          <feGaussianBlur stdDeviation='16' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.294118 0 0 0 0 0.203922 0 0 0 0 0.145098 0 0 0 0.05 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_2644_9394'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_2644_9394'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};
