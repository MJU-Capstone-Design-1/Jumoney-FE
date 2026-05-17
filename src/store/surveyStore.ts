import { create } from 'zustand';

export type SurveyPurpose =
  | '안정적인 자산 보호'
  | '배당 수익'
  | '자산의 꾸준한 성장'
  | '시세 차익';
export type SurveyRisk = '매우 낮음' | '낮음' | '높음' | '매우 높음';
export type SurveyPeriod = '초단기' | '단기' | '중기' | '장기';

interface SurveyState {
  purpose: SurveyPurpose | null;
  riskValue: number; // 0, 33, 66, 100
  period: SurveyPeriod | null;
  setPurpose: (purpose: SurveyPurpose) => void;
  setRiskValue: (val: number) => void;
  setPeriod: (period: SurveyPeriod) => void;
  getRiskLabel: () => SurveyRisk;
}

export const useSurveyStore = create<SurveyState>((set, get) => ({
  purpose: null,
  riskValue: 66,
  period: null,
  setPurpose: (purpose) => set({ purpose }),
  setRiskValue: (riskValue) => set({ riskValue }),
  setPeriod: (period) => set({ period }),
  getRiskLabel: () => {
    const val = get().riskValue;
    if (val === 0) return '매우 낮음';
    if (val === 33) return '낮음';
    if (val === 66) return '높음';
    return '매우 높음';
  },
}));
