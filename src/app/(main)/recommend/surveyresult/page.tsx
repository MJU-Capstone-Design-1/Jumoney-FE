"use client";

import React from "react";
import RecommendResultCard from "@/components/recommendResultCard";
import { motion } from "framer-motion";

const page = () => {
  const typingText = "분석 완료! 당신의 투자 타입은 · · ·";

  return (
    <div>
      <div className="bg-primary h-auto rounded-[2.5rem] p-[1.5rem] gap-full flex flex-col text-secondary1 gap-[1rem]">
        <p className="text-body-sm font-semibold">
          {typingText.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.07, duration: 0.1 }}
            >
              {char}
            </motion.span>
          ))}
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-label-md font-extrabold"
        >
          무결점 방어형 저축가
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="text-body-md font-semibold leading-[120%]"
        >
          손실 확률 0%에 도전해요
          <br />
          아주 짧은 기간이라도 원금이 완벽히 보호되는 곳을 선호합니다
        </motion.p>
      </div>

      <div className="flex flex-col gap-[1rem] p-[1.5rem]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.8 }}
          className="flex flex-col text-body-xl font-extrabold"
        >
          추천 종목
        </motion.p>
        {/* TODO: 추천 종목 받아오기 */}
        <div className="flex flex-col gap-[1rem]">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 3.3 + i * 0.2,
                duration: 0.5,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <RecommendResultCard />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
