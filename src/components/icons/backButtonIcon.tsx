interface BackButtonIconProps {
  color?: "secondary1" | "secondary2";
  label?: string;
}

const BackButtonIcon = ({
  color = "secondary2",
  label = "원하시는 기능을 선택해주세요",
}: BackButtonIconProps) => {
  const colorMap = {
    secondary1: "text-secondary1",
    secondary2: "text-secondary2",
  };

  const textColorClass = colorMap[color] || "text-secondary1";

  return (
    <div className={`flex items-center gap-[0.75rem] ${textColorClass}`}>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-current">
        <svg
          className="-translate-x-[0.0625rem]"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.6706 3.30667C13.7569 3.81944 12.0659 4.94935 10.8598 6.52115C9.65374 8.09294 9 10.0188 9 12C9 13.9812 9.65374 15.9071 10.8598 17.4789C12.0659 19.0507 13.7569 20.1806 15.6706 20.6933"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="text-body-xl font-extrabold">{label}</div>
    </div>
  );
};

export default BackButtonIcon;
