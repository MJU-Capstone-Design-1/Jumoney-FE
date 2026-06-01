export const MASTER_STOCK_LOGOS: Record<string, string> = {
  // 워런 버핏 (wb)
  애플: '/portfolios/wb/apple.svg',
  '아메리칸 익스프레스': '/portfolios/wb/amex.svg',
  뱅크오브아메리카: '/portfolios/wb/bankOfAmerica.svg',
  코카콜라: '/portfolios/wb/cocaCola.svg',
  쉐브론: '/portfolios/wb/chevron.svg',
  무디스: '/portfolios/wb/moodys.svg',
  '옥시덴탈 페트롤리움': '/portfolios/wb/oxy.svg',
  처브: '/portfolios/wb/chubb.svg',
  '크래프트 하인즈': '/portfolios/wb/kraftHeinz.svg',
  알파벳: '/portfolios/wb/alphabet.svg',

  // 레이 달리오 (rd)
  'iShares Core S&P 500 ETF': '/portfolios/rd/ivv.svg',
  'IVV (S&P 500 ETF)': '/portfolios/rd/ivv.svg',
  'SPDR S&P 500 ETF': '/portfolios/rd/spy.svg',
  'SPY (S&P 500 ETF)': '/portfolios/rd/spy.svg',
  'iShares Core MSCI Emerging Markets ETF': '/portfolios/rd/iemg.svg',
  'IEMG (신흥국 ETF)': '/portfolios/rd/iemg.svg',
  메타: '/portfolios/rd/meta.svg',
  '메타 플랫폼스': '/portfolios/rd/meta.svg',
  알파벳A: '/portfolios/rd/alphabet.svg',
  마이크로소프트: '/portfolios/rd/msft.svg',
  엔비디아: '/portfolios/rd/nvidia.svg',
  아마존: '/portfolios/rd/amazon.svg',
  존슨앤드존슨: '/portfolios/rd/jnj.svg',
  존슨앤존슨: '/portfolios/rd/jnj.svg',
  '프록터 앤 갬블': '/portfolios/rd/png.svg',
  코스트코: '/portfolios/rd/costco.svg',
  '퓨어 알파 펀드': '/portfolios/rd/bridgewater.svg',

  // 피터 린치 (pl)
  '포드 모터': '/portfolios/pl/chrysler.svg',
  크라이슬러: '/portfolios/pl/chrysler.svg',
  '에머슨 일렉트릭': '/portfolios/pl/emersonElectric.svg',
  '패니 메이': '/portfolios/pl/fannieMae.svg',
  패니메이: '/portfolios/pl/fannieMae.svg',
  '페니 메이': '/portfolios/pl/fannieMae.svg',
  페니메이: '/portfolios/pl/fannieMae.svg',
  질레트: '/portfolios/pl/gillette.svg',
  K마트: '/portfolios/pl/kMart.svg',
  맥도날드: '/portfolios/pl/mcdonalds.svg',
  레블론: '/portfolios/pl/revlon.svg',
  시어스: '/portfolios/pl/sears.svg',
  월마트: '/portfolios/pl/walmart.svg',
  '던킨 도너츠': '/portfolios/pl/dunkin.svg',
  기타: '', // No logo for 기타

  // 윌리엄 오닐 (wo)
  퍼스트솔라: '/portfolios/wo/firstSolar.svg',
  '퍼스트 솔라': '/portfolios/wo/firstSolar.svg',
  '일라이 릴리': '/portfolios/wo/lilly.svg',
  레딧: '/portfolios/wo/reddit.svg',
  '로켓 랩': '/portfolios/wo/rocketLab.svg',
  테슬라: '/portfolios/wo/tsla.svg',
  TSMC: '/portfolios/wo/tsmc.svg',
  트윌리오: '/portfolios/wo/twilio.svg',
  제타: '/portfolios/wo/zeta.svg',
  '제타 글로벌': '/portfolios/wo/zeta.svg',
  '시스코 시스템즈': '/portfolios/wo/cisco.svg',
};

// 로고 사이즈 맵핑 (비율이 다름)
export const getLogoSize = (stockName: string) => {
  if (
    stockName === '애플' ||
    stockName === '코카콜라' ||
    stockName === '맥도날드' ||
    stockName === '크래프트 하인즈'
  ) {
    return {
      width: 80,
      height: 80,
      className: 'w-[5rem] h-[5rem] object-contain',
    };
  }
  if (
    stockName === '뱅크오브아메리카' ||
    stockName === '아메리칸 익스프레스' ||
    stockName === '마이크로소프트'
  ) {
    return {
      width: 100,
      height: 40,
      className: 'w-[7rem] h-[3rem] object-contain',
    };
  }
  return {
    width: 90,
    height: 90,
    className: 'w-[6rem] h-[6rem] object-contain',
  };
};
