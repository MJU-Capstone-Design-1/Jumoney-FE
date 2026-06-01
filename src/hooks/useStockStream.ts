import { useEffect, useState } from 'react';

export interface RealtimeCandle {
  code: string;
  minuteTs: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  tradeAmount: number;
  change: number;
  rate: number;
  strength: number;
}

export const useStockStream = (
  stockCode: string,
  initialPrice: number,
  initialChangeRate: number,
) => {
  const [latestCandle, setLatestCandle] = useState<RealtimeCandle | null>(null);

  const isValidCandle = latestCandle && latestCandle.code === stockCode;
  const currentPrice = isValidCandle ? latestCandle.close : initialPrice;
  const changeRate = isValidCandle ? latestCandle.rate : initialChangeRate;

  useEffect(() => {
    if (!stockCode) return;

    const es = new EventSource(`/api/stream/${stockCode}`);

    es.onmessage = (event) => {
      try {
        const data: RealtimeCandle = JSON.parse(event.data);
        setLatestCandle(data);
      } catch (err) {
        console.error('SSE 데이터 파싱 에러', err);
      }
    };

    es.onerror = () => {
      console.error('SSE 연결이 끊어졌습니다.');
      // 브라우저가 자동 재연결 시도함
    };

    return () => {
      es.close();
    };
  }, [stockCode]);

  return { currentPrice, changeRate, latestCandle };
};
