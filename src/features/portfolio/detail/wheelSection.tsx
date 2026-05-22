import Image from 'next/image';
import { motion } from 'framer-motion';

interface WheelSectionProps {
  className?: string;
  rotation?: number;
}

export const WheelSection = ({
  className,
  rotation = 0,
}: WheelSectionProps) => {
  return (
    <div
      className={`pointer-events-auto absolute flex justify-center select-none ${className || ''}`}
    >
      <Image
        src='/images/wheelSectionSelectorImage.svg'
        alt='돌림판 선택 핀'
        width={37}
        height={86}
        className='absolute z-10 translate-y-[8.125rem]'
        draggable={false}
      />
      <motion.div
        animate={{ rotate: rotation }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Image
          src='/images/wheelSectionImage.svg'
          alt='wheelSectionImage'
          width={742}
          height={742}
          className='max-w-none shrink-0'
          draggable={false}
        />
      </motion.div>
    </div>
  );
};
