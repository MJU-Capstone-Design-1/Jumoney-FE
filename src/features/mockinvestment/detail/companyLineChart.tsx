'use client';

import { useEffect, useRef } from 'react';
import { createChart, UTCTimestamp, LineSeries } from 'lightweight-charts';
import { useGetChart } from '@/api/generated/endpoints/모의투자-차트/모의투자-차트';

export default function CompanyLineChart({ stockCode }: { stockCode: string }) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const { data: chartResponse, isLoading } = useGetChart(stockCode, {
    period: 'ONE_WEEK',
  });

  useEffect(() => {
    if (!chartContainerRef.current || !chartResponse?.data?.candles) return;

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
        visible: false,
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
    });

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    const lineSeries = chart.addSeries(LineSeries, {
      color: '#4b3425',
      lineWidth: 3,
    });

    const formattedData = chartResponse.data.candles.map((candle) => ({
      time: (new Date(candle.candleTime!).getTime() / 1000) as UTCTimestamp,
      value: candle.closePrice ?? 0,
    }));

    lineSeries.setData(formattedData);
    chart.timeScale().fitContent();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [chartResponse]);

  if (isLoading)
    return (
      <div className='text-body-lg text-secondary2 text-center font-bold'>
        차트를 불러오고 있어요...
      </div>
    );

  return (
    <div style={{ padding: 16 }}>
      <div
        ref={chartContainerRef}
        style={{
          width: '100%',
          height: '228px',
          display: 'flex',
          flexDirection: 'column',
        }}
      />
    </div>
  );
}
