import React from 'react';

interface VerificationButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const VerificationButton = ({ onClick }: VerificationButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='text-text-main bg-default text-body-sm flex h-[2rem] w-[6rem] items-center justify-center rounded-[6.25rem] font-semibold'
    >
      과거 지표 검증하기
    </button>
  );
};

export default VerificationButton;
