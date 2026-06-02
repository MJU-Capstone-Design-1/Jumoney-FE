import type {
  SurveyPeriod,
  SurveyPurpose,
  SurveyRisk,
} from '@/store/surveyStore';

export const SURVEY_RISK_VALUE_BY_LABEL: Record<SurveyRisk, number> = {
  '매우 낮음': 0,
  낮음: 33,
  높음: 66,
  '매우 높음': 100,
};

export const SURVEY_RISK_LABEL_BY_VALUE: Record<number, SurveyRisk> = {
  0: '매우 낮음',
  33: '낮음',
  66: '높음',
  100: '매우 높음',
};

export const SURVEY_ALLOWED_RISKS: Record<SurveyPurpose, SurveyRisk[]> = {
  '안정적인 자산 보호': ['매우 낮음', '낮음', '높음'],
  '배당 수익': ['매우 낮음', '낮음', '높음'],
  '자산의 꾸준한 성장': ['매우 낮음', '낮음', '높음', '매우 높음'],
  '시세 차익': ['낮음', '높음', '매우 높음'],
};

const STANDARD_PERIODS: SurveyPeriod[] = ['단기', '중기', '장기'];
const CAPITAL_GAIN_PERIODS: SurveyPeriod[] = ['초단기', '단기', '중기', '장기'];

export const getAllowedRiskValues = (
  purpose: SurveyPurpose | null,
): number[] => {
  if (!purpose) return Object.values(SURVEY_RISK_VALUE_BY_LABEL);

  return SURVEY_ALLOWED_RISKS[purpose].map(
    (risk) => SURVEY_RISK_VALUE_BY_LABEL[risk],
  );
};

export const getAllowedPeriods = (
  purpose: SurveyPurpose | null,
  risk: SurveyRisk,
): SurveyPeriod[] => {
  if (!purpose) return CAPITAL_GAIN_PERIODS;

  const isAllowedRisk = SURVEY_ALLOWED_RISKS[purpose].includes(risk);
  if (!isAllowedRisk) return [];

  return purpose === '시세 차익' ? CAPITAL_GAIN_PERIODS : STANDARD_PERIODS;
};
