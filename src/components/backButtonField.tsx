import BackButtonIcon from "./icons/backButtonIcon";

interface BackButtonFieldProps {
  color?: "secondary1" | "secondary2";
  label?: string;
}

const BackButtonField = ({ color, label }: BackButtonFieldProps) => {
  const colorMap = {
    secondary1: "text-secondary1",
    secondary2: "text-secondary2",
  };

  const textColorClass = (color && colorMap[color]) || "text-secondary2";

  return (
    <div className={`flex items-center gap-[0.75rem] ${textColorClass}`}>
      <BackButtonIcon color={color} />
      <div className="text-body-xl font-extrabold">{label}</div>
    </div>
  );
};

export default BackButtonField;
