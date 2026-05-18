export const labelMappings = {
  INVESTMENT_PURPOSE: '투자 목적',
  RISK_PROFILE: '위험 감수 성향',
  INVESTMENT_HORIZON: '투자 기간',

  CAPITAL_PROTECTION: '안정적인 자산 보호',
  DIVIDEND_INCOME: '배당 수익',
  STEADY_GROWTH: '자산의 꾸준한 성장',
  CAPITAL_GAIN: '시세 차익',

  STABILITY: '매우 낮음',
  SAFE_PURSUIT: '낮음',
  PROFIT_PURSUIT: '높음',
  AGGRESSIVE: '매우 높음',

  ULTRA_SHORT: '초단기(1일)',
  SHORT: '단기(1주일)',
  MID: '중기(3달)',
  LONG: '장기(1년)',

  EXECUTION_STRENGTH: '체결강도',
  ACCUMULATED_TRADE_AMOUNT: '거래대금',
  EPS_GROWTH_RATE: 'EPS 성장률',
  ROE: 'ROE',

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
} as const;

export const recommendationTagLabels = {
  CAPITAL_PROTECTION: '안정적인 자산 보호',
  DIVIDEND_INCOME: '배당 수익',
  STEADY_GROWTH: '자산의 꾸준한 성장',
  CAPITAL_GAIN: '시세 차익',

  STABILITY: '위험도 매우 낮음',
  SAFE_PURSUIT: '위험도 낮음',
  PROFIT_PURSUIT: '위험도 높음',
  AGGRESSIVE: '위험도 매우 높음',
} as const;

export const masterCodeLabels = {
  WARREN_BUFFETT: '워런 버핏',
  PETER_LYNCH: '피터 린치',
  RAY_DALIO: '레이 달리오',
  WILLIAM_ONEIL: '윌리엄 오닐',
} as const;

export const masterOptionLabels = {
  BUFFETT_ROE: 'ROE 15% 이상',
  BUFFETT_PER: 'PER 0배 초과 15배 이하',
  BUFFETT_EPS_GROWTH: 'EPS 성장률 10% 이상',
  BUFFETT_DEBT_RATIO: '부채비율 100% 이하',
  BUFFETT_OPERATING_MARGIN: '영업이익률 20% 이상',

  LYNCH_PEG: 'PEG 1.0 이하',
  LYNCH_EPS_GROWTH: 'EPS 성장률 20% 이상 50% 이하',
  LYNCH_DEBT_RATIO: '부채비율 100% 이하',
  LYNCH_SALES_GROWTH: '매출액 증가율 10% 이상',
  LYNCH_SECTOR: '섹터 선택',

  DALIO_ALL_WEATHER: '올웨더 포트폴리오',
  DALIO_PER: 'PER 20배 이하',
  DALIO_MARGIN_DEBT: '신용잔고율 5% 이하',
  DALIO_DEBT_RATIO: '부채비율 50% 이하',
  DALIO_EARNINGS_YIELD: '이익수익률 3.38% 이상',

  ONEIL_EPS_GROWTH: 'EPS 성장률 25% 이상',
  ONEIL_ROE: 'ROE 17% 이상',
  ONEIL_HIGH_52_WEEK: '52주 신고가 갱신 또는 10% 근접',
  ONEIL_MARKET_LEADER: '대장주 여부',
  ONEIL_INST_NET_BUY: '최근 20거래일 기관 순매수 합계 0 이상',
} as const;

export const masterSortMetricLabels = {
  ROE: 'ROE',
  PEG: 'PEG',
  MARKET_CAP: '시가총액',
  HIGH_52_WEEK_RATE: '52주 신고가 대비 현재가 비율',
} as const;
