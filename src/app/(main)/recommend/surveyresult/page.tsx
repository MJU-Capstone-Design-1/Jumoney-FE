import React from "react";
import RecommendResultCard from "@/components/recommendResultCard";

const page = () => {
  return (
    <div>
      <div className="bg-primary h-auto rounded-[2.5rem] p-[1.5rem] gap-full flex flex-col text-secondary1 gap-[1rem]">
        <p className="text-body-sm font-semibold">
          분석 완료! 당신의 투자 타입은 · · ·
        </p>
        <p className="text-label-md font-extrabold">무결점 방어형 저축가</p>
        <p className="text-body-md font-semibold leading-[120%]">
          손실 확률 0%에 도전해요
          <br />
          아주 짧은 기간이라도 원금이 완벽히 보호되는 곳을 선호합니다
        </p>
      </div>

      <div className="flex flex-col gap-[1rem] p-[1.5rem]">
        <p className="flex flex-col text-body-xl font-extrabold">추천 종목</p>
        {/* TODO: 추천 종목 받아오기 */}
        <div className="flex flex-col gap-[1rem]">
          <RecommendResultCard />
          <RecommendResultCard />
          <RecommendResultCard />
        </div>
      </div>
    </div>
  );
};

export default page;
