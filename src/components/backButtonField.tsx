'use client';

import { useRouter } from 'next/navigation';
import BackButtonIcon from './icons/backButtonIcon';

interface BackButtonFieldProps {
  color?: 'secondary1' | 'secondary2';
  label?: string;
  onClick?: () => void;
  href?: string;
}

const BackButtonField = ({
  color,
  label,
  onClick,
  href,
}: BackButtonFieldProps) => {
  const router = useRouter();

  const colorMap = {
    secondary1: 'text-secondary1',
    secondary2: 'text-secondary2',
  };

  const textColorClass = (color && colorMap[color]) || 'text-secondary2';

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <div className={`flex items-center gap-[0.75rem] ${textColorClass}`}>
      <div onClick={handleBack} className='cursor-pointer'>
        <BackButtonIcon color={color} />
      </div>
      <div className='text-body-xl font-extrabold'>{label}</div>
    </div>
  );
};

export default BackButtonField;
