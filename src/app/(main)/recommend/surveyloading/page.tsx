"use client";

import React, { useState, useEffect } from "react";
import BackButtonField from "@/components/backButtonField";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";
import { LoadingNewsCard } from "@/features/recommend/survey/loadingNewsCard";

const NEWS_ITEMS = [
  {
    id: 1,
    subtitle: "호가 예상 금융 뉴스 인사이트",
    title: "주목받는 AI 반도체 관련주",
    tag: "반도체/IT",
  },
  {
    id: 2,
    subtitle: "오늘의 주요 경제 지표",
    title: "미 연준 금리 인하 가능성 시사",
    tag: "거시경제",
  },
  {
    id: 3,
    subtitle: "글로벌 마켓 트렌드",
    title: "전기차 수요 회복 조짐 보인다",
    tag: "모빌리티",
  },
];

const FloatingCircle = ({
  // ... (FloatingCircle code remains unchanged)
  color,
  delay = 0,
  opacity = 1,
  style = {},
  radius = 30,
  duration = 8,
}: {
  color: string;
  delay?: number;
  opacity?: number;
  style?: React.CSSProperties;
  radius?: number;
  duration?: number;
}) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: "180px",
      height: "180px",
      backgroundColor: color,
      opacity: opacity,
      ...style,
    }}
    animate={{
      x: [0, radius, 0, -radius, 0],
      y: [-radius, 0, radius, 0, -radius],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: "linear",
      delay: delay,
    }}
  />
);

const Page = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NEWS_ITEMS.length);
    }, 3000); // 3초마다 변경
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500); // 0.5초마다 점 개수 증가
    return () => clearInterval(dotTimer);
  }, []);

  return (
    <div className="relative flex flex-col w-full px-4 pt-4 bg-primary min-h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <FloatingCircle
          color="#b4c48d"
          opacity={0.64}
          style={{ top: "-40px", left: "40%" }}
          radius={35}
          duration={7}
        />
        <FloatingCircle
          color="#E5EAD7"
          style={{ top: "25%", left: "-90px" }}
          radius={30}
          duration={9}
          delay={1}
        />
        <FloatingCircle
          color="var(--primary-muted)"
          opacity={0.64}
          style={{ bottom: "-50px", left: "-40px" }}
          radius={40}
          duration={8}
          delay={2}
        />
        <FloatingCircle
          color="var(--primary-muted)"
          style={{ bottom: "10%", right: "-100px" }}
          radius={35}
          duration={10}
          delay={3}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center flex-1 w-full">
        <div className="w-full">
          <BackButtonField color="secondary1" label="오늘의 호주머니" />
        </div>

        <div className="flex flex-col pt-[6rem] items-center gap-[3.625rem]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-label-xl font-extrabold text-secondary1 text-center"
          >
            분석 중{" "}
            <span className={dotCount >= 1 ? "opacity-100" : "opacity-0"}>
              ·
            </span>
            <span className={dotCount >= 2 ? "opacity-100" : "opacity-0"}>
              ·
            </span>
            <span className={dotCount >= 3 ? "opacity-100" : "opacity-0"}>
              ·
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Spinner className="w-[11.25rem] h-[11.25rem]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-body-xl font-semibold text-secondary1 text-center leading-[120%]"
          >
            실시간 뉴스 데이터를 기반으로
            <br />
            분석하고 있어요
          </motion.p>
        </div>

        <div className="mt-auto mb-[1.875rem] w-full max-w-[21.4375rem] relative min-h-[6.5rem]">
          <AnimatePresence mode="popLayout">
            <LoadingNewsCard
              key={currentIndex}
              subtitle={NEWS_ITEMS[currentIndex].subtitle}
              title={NEWS_ITEMS[currentIndex].title}
              tag={NEWS_ITEMS[currentIndex].tag}
              className="absolute w-full mt-0 mb-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Page;
