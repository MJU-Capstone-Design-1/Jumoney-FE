import React from 'react';
import { ITIcon } from '@/components/icons/itIcon';
import { MobilityIcon } from '@/components/icons/mobilityIcon';
import { FinanceIcon } from '@/components/icons/financeIcon';
import { BioIcon } from '@/components/icons/bioIcon';
import { StealIcon } from '@/components/icons/stealIcon';
import { EnergyIcon } from '@/components/icons/energyIcon';
import { CommunicationIcon } from '@/components/icons/communicationIcon';
import { StaplesIcon } from '@/components/icons/staplesIcon';
import { MechanicIcon } from '@/components/icons/mechanicIcon';
import { UtilityIcon } from '@/components/icons/utilityIcon';

export type FieldType =
  | 'it'
  | 'mobility'
  | 'finance'
  | 'bio'
  | 'steal'
  | 'energy'
  | 'communication'
  | 'staples'
  | 'mechanic'
  | 'utility';

export interface FieldConfig {
  bgColor: string;
  icon: React.ReactNode;
  label: string;
  iconOffset?: string;
}

export const FIELD_CONFIGS: Record<FieldType, FieldConfig> = {
  it: {
    bgColor: 'bg-field-it',
    icon: <ITIcon />,
    label: 'IT/반도체',
    iconOffset: 'translate-y-[0.5px]',
  },
  mobility: {
    bgColor: 'bg-field-mobility',
    icon: <MobilityIcon />,
    label: '자동차/운송',
    iconOffset: '-translate-y-[1px]',
  },
  finance: {
    bgColor: 'bg-field-finance',
    icon: <FinanceIcon />,
    label: '금융',
  },
  bio: {
    bgColor: 'bg-field-bio',
    icon: <BioIcon />,
    label: '바이오/헬스케어',
    iconOffset: 'translate-y-[0.5px]',
  },
  steal: {
    bgColor: 'bg-field-steal',
    icon: <StealIcon />,
    label: '철강/소재',
  },
  energy: {
    bgColor: 'bg-field-energy',
    icon: <EnergyIcon />,
    label: '에너지/화학',
    iconOffset: 'translate-x-[1px]',
  },
  communication: {
    bgColor: 'bg-field-communication',
    icon: <CommunicationIcon />,
    label: '커뮤니케이션',
  },
  staples: {
    bgColor: 'bg-field-staples',
    icon: <StaplesIcon />,
    label: '필수소비재',
    iconOffset: 'translate-x-[0.5px]',
  },
  mechanic: {
    bgColor: 'bg-field-mechanic',
    icon: <MechanicIcon />,
    label: '조선/기계',
    iconOffset: 'translate-x-[0.5px] -translate-y-[0.5px]',
  },
  utility: {
    bgColor: 'bg-field-utility',
    icon: <UtilityIcon />,
    label: '건설/유틸리티',
    iconOffset: 'translate-x-[0.5px]',
  },
};

interface FieldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fieldType: FieldType;
}

export const FieldButton = ({
  fieldType,
  className,
  ...props
}: FieldButtonProps) => {
  const config = FIELD_CONFIGS[fieldType];
  if (!config) return null;

  return (
    <div
      className={`flex flex-shrink-0 flex-col items-center justify-start gap-[0.5rem] ${className || ''}`}
    >
      <button
        type='button'
        aria-label={config.label}
        className={`shadow-card-shadow flex h-[3rem] w-[3rem] flex-shrink-0 cursor-pointer items-center justify-center rounded-full transition-transform outline-none ${config.bgColor}`}
        {...props}
      >
        <span className={config.iconOffset || ''}>{config.icon}</span>
      </button>
      <div className='text-body-sm text-text-main text-center leading-[120%] font-bold'>
        {config.label.split('/').map((text, index, array) => (
          <React.Fragment key={index}>
            {text}
            {index < array.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const fieldButton = FieldButton;
