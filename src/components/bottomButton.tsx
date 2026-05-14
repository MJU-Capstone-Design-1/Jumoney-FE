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
      className={`fixed bottom-[2.125rem] left-1/2 -translate-x-1/2 flex w-[21.4375rem] h-[4rem] items-center justify-center gap-[2rem] rounded-[1000px] px-[2rem] py-[1rem] text-secondary1 transition-colors ${
        disabled ? "bg-default" : "bg-secondary2"
      }`}
    >
      <span className="text-body-xl font-extrabold">{label}</span>
    </button>
  );
};

export default BottomButton;
