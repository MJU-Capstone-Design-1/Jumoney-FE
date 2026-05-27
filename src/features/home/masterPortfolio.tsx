'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MASTER_LOGO } from '@/constants/masterLogos';

const popUpMotion = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    delay: 0.4,
    duration: 0.5,
    type: 'spring' as const,
    stiffness: 260,
    damping: 20,
  },
};

interface MasterPortfolioProps {
  name: string;
  path: string;
  tags: string[];
  image: string;
  companies: (string | null)[];
}

export const MasterPortfolio = ({
  name,
  path,
  tags,
  image,
  companies,
}: MasterPortfolioProps) => {
  const router = useRouter();
  return (
    <motion.button
      {...popUpMotion}
      onClick={() => router.push(path)}
      className='bg-secondary1 shadow-card-shadow flex h-[12.75rem] w-[14rem] flex-col rounded-[1.5rem] p-[1rem]'
    >
      <div className='flex items-center gap-[1rem]'>
        <Image src={image} alt={name} width={64} height={64} />
        <div className='text-label-md font-extrabold'>{name}</div>
      </div>
      <div className='flex items-center gap-[0.5rem] pt-[0.75rem]'>
        {tags.map((tag, index) => (
          <div
            key={index}
            className='bg-background text-main2 text-body-sm flex items-center justify-center rounded-[6.25rem] px-[0.625rem] py-[0.25rem] font-bold'
          >
            # {tag}
          </div>
        ))}
      </div>
      <div className='text-body-md flex pt-[0.625rem] font-extrabold'>
        투자 기업
      </div>
      <div className='flex items-center gap-[0.5rem] pt-[0.375rem]'>
        {companies.map((company, i) => (
          <div
            key={i}
            className='bg-default h-[2rem] w-[2rem] overflow-hidden rounded-full'
          >
            {company && MASTER_LOGO[company] ? (
              <Image
                src={MASTER_LOGO[company]}
                alt={company}
                width={32}
                height={32}
                unoptimized
              />
            ) : (
              <div className='h-full w-full' />
            )}
          </div>
        ))}
      </div>
    </motion.button>
  );
};
