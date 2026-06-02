'use client';

import { useEffect, useRef, useState } from 'react';
import {
  createChart,
  UTCTimestamp,
  CandlestickSeries,
  IChartApi,
  ISeriesApi,
  CandlestickData,
  TickMarkType,
  Time,
} from 'lightweight-charts';

import { useGetChart } from '@/api/generated/endpoints/모의투자-차트/모의투자-차트';
import { PeriodValue } from './periodToggle';
import { MockInvestmentChartResponsePeriod } from '@/api/generated/model';
import { RealtimeCandle } from '@/hooks/useStockStream';
import {
  formatChartTickMark,
  getXAxisLabels,
  positionXAxisLabels,
  PositionedXAxisLabel,
  XAxisLabel,
} from './chartXAxis';

interface CompanyCandleChartProps {
  stockCode: string;
  period: PeriodValue | undefined;
  latestCandle?: RealtimeCandle | null;
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
  latestCandle,
}: CompanyCandleChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const periodRef = useRef(period);
  const xAxisLabelsRef = useRef<XAxisLabel[]>([]);
  const [xAxisLabels, setXAxisLabels] = useState<PositionedXAxisLabel[]>([]);

  useEffect(() => {
    periodRef.current = period;
  }, [period]);

  const updateXAxisLabelPositions = () => {
    setXAxisLabels(
      positionXAxisLabels(chartRef.current, xAxisLabelsRef.current),
    );
  };

  const barSpacingRef = useRef(0);

  const apiPeriod = mapPeriodToApi(period);

  const { data: chartResponse, isLoading } = useGetChart(stockCode, {
    period: apiPeriod,
  });

  const formatCrosshairTime = (time: UTCTimestamp) => {
    const d = new Date(time * 1000);

    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    const hh = String(d.getUTCHours()).padStart(2, '0');
    const min = String(d.getUTCMinutes()).padStart(2, '0');

    if (periodRef.current === '1d' || periodRef.current === '1w') {
      return `${mm}.${dd} ${hh}:${min}`;
    }
    return `${yyyy}.${mm}.${dd}`;
  };

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
          borderVisible: false,
          scaleMargins: {
            top: 0.25,
            bottom: 0.1,
          },
        },
        timeScale: {
          rightOffset: 0,
          barSpacing: 0,
          fixLeftEdge: true,
          fixRightEdge: true,
          timeVisible: true,
          secondsVisible: false,
          tickMarkFormatter: (time: Time, tickMarkType: TickMarkType) => {
            return formatChartTickMark(time, tickMarkType, periodRef.current);
          },
        },
        grid: {
          vertLines: { visible: false },
          horzLines: { visible: false },
        },
        crosshair: {
          mode: 0,
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

      const series = chart.addSeries(CandlestickSeries, {
        upColor: '#df4b01',
        downColor: '#3d16ca',
        borderVisible: false,
        wickUpColor: '#df4b01',
        wickDownColor: '#3d16ca',
      });

      seriesRef.current = series;

      barSpacingRef.current = chart.timeScale().options().barSpacing ?? 0;

      chart.timeScale().subscribeVisibleLogicalRangeChange(() => {
        barSpacingRef.current =
          chart.timeScale().options().barSpacing ?? barSpacingRef.current;
      });

      const handleResize = () => {
        if (!chartContainerRef.current || !chartRef.current) return;

        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth || 343,
        });
        updateXAxisLabelPositions();
      };

      chart
        .timeScale()
        .subscribeVisibleLogicalRangeChange(updateXAxisLabelPositions);
      chart.timeScale().subscribeSizeChange(updateXAxisLabelPositions);
      window.addEventListener('resize', handleResize);

      return () => {
        chart
          .timeScale()
          .unsubscribeVisibleLogicalRangeChange(updateXAxisLabelPositions);
        chart.timeScale().unsubscribeSizeChange(updateXAxisLabelPositions);
        window.removeEventListener('resize', handleResize);

        chartRef.current?.remove();
        chartRef.current = null;
        seriesRef.current = null;
      };
    }
  }, [period]);

  useEffect(() => {
    if (!seriesRef.current || !chartResponse?.data?.candles) return;

    const formattedData: CandlestickData[] = chartResponse.data.candles
      .filter(
        (
          c,
        ): c is {
          candleTime: string;
          openPrice: number;
          highPrice: number;
          lowPrice: number;
          closePrice: number;
        } =>
          !!c.candleTime &&
          c.openPrice != null &&
          c.highPrice != null &&
          c.lowPrice != null &&
          c.closePrice != null,
      )
      .map((candle) => {
        const date = new Date(candle.candleTime);
        const timeWithOffset =
          date.getTime() - date.getTimezoneOffset() * 60000;

        return {
          time: (timeWithOffset / 1000) as UTCTimestamp,
          open: candle.openPrice,
          high: candle.highPrice,
          low: candle.lowPrice,
          close: candle.closePrice,
        };
      });

    seriesRef.current.setData(formattedData);

    chartRef.current?.timeScale().fitContent();
    xAxisLabelsRef.current = getXAxisLabels(formattedData, period);
    requestAnimationFrame(updateXAxisLabelPositions);

    if (formattedData.length > 0 && chartRef.current) {
      const lastData = formattedData[formattedData.length - 1];
      chartRef.current.setCrosshairPosition(
        lastData.close,
        lastData.time,
        seriesRef.current,
      );
    }
  }, [chartResponse, period]);

  useEffect(() => {
    if (!seriesRef.current || !latestCandle) return;

    // 현재 선택된 주기가 '1d' (혹은 분봉 기반)일 때만 실시간 업데이트 반영
    // 실제로는 일봉/주봉/월봉일 때는 로직이 달라져야 할 수 있으나,
    // 요구사항에서 "1분봉이고 업데이트 주기를 짧게 해서 현재 시점에만 프론트에서 분봉 SSE로 최소/최대가 갱신" 한다고 했으므로
    // 모든 주기에 상관없이 최신 데이터를 업데이트 하도록 처리합니다.
    const timeWithOffset =
      latestCandle.minuteTs -
      new Date(latestCandle.minuteTs).getTimezoneOffset() * 60000;

    seriesRef.current.update({
      time: (timeWithOffset / 1000) as UTCTimestamp,
      open: latestCandle.open,
      high: latestCandle.high,
      low: latestCandle.low,
      close: latestCandle.close,
    });

    // 차트 끝부분(현재가 선) 색상 변경
    const color =
      latestCandle.rate > 0
        ? '#df4b01'
        : latestCandle.rate < 0
          ? '#3d16ca'
          : '#926247';
    seriesRef.current.applyOptions({
      priceLineColor: color,
    });
  }, [latestCandle]);

  return (
    <div style={{ padding: 16, position: 'relative' }}>
      {isLoading && (
        <div className='text-body-lg text-secondary2 absolute top-4 left-4 font-bold'>
          차트를 불러오고 있어요...
        </div>
      )}

      <div ref={chartContainerRef} style={{ width: '100%', height: '228px' }} />
      {xAxisLabels.length > 0 && (
        <div className='absolute right-4 bottom-4 left-4 h-6 bg-[#f7f4f2]'>
          {xAxisLabels.map((label) => (
            <span
              key={label.key}
              className='text-caption-md text-text-main absolute top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap'
              style={{ left: label.left }}
            >
              {label.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
