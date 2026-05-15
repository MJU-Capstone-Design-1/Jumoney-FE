import React from "react";

interface SurveyStepperProps {
  currentStep: number;
  totalSteps: number;
}

export const SurveyStepper = ({
  currentStep,
  totalSteps,
}: SurveyStepperProps) => {
  return (
    <div className="absolute flex gap-[0.375rem] letter-spacing-[1rem] top-[1.375rem] right-[1rem] w-[4rem] h-[1.875rem] text-main2 flex items-center justify-center rounded-[6.25rem] bg-default text-body-sm font-extrabold text-center z-10">
      {currentStep} <p>OF</p> {totalSteps}
    </div>
  );
};
