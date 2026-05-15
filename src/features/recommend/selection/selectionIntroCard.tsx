"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

const MASTERS = [
  {
    id: "buffett",
    name: "워런 버핏",
    activeBg: "data-[state=on]:bg-main1",
    activeShadow: "data-[state=on]:shadow-select-orange",
  },
  {
    id: "lynch",
    name: "피터 린치",
    activeBg: "data-[state=on]:bg-main2",
    activeShadow: "data-[state=on]:shadow-select-brown",
  },
  {
    id: "dalio",
    name: "레이 달리오",
    activeBg: "data-[state=on]:bg-main3",
    activeShadow: "data-[state=on]:shadow-select-yellow",
  },
  {
    id: "oneil",
    name: "윌리엄 오닐",
    activeBg: "data-[state=on]:bg-main4",
    activeShadow: "data-[state=on]:shadow-select-gray",
  },
];

interface SelectionIntroCardProps {
  value: string;
  onValueChange: (value: string) => void;
}

const SelectionIntroCard = ({
  value,
  onValueChange,
}: SelectionIntroCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.4,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(val) => val && onValueChange(val)}
        spacing={4}
        className="!grid grid-cols-2 w-full"
      >
        {MASTERS.map((master) => {
          const isSelected = value === master.id;
          return (
            <ToggleGroupItem
              key={master.id}
              value={master.id}
              asChild
              className={cn(
                "flex w-full p-[1rem] bg-default h-[10.25rem] shadow-card-shadow text-body-lg font-bold !rounded-[2rem] text-end justify-start items-end transition-all duration-300",
                master.activeBg,
                master.activeShadow,
              )}
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                animate={isSelected ? { scale: [1, 3, 1] } : { scale: 1 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {master.name}
              </motion.button>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </motion.div>
  );
};

export default SelectionIntroCard;
