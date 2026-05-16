'use client';

import { useRouter } from 'next/navigation';
import BackButtonIcon from './icons/backButtonIcon';

interface BackButtonFieldProps {
  color?: 'secondary1' | 'secondary2';
  label?: string;
  onClick?: () => void;
}

const BackButtonField = ({ color, label, onClick }: BackButtonFieldProps) => {
  const router = useRouter();

  const colorMap = {
    secondary1: 'text-secondary1',
    secondary2: 'text-secondary2',
  };

  const textColorClass = (color && colorMap[color]) || 'text-secondary2';

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <div
      onClick={handleBack}
      className={`flex cursor-pointer items-center gap-[0.75rem] ${textColorClass}`}
    >
      <BackButtonIcon color={color} />
      <div className='text-body-xl font-extrabold'>{label}</div>
    </div>
  );
};

export default BackButtonField;
