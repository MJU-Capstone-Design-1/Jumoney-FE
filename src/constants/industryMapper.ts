import { FieldType } from '@/features/mockinvestment/fieldButton';

export type BackendIndustryTag =
  | 'IT_SEMICONDUCTOR'
  | 'AUTOMOBILE_TRANSPORT'
  | 'ENERGY_CHEMISTRY'
  | 'BIO_HEALTHCARE'
  | 'SHIPBUILDING_MACHINERY'
  | 'FINANCE'
  | 'COMMUNICATION'
  | 'STEEL_MATERIALS'
  | 'CONSTRUCTION_UTILITY'
  | 'ESSENTIAL_CONSUMER';

export const INDUSTRY_LABEL_MAP: Record<BackendIndustryTag, string> = {
  IT_SEMICONDUCTOR: 'IT/반도체',
  AUTOMOBILE_TRANSPORT: '자동차/운송',
  ENERGY_CHEMISTRY: '에너지/화학',
  BIO_HEALTHCARE: '바이오/헬스케어',
  SHIPBUILDING_MACHINERY: '조선/기계',
  FINANCE: '금융',
  COMMUNICATION: '커뮤니케이션',
  STEEL_MATERIALS: '철강/소재',
  CONSTRUCTION_UTILITY: '건설/유틸리티',
  ESSENTIAL_CONSUMER: '필수소비재',
};

export const INDUSTRY_FIELD_MAP: Record<BackendIndustryTag, FieldType> = {
  IT_SEMICONDUCTOR: 'it',
  AUTOMOBILE_TRANSPORT: 'mobility',
  ENERGY_CHEMISTRY: 'energy',
  BIO_HEALTHCARE: 'bio',
  SHIPBUILDING_MACHINERY: 'mechanic',
  FINANCE: 'finance',
  COMMUNICATION: 'communication',
  STEEL_MATERIALS: 'steel',
  CONSTRUCTION_UTILITY: 'utility',
  ESSENTIAL_CONSUMER: 'staples',
};

export function isBackendIndustryTag(tag: string): tag is BackendIndustryTag {
  return Object.keys(INDUSTRY_LABEL_MAP).includes(tag);
}
