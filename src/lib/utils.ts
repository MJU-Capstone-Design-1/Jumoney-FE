import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-body-sm',
        'text-body-md',
        'text-body-lg',
        'text-body-xl',
        'text-label-sm',
        'text-label-md',
        'text-label-lg',
        'text-label-xl',
        'text-heading-sm',
        'text-heading-md',
        'text-heading-lg',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
