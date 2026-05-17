export const MASTERS_DATA = {
  buffett: {
    id: 'buffett',
    name: '워런 버핏',
    theme: 'bg-main1',
    shadow: 'shadow-select-orange',
    slogan: '워런 버핏은 꾸준히 수익을 내는 우량주를 좋아합니다.',
    description:
      '가치 투자의 거장 워런 버핏이\n도서와 인터뷰 등을 통해 언급한 핵심 투자 지표예요.\n원하시는 조건을 선택하시면, 워런 버핏이\n현재 한국 시장에서 어떤 종목에 투자할지 찾아 드릴게요.',
    criteria: [
      'ROE 15% 이상',
      '영업이익률 20% 이상',
      '부채비율 100% 이하',
      'EPS 성장률 10% 이상',
      'PER 0배 초과 15배 이하',
    ],
  },
  lynch: {
    id: 'lynch',
    name: '피터 린치',
    theme: 'bg-main2',
    shadow: 'shadow-select-brown',
    slogan: '피터 린치는 일상 속에서 성장주를 발굴합니다.',
    description:
      '성장주 투자의 거장 피터 린치가\n도서와 인터뷰 등을 통해 언급한 핵심 투자 지표예요.\n원하시는 조건을 선택하시면, 피터 린치가\n현재 한국 시장에서 어떤 종목에 투자할지 찾아 드릴게요.',
    criteria: [
      'PEG 1.0 이하',
      'EPS 성장률 20% ~ 50%',
      '부채비율 100% 이하',
      '매출액 증가율 10% 이상',
      '섹터 선택',
    ],
  },
  dalio: {
    id: 'dalio',
    name: '레이 달리오',
    theme: 'bg-main3',
    shadow: 'shadow-select-yellow',
    slogan: '분산 투자와 리스크 관리를 중요하게 생각합니다.',
    description:
      '거시 투자의 거장 레이 달리오의\n투자 원칙을 재해석하여 지표를 구성했어요.\n원하시는 조건을 선택하시면, 레이 달리오가\n현재 한국 시장에서 어떤 종목에 투자할지 찾아 드릴게요.',
    criteria: [
      '올웨더 포트폴리오',
      'PER 20배 이하',
      '신용잔고율 5% 이하',
      '부채비율 50% 이하',
      '이익수익률 3.38 이상',
    ],
  },
  oneil: {
    id: 'oneil',
    name: '윌리엄 오닐',
    theme: 'bg-main4',
    shadow: 'shadow-select-gray',
    slogan: '윌리엄 오닐은 강한 성장세와 추세를 가진 주식에 투자합니다.',
    description:
      '모멘텀 투자의 거장 윌리엄 오닐의\n‘CAN SLIM’ 전략으로 투자 지표를 구성했어요.\n원하시는 조건을 선택하시면, 윌리엄 오닐이\n현재 한국 시장에서 어떤 종목에 투자할지 찾아 드릴게요.',
    criteria: [
      'EPS 성장률 25% 이상',
      'ROE 17% 이상',
      '52주 신고가 갱신 또한 10% 근접',
      '대장주 여부',
      '최근 20거래일 기관 순매수 합계 0 이상',
    ],
  },
};

export const MOCK_STOCKS = [
  {
    id: 1,
    name: '삼성전자',
    tags: ['# 종목 태그', '# 종목 태그'],
    price: '210,000',
    change: '+2.4% ▲',
    roe: '12.5%',
  },
  {
    id: 2,
    name: '삼성전자',
    tags: ['# 종목 태그', '# 종목 태그'],
    price: '210,000',
    change: '+2.4% ▲',
    roe: '12.5%',
  },
  {
    id: 3,
    name: '삼성전자',
    tags: ['# 종목 태그', '# 종목 태그'],
    price: '210,000',
    change: '+2.4% ▲',
    roe: '12.5%',
  },
  {
    id: 4,
    name: '삼성전자',
    tags: ['# 종목 태그', '# 종목 태그'],
    price: '210,000',
    change: '+2.4% ▲',
    roe: '12.5%',
  },
];

