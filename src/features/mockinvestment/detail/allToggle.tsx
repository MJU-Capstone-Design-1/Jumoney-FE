import { Toggle } from '@/components/ui/toggle';

interface AllToggleProps {
  isSelected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export const AllToggle = ({ isSelected, onSelectedChange }: AllToggleProps) => {
  return (
    <Toggle
      pressed={isSelected}
      onPressedChange={onSelectedChange}
      className={`border-secondary2 flex h-[2.25rem] w-[4.2875rem] items-center justify-center rounded-[6.25rem] border text-center ${
        isSelected
          ? 'bg-secondary2 text-secondary1 data-[state=on]:bg-secondary2 data-[state=on]:text-secondary1'
          : 'text-secondary2 bg-transparent'
      }`}
    >
      <span className='text-body-md mt-[0.125rem] font-semibold'>전체</span>
    </Toggle>
  );
};
