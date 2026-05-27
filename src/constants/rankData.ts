export interface ProfileItem {
  name: string;
  price: string;
  rate: string;
}

export interface RankData {
  name: string;
  asset: string;
  profit: string;
  portfolios: ProfileItem[];
}

export type MasterRankData = Record<string, Record<string, RankData>>;

const createProfile = (
  name: string,
  price: string,
  rate: string,
): ProfileItem => ({
  name,
  price,
  rate,
});

export const MASTER_RANK_DATA: MasterRankData = {
  all: {
    '1': {
      name: '이름',
      asset: '₩120,000,000',
      profit: '+12.5%',
      portfolios: [
        { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
        { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
        { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
      ],
    },
    '2': {
      name: '이름이름',
      asset: '₩95,000,000',
      profit: '+8.3%',
      portfolios: [
        { name: '카카오', price: '₩25,000,000', rate: '+10.1%' },
        { name: '네이버', price: '₩35,000,000', rate: '+8.8%' },
        { name: '현대자동차', price: '₩15,000,000', rate: '+4.2%' },
      ],
    },
    '3': {
      name: '이름이름이름',
      asset: '₩80,000,000',
      profit: '+15.1%',
      portfolios: [
        { name: 'LG화학', price: '₩40,000,000', rate: '+12.3%' },
        { name: '셀트리온', price: '₩25,000,000', rate: '+9.8%' },
        { name: 'SK하이닉스', price: '₩20,000,000', rate: '+7.1%' },
      ],
    },
    '4': {
      name: '이름이름이름이름',
      asset: '₩75,000,000',
      profit: '+10.5%',
      portfolios: [
        { name: '카카오', price: '₩30,000,000', rate: '+11.2%' },
        { name: '네이버', price: '₩25,000,000', rate: '+8.9%' },
        { name: '삼성전자', price: '₩20,000,000', rate: '+7.3%' },
      ],
    },
    '5': {
      name: '이름이름이름이름이름',
      asset: '₩60,000,000',
      profit: '+6.8%',
      portfolios: [
        { name: '삼성전자', price: '₩30,000,000', rate: '+6.2%' },
        { name: '현대자동차', price: '₩20,000,000', rate: '+4.5%' },
        { name: 'LG화학', price: '₩10,000,000', rate: '+3.1%' },
      ],
    },
  },
  buffett: {
    '1': {
      name: '버핏-1',
      asset: '₩120,000,000',
      profit: '+12.5%',
      portfolios: [
        { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
        { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
        { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
      ],
    },
    '2': {
      name: '버핏-2',
      asset: '₩95,000,000',
      profit: '+8.3%',
      portfolios: [
        { name: '카카오', price: '₩25,000,000', rate: '+10.1%' },
        { name: '네이버', price: '₩35,000,000', rate: '+8.8%' },
        { name: '현대자동차', price: '₩15,000,000', rate: '+4.2%' },
      ],
    },
    '3': {
      name: '버핏-3',
      asset: '₩80,000,000',
      profit: '+15.1%',
      portfolios: [
        { name: 'LG화학', price: '₩40,000,000', rate: '+12.3%' },
        { name: '셀트리온', price: '₩25,000,000', rate: '+9.8%' },
        { name: 'SK하이닉스', price: '₩20,000,000', rate: '+7.1%' },
      ],
    },
    '4': {
      name: '버핏-4',
      asset: '₩75,000,000',
      profit: '+10.5%',
      portfolios: [
        { name: '카카오', price: '₩30,000,000', rate: '+11.2%' },
        { name: '네이버', price: '₩25,000,000', rate: '+8.9%' },
        { name: '삼성전자', price: '₩20,000,000', rate: '+7.3%' },
      ],
    },
    '5': {
      name: '버핏-5',
      asset: '₩60,000,000',
      profit: '+6.8%',
      portfolios: [
        { name: '삼성전자', price: '₩30,000,000', rate: '+6.2%' },
        { name: '현대자동차', price: '₩20,000,000', rate: '+4.5%' },
        { name: 'LG화학', price: '₩10,000,000', rate: '+3.1%' },
      ],
    },
  },
  lynch: {
    '1': {
      name: '린치-1',
      asset: '₩120,000,000',
      profit: '+12.5%',
      portfolios: [
        { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
        { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
        { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
      ],
    },
    '2': {
      name: '린치-2',
      asset: '₩95,000,000',
      profit: '+8.3%',
      portfolios: [
        { name: '카카오', price: '₩25,000,000', rate: '+10.1%' },
        { name: '네이버', price: '₩35,000,000', rate: '+8.8%' },
        { name: '현대자동차', price: '₩15,000,000', rate: '+4.2%' },
      ],
    },
    '3': {
      name: '린치-3',
      asset: '₩80,000,000',
      profit: '+15.1%',
      portfolios: [
        { name: 'LG화학', price: '₩40,000,000', rate: '+12.3%' },
        { name: '셀트리온', price: '₩25,000,000', rate: '+9.8%' },
        { name: 'SK하이닉스', price: '₩20,000,000', rate: '+7.1%' },
      ],
    },
    '4': {
      name: '린치-4',
      asset: '₩75,000,000',
      profit: '+10.5%',
      portfolios: [
        { name: '카카오', price: '₩30,000,000', rate: '+11.2%' },
        { name: '네이버', price: '₩25,000,000', rate: '+8.9%' },
        { name: '삼성전자', price: '₩20,000,000', rate: '+7.3%' },
      ],
    },
    '5': {
      name: '린치-5',
      asset: '₩60,000,000',
      profit: '+6.8%',
      portfolios: [
        { name: '삼성전자', price: '₩30,000,000', rate: '+6.2%' },
        { name: '현대자동차', price: '₩20,000,000', rate: '+4.5%' },
        { name: 'LG화학', price: '₩10,000,000', rate: '+3.1%' },
      ],
    },
  },
  dalio: {
    '1': {
      name: '달리오-1',
      asset: '₩120,000,000',
      profit: '+12.5%',
      portfolios: [
        { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
        { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
        { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
      ],
    },
    '2': {
      name: '달리오-2',
      asset: '₩95,000,000',
      profit: '+8.3%',
      portfolios: [
        { name: '카카오', price: '₩25,000,000', rate: '+10.1%' },
        { name: '네이버', price: '₩35,000,000', rate: '+8.8%' },
        { name: '현대자동차', price: '₩15,000,000', rate: '+4.2%' },
      ],
    },
    '3': {
      name: '달리오-3',
      asset: '₩80,000,000',
      profit: '+15.1%',
      portfolios: [
        { name: 'LG화학', price: '₩40,000,000', rate: '+12.3%' },
        { name: '셀트리온', price: '₩25,000,000', rate: '+9.8%' },
        { name: 'SK하이닉스', price: '₩20,000,000', rate: '+7.1%' },
      ],
    },
    '4': {
      name: '달리오-4',
      asset: '₩75,000,000',
      profit: '+10.5%',
      portfolios: [
        { name: '카카오', price: '₩30,000,000', rate: '+11.2%' },
        { name: '네이버', price: '₩25,000,000', rate: '+8.9%' },
        { name: '삼성전자', price: '₩20,000,000', rate: '+7.3%' },
      ],
    },
    '5': {
      name: '달리오-5',
      asset: '₩60,000,000',
      profit: '+6.8%',
      portfolios: [
        { name: '삼성전자', price: '₩30,000,000', rate: '+6.2%' },
        { name: '현대자동차', price: '₩20,000,000', rate: '+4.5%' },
        { name: 'LG화학', price: '₩10,000,000', rate: '+3.1%' },
      ],
    },
  },
  oneil: {
    '1': {
      name: '오닐-1',
      asset: '₩120,000,000',
      profit: '+12.5%',
      portfolios: [
        { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
        { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
        { name: '삼성전자', price: '₩50,000,000', rate: '+5.2%' },
      ],
    },
    '2': {
      name: '오닐-2',
      asset: '₩95,000,000',
      profit: '+8.3%',
      portfolios: [
        { name: '카카오', price: '₩25,000,000', rate: '+10.1%' },
        { name: '네이버', price: '₩35,000,000', rate: '+8.8%' },
        { name: '현대자동차', price: '₩15,000,000', rate: '+4.2%' },
      ],
    },
    '3': {
      name: '오닐-3',
      asset: '₩80,000,000',
      profit: '+15.1%',
      portfolios: [
        { name: 'LG화학', price: '₩40,000,000', rate: '+12.3%' },
        { name: '셀트리온', price: '₩25,000,000', rate: '+9.8%' },
        { name: 'SK하이닉스', price: '₩20,000,000', rate: '+7.1%' },
      ],
    },
    '4': {
      name: '오닐-4',
      asset: '₩75,000,000',
      profit: '+10.5%',
      portfolios: [
        { name: '카카오', price: '₩30,000,000', rate: '+11.2%' },
        { name: '네이버', price: '₩25,000,000', rate: '+8.9%' },
        { name: '삼성전자', price: '₩20,000,000', rate: '+7.3%' },
      ],
    },
    '5': {
      name: '오닐-5',
      asset: '₩60,000,000',
      profit: '+6.8%',
      portfolios: [
        { name: '삼성전자', price: '₩30,000,000', rate: '+6.2%' },
        { name: '현대자동차', price: '₩20,000,000', rate: '+4.5%' },
        { name: 'LG화학', price: '₩10,000,000', rate: '+3.1%' },
      ],
    },
  },
};