export const CRITERIA_DESCRIPTIONS = {
  buffett: [
    {
      title: 'ROE 15% 이상',
      description:
        '워런 버핏이 가장 중시하는 투자 지표예요.\n버핏은 연 15% 이상의 자기자본이익률(ROE)을\n꾸준히 유지하며 자본을 효율적으로 굴리는\n기업에 투자해 왔어요.',
    },
    {
      title: 'PER 0배 초과 15배 이하',
      description:
        '워런 버핏은 일반적으로 주가수익비율(PER)이\n낮은 저평가된 우량주를 선호해요.\n기업이 벌어들이는 순이익 대비 주가가 낮은\n가치주를 찾을 수 있어요.',
    },
    {
      title: 'EPS 성장률 10% 이상',
      description:
        '워런 버핏은 기업의 장기적인 가치는\nEPS 증가 추세로 짐작할 수 있다고 언급했어요.\n주당순이익(EPS) 자체보다는 EPS 증가율을\n중요하게 생각하여, 지속적인 실적 증가가\n나타나는 기업을 선호해요.',
    },
    {
      title: '부채비율 100% 이하',
      description:
        '워런 버핏은 위기 상황에서도 흔들리지 않는\n재무적 안정성을 중시하여 부채비율이\n낮은 탄탄한 기업을 선호해요.',
    },
    {
      title: '영업이익률 20% 이상',
      description:
        '워런 버핏은 높은 영업이익률을 기록하는\n기업을 경제적 해자를 가진 우량주로 평가해요.',
    },
  ],
  lynch: [
    {
      title: 'PEG 1.0 이하',
      description:
        '피터 린치가 대중화시킨 지표로, 성장주 투자의\n핵심 지표예요.주가수익비율(PER)이 이익 성장률보다\n낮아, 회사가 성장하는 속도에 비해 주가가 낮은\n저평가된 성장주를 찾을 수 있어요.',
    },
    {
      title: 'EPS 성장률 20% ~ 50%',
      description:
        '피터 린치는 매년 수익이 20% 이상 성장하는\n고성장주를 선호해요. 다만, 50% 이상의\n지나친 고성장은 과열로 간주하여 주의를 당부했어요.',
    },
    {
      title: '부채비율 100% 이하',
      description:
        '피터 린치는 재무 건전성도 중시하여\n성장이 가파르더라도 높은 부채를 가진 기업은\n위험하다고 판단했어요. 내실 있는 성장을\n이어갈 수 있는 탄탄한 재무 구조를 가진\n기업을 선호해요.',
    },
    {
      title: '매출액 증가율 10% 이상',
      description:
        '피터 린치는 재고가 쌓이는 것보다 실제로 물건이\n잘 팔려 매출이 많이 발생하는 것을 중요하게 여겼어요.\n단순히 비용을 줄여서 만든 일시적인 이익이 아니라,\n매출이 꾸준히 늘어나는 기업을 선호해요.',
    },
    {
      title: '섹터 선택',
      description:
        '"아는 것에 투자하라."는 피터 린치의 핵심적인\n투자 철학이에요. 내가 평소에 자주 소비하고 잘 아는\n친숙한 산업군에서 성장 기업을 찾아보세요.',
    },
  ],
  dalio: [
    {
      title: '올웨더 포트폴리오 (섹터 분산)',
      description:
        '레이 달리오의 핵심 철학 ‘올웨더 포트폴리오’는\n상관관계가 낮은 자산에 분산 투자하는 방식이에요.\n서로 다르게 움직이는 4가지 섹터에 고르게\n분산 투자하여 계좌를 안전하게 지킬 수 있어요.',
    },
    {
      title: 'PER 20배 이하',
      description:
        '레이 달리오는 주가가 지나치게 높은지 판단하기 위해\n거품 지표를 사용해요. 이익 대비 주가가 과도하게\n비싸지 않은 거품 없는 종목을 선별해요.',
    },
    {
      title: '신용잔고율 5% 이하',
      description:
        '레이 달리오는 투자자들이 빚을 내서 매입하고 있는\n종목을 거품이라고 판단하고 경계해요.',
    },
    {
      title: '부채비율 50% 이하',
      description:
        '레이 달리오는 장기적인 부채 사이클의 안정성을\n매우 중시해요. 빚이 자본의 절반 이하인 탄탄한\n기업을 선별하여 경제 불황에서도 안전한지 확인해요.',
    },
    {
      title: '이익수익률 3.38(현 국고채 3년물) 이상',
      description:
        '레이 달리오는 "현금은 쓰레기다”라는 말을 하며\n인플레이션을 경계했어요. 안전한 국고채 3년물\n금리보다 기업의 이익수익률이 높은 종목을 찾아볼게요.',
    },
  ],
  oneil: [
    {
      title: 'EPS 성장률 25% 이상',
      description:
        'CAN SLIM의 C(최근 분기 이익)와 A(연간 이익)에\n해당하는 투자 지표예요. 오닐은 주당순이익(EPS)이\n전년 대비 25% 이상 꾸준히 증가하며 확실한\n성장성을 보여주는 우량주를 선별해요.',
    },
    {
      title: 'ROE 17% 이상',
      description:
        'CAN SLIM의 A(연간 이익)를 뒷받침하는\n투자 지표예요. 오닐은 시장을 주도하는 종목이\n평균적으로 17% 이상의 자기자본이익률(ROE)을\n기록했다고 분석했어요.',
    },
    {
      title: '52주 신고가 갱신 또한 10% 근접',
      description:
        'CAN SLIM의 N(신고가)에 해당하는 투자 지표예요.\n52주 최고가를 넘어서거나 근접하여 상승 추세를\n타기 시작한 종목을 선별해요.',
    },
    {
      title: '대장주 여부',
      description:
        'CAN SLIM의 L(주도주)에 해당하는\n투자 지표예요. 섹터 내에서 시장의 트랜드를\n이끄는 대장주에 투자해요.',
    },
    {
      title: '최근 20거래일 기관 순매수 합계 0 이상',
      description:
        'CAN SLIM의 I(기관의 수급)에 해당하는\n투자 지표예요. 주가가 크게 상승하기 위해서는\n펀드나 연기금과 같은 기관의 자금 유입이 필요해요.\n최근 20거래일 동안 기관 투자자들이 매도보다\n매수를 더 많이 한 종목을 선별해요.',
    },
  ],
};

