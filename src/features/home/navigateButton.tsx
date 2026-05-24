import { RightArrowIconSmall } from '@/components/icons/rightArrowIconSmall';

interface NavigateButtonProps {
  label: string;
  onClick?: () => void;
}

export const NavigateButton = ({ label, onClick }: NavigateButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='bg-secondary2 flex h-[2rem] w-[5.25rem] items-center justify-center gap-[0.125rem] rounded-full px-[1rem] py-[0.625rem]'
    >
      <div className='text-body-sm text-secondary1 mt-[0.0625rem] text-center font-bold'>
        {label}
      </div>
      <RightArrowIconSmall />
    </button>
  );
};
