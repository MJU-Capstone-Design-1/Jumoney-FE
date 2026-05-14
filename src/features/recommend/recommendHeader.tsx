import BackButtonField from "@/components/backButtonField";
import React from "react";

const RecommendHeader = () => {
  return (
    <div className="bg-primary h-[10.375rem] w-[calc(100%+2rem)] -mx-[1rem] -mt-[1rem] rounded-b-[2.5rem] p-[1rem]">
      <BackButtonField
        label="원하시는 기능을 선택해주세요"
        color="secondary1"
      />
    </div>
  );
};

export default RecommendHeader;
