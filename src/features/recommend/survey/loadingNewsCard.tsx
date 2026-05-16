'use client';

import React from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import DocumentIcon from '@/components/icons/documentIcon';

interface LoadingNewsCardProps extends HTMLMotionProps<'div'> {
  title: string;
  subtitle: string;
  tag: string;
  className?: string;
}

export const LoadingNewsCard = ({
  title,
  subtitle,
  tag,
  className,
  ...props
}: LoadingNewsCardProps) => {
  return (
    <motion.div
      className={cn(
        'bg-secondary1 shadow-card-shadow flex w-[21.4375rem] items-center gap-[1rem] rounded-[2rem] px-[0.75rem] py-[1rem]',
        className,
      )}
      {...props}
    >
      {/* Left Icon Area */}
      <div className='bg-background flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.5rem]'>
        <DocumentIcon />
      </div>

      {/* Right Text Area */}
      <div className='flex flex-col'>
        <span className='text-body-sm text-text-sub mb-[0.3125rem] font-semibold'>
          {subtitle}
        </span>
        <h3 className='text-body-xl text-secondary2 font-extrabold'>{title}</h3>
        <span className='text-body-md text-text-main mt-[0.625rem] font-bold'>
          # {tag}
        </span>
      </div>
    </motion.div>
  );
};
