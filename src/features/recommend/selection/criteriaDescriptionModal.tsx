'use client';

import Image from 'next/image';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface DescriptionItem {
  title: string;
  description: string;
}

interface CriteriaDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DescriptionItem[];
}

export default function CriteriaDescriptionModal({
  isOpen,
  onClose,
  data,
}: CriteriaDescriptionModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-20 flex items-center justify-center bg-black/60 px-[1.375rem]'
          onClick={onClose}
          style={{ height: '100dvh' }}
        >
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 20,
            }}
            className='relative flex w-full max-w-[20.625rem] flex-col items-center'
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src='/images/modal.svg'
              alt='조건 설명 배경'
              width={330}
              height={640}
              priority
              className='h-auto w-full'
            />

            <div className='absolute inset-0 flex flex-col pt-[2.625rem] pb-[2.625rem]'>
              <div className='flex flex-1 flex-col justify-center overflow-y-auto px-[1.5rem]'>
                <div className='flex w-full flex-col gap-[1.375rem]'>
                  {data.map((item, i) => (
                    <div key={i} className='flex flex-col gap-[0.25rem]'>
                      <div className='flex items-center gap-[0.5rem]'>
                        <div className='bg-secondary2 h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full' />
                        <span className='text-body-lg text-secondary2 font-bold'>
                          {item.title}
                        </span>
                      </div>
                      <p className='text-body-md text-secondary2 ml-[1rem] leading-[120%] font-semibold whitespace-pre-line'>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
