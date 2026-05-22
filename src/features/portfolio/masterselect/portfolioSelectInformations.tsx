import React from 'react';

export const MASTERS = [
  {
    name: '워런 버핏',
    image: '/images/warrenBuffetImage.svg',
    bgColor: 'bg-main1',
    tags: ['가치 투자', '경제적 해자'],
    quote: (
      <>
        규칙 1: 절대 돈을 잃지 마라
        <br />
        규칙 2: 규칙 1을 잊지 마라
      </>
    ),
    investment_philosophy: {
      title: '우량 기업을 장기 보유',
      description:
        '단순히 숫자만 보고 사고팔지 말고, 장기적으로 함께할 수 있는 훌륭한 기업에 투자해요.',
    },
    investment_principles: [
      {
        title: '좋은 회사를 합리적인 가격에 오래 보유하기',
        description:
          '회사의 실제 가치보다 낮은 가격에 사서, 나중에 가격이 제자리를 찾을 때까지 느긋하게 기다려요.',
      },
      {
        title: '경제적 해자 확인하기',
        description:
          '다른 경쟁사가 흉내 낼 수 없는 강력한 브랜드나 기술을 가진 기업만 골라요.',
      },
      {
        title: '능력 범위 지키기',
        description:
          '사업 모델이 너무 복잡해서 이해하기 어려운 곳은 포기하고, 내가 완벽하게 이해할 수 있는 산업에만 집중 투자해요.',
      },
    ],
  },
  {
    name: '피터 린치',
    image: '/images/peterLynchImage.svg',
    bgColor: 'bg-main2',
    tags: ['성장주 투자', '생활 속 발견'],
    quote: (
      <>
        자신이 이해할 수 있는 기업에 투자하라
        <br />
        기업이 무엇을 하는지 찾아내라
      </>
    ),
    investment_philosophy: {
      title: '아는 것에 투자하라',
      description:
        '내가 평소에 자주 소비하고 좋다고 느끼는 제품을 만드는 회사에 투자해요.',
    },
    investment_principles: [
      {
        title: '텐버거 발굴',
        description:
          '앞으로 10배 이상 커질 가능성이 있는 작지만 튼튼한 성장주를 끝까지 믿고 기다려요.',
      },
      {
        title: '직접 가서 눈으로 확인하기',
        description:
          '매장에 사람이 많은지, 물건이 잘 팔리는지 직접 확인하며 기업의 성장 가능성을 확인해요.',
      },
      {
        title: '빚이 적고 꾸준히 성장하는 기업 선호',
        description:
          '아무리 빠르게 성장하더라도 부채가 지나치게 많으면 위험하다고 판단하며, 안정적인 재무 구조를 가진 기업을 선호해요.',
      },
      {
        title: '성장 대비 너무 비싸지 않은 기업 찾기',
        description:
          '아무리 좋은 회사라도 성장률 대비 가격이 지나치게 비싸면 투자하지 않아요. (PEG로 확인할 수 있어요.)',
      },
    ],
  },
  {
    name: '레이 달리오',
    image: '/images/rayDalioImage.svg',
    bgColor: 'bg-main3',
    tags: ['거시 투자', '올웨더 포트폴리오'],
    quote: (
      <>
        가장 원하는 목표를 선택하고 헌신하세요
        <br />
        일반 대중들이 말하는 것과 반대로 하세요
      </>
    ),
    investment_philosophy: {
      title: '올웨더(All-Weather) 포트폴리오',
      description:
        '앞으로 경제가 좋아질지 나빠질지 맞추려 하지 말고, 어떤 상황이든 내 자산을 안전하게 지킬 수 있는 시스템을 만들어요.',
    },
    investment_principles: [
      {
        title: '서로 다르게 움직이는 자산 배분',
        description:
          '하나가 떨어질 때 다른 하나는 오르는, 성격이 다른 자산들을 섞어 전체적인 내 자산의 변동성을 줄여요.',
      },
      {
        title: '경제의 사계절(호황, 불황, 인플레이션, 디플레이션) 대비하기',
        description:
          '성장과 물가 상황에 따라 경제가 변할 때마다 수익을 내줄 자산들을 미리 배치해 둬요.',
        details: [
          '경제가 잘 나갈 때: 주식, 회사채',
          '경제가 위축될 때: 국채',
          '물가가 오를 때: 금, 원자재',
          '물가가 안정될 때: 주식, 국채',
        ],
      },
      {
        title: '위험의 비중 맞추기',
        description:
          '자산을 똑같은 금액으로 나누는 게 아니라, 각 자산이 가진 위험의 크기를 똑같이 맞춰서 포트폴리오의 균형을 잡아요.',
      },
    ],
  },
  {
    name: '윌리엄 오닐',
    image: '/images/williamOneilImage.svg',
    bgColor: 'bg-main4',
    tags: ['모멘텀 투자', 'CAN SLIM 전략'],
    quote: (
      <>
        가장 큰 실수는 이미 하락한 주식을
        <br /> 더 싸게 사려고 하는 것이다
      </>
    ),
    investment_philosophy: {
      title: 'CAN SLIM 전략',
      description:
        '과거 100년간 큰 수익을 낸 주도주들을 분석하여 탄생한 전략으로, 최고의 주식을 최적의 타이밍에 매수해요.',
    },
    investment_principles: [
      {
        title: 'C: 현재 분기 순이익 (Current Quarterly Earnings)',
        description:
          '최근 분기의 주당순이익(EPS)이 전년 동기 대비 최소 25% 이상 크고 빠르게 성장하는 기업을 선별해요.',
      },
      {
        title: 'A: 연간 순이익 증가율 (Annual Earnings Growth)',
        description:
          '과거 3~5년 동안 연간 순이익이 꾸준하고 의미 있게 증가하며 성장세를 유지하는지 확인해요.',
      },
      {
        title: 'N: 신제품, 신경영, 신고가 (New Products, Management, Highs)',
        description:
          '시장을 뒤흔들 신제품이나 새로운 경영진이 등장했거나, 주가가 저항선을 뚫고 새로운 신고가를 기록할 때 매수해요.',
      },
      {
        title: 'S: 수요와 공급 (Supply and Demand)',
        description:
          '시장에 유통되는 주식 수가 적거나 자사주를 적극적으로 매입하여, 결정적인 시점에 대규모 수요가 발생할 수 있는 기업을 찾아요.',
      },
      {
        title: 'L: 주도주 여부 (Leader or Laggard)',
        description:
          '동일한 산업 내에서도 시장을 이끌어가는 주도주만 매수하고, 뒤처지는 소외주는 과감히 피해요.',
      },
      {
        title: 'I: 기관 투자자의 뒷받침 (Institutional Sponsorship)',
        description:
          '뛰어난 실적과 뚜렷한 철학을 가진 펀드나 기관 투자자들이 최근 들어 집중적으로 매수하고 있는 종목을 따라가요.',
      },
      {
        title: 'M: 시장의 방향성 (Market Direction)',
        description:
          '아무리 좋은 주식도 하락장에서는 떨어지기 마련이므로, 전체 시장의 방향성이 강세장일 때만 투자하고 약세장에서는 몸을 사려요.',
      },
    ],
  },
];
