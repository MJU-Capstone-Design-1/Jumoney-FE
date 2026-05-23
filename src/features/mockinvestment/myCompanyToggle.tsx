import { Toggle } from '@/components/ui/toggle';
import { DownArrowIcon } from '@/components/icons/downArrowIcon';
import { TopArrowIcon } from '@/components/icons/topArrowIcon';

interface MyCompanyToggleProps {
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

export const MyCompanyToggle = ({
  isExpanded,
  onExpandedChange,
}: MyCompanyToggleProps) => {
  return (
    <Toggle
      pressed={isExpanded}
      onPressedChange={onExpandedChange}
      className='bg-secondary1 text-secondary2 data-[state=on]:bg-secondary1 data-[state=on]:text-secondary2 text-body-sm flex h-[1.875rem] cursor-pointer items-center gap-[0.375rem] rounded-full border-none px-[0.75rem] py-[0.5rem] font-extrabold shadow-none'
    >
      {isExpanded ? (
        <>
          <TopArrowIcon />
          <span>접기</span>
        </>
      ) : (
        <>
          <DownArrowIcon />
          <span>자세히 보기</span>
        </>
      )}
    </Toggle>
  );
};
