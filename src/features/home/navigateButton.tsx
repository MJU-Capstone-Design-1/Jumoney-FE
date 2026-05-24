import { RightArrowIconSmall } from '@/components/icons/rightArrowIconSmall';

interface NavigateButtonProps {
  label: string;
}

export const NavigateButton = ({ label }: NavigateButtonProps) => {
  return (
    <div className='bg-secondary2 flex h-[1.875rem] w-[5.25rem] items-center justify-center gap-[0.125rem] rounded-full px-[1rem] py-[0.5rem]'>
      <div className='text-body-sm text-secondary1 text-center font-bold'>
        {label}
      </div>
      <RightArrowIconSmall />
    </div>
  );
};
