'use client';

import { useEffect, useRef } from 'react';
import {
  createChart,
  UTCTimestamp,
  LineSeries,
  IChartApi,
  ISeriesApi,
  LineData,
} from 'lightweight-charts';

import { useGetChart } from '@/api/generated/endpoints/모의투자-차트/모의투자-차트';
import { PeriodValue } from './periodToggle';
import { MockInvestmentChartResponsePeriod } from '@/api/generated/model';

interface CompanyLineChartProps {
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

const formatCrosshairTime = (time: UTCTimestamp) => {
  const d = new Date(time * 1000);

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');

  const hour = d.getHours();

  if (hour === 0 && min === '00') return `${yyyy}.${mm}.${dd}`;
  if (hour < 9) return `${yyyy}.${mm}.${dd}`;
  if (hour < 15) return `${mm}.${dd}`;
  return `${mm}.${dd} ${hh}:${min}`;
};

export default function CompanyLineChart({
  stockCode,
  period,
}: CompanyLineChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Line'> | null>(null);

  const apiPeriod = mapPeriodToApi(period);
  const { data: chartResponse, isLoading } = useGetChart(stockCode, {
    period: apiPeriod,
  });

  useEffect(() => {
    if (!chartContainerRef.current) return;

    if (!chartRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          textColor: '#4b3425',
          fontFamily: 'Freesentation',
          fontSize: 12,
          background: { color: '#f7f4f2' },
        },
        width: 343,
        height: 228,
        rightPriceScale: {
          visible: true,
          borderVisible: false,
          scaleMargins: {
            top: 0.1,
            bottom: 0.2,
          },
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
        localization: {
          timeFormatter: (time: UTCTimestamp) => formatCrosshairTime(time),
        },
      });

      chartRef.current = chart;

      const series = chart.addSeries(LineSeries, {
        color: '#4b3425',
        lineWidth: 3,
      });

      seriesRef.current = series;

      const handleResize = () => {
        if (!chartContainerRef.current || !chartRef.current) return;

        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chartRef.current?.remove();
        chartRef.current = null;
        seriesRef.current = null;
      };
    }
  }, []);

  useEffect(() => {
    if (!chartResponse?.data?.candles || !seriesRef.current) return;

    const formattedData: LineData[] = chartResponse.data.candles
      .filter(
        (c): c is { candleTime: string; closePrice: number } =>
          !!c.candleTime && c.closePrice != null,
      )
      .map((candle) => ({
        time: (new Date(candle.candleTime).getTime() / 1000) as UTCTimestamp,
        value: candle.closePrice,
      }));

    seriesRef.current.setData(formattedData);
    chartRef.current?.timeScale().fitContent();
  }, [chartResponse]);

  return (
    <div style={{ padding: 16, position: 'relative' }}>
      {isLoading && (
        <div className='text-body-lg text-secondary2 absolute top-4 left-4 font-bold'>
          차트를 불러오고 있어요...
        </div>
      )}

      <div
        ref={chartContainerRef}
        style={{
          width: '100%',
          height: '228px',
        }}
      />
    </div>
  );
}
