interface BottomButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  bgColor?: string;
  textColor?: string;
}

const BottomButton = ({
  label,
  onClick,
  disabled = false,
  bgColor = 'bg-secondary2',
  textColor = 'text-secondary1',
}: BottomButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`fixed bottom-[2.125rem] left-1/2 z-50 flex h-[4rem] w-[21.4375rem] -translate-x-1/2 items-center justify-center gap-[2rem] rounded-[1000px] px-[2rem] py-[1rem] transition-colors ${textColor} ${
        disabled ? 'bg-default' : bgColor
      }`}
    >
      <span className='text-body-xl font-extrabold'>{label}</span>
    </button>
  );
};

export default BottomButton;
