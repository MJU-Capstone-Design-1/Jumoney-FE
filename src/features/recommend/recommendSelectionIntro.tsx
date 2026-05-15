"use client";

import BottomButton from "@/components/bottomButton";
import SelectionIntroCard from "@/features/recommend/selection/selectionIntroCard";
import { motion } from "framer-motion";
import React, { useState } from "react";

const RecommendSelectionIntro = () => {
  const [selectedMaster, setSelectedMaster] = useState("");

  return (
    <div>
      <div className="flex flex-col pt-[1.5rem] gap-[2rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="items-center flex flex-col gap-[0.5rem] text-center"
        >
          <p className="text-label-md font-extrabold ">
            거장의 눈으로 시장을 바라보세요
          </p>
          <p className="text-body-md font-semibold text-text-main ">
            {/* TODO: 서버에서 유저 데이터 받아와서 적용 */}
            역사적으로 증명된 대가들의 원칙을 바탕으로
            <br />
            든든한 종목을 추천해드려요
          </p>
        </motion.div>

        <SelectionIntroCard
          value={selectedMaster}
          onValueChange={setSelectedMaster}
        />
      </div>
      <BottomButton label="시작하기" disabled={!selectedMaster} />
    </div>
  );
};

export default RecommendSelectionIntro;
