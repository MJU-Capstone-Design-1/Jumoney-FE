"use client";

import BackButtonField from "@/components/backButtonField";
import { SurveyDetailButton } from "@/components/surveyDetailButton";
import React, { useState } from "react";
import { SurveyOption } from "@/features/recommend/survey/surveyFirstListGroup";
import BottomButton from "@/components/bottomButton";
import { SurveyStepper } from "@/components/surveyStepper";
import { motion } from "framer-motion";
import { SurveyFirstBottomsheet } from "@/features/recommend/survey/surveyFirstBottomsheet";
import { bottomSheetItems } from "@/constants/surveyFirstBottomsheetItems";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [currentHelpItems, setCurrentHelpItems] = useState<
    { title: string; description: string }[]
  >([]);

  const options = [
    "안정적인 자산 보호",
    "배당 수익",
    "자산의 꾸준한 성장",
    "시세 차익",
  ];

  const handleHelpClick = (option: string) => {
    setCurrentHelpItems(bottomSheetItems[option] || []);
    setIsBottomSheetOpen(true);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-4">
      <BackButtonField color="secondary2" label="오늘의 호주머니" />
      <SurveyStepper currentStep={1} totalSteps={3} />

      <div className="flex flex-col gap-[4.125rem] pt-[2rem] items-center">
        <div className="flex flex-col gap-[1rem]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex text-label-lg font-extrabold text-center leading-[120%]"
          >
            당신의 투자 목적은
            <br />
            무엇인가요?
          </motion.p>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.6,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <SurveyDetailButton>
              <p className="text-center leading-[120%]">
                시가총액, 배당률, EPS 등<br />
                기업의 펀더멘탈과 관련된 지표로 구성했어요.
                <br />
                투자자가 어떤 방식으로 수익을 창출하고 싶은지에 따라
                <br />
                재무제표 상의 본질적인 가치를 필터링해요.
              </p>
            </SurveyDetailButton>
          </motion.div>
        </div>

        <div className="w-full flex flex-col gap-[0.5rem]">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 1.0 + index * 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <SurveyOption
                label={option}
                isSelected={selectedOption === option}
                onClick={() =>
                  setSelectedOption(selectedOption === option ? null : option)
                }
                onHelpClick={() => handleHelpClick(option)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <BottomButton label="다음으로" />
      <SurveyFirstBottomsheet
        isOpen={isBottomSheetOpen}
        onClose={setIsBottomSheetOpen}
        items={currentHelpItems}
      />
    </div>
  );
};

export default Page;
