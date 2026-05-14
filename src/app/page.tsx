import BackButtonField from "@/components/backButtonField";
import BottomButton from "@/components/bottomButton";
import React from "react";

const page = () => {
  return (
    <div className="relative min-h-screen pb-[7rem]">
      <BackButtonField
        color="secondary2"
        label="원하시는 기능을 선택해주세요"
      />
      <BottomButton disabled={false} label="선택하기" />
    </div>
  );
};

export default page;
