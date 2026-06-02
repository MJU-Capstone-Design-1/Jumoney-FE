'use client';

import { useLogout } from '@/api/generated/endpoints/auth/auth';
import {
  getGetUserInfoQueryKey,
  GetUserInfoQueryResult,
  useGetUserInfo,
  useUpdateNickname,
  useWithdraw,
} from '@/api/generated/endpoints/사용자/사용자';
import { CloseIcon } from '@/components/icons/closeIcon';
import { FeedbackIcon } from '@/components/icons/feedbackIcon';
import { LogoutIcon } from '@/components/icons/logoutIcon';
import { ProfileCircleIcon } from '@/components/icons/profileCircleIcon';
import { SmallPencilIcon } from '@/components/icons/smallPencilcon';
import { WithdrawIcon } from '@/components/icons/withdrawIcon';
import { useProfileStore } from '@/store/useProfileStore';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const MASTER_STATIC_INFO: Record<number, { image: string; bgColor: string }> = {
  1: { image: '/images/warrenBuffetImage.svg', bgColor: 'bg-main1' },
  2: { image: '/images/peterLynchImage.svg', bgColor: 'bg-main2' },
  3: { image: '/images/rayDalioImage.svg', bgColor: 'bg-main3' },
  4: { image: '/images/williamOneilImage.svg', bgColor: 'bg-main4' },
};

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

  const queryClient = useQueryClient();

  const { data: userInfoResponse } = useGetUserInfo({
    query: {
      enabled: isOpen,
    },
  });
  const originalNickname = userInfoResponse?.data?.nickname || '';
  const selectedMasterId = userInfoResponse?.data?.selectedMasterId;
  const masterData = selectedMasterId
    ? MASTER_STATIC_INFO[selectedMasterId]
    : null;
  useEffect(() => {
    if (originalNickname && !isEditing) {
      setName(originalNickname);
    }
  }, [originalNickname, isEditing, setName]);

  const { mutate: updateNickname } = useUpdateNickname({
    mutation: {
      onMutate: async (newNicknameData) => {
        await queryClient.cancelQueries({ queryKey: getGetUserInfoQueryKey() });

        const previousUserInfo =
          queryClient.getQueryData<GetUserInfoQueryResult>(
            getGetUserInfoQueryKey(),
          );

        queryClient.setQueryData<GetUserInfoQueryResult>(
          getGetUserInfoQueryKey(),
          (old) => {
            if (!old || !old.data) return old;

            return {
              ...old,
              data: {
                ...old.data,
                nickname: newNicknameData.data.serviceNickname,
              },
            };
          },
        );

        return { previousUserInfo };
      },
      onError: (err, newNicknameData, context) => {
        if (context?.previousUserInfo) {
          queryClient.setQueryData(
            getGetUserInfoQueryKey(),
            context.previousUserInfo,
          );
        }
        setName(originalNickname);
        alert('닉네임 수정에 실패했습니다. 다시 시도해주세요.');
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: getGetUserInfoQueryKey() });
      },
    },
  });

  const { mutate: withdrawUser } = useWithdraw({
    mutation: {
      onSuccess: () => {
        if (onWithdraw) onWithdraw();
      },
      onError: () => {
        alert('회원 탈퇴 처리 중 오류가 발생했습니다.');
      },
    },
  });

  const { mutate: logoutUser } = useLogout({
    mutation: {
      onSuccess: () => {
        if (onLogout) onLogout();
      },
      onError: () => {
        alert('로그아웃 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      },
    },
  });

  const handleToggleEdit = () => {
    if (isEditing) {
      if (name.trim() === '') {
        setName(originalNickname || '이름을 입력하세요');
      } else if (name !== originalNickname) {
        updateNickname({ data: { serviceNickname: name } });
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const el = textareaRef.current;
      const timeoutId = setTimeout(() => {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [isEditing]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-60 flex items-center justify-center bg-black/60'
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
                  {masterData?.image ? (
                    <div
                      className={`flex h-[4.125rem] w-[4.125rem] flex-shrink-0 items-center justify-center overflow-hidden rounded-full ${masterData.bgColor}`}
                    >
                      <Image
                        src={masterData.image}
                        alt={name || '거장 이미지'}
                        width={66}
                        height={66}
                      />
                    </div>
                  ) : (
                    <div className='bg-default h-[4.125rem] w-[4.125rem] flex-shrink-0 rounded-full' />
                  )}

                  <div className='flex items-center justify-center gap-[0.5rem]'>
                    <button
                      onClick={handleToggleEdit}
                      onMouseDown={(e) => e.preventDefault()}
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
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleToggleEdit();
                          }
                        }}
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
                  onClick={() => {
                    const isConfirm = window.confirm('로그아웃 하시겠습니까?');
                    if (isConfirm) logoutUser();
                  }}
                  className='bg-secondary1 shadow-card-shadow flex h-auto items-center justify-center gap-[0.5rem] rounded-[1.5rem] px-[1rem] py-[0.5rem]'
                >
                  <LogoutIcon />
                  <div className='text-body-md font-extrabold'>로그아웃</div>
                </button>
                <button
                  type='button'
                  onClick={() => {
                    const isConfirm = window.confirm(
                      '정말 탈퇴하시겠습니까? 카카오 회원은 7일 내 재로그인 시 기존 계정이 복구됩니다.',
                    );
                    if (isConfirm) withdrawUser();
                  }}
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
