interface BottomButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const BottomButton = ({
  label,
  onClick,
  disabled = false,
}: BottomButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-secondary1 fixed bottom-[2.125rem] left-1/2 flex h-[4rem] w-[21.4375rem] -translate-x-1/2 items-center justify-center gap-[2rem] rounded-[1000px] px-[2rem] py-[1rem] transition-colors ${
        disabled ? 'bg-default' : 'bg-secondary2'
      }`}
    >
      <span className='text-body-xl font-extrabold'>{label}</span>
    </button>
  );
};

export default BottomButton;
