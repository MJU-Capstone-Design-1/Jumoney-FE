'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'relative flex items-center rounded-[77.125rem] cursor-pointer overflow-hidden transition-all duration-500',
  {
    variants: {
      theme: {
        primary: 'bg-primaryMuted',
        sub1: 'bg-secondary1',
        sub2: 'bg-secondary1',
        sub3: 'bg-secondary1',
        sub4: 'bg-secondary1',
      },
      size: {
        normal: 'w-[16.5rem] h-[3.5rem]',
        large: 'w-[21.4375rem] h-[3.5rem]',
      },
    },
    defaultVariants: {
      theme: 'primary',
      size: 'normal',
    },
  },
);

const pillVariants = cva('absolute h-full rounded-[77.125rem]', {
  variants: {
    theme: {
      primary: 'bg-secondary1',
      sub1: 'bg-main1',
      sub2: 'bg-main2',
      sub3: 'bg-main3',
      sub4: 'bg-main4',
    },
    size: {
      normal: 'w-1/2',
      large: 'w-1/2',
    },
  },
  defaultVariants: {
    theme: 'primary',
    size: 'normal',
  },
});

interface CustomToggleProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toggleVariants> {
  leftTitle: string;
  rightTitle: string;
  value: 'left' | 'right';
  onValueChange: (value: 'left' | 'right') => void;
}

const CustomToggle = React.forwardRef<HTMLDivElement, CustomToggleProps>(
  (
    {
      className,
      theme,
      size,
      leftTitle,
      rightTitle,
      value,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const isLeft = value === 'left';

    // Theme-based text color mapping
    const themeTextStyles = {
      primary: {
        active: 'text-primary',
        inactive: 'text-secondary1',
      },
      sub1: {
        active: 'text-secondary1',
        inactive: 'text-sub1',
      },
      sub2: {
        active: 'text-secondary1',
        inactive: 'text-sub2',
      },
      sub3: {
        active: 'text-secondary1',
        inactive: 'text-sub3',
      },
      sub4: {
        active: 'text-secondary1',
        inactive: 'text-sub4',
      },
    };

    const currentTheme = (theme as keyof typeof themeTextStyles) || 'primary';

    return (
      <div
        ref={ref}
        className={cn(toggleVariants({ theme, size }), className)}
        onClick={() => onValueChange(isLeft ? 'right' : 'left')}
        {...props}
      >
        {/* Animated Pill */}
        <motion.div
          className={cn(pillVariants({ theme, size }))}
          animate={{
            x: isLeft ? 0 : '100%',
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 35,
          }}
        />

        {/* Labels */}
        <div className='shadow-card-shadow relative z-10 flex h-full w-full items-center'>
          <div
            className={cn(
              'text-body-xl flex-1 text-center font-extrabold transition-colors duration-200',
              isLeft
                ? themeTextStyles[currentTheme].active
                : themeTextStyles[currentTheme].inactive,
            )}
          >
            {leftTitle}
          </div>
          <div
            className={cn(
              'text-body-xl flex-1 text-center font-extrabold transition-colors duration-200',
              !isLeft
                ? themeTextStyles[currentTheme].active
                : themeTextStyles[currentTheme].inactive,
            )}
          >
            {rightTitle}
          </div>
        </div>
      </div>
    );
  },
);

CustomToggle.displayName = 'CustomToggle';

export { CustomToggle };
