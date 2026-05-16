import React from "react";
import VerificationButton from "./verificationButton";

const RecommendResultCard = () => {
  return (
    <div
      role="button"
      className="flex flex-col w-full text-left px-[1.5rem] py-[1rem] gap-[1rem] bg-secondary1 rounded-[2rem] shadow-card-shadow cursor-pointer"
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-[0.5rem] justify-center items-center">
          <div className="w-[3rem] h-[3rem] rounded-full bg-primary" />
          <div className="flex flex-col gap-[0.25rem]">
            <div className="text-body-xl font-extrabold ">삼성전자</div>
            <div className="flex gap-[0.5rem] text-text-sub text-body-sm font-bold">
              <div># 종목태그</div>
              <div># 종목태그</div>
            </div>
          </div>
        </div>

        <VerificationButton />
      </div>

      <div className="flex gap-[0.5rem] items-center">
        <p className="text-body-md font-semibold">210,000 (+2.4% ▲)</p>
        <div className="flex w-[0.0625rem] bg-secondary2 h-[0.75rem]" />
        <p className="text-body-md font-semibold">ROE 12.5%</p>
      </div>
    </div>
  );
};

export default RecommendResultCard;
