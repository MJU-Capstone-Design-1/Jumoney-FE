import BackButtonField from "@/components/backButtonField";
import { CustomToggle } from "@/components/customToggle";
import React, { useState } from "react";

const RecommendHeader = () => {
  const [toggleValue, setTogglevalue] = useState<"left" | "right">("left");
  return (
    <div className="bg-primary h-[10.375rem] w-[calc(100%+2rem)] -mx-[1rem] -mt-[1rem] rounded-b-[2.5rem] p-[1rem] gap-full flex flex-col justify-between">
      <BackButtonField
        label="원하시는 기능을 선택해주세요"
        color="secondary1"
      />
      <CustomToggle
        theme="primary"
        size="large"
        leftTitle="오늘의 호주머니"
        rightTitle="거장의 선택"
        value={toggleValue}
        onValueChange={setTogglevalue}
      />
    </div>
  );
};

export default RecommendHeader;