export const LOGIC_CODE_TO_KOREAN: Record<string, string> = {
  BUFFETT_ROE: 'ROE',
  BUFFETT_PER: 'PER',
  BUFFETT_EPS_GROWTH: 'EPS 성장률',
  BUFFETT_DEBT_RATIO: '부채비율',
  BUFFETT_OPERATING_MARGIN: '영업이익률',

  LYNCH_PEG: 'PEG',
  LYNCH_EPS_GROWTH: 'EPS 성장률',
  LYNCH_DEBT_RATIO: '부채비율',
  LYNCH_SALES_GROWTH: '매출액 증가율',
  LYNCH_SECTOR: '섹터 선택',

  DALIO_ALL_WEATHER: '올웨더 포트폴리오',
  DALIO_PER: 'PER',
  DALIO_MARGIN_DEBT: '신용잔고율',
  DALIO_DEBT_RATIO: '부채비율',
  DALIO_EARNINGS_YIELD: '이익수익률',

  ONEIL_EPS_GROWTH: 'EPS 성장률',
  ONEIL_ROE: 'ROE',
  ONEIL_HIGH_52_WEEK: '52주 신고가 갱신',
  ONEIL_MARKET_LEADER: '대장주 여부',
  ONEIL_INST_NET_BUY: '기관 순매수',
};
