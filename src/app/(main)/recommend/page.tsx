import { ChartIcon } from "@/components/icons/chartIcon";
import HeartIcon from "@/components/icons/heartIcon";
import RecommendHeader from "@/features/recommend/recommendHeader";
import React from "react";

const page = () => {
  return (
    <div>
      <RecommendHeader />
      <body className="pt-[1.5rem]">
        <div className="flex flex-col gap-[3.5rem] pt-[1.5rem]">
          {/* 오늘의 호주머니 ~ 투자 기간 */}
          <div className="items-center flex flex-col gap-[3.25rem] text-center">
            <div className="flex flex-col gap-[0.5rem]">
              <p className="text-label-md font-extrabold">오늘의 호주머니</p>
              <p className="text-body-md font-semibold text-text-main text-center">
                {/* TODO: 서버에서 유저 데이터 받아와서 적용 */}
                두현우님의 호주머니에 넣을 종목을 추천 받아보세요.
                <br />
                실시간 시장 데이터와 투자 성향을 토대로 매칭해드려요.
              </p>
            </div>

            <div className="flex items-center w-full justify-between px-[1.125rem] ">
              <div className="flex flex-col gap-[0.5rem]">
                <p className="text-text-sub text-body-lg font-bold">Purpose</p>
                <p className="text-label-md font-extrabold">투자 목적</p>
              </div>

              <div className="h-[5.25rem] w-[0.0625rem] bg-text-sub" />

              <div className="flex flex-col gap-[0.5rem]">
                <p className="text-text-sub text-body-lg font-bold">Risk</p>
                <p className="text-label-md font-extrabold">위험 감수</p>
              </div>

              <div className="h-[5.25rem] w-[0.0625rem] bg-text-sub" />

              <div className="flex flex-col gap-[0.5rem]">
                <p className="text-text-sub text-body-lg font-bold">Duration</p>
                <p className="text-label-md font-extrabold">투자 기간</p>
              </div>
            </div>
          </div>

          {/* 사용자 맞춤, 실시간 데이터 */}
          <div className="flex justify-between gap-[0.875rem]">
            <div className="flex flex-col bg-primary rounded-[2rem] w-full p-[1rem] gap-[3.875rem] shadow-card-shadow">
              <div className="flex gap-[0.5rem] text-secondary-1 font-bold text-body-lg items-center">
                <HeartIcon />
                <p>Personalized</p>
              </div>
              <p className="flex text-label-sm text-secondary-1 font-semibold leading-[120%]">
                사용자
                <br />
                맞춤
              </p>
            </div>

            <div className="flex flex-col bg-main-1 rounded-[2rem] w-full p-[1rem] gap-[3.875rem] shadow-card-shadow">
              <div className="flex gap-[0.5rem] text-secondary-1 font-bold text-body-lg items-center">
                <ChartIcon />
                <p>Live Data</p>
              </div>
              <p className="flex text-label-sm text-secondary-1 font-semibold leading-[120%]">
                실시간
                <br />
                데이터
              </p>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default page;
