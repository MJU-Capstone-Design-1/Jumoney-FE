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
  const truncatedTitle = title.length > 10 ? `${title.slice(0, 10)}...` : title;
  const truncatedSubtitle =
    subtitle.length > 20 ? `${subtitle.slice(0, 20)}...` : subtitle;

  return (
    <motion.div
      className={cn(
        'bg-secondary1 shadow-card-shadow flex w-full items-center gap-[1rem] rounded-[2rem] p-[1rem]',
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
        <span className='text-body-sm text-text-sub font-semibold'>
          {truncatedSubtitle}
        </span>
        <h3 className='text-body-xl text-secondary2 font-extrabold'>
          {truncatedTitle}
        </h3>
        <span className='text-body-md text-text-main font-bold'># {tag}</span>
      </div>
    </motion.div>
  );
};
