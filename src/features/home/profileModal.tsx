'use client';

import { CloseIcon } from '@/components/icons/closeIcon';
import { FeedbackIcon } from '@/components/icons/feedbackIcon';
import { LogoutIcon } from '@/components/icons/logoutIcon';
import { ProfileCircleIcon } from '@/components/icons/profileCircleIcon';
import { SmallPencilIcon } from '@/components/icons/smallPencilcon';
import { WithdrawIcon } from '@/components/icons/withdrawIcon';
import { useProfileStore } from '@/store/useProfileStore';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecommendClick: () => void;
  onLogout?: () => void;
  onWithdraw?: () => void;
}

export const ProfileModal = ({
  isOpen,
  onClose,
  onRecommendClick,
  onLogout,
  onWithdraw,
}: ProfileModalProps) => {
  const { name, setName } = useProfileStore();
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleToggleEdit = () => {
    if (isEditing) {
      if (name.trim() === '') {
        setName('이름을 입력하세요');
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const el = textareaRef.current;
      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      });
    }
  }, [isEditing]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-20 flex items-center justify-center bg-black/60'
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
            className='relative flex w-full max-w-[17.5rem] flex-col items-center'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='bg-primary flex h-[28.3125rem] w-[17.5rem] flex-col items-center rounded-[2.5rem]'>
              <div className='flex self-end pt-[1.5rem] pr-[1.5rem]'>
                <button
                  type='button'
                  onClick={onClose}
                  aria-label='닫기'
                  className='cursor-pointer'
                >
                  <CloseIcon />
                </button>
              </div>

              <div className='bg-secondary1 shadow-card-shadow mt-[1.5rem] flex h-auto w-[15.0625rem] flex-col items-center justify-center rounded-[1.5rem] p-[1.25rem]'>
                <div className='flex items-center gap-[1rem]'>
                  <div className='bg-default h-[4.125rem] w-[4.125rem] flex-shrink-0 rounded-full' />
                  <div className='flex items-center justify-center gap-[0.5rem]'>
                    <button
                      onClick={handleToggleEdit}
                      className={`flex-shrink-0 transition-opacity ${
                        name.trim() === ''
                          ? 'cursor-not-allowed opacity-30'
                          : 'opacity-100'
                      }`}
                    >
                      <SmallPencilIcon />
                    </button>

                    {isEditing ? (
                      <textarea
                        ref={textareaRef}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={handleToggleEdit}
                        rows={2}
                        className='text-body-lg w-[5.5rem] resize-none bg-transparent text-center leading-[120%] font-extrabold outline-none'
                      />
                    ) : (
                      <div className='text-body-lg w-[5.5rem] text-center leading-[120%] font-extrabold break-words'>
                        {name}
                      </div>
                    )}
                  </div>
                </div>

                <div className='self-end'>
                  <button
                    onClick={onRecommendClick}
                    className='bg-secondary2 flex items-center justify-center gap-[0.5625rem] rounded-full px-[1rem] py-[0.5rem]'
                  >
                    <ProfileCircleIcon />
                    <div className='text-body-sm text-secondary1 leading-[120%] font-bold'>
                      거장 변경하기
                    </div>
                  </button>
                </div>
              </div>

              <div className='bg-secondary1 shadow-card-shadow mt-[1.25rem] flex h-auto w-[15rem] flex-col items-start rounded-[1.5rem] p-[1.25rem]'>
                <div className='flex items-start gap-[0.25rem]'>
                  <FeedbackIcon />
                  <div className='text-body-md font-extrabold'>
                    피드백 남기기
                  </div>
                </div>
                <div className='text-body-sm text-text-main mt-[0.5rem] font-semibold'>
                  서비스 발전을 위한 소중한 피드백을 남겨주시면 <br />
                  추첨을 통해 OOOOOO를 드려요
                </div>
              </div>

              <div className='mt-[1.6875rem] flex gap-[1.5rem]'>
                <button
                  type='button'
                  onClick={onLogout}
                  className='bg-secondary1 shadow-card-shadow flex h-auto items-center justify-center gap-[0.5rem] rounded-[1.5rem] px-[1rem] py-[0.5rem]'
                >
                  <LogoutIcon />
                  <div className='text-body-md font-extrabold'>로그아웃</div>
                </button>
                <button
                  type='button'
                  onClick={onWithdraw}
                  className='bg-secondary1 shadow-card-shadow flex h-auto items-center justify-center gap-[0.5rem] rounded-[1.5rem] px-[1rem] py-[0.5rem]'
                >
                  <WithdrawIcon />
                  <div className='text-body-md font-extrabold'>회원탈퇴</div>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
