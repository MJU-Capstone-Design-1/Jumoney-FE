import BackButtonField from "@/components/backButtonField";
import { CustomToggle } from "@/components/customToggle";
import React from "react";

interface RecommendHeaderProps {
  value: "left" | "right";
  onValueChange: (value: "left" | "right") => void;
}

const RecommendHeader = ({ value, onValueChange }: RecommendHeaderProps) => {
  return (
    <div className="bg-primary h-[10.375rem] w-[calc(100%+2rem)] -mx-[1rem] -mt-[1rem] rounded-[2.5rem] p-[1rem] gap-full flex flex-col justify-between">
      <BackButtonField
        label="원하시는 기능을 선택해주세요"
        color="secondary1"
      />
      <CustomToggle
        theme="primary"
        size="large"
        leftTitle="오늘의 호주머니"
        rightTitle="거장의 선택"
        value={value}
        onValueChange={onValueChange}
      />
    </div>
  );
};

export default RecommendHeader;
