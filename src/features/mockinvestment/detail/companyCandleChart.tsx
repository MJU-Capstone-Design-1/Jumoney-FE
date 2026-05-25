'use client';

import { useEffect, useRef } from 'react';
import {
  createChart,
  UTCTimestamp,
  CandlestickSeries,
  IChartApi,
  ISeriesApi,
  CandlestickData,
} from 'lightweight-charts';
import { useGetChart } from '@/api/generated/endpoints/모의투자-차트/모의투자-차트';
import { PeriodValue } from './periodToggle';
import { MockInvestmentChartResponsePeriod } from '@/api/generated/model';

interface CompanyCandleChartProps {
  stockCode: string;
  period: PeriodValue | undefined;
}

const mapPeriodToApi = (
  period: PeriodValue | undefined,
): MockInvestmentChartResponsePeriod => {
  const mapping: Record<PeriodValue, MockInvestmentChartResponsePeriod> = {
    '1d': 'ONE_DAY',
    '1w': 'ONE_WEEK',
    '3m': 'THREE_MONTHS',
    '1y': 'ONE_YEAR',
    '5y': 'FIVE_YEARS',
  };
  return period ? mapping[period] : 'ONE_DAY';
};

export default function CompanyCandleChart({
  stockCode,
  period,
}: CompanyCandleChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  const apiPeriod = mapPeriodToApi(period);
  const { data: chartResponse, isLoading } = useGetChart(stockCode, {
    period: apiPeriod,
  });

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      layout: {
        textColor: '#4b3425',
        fontFamily: 'Freesentation',
        fontSize: 12,
        background: { color: '#f7f4f2' },
      },
      width: 343,
      height: 228,
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        rightOffset: 0,
        barSpacing: 0,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      crosshair: {
        vertLine: {
          color: '#926247',
          labelBackgroundColor: '#926247',
        },
        horzLine: {
          color: '#926247',
          labelBackgroundColor: '#926247',
        },
      },
    });

    seriesRef.current = chartRef.current.addSeries(CandlestickSeries, {
      upColor: '#df4b01',
      downColor: '#3d16ca',
      borderVisible: false,
      wickUpColor: '#df4b01',
      wickDownColor: '#3d16ca',
    });

    const handleResize = () => {
      chartRef.current?.applyOptions({
        width: chartContainerRef.current?.clientWidth || 343,
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current || !chartResponse?.data?.candles) return;

    const formattedData: CandlestickData[] = chartResponse.data.candles
      .filter((c) => !!c.candleTime && c.openPrice != null)
      .map((candle) => ({
        time: (new Date(candle.candleTime!).getTime() / 1000) as UTCTimestamp,
        open: candle.openPrice!,
        high: candle.highPrice!,
        low: candle.lowPrice!,
        close: candle.closePrice!,
      }));

    seriesRef.current.setData(formattedData);
    chartRef.current?.timeScale().fitContent();
  }, [chartResponse, period]);

  return (
    <div style={{ padding: 16, position: 'relative' }}>
      {isLoading && (
        <div className='text-body-lg text-secondary2 absolute top-4 left-4 font-bold'>
          차트를 불러오고 있어요...
        </div>
      )}
      <div ref={chartContainerRef} style={{ width: '100%', height: '228px' }} />
    </div>
  );
}
