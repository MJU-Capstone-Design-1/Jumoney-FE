'use client';

import { PointerEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  createChart,
  UTCTimestamp,
  LineSeries,
  IChartApi,
  ISeriesApi,
  LineData,
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
  moveTimeScaleByDrag,
  positionXAxisLabels,
  PositionedXAxisLabel,
  TimeAxisDragState,
  XAxisLabel,
} from './chartXAxis';

interface CompanyLineChartProps {
  stockCode: string;
  period: PeriodValue | undefined;
  latestCandle?: RealtimeCandle | null;
  date?: string;
  verificationResults?: {
    date?: string;
    matched?: boolean;
  }[];
  enabled?: boolean;
}

const TEXT_UP_COLOR = '#df4b01';
const TEXT_DOWN_COLOR = '#3d16ca';
const DEFAULT_LINE_COLOR = '#4b3425';

const formatDateKeyInSeoul = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 10);
  }

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;

  if (!year || !month || !day) {
    return value.slice(0, 10);
  }

  return `${year}-${month}-${day}`;
};

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

export default function CompanyLineChart({
  stockCode,
  period,
  latestCandle,
  date,
  verificationResults = [],
  enabled = true,
}: CompanyLineChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const periodRef = useRef(period);
  const timeAxisDragRef = useRef<TimeAxisDragState | null>(null);
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

  const handleTimeAxisPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const visibleRange = chartRef.current?.timeScale().getVisibleLogicalRange();
    if (!visibleRange) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    timeAxisDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startRange: visibleRange,
    };
  };

  const handleTimeAxisPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = timeAxisDragRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    event.preventDefault();
    moveTimeScaleByDrag(
      chartRef.current,
      chartContainerRef.current?.clientWidth ?? 0,
      dragState.startRange,
      event.clientX - dragState.startX,
    );
  };

  const handleTimeAxisPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (timeAxisDragRef.current?.pointerId !== event.pointerId) return;

    timeAxisDragRef.current = null;
  };

  const apiPeriod = mapPeriodToApi(period);
  const chartParams = useMemo(
    () => ({
      period: apiPeriod,
      ...(date ? { date } : {}),
    }),
    [apiPeriod, date],
  );
  const verificationResultMap = useMemo(
    () =>
      new Map(
        verificationResults
          .filter(
            (
              result,
            ): result is {
              date: string;
              matched: boolean;
            } => typeof result.date === 'string' && result.matched != null,
          )
          .map((result) => [formatDateKeyInSeoul(result.date), result.matched]),
      ),
    [verificationResults],
  );
  const {
    data: chartResponse,
    isLoading,
    isError,
  } = useGetChart(stockCode, chartParams, {
    query: {
      enabled: enabled && Boolean(stockCode),
    },
  });
  const hasChartCandles = (chartResponse?.data?.candles?.length ?? 0) > 0;

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
          visible: true,
          borderVisible: false,
          scaleMargins: {
            top: 0.2,
            bottom: 0.2,
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
        handleScroll: {
          mouseWheel: true,
          pressedMouseMove: true,
          horzTouchDrag: false,
          vertTouchDrag: false,
        },
        handleScale: {
          pinch: true,
          mouseWheel: true,
          axisPressedMouseMove: true,
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
        color: DEFAULT_LINE_COLOR,
        lineWidth: 3,
      });

      seriesRef.current = series;

      const handleResize = () => {
        if (!chartContainerRef.current || !chartRef.current) return;

        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
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
  }, []);

  useEffect(() => {
    if (!chartResponse?.data?.candles || !seriesRef.current) return;

    const formattedData: LineData[] = chartResponse.data.candles
      .filter(
        (c): c is { candleTime: string; closePrice: number } =>
          !!c.candleTime && c.closePrice != null,
      )
      .map((candle) => {
        const date = new Date(candle.candleTime);
        const timeWithOffset =
          date.getTime() - date.getTimezoneOffset() * 60000;

        const dateKey = formatDateKeyInSeoul(candle.candleTime);
        const matched = verificationResultMap.get(dateKey);
        const color =
          matched === true
            ? TEXT_UP_COLOR
            : matched === false
              ? TEXT_DOWN_COLOR
              : undefined;

        return {
          time: (timeWithOffset / 1000) as UTCTimestamp,
          value: candle.closePrice,
          ...(color ? { color } : {}),
        };
      });

    seriesRef.current.setData(formattedData);
    chartRef.current?.timeScale().fitContent();
    xAxisLabelsRef.current = getXAxisLabels(formattedData, period);
    requestAnimationFrame(updateXAxisLabelPositions);

    if (formattedData.length > 0 && chartRef.current) {
      const lastData = formattedData[formattedData.length - 1];
      chartRef.current.setCrosshairPosition(
        lastData.value,
        lastData.time,
        seriesRef.current,
      );
    }
  }, [chartResponse, period, verificationResultMap]);

  useEffect(() => {
    if (!seriesRef.current || !latestCandle) return;

    const timeWithOffset =
      latestCandle.minuteTs -
      new Date(latestCandle.minuteTs).getTimezoneOffset() * 60000;

    seriesRef.current.update({
      time: (timeWithOffset / 1000) as UTCTimestamp,
      value: latestCandle.close,
    });

    const color =
      latestCandle.rate > 0
        ? TEXT_UP_COLOR
        : latestCandle.rate < 0
          ? TEXT_DOWN_COLOR
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
      {!isLoading && (isError || !hasChartCandles) && (
        <div className='text-body-lg text-text-sub absolute inset-4 flex items-center justify-center text-center font-bold'>
          차트 데이터를 불러오지 못했어요.
        </div>
      )}

      <div
        ref={chartContainerRef}
        style={{
          width: '100%',
          height: '228px',
        }}
      />
      <div
        className={`absolute right-4 bottom-4 left-4 h-6 cursor-grab touch-none active:cursor-grabbing ${
          xAxisLabels.length > 0 ? 'bg-[#f7f4f2]' : ''
        }`}
        onPointerDown={handleTimeAxisPointerDown}
        onPointerMove={handleTimeAxisPointerMove}
        onPointerUp={handleTimeAxisPointerEnd}
        onPointerCancel={handleTimeAxisPointerEnd}
      >
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
    </div>
  );
}
