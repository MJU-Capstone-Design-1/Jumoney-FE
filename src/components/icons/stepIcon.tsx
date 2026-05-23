import React, { SVGProps } from 'react';

export interface StepColor {
  fillColor: string;
  strokeColor: string;
}

interface StepIconProps extends SVGProps<SVGSVGElement> {
  stepColors: StepColor[];
}

export const StepIcon = ({ stepColors, ...props }: StepIconProps) => {
  const steps = [
    { x: 4, y: 4, cx: 26, cy: 26 },
    { x: 94, y: 54, cx: 116, cy: 76 },
    { x: 214, y: 54, cx: 236, cy: 76 },
    { x: 311, y: 4, cx: 333, cy: 26 },
  ];

  return (
    <svg
      width='359'
      height='102'
      viewBox='0 0 359 102'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      {steps.map((step, idx) => {
        const color = stepColors[idx];

        return (
          <g key={`step-${idx}`}>
            <rect
              x={step.x}
              y={step.y}
              width='44'
              height='44'
              rx='22'
              fill={color.fillColor}
            />
            <rect
              x={step.x}
              y={step.y}
              width='44'
              height='44'
              rx='22'
              stroke={color.strokeColor}
              strokeWidth='8'
            />
            <circle cx={step.cx} cy={step.cy} r='4' fill={color.strokeColor} />
          </g>
        );
      })}
    </svg>
  );
};
