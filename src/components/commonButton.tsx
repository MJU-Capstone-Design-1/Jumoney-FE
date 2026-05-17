import Link from 'next/link';
import { cn } from '@/lib/utils';
import React from 'react';

type BaseProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
};

type LinkButtonProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type RegularButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type CommonButtonProps = LinkButtonProps | RegularButtonProps;

export const CommonButton = ({
  children,
  icon,
  iconPosition = 'right',
  href,
  className,
  ...props
}: CommonButtonProps) => {
  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      <span>{children}</span>
      {icon && iconPosition === 'right' && icon}
    </>
  );

  const baseClasses = cn(
    'inline-flex items-center justify-center px-[1rem] py-[0.5rem] rounded-[62.5rem]',
    'bg-secondary2 text-secondary1 text-body-sm font-bold gap-[0.25rem] leading-[120%]',
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={baseClasses}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={baseClasses}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
};
