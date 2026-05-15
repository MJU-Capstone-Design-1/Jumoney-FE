"use client";

import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import DocumentIcon from "@/components/icons/documentIcon";

interface LoadingNewsCardProps extends HTMLMotionProps<"div"> {
  title: string;
  subtitle: string;
  tag: string;
  className?: string;
}

export const LoadingNewsCard = ({
  title,
  subtitle,
  tag,
  className,
  ...props
}: LoadingNewsCardProps) => {
  return (
    <motion.div
      className={cn(
        "w-[21.4375rem] bg-secondary1 rounded-[2rem] px-[0.75rem] py-[1rem] flex items-center gap-[1rem] shadow-card-shadow",
        className,
      )}
      {...props}
    >
      {/* Left Icon Area */}
      <div className="w-[4.5rem] h-[4.5rem] bg-background rounded-[1.5rem] flex items-center justify-center">
        <DocumentIcon />
      </div>

      {/* Right Text Area */}
      <div className="flex flex-col">
        <span className="text-body-sm text-text-sub font-semibold mb-[0.3125rem]">
          {subtitle}
        </span>
        <h3 className="text-body-xl font-extrabold text-secondary2">{title}</h3>
        <span className="text-body-md text-text-main font-bold mt-[0.625rem]">
          # {tag}
        </span>
      </div>
    </motion.div>
  );
};
